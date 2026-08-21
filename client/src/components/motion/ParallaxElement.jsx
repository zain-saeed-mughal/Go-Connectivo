import { gsap, isCompactViewport, prefersReducedMotion, canEnhanceMotion } from '../../motion/config';
import { useGsapContext } from '../../motion/useGsapContext';

/**
 * Soft scroll-linked drift, desktop enhance only; higher scrub = silkier follow.
 */
export default function ParallaxElement({
  children,
  className = '',
  speed = 10,
  rotate = 0,
  as: Tag = 'div',
}) {
  const scope = useGsapContext(() => {
    if (prefersReducedMotion() || isCompactViewport() || !canEnhanceMotion()) return;

    gsap.fromTo(
      scope.current,
      { yPercent: speed * -0.45, rotate: rotate ? rotate * -0.5 : 0 },
      {
        yPercent: speed * 0.45,
        rotate: rotate || 0,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: scope.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      },
    );
  }, [speed, rotate]);

  return (
    <Tag ref={scope} className={`will-change-transform ${className}`}>
      {children}
    </Tag>
  );
}
