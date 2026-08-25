import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { isCompactViewport } from '../../motion/config';
import ServiceCardArt from './ServiceCardArt';

/** Soft white → blue enterprise surfaces */
const THEMES = {
  primary: 'from-[#FFFFFF] via-[#F7F9FC] to-[#E8EEF6]',
  secondary: 'from-[#FFFFFF] via-[#F5F8FC] to-[#E6EDF5]',
  accent: 'from-[#FFFFFF] via-[#F8FAFC] to-[#E9EFF7]',
  success: 'from-[#FFFFFF] via-[#F7F9FC] to-[#E7EEF6]',
  warning: 'from-[#FFFFFF] via-[#F6F9FC] to-[#E8EFF7]',
  danger: 'from-[#FFFFFF] via-[#F8FAFC] to-[#EAEFF6]',
  info: 'from-[#FFFFFF] via-[#F7F9FC] to-[#E6EDF6]',
  neutral: 'from-[#FFFFFF] via-[#F8FAFC] to-[#E9EFF6]',
};

const SIZES = {
  sm: 'min-h-0',
  md: 'min-h-0',
  lg: 'min-h-0',
};

const VARIANTS = {
  default:
    'border border-[rgba(47,76,115,0.12)] shadow-[0_10px_28px_rgba(47,76,115,0.06)] hover:border-[#4A6B94]/55 hover:shadow-[0_16px_40px_rgba(47,76,115,0.12)]',
  minimal:
    'border border-[rgba(47,76,115,0.12)] shadow-sm hover:border-[#4A6B94]/45 hover:shadow-md',
  premium:
    'border border-[rgba(47,76,115,0.13)] shadow-[0_12px_32px_rgba(47,76,115,0.07)] hover:border-[#4A6B94]/60 hover:shadow-[0_18px_44px_rgba(47,76,115,0.13)]',
};

const GRIDS = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

const GAPS = {
  sm: 'gap-4',
  md: 'gap-5',
  lg: 'gap-6',
  xl: 'gap-8',
};

function formatMarker(index) {
  if (typeof index !== 'number' || index < 0) return null;
  return String(index + 1).padStart(2, '0');
}

