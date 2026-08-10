import { duration as D, START, ease, prefersReducedMotion } from '../../motion/config';
import { createReveal } from '../../motion/reveal';
import { useGsapContext } from '../../motion/useGsapContext';

const variants = {
  up: { from: { y: 28 }, to: { y: 0 } },
  down: { from: { y: -20 }, to: { y: 0 } },
  left: { from: { x: 28 }, to: { x: 0 } },
  right: { from: { x: -28 }, to: { x: 0 } },
  scale: { from: { scale: 0.97, y: 12 }, to: { scale: 1, y: 0 } },
  none: { from: {}, to: {} },
};

export default function AnimatedSection({
  children,
  className = '',
  as: Tag = 'div',
  from = 'up',
  delay = 0,
  duration = D.base,
  start = START,
}) {
  const reduced = prefersReducedMotion();

  const scope = useGsapContext(() => {
    const variant = variants[from] || variants.up;

    createReveal({
      targets: scope.current,
      trigger: scope.current,
      from: { autoAlpha: 0, ...variant.from },
      to: { autoAlpha: 1, ...variant.to },
      duration,
      delay,
      start,
      ease: ease.soft,
    });
  }, [from, delay, duration, start]);

  return (
    <Tag ref={scope} className={`${reduced ? '' : 'gc-will-reveal'} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
