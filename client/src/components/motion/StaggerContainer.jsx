import { START, ease, prefersReducedMotion } from '../../motion/config';
import { createReveal } from '../../motion/reveal';
import { useGsapContext } from '../../motion/useGsapContext';

const variants = {
  up: { from: { y: 32 }, to: { y: 0 } },
  scale: { from: { y: 20, scale: 0.97 }, to: { y: 0, scale: 1 } },
  left: { from: { x: 28 }, to: { x: 0 } },
};

export default function StaggerContainer({
  children,
  className = '',
  as: Tag = 'div',
  stagger = 0.1,
  delay = 0,
  duration = 0.9,
  from = 'up',
  start = START,
}) {
  const reduced = prefersReducedMotion();

  const scope = useGsapContext(() => {
    const items = Array.from(scope.current.children);
    if (!items.length) return;

    const variant = variants[from] || variants.up;

    createReveal({
      targets: items,
      trigger: scope.current,
      from: { autoAlpha: 0, ...variant.from },
      to: { autoAlpha: 1, ...variant.to },
      duration,
      delay,
      stagger,
      start,
      ease: ease.soft,
    });
  }, [stagger, delay, duration, from, start]);

  return (
    <Tag
      ref={scope}
      className={`${reduced ? '' : 'gc-stagger-pending'} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
