import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { canEnhanceMotion, isCompactViewport } from '../../motion/config';

/**
 * Scroll-linked parallax via Motion useScroll + useTransform.
 * @see https://motion.dev/docs/react-scroll-animations#parallax-scrolling
 */
export default function MotionParallax({
  children,
  className = '',
  speed = 40,
  as = 'div',
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const enhance = canEnhanceMotion() && !isCompactViewport();
  const Tag = motion[as] || motion.div;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  if (reduced || !enhance) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <Tag ref={ref} className={`will-change-transform ${className}`} style={{ y }}>
      {children}
    </Tag>
  );
}

/**
 * Image entrance, fade + rise once. Clip-path was leaving photos stuck at
 * opacity 0 when whileInView never committed.
 */
export function MotionImageMask({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [visible, setVisible] = useState(Boolean(reduced));

  useEffect(() => {
    if (reduced) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    const failsafe = window.setTimeout(() => setVisible(true), 1200);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div ref={ref} className={`w-full overflow-hidden ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`w-full overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 56 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/** Page reading progress, direct scrub (no spring lag on the main thread). */
export function MotionScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#2F4C73] via-[#4A6B94] to-[#6B8AB0]"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
