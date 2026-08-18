import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { springSnappy } from '../../motion/motionPresets';
import { hasFinePointer } from '../../motion/config';

const base =
  'group/btn relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-[-0.01em] will-change-transform';

const variants = {
  primary:
    'bg-gradient-to-r from-[#2F4C73] to-[#4A6B94] text-[#FFFFFF] shadow-[0_12px_32px_rgba(47,76,115,0.28)]',
  secondary:
    'border border-[#6B8AB0]/45 bg-[#FFFFFF] text-[#2F4C73] hover:border-[#6B8AB0] hover:bg-[#E8ECF2]',
  ghost:
    'border border-[rgba(47,76,115,0.16)] bg-transparent text-[#4A5D73] hover:border-[#4A6B94]/55 hover:text-[#2F4C73]',
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

  const classes = `${base} ${variants[variant] || variants.primary} ${
    disabled ? 'cursor-not-allowed opacity-60' : ''
  } ${className}`;

  const gesture = interactive
    ? {
        whileHover: { y: -2, scale: 1.02, boxShadow: '0 16px 40px rgba(47,76,115,0.34)' },
        whileTap: { scale: 0.98, y: 0 },
        transition: springSnappy,
      }
    : {};

  const content = (
    <>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
      <span ref={magnetic ? ref : undefined} className="relative inline-flex items-center gap-2 will-change-transform">
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
