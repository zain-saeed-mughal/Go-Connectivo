import { motion, useReducedMotion } from 'motion/react';
import { viewportOnce, fadeUp, useMotionSafe } from '../../motion/motionPresets';

/**
 * Section heading — clean fade-up, no tilt / word-split (keeps text alignment).
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  animated = true,
}) {
  const reduced = useReducedMotion();
  const { transition } = useMotionSafe();
  const alignment =
    align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left';
  const classes = `mb-7 flex w-full max-w-3xl min-w-0 flex-col gap-2 sm:mb-8 sm:gap-2.5 md:mb-10 ${alignment} ${className}`.trim();

  const body = (
    <>
      {eyebrow ? (
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#4A6B94] uppercase sm:text-xs sm:tracking-[0.22em]">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="font-display w-full text-[clamp(1.35rem,4.2vw,3rem)] leading-[1.15] font-bold tracking-[-0.03em] break-words text-[#2F4C73] text-balance">
        {title}
      </h2>

      {description ? <p className="gc-prose-muted w-full max-w-2xl">{description}</p> : null}
    </>
  );

  if (!animated || reduced) {
    return <div className={classes}>{body}</div>;
  }

  return (
    <motion.div
      className={classes}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.02 } },
      }}
    >
      {eyebrow ? (
        <motion.p
          variants={fadeUp}
          transition={transition}
          className="text-[11px] font-semibold tracking-[0.2em] text-[#4A6B94] uppercase sm:text-xs sm:tracking-[0.22em]"
        >
          {eyebrow}
        </motion.p>
      ) : null}

      <motion.h2
        variants={fadeUp}
        transition={transition}
        className="font-display w-full text-[clamp(1.35rem,4.2vw,3rem)] leading-[1.15] font-bold tracking-[-0.03em] break-words text-[#2F4C73] text-balance"
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          variants={fadeUp}
          transition={{ ...transition, delay: 0.04 }}
          className="gc-prose-muted w-full max-w-2xl"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
