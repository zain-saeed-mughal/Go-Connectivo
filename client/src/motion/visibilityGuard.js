/**
 * Visibility guard removed, it was snapping reveals mid-scroll and making
 * motion feel unsmooth. createReveal already guarantees a visible end state.
 */
export function startVisibilityGuard() {
  return () => {};
}

export function sweepHiddenContent() {}
