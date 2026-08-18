import { duration as D, START, ease } from '../../motion/config';
import { createReveal } from '../../motion/reveal';
import { useGsapContext } from '../../motion/useGsapContext';

const variants = {
  up: { from: { y: 24 }, to: { y: 0 } },
  down: { from: { y: -16 }, to: { y: 0 } },
  left: { from: { x: 24 }, to: { x: 0 } },
  right: { from: { x: -24 }, to: { x: 0 } },
  scale: { from: { scale: 0.98, y: 10 }, to: { scale: 1, y: 0 } },
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
  ...rest
}) {
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
    <Tag ref={scope} className={className} {...rest}>
      {children}
    </Tag>
  );
}
