import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { isCompactViewport } from '../../motion/config';

/** Theme surfaces — Luxe Navy professional gradients */
const THEMES = {
  primary: 'from-[#FFFFFF] via-[#E8ECF2] to-[#6B8AB0]/25',
  secondary: 'from-[#F4F6F9] via-[#E0E5ED] to-[#4A6B94]/20',
  accent: 'from-[#FFFFFF] via-[#E8ECF2] to-[#2F4C73]/18',
  success: 'from-[#FFFFFF] via-[#F4F6F9] to-[#6B8AB0]/22',
  warning: 'from-[#F4F6F9] via-[#E8ECF2] to-[#4A6B94]/28',
  danger: 'from-[#FFFFFF] via-[#E8ECF2] to-[#2F4C73]/15',
  info: 'from-[#FFFFFF] via-[#E8ECF2] to-[#6B8AB0]/30',
  neutral: 'from-[#FFFFFF] via-[#F4F6F9] to-[#4A6B94]/16',
};

const SIZES = {
  sm: 'min-h-52 h-auto md:h-64',
  md: 'min-h-60 h-auto md:h-80',
  lg: 'min-h-64 h-auto md:h-96',
};

const VARIANTS = {
  default: 'border border-[rgba(47,76,115,0.12)] shadow-[0_14px_40px_rgba(47,76,115,0.08)] hover:border-[#6B8AB0]/40 hover:shadow-[0_20px_50px_rgba(47,76,115,0.12)]',
  minimal: 'border border-[rgba(47,76,115,0.12)] shadow-md hover:shadow-lg',
  premium:
    'border border-[rgba(47,76,115,0.14)] shadow-[0_16px_40px_rgba(47,76,115,0.1)] ring-1 ring-white/50 hover:border-[#4A6B94]/35 hover:shadow-[0_20px_50px_rgba(47,76,115,0.12)]',
};

const GRIDS = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

const GAPS = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-10',
};

export const Card3D = React.forwardRef(function Card3D(
  {
    title,
    description,
    image,
    icon,
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
  const patternId = useMemo(
    () => `pattern-${theme}-${String(title).replace(/\s+/g, '-').toLowerCase()}`,
    [theme, title],
  );

  const handleMove = useCallback(
    (e) => {
      if (disabled || !tiltEnabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({
        x: (x / rect.width - 0.5) * 25,
        y: (y / rect.height - 0.5) * -25,
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
        'group relative w-full min-w-0 overflow-hidden rounded-2xl transform-gpu transition-all duration-500 ease-out',
        SIZES[size],
        VARIANTS[variant],
        onClick && !disabled && 'cursor-pointer',
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
        z: disabled || !tiltEnabled ? 0 : hovered ? 30 : 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 35, mass: 0.8 }}
      style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
      role={onClick ? 'link' : 'article'}
      aria-label={onClick ? `${title} — ${exploreLabel}` : undefined}
      {...props}
    >
      <motion.div
        className={cn('absolute inset-0 rounded-2xl', image ? '' : `bg-gradient-to-br ${finalGradient}`)}
        animate={{ scale: hovered ? 1.02 : 1 }}
        transition={{ duration: 0.4 }}
        style={{ transform: 'translateZ(-10px)' }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500"
            loading="lazy"
          />
        ) : null}
      </motion.div>

      <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-20">
        <svg className="absolute -top-4 -right-4 h-32 w-32 text-[#2F4C73]/30" viewBox="0 0 100 100" aria-hidden>
          <defs>
            <pattern id={patternId} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill={`url(#${patternId})`} />
        </svg>

        <motion.div
          className="absolute -bottom-4 -left-4 h-24 w-24 opacity-30"
          animate={{ rotate: hovered ? 180 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full text-[#2F4C73]/40" aria-hidden>
            <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1" rx="8" />
            <rect x="35" y="35" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="0.5" rx="4" />
          </svg>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            'linear-gradient(160deg, rgba(255,255,255,0.72) 0%, rgba(232,236,242,0.4) 45%, rgba(47,76,115,0.12) 100%)',
          transform: 'translateZ(5px)',
        }}
        animate={{ opacity: hovered ? 0.8 : 1 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="relative z-20 flex h-full flex-col justify-between p-6 text-[#2F4C73]"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="flex items-start justify-between">
          {icon ? (
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="text-3xl opacity-90 drop-shadow-lg filter"
                animate={{
                  rotateZ: hovered ? 5 : 0,
                  y: hovered ? -2 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {icon}
              </motion.div>
            </motion.div>
          ) : (
            <span />
          )}

          <div className="h-2.5 w-2.5 rounded-full bg-white/35 backdrop-blur-sm" />
        </div>

        <motion.div className="space-y-3" animate={{ y: hovered ? -3 : 0 }} transition={{ duration: 0.3 }}>
          <motion.h3
            className="font-display text-lg font-semibold tracking-tight break-words drop-shadow-md sm:text-xl"
            animate={{ scale: hovered ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="line-clamp-3 text-sm leading-relaxed text-[#2F4C73]/85 drop-shadow-sm"
            animate={{ opacity: hovered ? 1 : 0.85 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>

          {onClick && !disabled ? (
            <button
              type="button"
              onClick={handleCtaClick}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 pt-1 text-sm font-medium text-[#6B8AB0] transition-colors hover:text-[#2F4C73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A6B94]/50 sm:min-h-0 sm:text-xs"
            >
              <span className="h-0.5 w-4 rounded-full bg-current" />
              {loading ? 'Loading...' : exploreLabel}
            </button>
          ) : null}
        </motion.div>
      </motion.div>

      {loading ? (
        <motion.div
          className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#2F4C73]/25 backdrop-blur-sm"
          style={{ transform: 'translateZ(30px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="h-6 w-6 rounded-full border-2 border-white/30 border-t-[#4A6B94]"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
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
        {cards.map((card) => (
          <motion.div
            key={card.id}
            variants={
              animated
                ? {
                    hidden: { opacity: 0, y: 28 },
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
