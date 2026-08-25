/**
 * Warm Three.js section chunks so scroll-in does not wait on network.
 * Safe to call multiple times; browsers cache the same dynamic import.
 */
export function prefetchHome3d() {
  if (typeof window === 'undefined') return;

  const run = () => {
    import('three').catch(() => {});
    import('../components/ui/TelecomScene3D').catch(() => {});
    import('../components/ui/HolographicHub3D').catch(() => {});
    import('../components/home/HeroNetworkCanvas').catch(() => {});
  };

  // Kick off immediately after paint, then again on idle for any leftovers.
  window.setTimeout(run, 0);
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(run, { timeout: 800 });
  } else {
    window.setTimeout(run, 180);
  }
}

/** Start downloading a 3D module as soon as its section is approaching. */
export function prefetchTelecomScene() {
  return Promise.all([
    import('three').catch(() => {}),
    import('../components/ui/TelecomScene3D').catch(() => {}),
  ]);
}

export function prefetchHolographicHub() {
  return Promise.all([
    import('three').catch(() => {}),
    import('../components/ui/HolographicHub3D').catch(() => {}),
  ]);
}
