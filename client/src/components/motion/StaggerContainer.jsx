import { ease, prefersReducedMotion } from '../../motion/config';
import { createReveal } from '../../motion/reveal';
import { useGsapContext } from '../../motion/useGsapContext';

const variants = {
  up: { from: { y: 24 }, to: { y: 0 } },
  scale: { from: { y: 16, scale: 0.98 }, to: { y: 0, scale: 1 } },
  left: { from: { x: 24 }, to: { x: 0 } },
};

export default function StaggerContainer({
  children,
  className = '',
  as: Tag = 'div',
  stagger = 0.1,
  delay = 0,
  duration = 0.85,
  from = 'up',
  start = 'top 80%',
  ...rest
}) {
  const scope = useGsapContext(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;
    const items = Array.from(root.children);
    if (!items.length) return;

    const variant = variants[from] || variants.up;
    const chapter = root.closest('[data-scroll-chapter]');
    const trigger = chapter || root;

    createReveal({
      targets: items,
      trigger,
      from: { autoAlpha: 0, ...variant.from },
      to: { autoAlpha: 1, ...variant.to },
      duration,
      delay,
      stagger,
      start,
      ease: ease.soft,
      safe: true,
    });
  }, [stagger, delay, duration, from, start]);

  return (
    <Tag ref={scope} className={className} {...rest}>
      {children}
    </Tag>
  );
}
