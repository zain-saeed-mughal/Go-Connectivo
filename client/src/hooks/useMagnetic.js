import { useEffect, useRef } from 'react';
import { gsap, isCompactViewport, prefersReducedMotion } from '../motion/config';

/**
 * Soft magnetic pull — follows the cursor with a long settle so it never feels snappy.
 */
export function useMagnetic(strength = 0.28) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isCompactViewport()) return undefined;

    const parent = el.parentElement || el;

    const quickX = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' });
    const quickY = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' });

    const onMove = (event) => {
      const rect = parent.getBoundingClientRect();
      quickX((event.clientX - rect.left - rect.width / 2) * strength);
      quickY((event.clientY - rect.top - rect.height / 2) * strength);
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' });
    };

    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);

    return () => {
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return ref;
}
