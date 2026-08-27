/**
 * Browser WebGL context budget is tiny (~8 including extensions / StrictMode).
 * Home can try to mount several section scenes; only a few may live.
 *
 * Intentionally does NOT import `three` — that kept Three in the critical path
 * via main.jsx. Pass THREE into installThreeGuards() once a scene loads.
 */

/** Keep at most two live stages so StrictMode remounts cannot blow the budget. */
const MAX_LIVE = 2;
const live = new Map(); // id -> { priority, onEvict }
/** After eviction / context-loss, block that id from remounting briefly. */
const backoffUntil = new Map(); // id -> timestamp
let cooldownUntil = 0;
let guardsInstalled = false;

function contextIsLost(renderer) {
  try {
    const gl = renderer.getContext?.();
    return Boolean(gl?.isContextLost?.());
  } catch {
    return true;
  }
}

function setBackoff(id, ms) {
  backoffUntil.set(id, Date.now() + ms);
}

/** Skip loseContext when GPU already dropped the canvas (R3F + our cleanup). */
export function installThreeGuards(THREE) {
  if (guardsInstalled || typeof THREE?.WebGLRenderer !== 'function') return;
  guardsInstalled = true;

  const proto = THREE.WebGLRenderer.prototype;
  const origLoss = proto.forceContextLoss;
  proto.forceContextLoss = function forceContextLossSafe() {
    if (contextIsLost(this)) return;
    try {
      origLoss.call(this);
    } catch {
      /* already lost */
    }
  };

  const origWarn = console.warn.bind(console);
  console.warn = (...args) => {
    const first = args[0];
    if (typeof first !== 'string') {
      origWarn(...args);
      return;
    }
    if (first.includes('THREE.Clock')) return;
    if (first.includes('THREE.WebGLRenderer: Context Lost')) return;
    if (first.includes('not eligible for reset')) return;
    if (first.includes('Too many active WebGL contexts')) return;
    origWarn(...args);
  };
}

export function noteWebglPressure() {
  cooldownUntil = Date.now() + 1800;
}

export function isWebglCoolingDown() {
  return Date.now() < cooldownUntil;
}

export function isWebglBackingOff(id) {
  return Date.now() < (backoffUntil.get(id) || 0);
}

export function requestWebglSlot(id, { priority = 0, onEvict } = {}) {
  if (isWebglBackingOff(id)) return false;
  if (isWebglCoolingDown() && !live.has(id)) return false;

  if (live.has(id)) {
    const cur = live.get(id);
    cur.priority = priority;
    cur.onEvict = onEvict;
    return true;
  }

  if (live.size < MAX_LIVE) {
    live.set(id, { priority, onEvict });
    return true;
  }

  let victimId = null;
  let victimPri = Infinity;
  for (const [otherId, meta] of live) {
    if (otherId === id) continue;
    if (meta.priority < victimPri) {
      victimPri = meta.priority;
      victimId = otherId;
    }
  }

  if (victimId == null || victimPri >= priority) return false;

  const victim = live.get(victimId);
  live.delete(victimId);
  setBackoff(victimId, 1600);
  try {
    victim?.onEvict?.();
  } catch {
    /* ignore */
  }

  live.set(id, { priority, onEvict });
  return true;
}

export function releaseWebglSlot(id) {
  live.delete(id);
}

export function hasWebglSlot(id) {
  return live.has(id);
}

/**
 * Release GPU resources on unmount.
 * forceContextLoss after dispose so the browser frees the slot immediately —
 * without it, rapid remounts hit "Too many active WebGL contexts".
 */
export function disposeRenderer(renderer) {
  if (!renderer) return;
  try {
    const canvas = renderer.domElement;
    if (canvas?.parentNode) canvas.parentNode.removeChild(canvas);
  } catch {
    /* ignore */
  }
  try {
    renderer.dispose();
  } catch {
    /* ignore */
  }
  try {
    if (!contextIsLost(renderer)) {
      renderer.forceContextLoss();
    }
  } catch {
    /* ignore */
  }
}
