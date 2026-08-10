import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import NetworkBackground from './NetworkBackground';
import { heroContent } from '../../data/content';
import { gsap, ease, prefersReducedMotion } from '../../motion/config';
import { markPending, settleReveal } from '../../motion/reveal';
import { useGsapContext } from '../../motion/useGsapContext';

export default function Hero() {
  const reduced = prefersReducedMotion();

  const scope = useGsapContext(() => {
    const root = scope.current;
    const eyebrow = root.querySelector('[data-hero="eyebrow"]');
    const title = root.querySelector('[data-hero="title"]');
    const copy = root.querySelector('[data-hero="copy"]');
    const cta = root.querySelector('[data-hero="cta"]');
    const buttons = gsap.utils.toArray('[data-hero="cta"] > *');

    const all = [eyebrow, title, copy, ...buttons].filter(Boolean);
    all.forEach((el) => {
      markPending(el, () => {
        el.classList.remove('gc-revealing', 'gc-will-reveal');
        gsap.set(el, { autoAlpha: 1, clearProps: 'transform,y,willChange' });
      });
    });

    gsap.set(all, { autoAlpha: 0, y: 28, force3D: true });
    all.forEach((el) => el.classList.remove('gc-will-reveal'));
    cta?.classList.remove('gc-stagger-pending');

    // Overlapped beats — one continuous glide, not four separate pops.
    gsap
      .timeline({
        defaults: { ease: ease.reveal, force3D: true },
        delay: 0.12,
        onComplete: () => all.forEach(settleReveal),
      })
      .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.7 })
      .to(title, { autoAlpha: 1, y: 0, duration: 0.95 }, '-=0.45')
      .to(copy, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.55')
      .to(buttons, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 }, '-=0.5');
  }, []);

  const hide = reduced ? '' : 'gc-will-reveal';

  return (
    <section
      ref={scope}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pb-20"
    >
      <NetworkBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <p
            data-hero="eyebrow"
            className={`${hide} mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#ffb86b] uppercase backdrop-blur-md`}
          >
            <Sparkles size={14} />
            {heroContent.eyebrow}
          </p>

          <h1
            data-hero="title"
            className={`${hide} font-display text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl`}
          >
            {heroContent.titleStart}{' '}
            <span className="gradient-text-brand">{heroContent.titleHighlight}</span>
          </h1>

          <p
            data-hero="copy"
            className={`${hide} mt-6 max-w-xl text-base leading-relaxed text-[#b0b0c4] md:text-lg`}
          >
            {heroContent.description}
          </p>

          <div
            data-hero="cta"
            className={`${reduced ? '' : 'gc-stagger-pending'} mt-9 flex flex-wrap items-center gap-3`}
          >
            <MagneticButton to={heroContent.primaryCta.to}>
              {heroContent.primaryCta.label}
              <ArrowRight
                size={16}
                className="transition-transform duration-500 group-hover/btn:translate-x-1"
              />
            </MagneticButton>
            <MagneticButton to={heroContent.secondaryCta.to} variant="secondary">
              <Mail size={16} /> {heroContent.secondaryCta.label}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
