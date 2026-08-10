import { motion } from 'framer-motion';
import { ScrollTrigger } from '../../motion/config';

/**
 * Soft route handoff. Content itself stays hidden via .gc-will-reveal until
 * its own reveal plays — no double-flash.
 */
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={(definition) => {
        if (definition?.opacity === 1) {
          requestAnimationFrame(() => ScrollTrigger.refresh());
        }
      }}
    >
      {children}
    </motion.div>
  );
}
