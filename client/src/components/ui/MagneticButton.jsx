import { Link } from 'react-router-dom';
import { useMagnetic } from '../../hooks/useMagnetic';

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-[-0.01em] transition-all duration-500 will-change-transform';

const variants = {
  primary:
    'bg-gradient-to-r from-[#2F4C73] to-[#4A6B94] text-[#FFFFFF] shadow-[0_12px_32px_rgba(47,76,115,0.28)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(47,76,115,0.38)]',
  secondary:
    'border border-[#6B8AB0]/45 bg-[#FFFFFF] text-[#2F4C73] hover:border-[#6B8AB0] hover:bg-[#E8ECF2]',
  ghost:
    'border border-[rgba(47,76,115,0.16)] bg-transparent text-[#4A5D73] hover:border-[#4A6B94]/55 hover:text-[#2F4C73]',
};

export default function MagneticButton({
  children,
  href,
  to,
  onClick,
  variant = 'primary',
  type = 'button',
  className = '',
  disabled = false,
}) {
  const ref = useMagnetic(0.22);

  const classes = `${base} ${variants[variant] || variants.primary} ${
    disabled ? 'cursor-not-allowed opacity-60' : ''
  } ${className}`;

  const content = (
    <>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
      <span ref={ref} className="relative inline-flex items-center gap-2 will-change-transform">
        {children}
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
