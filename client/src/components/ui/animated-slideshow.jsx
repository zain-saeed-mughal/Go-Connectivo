import * as React from 'react';
import { Link } from 'react-router-dom';
import { MotionConfig, motion } from 'motion/react';
import { cn } from '../../lib/utils';

/** Split into words first so characters never wrap mid-word (e.g. "SYSTEMS" → "S"). */
function splitText(text) {
  return String(text)
    .split(' ')
    .filter(Boolean)
    .map((word, index, list) => ({
      word,
      characters: word.split(''),
      isLast: index === list.length - 1,
    }));
}

const HoverSliderContext = React.createContext(undefined);

function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext);
  if (context === undefined) {
    throw new Error('useHoverSliderContext must be used within a HoverSliderProvider');
  }
  return context;
}

export const HoverSlider = React.forwardRef(({ children, className, ...props }, ref) => {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const changeSlide = React.useCallback((index) => setActiveSlide(index), []);

  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    </HoverSliderContext.Provider>
  );
});
HoverSlider.displayName = 'HoverSlider';

export const TextStaggerHover = React.forwardRef(
  ({ text, index, className, to, onActivate, ...props }, ref) => {
    const { activeSlide, changeSlide } = useHoverSliderContext();
    const words = splitText(text);
    const isActive = activeSlide === index;
    const activate = () => {
      changeSlide(index);
      onActivate?.(index);
    };
    let charOffset = 0;

    const Tag = to ? Link : 'button';
    const interactiveProps = to ? { to } : { type: 'button' };

    return (
      <Tag
        className={cn(
          'relative inline-block max-w-full min-w-0 origin-bottom overflow-hidden whitespace-normal text-left',
          className,
        )}
        {...interactiveProps}
        {...props}
        ref={ref}
        onMouseEnter={activate}
        onFocus={activate}
        onClick={activate}
      >
        {words.map((entry) => {
          const wordStart = charOffset;
          charOffset += entry.characters.length + (entry.isLast ? 0 : 1);

          return (
            <span
              key={`${entry.word}-${wordStart}`}
              className="inline-block max-w-full whitespace-normal sm:whitespace-nowrap"
            >
              {entry.characters.map((char, charIndex) => {
                const delayIndex = wordStart + charIndex;

                return (
                  <span
                    key={`${char}-${delayIndex}`}
                    className="relative inline-block overflow-hidden"
                  >
                    <MotionConfig
                      transition={{
                        delay: delayIndex * 0.025,
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <motion.span
                        className="inline-block text-[var(--text-secondary)]/50"
                        initial={{ y: '0%' }}
                        animate={isActive ? { y: '-110%' } : { y: '0%' }}
                      >
                        {char}
                      </motion.span>

                      <motion.span
                        className="absolute top-0 left-0 inline-block text-[var(--text-primary)]"
                        initial={{ y: '110%' }}
                        animate={isActive ? { y: '0%' } : { y: '110%' }}
                      >
                        {char}
                      </motion.span>
                    </MotionConfig>
                  </span>
                );
              })}
              {!entry.isLast && <span className="inline-block">&nbsp;</span>}
            </span>
          );
        })}
      </Tag>
    );
  },
);
TextStaggerHover.displayName = 'TextStaggerHover';

const clipPathVariants = {
  visible: {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  },
  hidden: {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)',
  },
};

export const HoverSliderImageWrap = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full',
        className,
      )}
      {...props}
    />
  );
});
HoverSliderImageWrap.displayName = 'HoverSliderImageWrap';

export const HoverSliderImage = React.forwardRef(
  ({ index, imageUrl, className, ...props }, ref) => {
    const { activeSlide } = useHoverSliderContext();

    return (
      <motion.img
        className={cn('inline-block align-middle', className)}
        transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.5 }}
        variants={clipPathVariants}
        animate={activeSlide === index ? 'visible' : 'hidden'}
        src={imageUrl || props.src}
        ref={ref}
        {...props}
      />
    );
  },
);
HoverSliderImage.displayName = 'HoverSliderImage';
