import { useMemo } from 'react';
import { ease, START, prefersReducedMotion } from '../../motion/config';
import { createReveal } from '../../motion/reveal';
import { useGsapContext } from '../../motion/useGsapContext';

/**
 * Soft masked line reveal — one fluid motion, no word stutter.
 */
export default function TextReveal({
  as: Tag = 'p',
  children,
  parts,
  className = '',
  delay = 0,
  duration = 0.9,
  start = START,
}) {
  const reduced = prefersReducedMotion();

  const segments = useMemo(() => {
    const source = parts ?? [{ text: typeof children === 'string' ? children : '' }];
    return source.map((part, partIndex) => ({
      text: String(part?.text ?? ''),
      className: part.className || '',
      key: `${partIndex}-${String(part?.text ?? '').slice(0, 12)}`,
    }));
  }, [parts, children]);

  const scope = useGsapContext(() => {
    createReveal({
      targets: scope.current.querySelector('[data-line]'),
      trigger: scope.current,
      from: { y: 24, autoAlpha: 0 },
      to: { y: 0, autoAlpha: 1 },
      duration,
      delay,
      start,
      ease: ease.reveal,
    });
  }, [delay, duration, start, segments.length]);

  if (reduced) {
    return (
      <Tag className={className}>
        {segments.map((segment) => (
          <span key={segment.key} className={segment.className}>
            {segment.text}{' '}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={scope} className={className}>
      <span className="block overflow-hidden pb-[0.12em]">
        <span data-line className="gc-will-reveal block will-change-transform">
          {segments.map((segment) => (
            <span key={segment.key} className={segment.className}>
              {segment.text}{' '}
            </span>
          ))}
        </span>
      </span>
    </Tag>
  );
}
