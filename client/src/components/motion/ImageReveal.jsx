import { ease, START, prefersReducedMotion } from '../../motion/config';
import { createReveal } from '../../motion/reveal';
import { useGsapContext } from '../../motion/useGsapContext';

const clipFrom = {
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
};

const OPEN = 'inset(0% 0% 0% 0%)';

export default function ImageReveal({
  children,
  className = '',
  innerClassName = '',
  direction = 'up',
  delay = 0,
  duration = 1.05,
  start = START,
  zoomOnHover = false,
}) {
  const reduced = prefersReducedMotion();

  const scope = useGsapContext(() => {
    const container = scope.current;
    const inner = container.querySelector('[data-reveal-inner]');

    createReveal({
      targets: container,
      trigger: container,
      from: { clipPath: clipFrom[direction] || clipFrom.up, autoAlpha: 0 },
      to: { clipPath: OPEN, autoAlpha: 1 },
      duration,
      delay,
      start,
      ease: ease.reveal,
    });

    if (inner) {
      createReveal({
        targets: inner,
        trigger: container,
        from: { scale: 1.06 },
        to: { scale: 1 },
        duration: duration * 1.2,
        delay,
        start,
        ease: ease.soft,
      });
    }
  }, [direction, delay, duration, start]);

  return (
    <div
      ref={scope}
      className={`${reduced ? '' : 'gc-will-reveal'} overflow-hidden ${className}`.trim()}
    >
      <div
        data-reveal-inner
        className={`h-full w-full will-change-transform ${
          zoomOnHover ? 'transition-transform duration-700 group-hover:scale-[1.04]' : ''
        } ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
