import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import MagneticButton from '../ui/MagneticButton';
import { heroContent } from '../../data/content';
import { scrollToId } from '../motion/SmoothScroll';
import { fadeUp, motionEase } from '../../motion/motionPresets';
import { canEnhanceMotion, gsap, ScrollTrigger } from '../../motion/config';

/** Public URL — preloaded only while Home Hero is mounted. */
const HERO_POSTER = '/hero-poster.webp';

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
 * Hero — brand + pillars + CTAs + FCC trust panel.
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const fccRef = useRef(null);
  const [enhance, setEnhance] = useState(() =>
    typeof window !== 'undefined' ? canEnhanceMotion() : false,
  );

  const fcc = heroContent.fcc;
  const bodyLines = useMemo(() => splitFccBody(fcc.body), [fcc.body]);

  useEffect(() => {
    setEnhance(canEnhanceMotion());
  }, []);

  useEffect(() => {
    const existing = document.querySelector('link[data-hero-poster-preload]');
    if (existing) return undefined;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = HERO_POSTER;
    link.type = 'image/webp';
    link.setAttribute('fetchpriority', 'high');
    link.dataset.heroPosterPreload = '1';
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, []);

  const showVideo = enhance && !reduced;
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    if (!showVideo) {
      setVideoSrc(null);
      return undefined;
    }
    let cancelled = false;
    import('../../assets/hero-video.mp4')
      .then((mod) => {
        if (!cancelled) setVideoSrc(mod.default);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [showVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo || !videoSrc) return undefined;

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
  }, [showVideo, videoSrc]);

  useLayoutEffect(() => {
    const heroEl = heroRef.current;
    const fccRoot = fccRef.current;
    if (!heroEl || !fccRoot) return undefined;

    const eyebrow = fccRoot.querySelector('[data-fcc="eyebrow"]');
    const heading = fccRoot.querySelector('[data-fcc="heading"]');
    const lines = gsap.utils.toArray('[data-fcc-line]', fccRoot);
    const cta = fccRoot.querySelector('[data-fcc="cta"]');

    // Eyebrow, heading, and CTA stay visible; only body lines scrub in.
    gsap.set([eyebrow, heading, cta].filter(Boolean), { autoAlpha: 1, y: 0 });
    gsap.set(lines, { autoAlpha: 0, y: 18 });

    if (!canEnhanceMotion()) {
      gsap.set(lines, { autoAlpha: 1, y: 0 });
      return undefined;
    }

    const textTl = gsap.timeline({ paused: true });
    lines.forEach((line, i) => {
      textTl.to(line, { autoAlpha: 1, y: 0, duration: 0.12, ease: 'none' }, 0.08 + i * 0.16);
    });
    textTl.to({}, { duration: 0.12 }, 0.88);

    let textProgress = 0;
    const applyText = (p) => {
      const next = Math.max(textProgress, Math.min(1, p));
      if (next === textProgress) return;
      textProgress = next;
      textTl.progress(textProgress);
    };

    const st = ScrollTrigger.create({
      trigger: heroEl,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * 0.45)}`,
      scrub: 0.35,
      invalidateOnRefresh: true,
      onUpdate: (self) => applyText(self.progress),
      onLeave: () => applyText(1),
    });

    return () => {
      st.kill();
      textTl.kill();
    };
  }, [bodyLines.length, enhance]);

  const itemTransition = { duration: 0.7, ease: motionEase };

  return (
    <div ref={heroRef} className="gc-hero relative w-full">
      <section className="relative flex min-h-[100svh] max-w-[100vw] items-center overflow-x-hidden px-5 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 md:pb-24">
        <div className="hero-media pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          {showVideo && videoSrc ? (
            <video
              ref={videoRef}
              className="hero-video absolute inset-0 h-full w-full object-cover object-[center_35%] sm:object-center"
              src={videoSrc}
              poster={HERO_POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
            />
          ) : (
            <img
              src={HERO_POSTER}
              alt=""
              className="hero-video absolute inset-0 h-full w-full object-cover object-[center_35%] sm:object-center"
              decoding="async"
              fetchPriority="high"
              width={1920}
              height={1080}
            />
          )}
          {/* Soft neutral scrim — readable text, no navy/purple color cast */}
          <div className="hero-overlay-directional absolute inset-0 z-[1]" />
          <div className="hero-overlay-vignette absolute inset-0 z-[1]" />
        </div>

        <motion.div
          className="gc-container relative z-10 flex w-full min-w-0 flex-col gap-7 lg:gap-9"
          variants={container}
          initial={false}
          animate="visible"
        >
          <div className="grid w-full min-w-0 items-center gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
            <div className="flex w-full min-w-0 flex-col justify-center lg:max-w-xl xl:max-w-2xl">
              <motion.p
                variants={fadeUp}
                transition={itemTransition}
                className="mb-3 text-xs font-semibold tracking-[0.22em] text-[#F4F6F9] uppercase sm:mb-4 sm:text-[0.8125rem]"
              >
                {heroContent.eyebrow}
              </motion.p>

              <motion.h1
                variants={fadeUp}
                transition={itemTransition}
                className="hero-title min-w-0 max-w-full font-display font-extrabold text-[#FFFFFF]"
              >
                <span className="block text-[#FFFFFF]">
                  {heroContent.titleStart}
                </span>
                <span className="hero-title-highlight relative mt-1 block min-w-0 max-w-full text-[#FFFFFF] sm:mt-1.5">
                  {heroContent.titleHighlight}
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={itemTransition}
                className="hero-copy mt-4 max-w-xl sm:mt-5"
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
              <div
                ref={fccRef}
                className="hero-fcc-panel relative z-[2] flex flex-col rounded-2xl border border-[var(--accent-soft)]/45 p-5 sm:rounded-[1.25rem] sm:p-6 md:p-7"
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
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-500 group-hover/btn:translate-x-1"
                    />
                  </MagneticButton>
                </div>
              </div>
            </motion.aside>
          </div>

          <motion.ul
            variants={fadeUp}
            transition={itemTransition}
            className="flex flex-wrap gap-2 border-t border-transparent pt-5 sm:gap-2.5 sm:pt-6"
            aria-label="Core solutions"
          >
            {(heroContent.pillars || []).map((bit) => (
              <li key={bit.to}>
                <Link
                  to={bit.to}
                  className="inline-flex min-h-10 items-center rounded-full border border-white/30 bg-white/12 px-3.5 py-1.5 text-xs font-semibold text-[#FFFFFF] backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:min-h-0 sm:px-4 sm:py-2 sm:text-[0.8125rem]"
                >
                  {bit.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.button
          type="button"
          initial={false}
          animate="visible"
          variants={fadeUp}
          transition={itemTransition}
          onClick={() => scrollToId('home-next', { offset: -24 })}
          className="hero-interact absolute bottom-3 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-[10px] tracking-[0.18em] text-[#FFFFFF]/80 uppercase transition-colors hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:bottom-6 sm:flex sm:text-[11px] md:bottom-8"
        >
          <span className="hidden sm:inline">Scroll</span>
          <span className="grid h-8 w-8 place-items-center rounded-full border border-transparent bg-white/15 shadow-sm backdrop-blur-sm">
            <ArrowDown size={14} className="animate-bounce" aria-hidden />
          </span>
        </motion.button>
      </section>
    </div>
  );
}
