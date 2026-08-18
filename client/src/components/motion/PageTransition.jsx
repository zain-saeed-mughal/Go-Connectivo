import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ScrollTrigger } from '../../motion/config';
import { motionEase } from '../../motion/motionPresets';
import { scrollToTop } from './SmoothScroll';

/**
 * Route handoff — opacity only.
 * Never leave a translate/transform on the wrapper: that creates a containing
 * block and breaks position:fixed navbar + ScrollTrigger pin after scrolling.
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
      transition={{ duration: 0.28, ease: motionEase }}
      onAnimationComplete={(definition) => {
        const node = ref.current;
        if (node) {
          node.style.transform = 'none';
          node.style.translate = 'none';
        }
        if (definition?.opacity === 1) {
          requestAnimationFrame(() => {
            scrollToTop();
            ScrollTrigger.refresh();
            scrollToTop();
          });
        }
      }}
    >
      {children}
    </motion.div>
  );
}
