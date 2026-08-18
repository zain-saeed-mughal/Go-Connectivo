import { useMemo } from 'react';
import { ease, START } from '../../motion/config';
import { createReveal } from '../../motion/reveal';
import { useGsapContext } from '../../motion/useGsapContext';

/**
 * Soft masked line reveal — rise only, no tilt.
 */
export default function TextReveal({
  as: Tag = 'p',
  children,
  parts,
  className = '',
  delay = 0,
  duration = 0.85,
  start = START,
  splitWords = false,
}) {
  const segments = useMemo(() => {
    const source = parts ?? [{ text: typeof children === 'string' ? children : '' }];
    return source.map((part, partIndex) => ({
      text: String(part?.text ?? ''),
      className: part.className || '',
      key: `${partIndex}-${String(part?.text ?? '').slice(0, 12)}`,
    }));
  }, [parts, children]);

  const scope = useGsapContext(() => {
    const root = scope.current;
    if (!root) return;

    if (splitWords) {
      const words = root.querySelectorAll('[data-word]');
      createReveal({
        targets: words,
        trigger: root,
        from: { yPercent: 100 },
        to: { yPercent: 0 },
        duration,
        delay,
        start,
        stagger: 0.04,
        ease: ease.reveal,
        safe: false,
      });
      return;
    }

    createReveal({
      targets: root.querySelector('[data-line]'),
      trigger: root,
      from: { y: 20, autoAlpha: 0 },
      to: { y: 0, autoAlpha: 1 },
      duration,
      delay,
      start,
      ease: ease.reveal,
    });
  }, [delay, duration, start, segments.length, splitWords]);

  const wordNodes =
    splitWords && typeof children === 'string'
      ? children.split(/(\s+)/).map((part, index) =>
          /^\s+$/.test(part) ? (
            <span key={`s-${index}`}> </span>
          ) : (
            <span key={`w-${index}`} className="inline-block overflow-hidden align-bottom pb-[0.06em]">
              <span data-word className="inline-block will-change-transform">
                {part}
              </span>
            </span>
          ),
        )
      : null;

  return (
    <Tag ref={scope} className={className}>
      {wordNodes ? (
        wordNodes
      ) : (
        <span className="block overflow-hidden pb-[0.12em]">
          <span data-line className="block will-change-transform">
            {segments.map((segment) => (
              <span key={segment.key} className={segment.className}>
                {segment.text}{' '}
              </span>
            ))}
          </span>
        </span>
      )}
    </Tag>
  );
}
