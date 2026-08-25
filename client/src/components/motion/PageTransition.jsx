import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { motionEase } from '../../motion/motionPresets';

/**
 * Soft opacity handoff between non-home routes.
 * No translate — transforms break fixed navbar + ScrollTrigger pin.
 * Scroll restore is handled in Layout (useLayoutEffect), not here.
 */
export default function PageTransition({ children }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  if (reduced) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: motionEase }}
      onAnimationComplete={() => {
        const node = ref.current;
        if (node) {
          node.style.transform = 'none';
          node.style.translate = 'none';
        }
      }}
    >
      {children}
    </motion.div>
  );
}
