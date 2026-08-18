import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { motionEase } from '../../motion/motionPresets';

/**
 * Slide up from below when the block enters the viewport.
 * Uses IntersectionObserver so GSAP/ScrollTrigger parents don't swallow whileInView.
 */
export default function SlideUpOnView({
  children,
  className = '',
  delay = 0,
  distance = 56,
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [visible, setVisible] = useState(Boolean(reduced));

  useEffect(() => {
    if (reduced) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ duration: 0.75, ease: motionEase, delay }}
    >
      {children}
    </motion.div>
  );
}
