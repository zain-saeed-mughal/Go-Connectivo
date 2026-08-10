import { Link } from 'react-router-dom';
import { useMagnetic } from '../../hooks/useMagnetic';

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-[-0.01em] transition-all duration-500 will-change-transform';

const variants = {
  primary:
    'bg-gradient-to-r from-[#e86f0c] to-[#ff6b00] text-white shadow-[0_10px_40px_rgba(255,107,0,0.28)] hover:shadow-[0_16px_50px_rgba(232,111,12,0.45)]',
  secondary:
    'border border-white/15 bg-white/5 text-white backdrop-blur-md hover:border-white/30 hover:bg-white/10',
  ghost: 'border border-white/10 text-[#cfcfcf] hover:border-white/25 hover:text-white',
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
      {/* Light sweep on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
      <span
        ref={ref}
        className="relative inline-flex items-center gap-2 will-change-transform"
      >
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
