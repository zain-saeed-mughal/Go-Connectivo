import { useRef } from 'react';
import { gsap, ease, prefersReducedMotion } from '../../motion/config';
import { markPending, settleReveal } from '../../motion/reveal';
import { useGsapContext } from '../../motion/useGsapContext';

const format = (n, target) =>
  Number.isInteger(target) ? Math.round(n).toLocaleString() : n.toFixed(1);

export default function AnimatedCounter({ value, suffix = '', className = '', duration = 2.2 }) {
  const numberRef = useRef(null);

  const scope = useGsapContext(() => {
    const node = numberRef.current;
    if (!node) return;

    const counter = { value: 0 };
    node.textContent = format(0, value);

    markPending(node, () => {
      node.textContent = format(value, value);
    });

    gsap.to(counter, {
      value,
      duration,
      ease: ease.out,
      onStart: () => settleReveal(node),
      onUpdate: () => {
        node.textContent = format(counter.value, value);
      },
      scrollTrigger: { trigger: scope.current, start: 'top 88%', once: true },
    });
  }, [value, duration]);

  return (
    <span ref={scope} className={className}>
      <span ref={numberRef}>{prefersReducedMotion() ? format(value, value) : format(0, value)}</span>
      {suffix}
    </span>
  );
}
