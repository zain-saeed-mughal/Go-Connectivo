import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function registerGsap() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  // force3D belongs in config, NOT defaults (defaults apply to every tween,
  // including plain-object counters, which triggers "Missing plugin?" spam).
  gsap.config({ force3D: 'auto', nullTargetWarn: false });
  gsap.defaults({
    overwrite: 'auto',
    ease: 'power3.out',
  });
  // Drop late frames instead of compounding lag during heavy scroll.
  gsap.ticker.lagSmoothing(500, 33);
  // ignoreMobileResize stops the mobile URL-bar show/hide from re-measuring
  // every trigger mid-scroll; limitCallbacks trims redundant callback fires.
  ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });
  registered = true;
}

registerGsap();

// Quiet known GSAP RevertPlugin noise when CSS/Motion also touch transforms.
if (typeof window !== 'undefined' && !window.__gcWarnPatched) {
  window.__gcWarnPatched = true;
  const origWarn = console.warn.bind(console);
  console.warn = (...args) => {
    const first = args[0];
    if (typeof first === 'string' && first.includes('not eligible for reset')) return;
    origWarn(...args);
  };
}

/**
 * Motion language, long settle, never bounce.
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

/** Fire while the section is still entering, motion finishes as you read. */
export const START = 'top 88%';

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isCompactViewport() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 1023px)').matches;
}

/** Fine pointer + hover = desktop-class interaction (cursor, tilt, magnets). */
export function hasFinePointer() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/**
 * Full cinematic layer: desktop, motion OK, and not a low-end / data-saver device.
 * Mobile and reduced-motion get readable static states instead.
 */
export function canEnhanceMotion() {
  if (typeof window === 'undefined') return false;
  if (prefersReducedMotion() || isCompactViewport() || !hasFinePointer()) return false;
  const nav = window.navigator;
  if (nav?.connection?.saveData) return false;
  if (typeof nav?.hardwareConcurrency === 'number' && nav.hardwareConcurrency > 0 && nav.hardwareConcurrency < 4) {
    return false;
  }
  return true;
}

export { gsap, ScrollTrigger };
