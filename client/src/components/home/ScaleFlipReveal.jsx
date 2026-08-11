import { gsap, ease, START, prefersReducedMotion } from '../../motion/config';
import { markPending, settleReveal } from '../../motion/reveal';
import { useGsapContext } from '../../motion/useGsapContext';

/**
 * Distinct entrance — scale + soft 3D yaw (not the clip-path ImageReveal wipe).
 */
export default function ScaleFlipReveal({ src, alt, className = '', delay = 0.08 }) {
  const reduced = prefersReducedMotion();

  const scope = useGsapContext(() => {
    const root = scope.current;
    const card = root.querySelector('[data-scale-flip]');
    if (!card) return;

    markPending(card, () => {
      gsap.set(card, { autoAlpha: 1, scale: 1, rotateY: 0, y: 0 });
    });

    gsap.set(card, {
      autoAlpha: 0,
      scale: 0.78,
      rotateY: 28,
      y: 36,
      transformPerspective: 900,
      transformOrigin: '50% 60%',
    });

    gsap.to(card, {
      autoAlpha: 1,
      scale: 1,
      rotateY: 0,
      y: 0,
      duration: 1.15,
      delay,
      ease: ease.reveal,
      overwrite: true,
      scrollTrigger: {
        trigger: root,
        start: START,
        once: true,
      },
      onComplete: () => settleReveal(card),
    });

    gsap.to(card, {
      y: -8,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: delay + 1.2,
    });
  }, [delay]);

  return (
    <div ref={scope} className={className} style={{ perspective: '900px' }}>
      <div
        data-scale-flip
        className={`${reduced ? '' : 'gc-will-reveal'} group overflow-hidden rounded-2xl border border-[rgba(47,76,115,0.12)] bg-[#FFFFFF] shadow-[0_14px_36px_rgba(47,76,115,0.1)] will-change-transform sm:rounded-[1.25rem]`}
      >
        <img
          src={src}
          alt={alt}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
