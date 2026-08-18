import { canEnhanceMotion, ease, gsap, START } from '../../motion/config';
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
  parallax = true,
}) {
  const scope = useGsapContext(() => {
    const container = scope.current;
    if (!container) return;
    const inner = container.querySelector('[data-reveal-inner]');
    const enhance = canEnhanceMotion();

    createReveal({
      targets: container,
      trigger: container,
      from: {
        clipPath: clipFrom[direction] || clipFrom.up,
        autoAlpha: enhance ? 1 : 0,
      },
      to: { clipPath: OPEN, autoAlpha: 1 },
      duration,
      delay,
      start,
      ease: ease.reveal,
      safe: false,
    });

    if (inner) {
      createReveal({
        targets: inner,
        trigger: container,
        from: { scale: enhance ? 1.1 : 1.04, yPercent: enhance ? 4 : 0 },
        to: { scale: 1, yPercent: 0 },
        duration: duration * 1.15,
        delay,
        start,
        ease: ease.soft,
        safe: false,
      });

      if (parallax && enhance) {
        gsap.to(inner, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.45,
          },
        });
      }
    }
  }, [direction, delay, duration, start, parallax]);

  return (
    <div ref={scope} className={`overflow-hidden ${className}`.trim()} data-cursor="hover">
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
