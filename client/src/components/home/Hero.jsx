import { ArrowDown, ArrowRight, Mail, Sparkles, Zap } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import NetworkBackground from './NetworkBackground';
import { heroContent } from '../../data/content';
import { gsap, ease, prefersReducedMotion } from '../../motion/config';
import { markPending, settleReveal } from '../../motion/reveal';
import { useGsapContext } from '../../motion/useGsapContext';
import { scrollToId } from '../motion/SmoothScroll';

const trustBits = [
  { label: '99.9% uptime' },
  { label: '24/7 voice support' },
  { label: 'Go-live in 24–48h' },
];

export default function Hero() {
  const reduced = prefersReducedMotion();

  const scope = useGsapContext(() => {
    const root = scope.current;
    const eyebrow = root.querySelector('[data-hero="eyebrow"]');
    const title = root.querySelector('[data-hero="title"]');
    const copy = root.querySelector('[data-hero="copy"]');
    const cta = root.querySelector('[data-hero="cta"]');
    const trust = root.querySelector('[data-hero="trust"]');
    const scrollCue = root.querySelector('[data-hero="scroll"]');
    const buttons = gsap.utils.toArray('[data-hero="cta"] > *');
    const glow = root.querySelector('[data-hero="glow"]');

    const all = [eyebrow, title, copy, ...buttons, trust, scrollCue].filter(Boolean);
    all.forEach((el) => {
      markPending(el, () => {
        el.classList.remove('gc-revealing', 'gc-will-reveal');
        gsap.set(el, { autoAlpha: 1, clearProps: 'transform,y,willChange' });
      });
    });

    gsap.set(all, { autoAlpha: 0, y: 28, force3D: true });
    all.forEach((el) => el.classList.remove('gc-will-reveal'));
    cta?.classList.remove('gc-stagger-pending');

    gsap
      .timeline({
        defaults: { ease: ease.reveal, force3D: true },
        delay: 0.1,
        onComplete: () => all.forEach(settleReveal),
      })
      .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.65 })
      .to(title, { autoAlpha: 1, y: 0, duration: 1 }, '-=0.35')
      .to(copy, { autoAlpha: 1, y: 0, duration: 0.75 }, '-=0.55')
      .to(buttons, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.09 }, '-=0.45')
      .to(trust, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.35')
      .to(scrollCue, { autoAlpha: 1, y: 0, duration: 0.55 }, '-=0.25');

    if (glow && !prefersReducedMotion()) {
      gsap.to(glow, {
        opacity: 0.55,
        scale: 1.08,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (scrollCue && !prefersReducedMotion()) {
      gsap.to(scrollCue.querySelector('[data-bounce]'), {
        y: 6,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  const hide = reduced ? '' : 'gc-will-reveal';

  return (
    <section
      ref={scope}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-28 pb-20 sm:px-6 sm:pb-24"
    >
      <NetworkBackground />

      {/* Accent glow behind headline */}
      <div
        data-hero="glow"
        className="pointer-events-none absolute top-[28%] left-[8%] h-64 w-64 rounded-full bg-[#f58220]/25 blur-[100px] opacity-40 sm:left-[12%]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <div className="mb-5 flex flex-wrap items-center gap-2.5">
            <p
              data-hero="eyebrow"
              className={`${hide} inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#ffb86b] uppercase backdrop-blur-md`}
            >
              <Sparkles size={14} className="text-[#f58220]" />
              {heroContent.eyebrow}
            </p>
          </div>

          <h1
            data-hero="title"
            className={`${hide} font-display text-4xl font-extrabold tracking-[-0.045em] text-white sm:text-5xl md:text-6xl lg:text-[4.35rem] lg:leading-[1.05]`}
          >
            <span className="block">{heroContent.titleStart}</span>
            <span className="relative mt-1 inline-block">
              <span className="gradient-text-brand hero-shine">{heroContent.titleHighlight}</span>
              <span
                className="pointer-events-none absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-[#f58220] via-[#ffb020] to-transparent opacity-80"
                aria-hidden="true"
              />
            </span>
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
            <MagneticButton to={heroContent.primaryCta.to} className="!px-7 !py-3.5 text-[15px]">
              {heroContent.primaryCta.label}
              <ArrowRight
                size={16}
                className="transition-transform duration-500 group-hover/btn:translate-x-1"
              />
            </MagneticButton>
            <MagneticButton to={heroContent.secondaryCta.to} variant="secondary" className="!px-6 !py-3.5">
              <Mail size={16} /> {heroContent.secondaryCta.label}
            </MagneticButton>
            <MagneticButton to="/services" variant="ghost" className="!px-5 !py-3">
              <Zap size={15} className="text-[#ffb86b]" />
              Explore services
            </MagneticButton>
          </div>

          <ul
            data-hero="trust"
            className={`${hide} mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/8 pt-6 text-sm text-[#8a8a9c]`}
          >
            {trustBits.map((bit, index) => (
              <li key={bit.label} className="inline-flex items-center gap-2">
                {index > 0 ? (
                  <span className="mr-1 hidden h-1 w-1 rounded-full bg-[#f58220]/50 sm:inline-block" />
                ) : null}
                <span className="text-[#c8c8d4]">{bit.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        data-hero="scroll"
        onClick={() => scrollToId('home-next', { offset: -24 })}
        className={`${hide} absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-[11px] tracking-[0.18em] text-[#8a8a9c] uppercase transition-colors hover:text-[#ffb86b] sm:bottom-8`}
      >
        <span>Scroll</span>
        <span data-bounce className="grid h-8 w-8 place-items-center rounded-full border border-white/12 bg-white/5">
          <ArrowDown size={14} />
        </span>
      </button>
    </section>
  );
}
