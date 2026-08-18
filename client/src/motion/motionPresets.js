import { useReducedMotion } from 'motion/react';

/** Shared Motion language — springs + easings (no text tilt). */
export const motionEase = [0.22, 1, 0.36, 1];

export const springSoft = { type: 'spring', stiffness: 280, damping: 28, mass: 0.85 };
export const springSnappy = { type: 'spring', stiffness: 420, damping: 32 };
export const springProgress = { stiffness: 100, damping: 30, restDelta: 0.001 };

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/** @deprecated use fadeUp — kept as alias so old imports don't break */
export const fadeUpTilt = fadeUp;

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.98, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export const clipRevealUp = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.01 },
  visible: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

/** Soft rise only — no rotate/tilt. */
export const wordReveal = {
  hidden: { y: '100%' },
  visible: { y: '0%' },
};

export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -6% 0px' };

export function useMotionSafe() {
  const reduced = useReducedMotion();
  return {
    reduced: Boolean(reduced),
    transition: reduced ? { duration: 0.01 } : { duration: 0.55, ease: motionEase },
    spring: reduced ? { duration: 0.01 } : springSoft,
  };
}
