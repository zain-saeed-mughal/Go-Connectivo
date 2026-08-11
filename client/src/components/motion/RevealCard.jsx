import { useRef } from 'react';
import { isCompactViewport, prefersReducedMotion } from '../../motion/config';

/**
 * Soft perspective tilt on pointer — CSS only so it never fights GSAP reveals.
 * Outer node stays free for stagger y/autoAlpha; inner node owns the tilt.
 */
export default function RevealCard({
  children,
  className = '',
  as: Tag = 'div',
  tilt = true,
  ...rest
}) {
  const tiltRef = useRef(null);

  const onMove = (event) => {
    if (!tilt || prefersReducedMotion() || isCompactViewport()) return;
    const el = tiltRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateX(${(py * -5).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`;
  };

  const onLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  return (
    <Tag className={className} {...rest}>
      <div
        ref={tiltRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="h-full will-change-transform [transform-style:preserve-3d] transition-transform duration-500 ease-out"
        style={{ perspective: 900 }}
      >
        {children}
      </div>
    </Tag>
  );
}
