import { canEnhanceMotion } from './config';

/**
 * Warm Three.js section chunks so scroll-in does not wait on network.
 * Desktop / enhanced motion only — never compete with LCP on mobile Lighthouse.
 */
export function prefetchHome3d() {
  if (typeof window === 'undefined') return;
  if (!canEnhanceMotion()) return;

  const run = () => {
    if (!canEnhanceMotion()) return;
    import('three').catch(() => {});
    import('../components/ui/TelecomScene3D').catch(() => {});
    import('../components/ui/HolographicHub3D').catch(() => {});
  };

  // After first paint + idle — never on the critical path.
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(run, { timeout: 2500 });
  } else {
    window.setTimeout(run, 1200);
  }
}

/** Start downloading a 3D module as soon as its section is approaching. */
export function prefetchTelecomScene() {
  if (typeof window !== 'undefined' && !canEnhanceMotion()) {
    return Promise.resolve([]);
  }
  return Promise.all([
    import('three').catch(() => {}),
    import('../components/ui/TelecomScene3D').catch(() => {}),
  ]);
}

export function prefetchHolographicHub() {
  if (typeof window !== 'undefined' && !canEnhanceMotion()) {
    return Promise.resolve([]);
  }
  return Promise.all([
    import('three').catch(() => {}),
    import('../components/ui/HolographicHub3D').catch(() => {}),
  ]);
}
