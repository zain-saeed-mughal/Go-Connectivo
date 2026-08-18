import { useEffect, useRef } from 'react';
import { gsap, ease, prefersReducedMotion } from '../../motion/config';

const format = (n, target) =>
  Number.isInteger(target) ? Math.round(n).toLocaleString() : n.toFixed(1);

/**
 * Counts from 0 when the stat actually enters the viewport.
 * ScrollTrigger + pin refresh was completing these instantly (final number, no tick).
 */
export default function AnimatedCounter({ value, suffix = '', className = '', duration = 2.1 }) {
  const scope = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    const node = numberRef.current;
    const trigger = scope.current;
    if (!node || !trigger) return undefined;

    if (prefersReducedMotion()) {
      node.textContent = format(value, value);
      return undefined;
    }

    node.textContent = format(0, value);
    const counter = { val: 0 };
    let tween;

    const play = () => {
      if (tween) return;
      counter.val = 0;
      node.textContent = format(0, value);
      tween = gsap.to(counter, {
        val: value,
        duration,
        ease: ease.out,
        overwrite: false,
        onUpdate: () => {
          node.textContent = format(counter.val, value);
        },
        onComplete: () => {
          node.textContent = format(value, value);
        },
      });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) play();
      },
      { threshold: [0.25, 0.4, 0.6], rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(trigger);

    return () => {
      io.disconnect();
      tween?.kill();
    };
  }, [value, duration]);

  return (
    <span ref={scope} className={className}>
      <span ref={numberRef}>{prefersReducedMotion() ? format(value, value) : format(0, value)}</span>
      {suffix}
    </span>
  );
}
