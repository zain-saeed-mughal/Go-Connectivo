import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function registerGsap() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  // force3D belongs in config — NOT defaults (defaults apply to every tween,
  // including plain-object counters, which triggers "Missing plugin?" spam).
  gsap.config({ force3D: 'auto', nullTargetWarn: false });
  gsap.defaults({
    overwrite: 'auto',
    ease: 'power3.out',
  });
  registered = true;
}

registerGsap();

/**
 * Motion language — long settle, never bounce.
 * soft  = body / cards
 * reveal = headlines
 * out   = decisive CTAs / counters
 */
export const ease = {
  out: 'power3.out',
  soft: 'power2.out',
  reveal: 'power3.out',
  inOut: 'power2.inOut',
  drift: 'sine.inOut',
};

export const duration = {
  fast: 0.45,
  base: 0.85,
  slow: 1,
  reveal: 0.95,
};

/** Fire while the section is still entering — motion finishes as you read. */
export const START = 'top 88%';

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isCompactViewport() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 1023px)').matches;
}

export { gsap, ScrollTrigger };