export const Card3D = React.forwardRef(function Card3D(
  {
    title,
    description,
    image,
    icon,
    artKey,
    index,
    marker,
    theme = 'primary',
    gradient,
    onClick,
    className,
    size = 'md',
    variant = 'default',
    disabled = false,
    loading = false,
    exploreLabel = 'Explore',
    enableTilt = true,
    ...props
  },
  ref,
) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [tiltEnabled, setTiltEnabled] = useState(enableTilt);

  useEffect(() => {
    const sync = () => setTiltEnabled(enableTilt && !isCompactViewport());
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [enableTilt]);

  const finalGradient = useMemo(() => gradient || THEMES[theme] || THEMES.primary, [gradient, theme]);
  const displayMarker = marker ?? formatMarker(index);

  const handleMove = useCallback(
    (e) => {
      if (disabled || !tiltEnabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({
        x: (x / rect.width - 0.5) * 18,
        y: (y / rect.height - 0.5) * -18,
      });
    },
    [disabled, tiltEnabled],
  );

  const handleEnter = useCallback(() => {
    if (disabled) return;
    setHovered(true);
  }, [disabled]);

  const handleLeave = useCallback(() => {
    if (disabled) return;
    setHovered(false);
    setMousePos({ x: 0, y: 0 });
  }, [disabled]);

  const handleCtaClick = useCallback(
    (e) => {
      e?.stopPropagation?.();
      if (disabled || loading || !onClick) return;
      onClick();
    },
    [disabled, loading, onClick],
  );

  const handleCardActivate = useCallback(
    (e) => {
      if (disabled || loading || !onClick) return;
      if (e.target.closest('button')) return;
      onClick();
    },
    [disabled, loading, onClick],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (!onClick || disabled || loading) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    },
    [onClick, disabled, loading],
  );

  return (
    <motion.div
      ref={ref}
      className={cn(
        'group relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl bg-gradient-to-br transform-gpu transition-[transform,box-shadow,border-color] duration-300 ease-out',
        finalGradient,
        SIZES[size],
        VARIANTS[variant],
        onClick && !disabled && 'cursor-pointer hover:-translate-y-1',
        disabled && 'cursor-not-allowed opacity-50',
        loading && 'pointer-events-none',
        className,
      )}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick ? handleCardActivate : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      animate={{
        rotateX: disabled || !tiltEnabled ? 0 : mousePos.y,
        rotateY: disabled || !tiltEnabled ? 0 : mousePos.x,
        z: disabled || !tiltEnabled ? 0 : hovered ? 20 : 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 35, mass: 0.8 }}
      style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
      role={onClick ? 'link' : 'article'}
      aria-label={onClick ? `${title}, ${exploreLabel}` : undefined}
      {...props}
    >
      {image ? (
        <div className="absolute inset-0">
          <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-[#F7F9FC]/85 to-[#E8EEF6]/8" />
        </div>
      ) : null}

      <ServiceCardArt
        name={artKey}
        className="pointer-events-none absolute -right-2 -bottom-1 h-[7.5rem] w-[7.5rem] text-[#2F4C73] opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.11] sm:h-32 sm:w-32"
      />

      <div className="relative z-10 flex h-full flex-col p-5 sm:p-[1.15rem]">
        <div className="mb-3.5 flex items-start justify-between gap-3">
          {icon ? (
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#4A6B94]/12 text-[#2F4C73] ring-1 ring-[#4A6B94]/10 transition-colors duration-300 group-hover:bg-[#4A6B94]/18 group-hover:ring-[#4A6B94]/22 sm:h-11 sm:w-11">
              {icon}
            </span>
          ) : (
            <span />
          )}

          {displayMarker ? (
            <span
              className="font-display text-[11px] font-semibold tracking-[0.14em] text-[#6B8AB0]/80 tabular-nums"
              aria-hidden
            >
              {displayMarker}
            </span>
          ) : null}
        </div>

        <h3 className="font-display text-base font-semibold tracking-tight text-[#2F4C73] sm:text-[1.05rem]">
          {title}
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-[0.9375rem] leading-relaxed text-[#5A6B7D] sm:text-sm">{description}</p>

        {onClick && !disabled ? (
          <button
            type="button"
            onClick={handleCtaClick}
            className="mt-4 inline-flex min-h-10 w-fit items-center gap-1.5 text-sm font-semibold text-[#2F4C73] transition-colors duration-300 hover:text-[#4A6B94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A6B94]/45 sm:min-h-0"
          >
            {loading ? 'Loading...' : exploreLabel}
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </button>
        ) : null}
      </div>

      {loading ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-[#2F4C73]/20 backdrop-blur-sm">
          <motion.div
            className="h-6 w-6 rounded-full border-2 border-white/30 border-t-[#4A6B94]"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      ) : null}
    </motion.div>
  );
});

Card3D.displayName = 'Card3D';

export function Card3DList({
  cards,
  className,
  columns = 3,
  gap = 'md',
  size = 'md',
  variant = 'default',
  animated = true,
  staggerDelay = 0.08,
  enableTilt = true,
}) {
  const gridClass = useMemo(() => GRIDS[columns], [columns]);
  const gapClass = useMemo(() => GAPS[gap], [gap]);

  const customVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.08,
          duration: 0.35,
          ease: [0.23, 1, 0.32, 1],
        },
      },
    }),
    [staggerDelay],
  );

  if (!cards?.length) {
    return null;
  }

  return (
    <div className="relative">
      <motion.div
        className={cn('relative grid w-full', gridClass, gapClass, className)}
        variants={animated ? customVariants : undefined}
        initial={animated ? 'hidden' : false}
        animate={animated ? 'visible' : undefined}
        style={{ perspective: enableTilt ? '1500px' : undefined, transformStyle: enableTilt ? 'preserve-3d' : undefined }}
      >
        {cards.map((card, cardIndex) => (
          <motion.div
            key={card.id}
            className="h-full"
            variants={
              animated
                ? {
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { type: 'spring', stiffness: 120, damping: 16 },
                    },
                  }
                : undefined
            }
            style={{ transformStyle: enableTilt ? 'preserve-3d' : undefined }}
          >
            <Card3D
              title={card.title}
              description={card.description}
              image={card.image}
              icon={card.icon}
              artKey={card.artKey}
              index={card.index ?? cardIndex}
              marker={card.marker}
              theme={card.theme}
              gradient={card.gradient}
              onClick={card.onClick}
              size={size}
              variant={variant}
              disabled={card.disabled}
              loading={card.loading}
              exploreLabel={card.exploreLabel}
              enableTilt={enableTilt}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
