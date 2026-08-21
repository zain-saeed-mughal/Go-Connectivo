import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from './config';
import { dropPendingWithin } from './reveal';

/**
 * Scopes GSAP work to a ref and reverts it on unmount, which also kills any
 * ScrollTriggers created inside, the main source of duplicate triggers and
 * leaks when routes change.
 */
export function useGsapContext(setup, deps = []) {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const el = scope.current;
    if (!el || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(setup, el);

    return () => {
      // kill(true) clears animations without RevertPlugin fighting CSS/Motion transforms
      // (avoids "x/y not eligible for reset" console spam).
      ctx.kill(true);
      dropPendingWithin(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
