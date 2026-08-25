import { motion, useReducedMotion } from 'motion/react';
import MotionReveal from '../motion/MotionReveal';
import MotionParallax from '../motion/MotionParallax';
import { motionEase } from '../../motion/motionPresets';
import { canEnhanceMotion } from '../../motion/config';
import { cn } from '../../lib/utils';

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  children,
  image,
  imageAlt = '',
  imageWidth = 840,
  imageHeight = 560,
  aside,
  detail,
  animated = true,
  className = '',
}) {
  const hasImage = Boolean(image);
  const hasAside = Boolean(aside);
  const twoCol = hasImage || hasAside;
  const reduced = useReducedMotion();
  const enhance = typeof window === 'undefined' ? false : canEnhanceMotion();
  const motionOn = animated && !reduced;
  // Keep hero media visible from first paint — opacity animations tank LCP.
  const animateChrome = motionOn && enhance;

  const heading = (
    <>
      {eyebrow ? (
        <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-[#4A6B94] uppercase sm:mb-4 sm:text-xs sm:tracking-[0.22em]">
          {eyebrow}
        </p>
      ) : null}

      <h1 className="font-display max-w-xl text-[clamp(1.7rem,5.5vw,3.75rem)] leading-[1.1] font-extrabold tracking-[-0.03em] break-words text-[#2F4C73] text-balance">
        {title}
        {highlight ? (
          <>
            {' '}
            <span className="gradient-text-brand">{highlight}</span>
          </>
        ) : null}
      </h1>

      {description ? (
        <p className="gc-prose-muted mt-4 max-w-lg sm:mt-5">{description}</p>
      ) : null}

      {detail ? <div className="mt-8 w-full max-w-xl">{detail}</div> : null}

      {children ? (
        <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">{children}</div>
      ) : null}
    </>
  );

  const heroImage = hasImage ? (
    <div className="relative z-10 mx-auto w-full min-w-0 max-w-md lg:ml-auto lg:max-w-[420px]">
      <div
        className="gc-glow pointer-events-none absolute -inset-3 bg-[#4A6B94]/10 sm:-inset-5"
        aria-hidden="true"
      />
      <div className="gc-card relative w-full overflow-hidden">
        <img
          src={image}
          alt={imageAlt || title || 'Service illustration'}
          className="aspect-[16/10] h-auto w-full object-cover object-center sm:aspect-[3/2]"
          width={imageWidth}
          height={imageHeight}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>
    </div>
  ) : null;

  return (
    <section
      className={cn(
        'relative z-10 overflow-x-clip pt-28 pb-10 sm:pt-32 sm:pb-14 md:pt-36 md:pb-16',
        className,
      )}
    >
      <div className="grid-fade pointer-events-none absolute inset-0 opacity-40 sm:opacity-50" aria-hidden="true" />
      {animateChrome ? (
        <>
          <MotionParallax
            speed={24}
            className="gc-glow pointer-events-none absolute top-16 left-1/4 h-44 w-44 bg-[#4A6B94]/16 sm:h-64 sm:w-64 sm:bg-[#4A6B94]/18"
          >
            <span className="block h-full w-full" aria-hidden="true" />
          </MotionParallax>
          <MotionParallax
            speed={-18}
            className="gc-glow pointer-events-none absolute top-28 right-4 h-40 w-40 bg-[#6B8AB0]/10 sm:right-10 sm:h-56 sm:w-56 sm:bg-[#6B8AB0]/12"
          >
            <span className="block h-full w-full" aria-hidden="true" />
          </MotionParallax>
        </>
      ) : null}

      <div
        className={`gc-container relative z-10 grid w-full min-w-0 gap-8 sm:gap-10 ${
          twoCol ? 'lg:grid-cols-2 lg:gap-12' : ''
        } ${hasAside ? 'lg:items-start' : 'items-center'}`}
      >
        {motionOn ? (
          <MotionReveal preset="up" className="relative z-10 min-w-0">
            {heading}
          </MotionReveal>
        ) : (
          <div className="relative z-10 min-w-0">{heading}</div>
        )}

        {hasAside ? (
          motionOn ? (
            <motion.div
              className="relative z-10 w-full min-w-0 lg:pt-1"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: motionEase, delay: 0.1 }}
            >
              {aside}
            </motion.div>
          ) : (
            <div className="relative z-10 w-full min-w-0 lg:pt-1">{aside}</div>
          )
        ) : (
          heroImage
        )}
      </div>
    </section>
  );
}
