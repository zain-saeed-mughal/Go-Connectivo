import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import MagneticButton from '../ui/MagneticButton';
import heroVideo from '../../assets/hero-video.mp4';
import heroPoster from '../../assets/hero-poster.webp';
import { heroContent } from '../../data/content';
import { scrollToId } from '../motion/SmoothScroll';
import { fadeUp, motionEase } from '../../motion/motionPresets';
import { canEnhanceMotion, gsap, ScrollTrigger } from '../../motion/config';

const HeroNetworkCanvas = lazy(() => import('./HeroNetworkCanvas'));

const trustBits = [
  { label: '99.9% uptime' },
  { label: '24/7 voice support' },
  { label: 'Go-live in 24–48h' },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

function splitFccBody(body) {
  const parts = body
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length ? parts : [body];
}

/**
 * Hero — original two-column alignment.
 * Desktop: sticky track (not GSAP pin) so FCC lines reveal on scroll.
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const fccRef = useRef(null);
  const progressRef = useRef(0);
  const [enhance, setEnhance] = useState(() =>
    typeof window !== 'undefined' ? canEnhanceMotion() : false,
  );

  const fcc = heroContent.fcc;
  const bodyLines = useMemo(() => splitFccBody(fcc.body), [fcc.body]);

  useEffect(() => {
    setEnhance(canEnhanceMotion());
    if (canEnhanceMotion()) {
      import('./HeroNetworkCanvas');
    }
  }, []);

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
      },
      { threshold: 0, rootMargin: '240px 0px 240px 0px' },
    );
    observer.observe(video);

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else play();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      video.removeEventListener('loadeddata', play);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, [reduced]);

  useEffect(() => {
    const heroEl = heroRef.current;
    const fccRoot = fccRef.current;
    if (!heroEl || !fccRoot) return undefined;

    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars?.pin) st.kill(true);
    });

    if (!canEnhanceMotion()) return undefined;

    const eyebrow = fccRoot.querySelector('[data-fcc="eyebrow"]');
    const heading = fccRoot.querySelector('[data-fcc="heading"]');
    const lines = gsap.utils.toArray('[data-fcc-line]', fccRoot);
    const cta = fccRoot.querySelector('[data-fcc="cta"]');

    gsap.set([eyebrow, ...lines, cta], { autoAlpha: 0, y: 18 });
    gsap.set(heading, { autoAlpha: 1, y: 0 });

    const textTl = gsap.timeline({ paused: true });
    textTl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.08, ease: 'none' }, 0.03);
    lines.forEach((line, i) => {
      textTl.to(line, { autoAlpha: 1, y: 0, duration: 0.12, ease: 'none' }, 0.12 + i * 0.13);
    });
    textTl.to(
      cta,
      { autoAlpha: 1, y: 0, duration: 0.1, ease: 'none' },
      0.12 + lines.length * 0.13 + 0.04,
    );
    textTl.to({}, { duration: 0.12 }, 0.88);

    let textProgress = 0;
    const applyText = (p) => {
      const next = Math.max(textProgress, Math.min(1, p));
      if (next === textProgress && textTl.progress() === next) return;
      textProgress = next;
      textTl.progress(textProgress);
    };

    // Scrub against real page scroll — no pin, no extra track height.
    const st = ScrollTrigger.create({
      trigger: heroEl,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * 0.4)}`,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        applyText(self.progress);
      },
      onLeave: () => {
        progressRef.current = 1;
        applyText(1);
      },
    });

    return () => {
      st.kill();
      textTl.kill();
      progressRef.current = 0;
    };
  }, [bodyLines.length, enhance]);

  const itemTransition = { duration: 0.7, ease: motionEase };

  return (
    <div ref={heroRef} className="gc-hero relative w-full">
          <section className="relative flex min-h-[100svh] max-w-[100vw] items-start overflow-x-hidden px-5 pt-24 pb-16 sm:items-center sm:px-6 sm:pt-28 sm:pb-24">
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
              <video
                ref={videoRef}
                className="hero-video absolute inset-0 h-full w-full object-cover object-[center_35%] sm:object-center"
                src={heroVideo}
                poster={heroPoster}
                autoPlay={!reduced}
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
              />
              <div className="hero-overlay-directional absolute inset-0 z-[1]" />
              <div className="hero-overlay-vignette absolute inset-0 z-[1]" />
            </div>

            <motion.div
              className="gc-container relative z-10 flex w-full min-w-0 flex-col gap-8 lg:gap-10"
              variants={container}
              initial={reduced ? false : 'hidden'}
              animate="visible"
            >
              <div className="grid w-full min-w-0 items-start gap-6 lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-14">
                <div className="flex w-full min-w-0 flex-col justify-center">
                  <motion.div
                    variants={fadeUp}
                    transition={itemTransition}
                    className="mb-4 inline-flex items-center gap-2 self-start rounded-full border border-[#6B8AB0]/40 bg-[#1C314F]/60 px-3.5 py-1.5 backdrop-blur-md"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-xs font-semibold tracking-wider text-[#D7E2E8] uppercase">
                      FCC RMD Certified & Compliant Network
                    </span>
                  </motion.div>

                  <motion.h1
                    variants={fadeUp}
                    transition={itemTransition}
                    className="hero-title min-w-0 max-w-full font-display font-extrabold text-[#FFFFFF]"
                  >
                    <span className="block drop-shadow-[0_2px_18px_rgba(0,0,0,0.28)]">
                      {heroContent.titleStart}
                    </span>
                    <span className="hero-title-highlight relative mt-1.5 block min-w-0 max-w-full">
                      <span className="gradient-text-brand">{heroContent.titleHighlight}</span>
                    </span>
                  </motion.h1>

                  <motion.p
                    variants={fadeUp}
                    transition={itemTransition}
                    className="hero-copy mt-4 max-w-xl pr-1 text-[#F4F6F9]/90 sm:mt-6"
                  >
                    {heroContent.description}
                  </motion.p>
                </div>

                <motion.aside
                  variants={fadeUp}
                  transition={itemTransition}
                  className="hero-interact hero-fcc relative w-full min-w-0 lg:max-w-md lg:justify-self-end xl:max-w-lg"
                  aria-label="FCC compliance"
                >
                  {enhance ? (
                    <div className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden lg:block">
                      <div className="absolute inset-[-8%] opacity-95 xl:inset-[-12%]">
                        <Suspense fallback={null}>
                          <HeroNetworkCanvas progressRef={progressRef} />
                        </Suspense>
                      </div>
                    </div>
                  ) : null}

                  <div
                    ref={fccRef}
                    className="hero-fcc-panel relative z-[2] flex flex-col rounded-2xl border border-[#6B8AB0]/45 p-5 sm:rounded-[1.25rem] sm:p-6 md:p-7"
                    data-fcc-enhanced={enhance ? '' : undefined}
                  >
                    <p
                      data-fcc="eyebrow"
                      className="hero-fcc-eyebrow text-[10px] font-semibold tracking-[0.2em] uppercase sm:text-[11px]"
                    >
                      {fcc.eyebrow}
                    </p>
                    <p
                      data-fcc="heading"
                      className="hero-fcc-heading mt-3 font-display text-[1.25rem] leading-snug font-extrabold tracking-[-0.03em] sm:text-[1.45rem] md:text-[1.55rem]"
                    >
                      <span className="hero-fcc-heading-accent">{fcc.highlight}</span>{' '}
                      <span className="hero-fcc-heading-rest">Certified. Protected. Trusted.</span>
                    </p>
                    <div className="mt-3 space-y-2.5 text-sm leading-relaxed sm:text-[15px]">
                      {bodyLines.map((line) => (
                        <p key={line.slice(0, 28)} data-fcc-line className="hero-fcc-line">
                          {line}
                        </p>
                      ))}
                    </div>
                    <div data-fcc="cta" className="mt-5 sm:mt-6">
                      <MagneticButton
                        to={fcc.cta.to}
                        magnetic={false}
                        motionFx={false}
                        className="hero-fcc-cta !rounded-md !px-6 !py-3 text-sm font-bold tracking-[0.04em] uppercase sm:!px-7"
                      >
                        {fcc.cta.label}
                        <ArrowRight size={15} className="transition-transform duration-500 group-hover/btn:translate-x-1" />
                      </MagneticButton>
                    </div>
                  </div>
                </motion.aside>
              </div>

              <motion.ul
                variants={fadeUp}
                transition={itemTransition}
                className="flex flex-wrap gap-2 border-t border-white/15 pt-5 sm:gap-2.5 sm:pt-6"
              >
                {trustBits.map((bit) => (
                  <li
                    key={bit.label}
                    className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-[#FFFFFF]/95 backdrop-blur-sm sm:px-3.5 sm:py-2 sm:text-xs"
                  >
                    {bit.label}
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.button
              type="button"
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              animate="visible"
              transition={{ ...itemTransition, delay: 0.35 }}
              onClick={() => scrollToId('home-next', { offset: -24 })}
              className="hero-interact absolute bottom-3 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-[10px] tracking-[0.18em] text-[#FFFFFF]/80 uppercase transition-colors hover:text-[#FFFFFF] sm:bottom-6 sm:flex sm:text-[11px] md:bottom-8"
            >
              <span className="hidden sm:inline">Scroll</span>
              <span className="grid h-8 w-8 place-items-center rounded-full border border-white/25 bg-white/15 shadow-sm backdrop-blur-sm">
                <ArrowDown size={14} className="animate-bounce" />
              </span>
            </motion.button>
          </section>
    </div>
  );
}
