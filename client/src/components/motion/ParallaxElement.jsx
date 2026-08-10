import { gsap, isCompactViewport } from '../../motion/config';
import { useGsapContext } from '../../motion/useGsapContext';

/**
 * Soft scroll-linked drift — higher scrub = silkier follow.
 */
export default function ParallaxElement({
  children,
  className = '',
  speed = 10,
  as: Tag = 'div',
}) {
  const scope = useGsapContext(() => {
    if (isCompactViewport()) return;

    gsap.fromTo(
      scope.current,
      { yPercent: speed * -0.45 },
      {
        yPercent: speed * 0.45,
        ease: 'none',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
          invalidateOnRefresh: true,
        },
      },
    );
  }, [speed]);

  return (
    <Tag ref={scope} className={`will-change-transform ${className}`}>
      {children}
    </Tag>
  );
}
