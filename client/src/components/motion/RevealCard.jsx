import { useRef } from 'react';
import { gsap, isCompactViewport, prefersReducedMotion } from '../../motion/config';

/**
 * Soft perspective tilt on pointer — material response, not a 3D gadget.
 */
export default function RevealCard({
  children,
  className = '',
  as: Tag = 'div',
  tilt = true,
  ...rest
}) {
  const ref = useRef(null);
  const quickRotX = useRef(null);
  const quickRotY = useRef(null);

  const ensureQuickTo = () => {
    if (!ref.current || quickRotX.current) return;
    quickRotX.current = gsap.quickTo(ref.current, 'rotateX', {
      duration: 0.75,
      ease: 'power3.out',
    });
    quickRotY.current = gsap.quickTo(ref.current, 'rotateY', {
      duration: 0.75,
      ease: 'power3.out',
    });
  };

  const onMove = (event) => {
    if (!tilt || prefersReducedMotion() || isCompactViewport()) return;
    ensureQuickTo();
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    quickRotY.current(px * 5);
    quickRotX.current(py * -5);
  };

  const onLeave = () => {
    if (!ref.current || !quickRotX.current) return;
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'power3.out' });
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: 'preserve-3d', perspective: 900 }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
