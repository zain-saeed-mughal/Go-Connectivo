import { motion } from 'motion/react';
import { fadeUp, scaleIn, viewportOnce, useMotionSafe } from '../../motion/motionPresets';

const presets = {
  up: fadeUp,
  tilt: fadeUp,
  scale: scaleIn,
};

/**
 * Motion.dev scroll-triggered reveal — whileInView + once (no tilt).
 */
export default function MotionReveal({
  children,
  className = '',
  as = 'div',
  preset = 'up',
  delay = 0,
  amount,
  style,
}) {
  const Tag = motion[as] || motion.div;
  const { reduced, transition } = useMotionSafe();
  const variants = presets[preset] || fadeUp;

  if (reduced) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={amount != null ? { ...viewportOnce, amount } : viewportOnce}
      transition={{ ...transition, delay }}
    >
      {children}
    </Tag>
  );
}

export function MotionStagger({ children, className = '', as = 'div', stagger = 0.08, delay = 0 }) {
  const Tag = motion[as] || motion.div;
  const { reduced, transition } = useMotionSafe();

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={child?.key ?? index} variants={fadeUp} transition={transition}>
              {child}
            </motion.div>
          ))
        : children}
    </Tag>
  );
}

export function MotionItem({ children, className = '', preset = 'up' }) {
  const { reduced, transition } = useMotionSafe();
  const variants = presets[preset] || fadeUp;
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={variants} transition={transition}>
      {children}
    </motion.div>
  );
}
