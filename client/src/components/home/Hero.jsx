import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, Mail, Zap } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import heroVideo from '../../assets/hero-video.mp4';
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
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    if (reduced) {
      video.pause();
      return undefined;
    }

    const play = () => {
      video.play().catch(() => {});
    };
    play();
    video.addEventListener('loadeddata', play);
    return () => video.removeEventListener('loadeddata', play);
  }, [reduced]);

  const scope = useGsapContext(() => {
    const root = scope.current;
    const title = root.querySelector('[data-hero="title"]');
    const copy = root.querySelector('[data-hero="copy"]');
    const cta = root.querySelector('[data-hero="cta"]');
    const trust = root.querySelector('[data-hero="trust"]');
    const scrollCue = root.querySelector('[data-hero="scroll"]');
    const buttons = gsap.utils.toArray('[data-hero="cta"] > *');
    const glow = root.querySelector('[data-hero="glow"]');

    const all = [title, copy, ...buttons, trust, scrollCue].filter(Boolean);
    all.forEach((el) => {
      markPending(el, () => {
        el.classList.remove('gc-revealing', 'gc-will-reveal');
        gsap.set(el, { autoAlpha: 1, y: 0 });
      });
    });

    gsap.set(all, { autoAlpha: 0, y: 28 });
    all.forEach((el) => el.classList.remove('gc-will-reveal'));
    cta?.classList.remove('gc-stagger-pending');

    gsap
      .timeline({
        defaults: { ease: ease.reveal },
        delay: 0.1,
        onComplete: () => all.forEach(settleReveal),
      })
      .to(title, { autoAlpha: 1, y: 0, duration: 1 })
      .to(copy, { autoAlpha: 1, y: 0, duration: 0.75 }, '-=0.55')
      .to(buttons, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.09 }, '-=0.45')
      .to(trust, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.35')
      .to(scrollCue, { autoAlpha: 1, y: 0, duration: 0.55 }, '-=0.25');

    if (glow && !prefersReducedMotion()) {
      gsap.to(glow, {
        opacity: 0.45,
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
      className="relative flex min-h-[100svh] items-start overflow-x-clip overflow-y-hidden px-5 pt-24 pb-16 sm:items-center sm:px-6 sm:pt-28 sm:pb-24"
    >
      {/* HD cinematic skyline video */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video absolute inset-0 h-full w-full object-cover object-[center_35%] sm:object-center"
          src={heroVideo}
          autoPlay={!reduced}
          muted
          loop
          playsInline
          preload="auto"
        />
        {/* Directional wash — existing #2F4C73 only; city visible on the right */}
        <div className="hero-overlay-directional absolute inset-0" />
        <div className="hero-overlay-vignette absolute inset-0" />
        <div className="hero-overlay-bottom absolute inset-x-0 bottom-0 h-[22%] sm:h-[28%] md:h-[32%]" />
      </div>

      <div
        data-hero="glow"
        className="pointer-events-none absolute top-[28%] left-[8%] z-[1] hidden h-64 w-64 rounded-full bg-[#4A6B94]/18 blur-[100px] opacity-35 sm:block sm:left-[12%]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-6xl">
        <div className="w-full min-w-0 max-w-3xl">
          <h1
            data-hero="title"
            className={`${hide} hero-title font-display font-extrabold text-[#FFFFFF]`}
          >
            <span className="block drop-shadow-[0_2px_18px_rgba(0,0,0,0.28)]">
              {heroContent.titleStart}
            </span>
            <span className="hero-title-highlight relative mt-1.5">
              <span className="gradient-text-brand hero-shine">{heroContent.titleHighlight}</span>
            </span>
          </h1>

          <p
            data-hero="copy"
            className={`${hide} hero-copy mt-5 pr-1 text-[#F4F6F9]/90 sm:mt-8 md:mt-9`}
          >
            {heroContent.description}
          </p>

          <div
            data-hero="cta"
            className={`${reduced ? '' : 'gc-stagger-pending'} hero-cta-row mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-3.5 md:mt-11 md:gap-4`}
          >
            <MagneticButton
              to={heroContent.primaryCta.to}
              className="hero-cta-primary !px-6 !py-3 text-sm font-semibold sm:!px-8 sm:!py-3.5 sm:text-[15px]"
            >
              {heroContent.primaryCta.label}
              <ArrowRight
                size={16}
                className="transition-transform duration-500 group-hover/btn:translate-x-1"
              />
            </MagneticButton>
            <MagneticButton
              to={heroContent.secondaryCta.to}
              variant="secondary"
              className="hero-cta-secondary !border !border-white/40 !bg-[#FFFFFF]/18 !px-5 !py-2.5 text-sm !text-[#FFFFFF] !backdrop-blur-md hover:!bg-[#FFFFFF]/30 sm:!px-6 sm:!py-3"
            >
              <Mail size={15} /> {heroContent.secondaryCta.label}
            </MagneticButton>
            <MagneticButton
              to="/services"
              variant="ghost"
              className="hero-cta-ghost !border !border-white/25 !px-5 !py-2.5 text-sm !text-[#FFFFFF]/90 hover:!border-[#6B8AB0] hover:!text-[#FFFFFF]"
            >
              <Zap size={14} className="text-[#6B8AB0]" />
              Explore services
            </MagneticButton>
          </div>

          <ul
            data-hero="trust"
            className={`${hide} mt-8 flex flex-col gap-2 border-t border-white/15 pt-5 text-xs text-[#F4F6F9]/75 sm:mt-11 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2 sm:pt-6 sm:text-sm md:mt-12`}
          >
            {trustBits.map((bit, index) => (
              <li key={bit.label} className="inline-flex items-center gap-2">
                {index > 0 ? (
                  <span className="mr-1 hidden h-1 w-1 rounded-full bg-[#6B8AB0]/70 sm:inline-block" />
                ) : null}
                <span className="text-[#FFFFFF]/90">{bit.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        data-hero="scroll"
        onClick={() => scrollToId('home-next', { offset: -24 })}
        className={`${hide} absolute bottom-3 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-[10px] tracking-[0.18em] text-[#2F4C73]/80 uppercase transition-colors hover:text-[#2F4C73] sm:bottom-6 sm:flex sm:text-[11px] md:bottom-8`}
      >
        <span className="hidden sm:inline">Scroll</span>
        <span data-bounce className="grid h-8 w-8 place-items-center rounded-full border border-[rgba(47,76,115,0.2)] bg-[#FFFFFF]/85 shadow-sm">
          <ArrowDown size={14} />
        </span>
      </button>
    </section>
  );
}
