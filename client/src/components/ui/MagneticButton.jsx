import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { springSnappy } from '../../motion/motionPresets';
import { hasFinePointer } from '../../motion/config';

const base =
  'group/btn relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-[-0.01em] will-change-transform';

const variants = {
  primary:
    'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-on-accent)] shadow-[var(--shadow-card-hover)]',
  secondary:
    'border border-[color:var(--border)] bg-transparent text-[var(--text-primary)] hover:border-[var(--accent-secondary)] hover:bg-[color-mix(in_srgb,var(--accent-primary)_12%,transparent)]',
  ghost:
    'border border-[color:var(--border-soft)] bg-transparent text-[var(--text-primary)] hover:border-[var(--accent-soft)]/70 hover:text-[var(--text-primary)]',
};

const MotionLink = motion.create(Link);
const MotionA = motion.a;
const MotionButton = motion.button;

/**
 * CTA button. Set magnetic={false} / motion={false} for Navbar/Hero (no pull/tilt).
 */
export default function MagneticButton({
  children,
  href,
  to,
  onClick,
  variant = 'primary',
  type = 'button',
  className = '',
  disabled = false,
  magnetic = true,
  motionFx = true,
}) {
  const ref = useMagnetic(magnetic ? 0.22 : 0);
  const reduced = useReducedMotion();
  const interactive = motionFx && magnetic && !reduced && hasFinePointer();

  // CSS hover only, Motion y/scale + GSAP magnetic x/y fight and spam
  // "x/y not eligible for reset" in the console.
  const gesture = interactive
    ? {
        whileTap: { scale: 0.98 },
        transition: springSnappy,
      }
    : {};

  const hoverClass = interactive
    ? 'transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[var(--shadow-card-hover)]'
    : '';

  const classes = `${base} ${variants[variant] || variants.primary} ${hoverClass} ${
    disabled ? 'cursor-not-allowed opacity-60' : ''
  } ${className}`;

  const content = (
    <>
      {variant === 'primary' ? (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
      ) : null}
      <span
        ref={magnetic ? ref : undefined}
        className="relative inline-flex items-center gap-2 will-change-transform"
      >
        {children}
      </span>
    </>
  );

  if (to) {
    return (
      <MotionLink to={to} className={classes} onClick={onClick} data-cursor="hover" {...gesture}>
        {content}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <MotionA href={href} className={classes} onClick={onClick} data-cursor="hover" {...gesture}>
        {content}
      </MotionA>
    );
  }

  return (
    <MotionButton
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      data-cursor="hover"
      {...gesture}
    >
      {content}
    </MotionButton>
  );
}
