/**
 * Browser WebGL context budget is tiny (~8 including extensions).
 * Home can try to mount hero + several section scenes; only a few may live.
 */
import * as THREE from 'three';

const MAX_LIVE = 2;
const live = new Map(); // id -> { priority, onEvict }
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

/** Skip loseContext when GPU already dropped the canvas (R3F + our cleanup). */
function installThreeGuards() {
  if (guardsInstalled || typeof THREE.WebGLRenderer !== 'function') return;
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
    if (typeof first === 'string' && first.includes('THREE.Clock')) return;
    origWarn(...args);
  };
}

installThreeGuards();

export function noteWebglPressure() {
  cooldownUntil = Date.now() + 1200;
}

export function isWebglCoolingDown() {
  return Date.now() < cooldownUntil;
}

export function requestWebglSlot(id, { priority = 0, onEvict } = {}) {
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

/** Release GPU context. Never call loseContext if it is already gone. */
export function disposeRenderer(renderer) {
  if (!renderer) return;
  if (!contextIsLost(renderer)) {
    try {
      renderer.forceContextLoss?.();
    } catch {
      /* ignore */
    }
  }
  try {
    renderer.dispose();
  } catch {
    /* ignore */
  }
}
