import { useRef } from 'react';
import { canEnhanceMotion, prefersReducedMotion, isCompactViewport } from '../../motion/config';

/**
 * Cinematic 3D tilt card — glare + depth on fine-pointer desktops only.
 */
export default function RevealCard({
  children,
  className = '',
  as: Tag = 'div',
  tilt = true,
  ...rest
}) {
  const tiltRef = useRef(null);
  const glareRef = useRef(null);
  const frame = useRef(0);

  const onMove = (event) => {
    if (!tilt || prefersReducedMotion() || isCompactViewport() || !canEnhanceMotion()) return;
    const el = tiltRef.current;
    const glare = glareRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1200px) rotateX(${(py * -11).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg) translateZ(12px) scale3d(1.015, 1.015, 1)`;

      if (glare) {
        const gx = ((event.clientX - rect.left) / rect.width) * 100;
        const gy = ((event.clientY - rect.top) / rect.height) * 100;
        glare.style.opacity = '1';
        glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.5) 0%, rgba(107,138,176,0.2) 30%, transparent 60%)`;
      }
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    const el = tiltRef.current;
    const glare = glareRef.current;
    if (el) {
      el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0) scale3d(1, 1, 1)';
    }
    if (glare) glare.style.opacity = '0';
  };

  const merged = `gc-card ${className}`.trim();

  return (
    <Tag className={merged} data-cursor="hover" {...rest}>
      <div
        ref={tiltRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative z-[1] h-full will-change-transform transition-transform duration-500 ease-out [transform-style:preserve-3d]"
      >
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-300"
          aria-hidden="true"
        />
        <div className="relative z-[2] h-full">{children}</div>
      </div>
    </Tag>
  );
}
