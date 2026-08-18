import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { techMarquee } from '../../data/content';
import { gsap, prefersReducedMotion } from '../../motion/config';

/**
 * Compliance trust ribbon — continuous loop + light snake wave.
 * Pauses when off-screen; uses direct DOM transforms (no gsap.set spam).
 */
export default function TechMarquee() {
  const rootRef = useRef(null);
  const items = [...techMarquee, ...techMarquee, ...techMarquee];

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    const track = root.querySelector('[data-track]');
    if (!track) return undefined;

    const nodes = gsap.utils.toArray('[data-marquee-item]', track);
    const ctx = gsap.context(() => {}, root);

    const loop = gsap.to(track, {
      xPercent: -33.333,
      duration: 48,
      ease: 'none',
      repeat: -1,
      force3D: true,
    });
    loop.play(0);

    const wave = { t: 0 };
    let inView = true;
    let frame = 0;
    const ticker = () => {
      if (!inView || document.hidden) return;
      frame += 1;
      if (frame % 2 !== 0) return;
      wave.t += 0.032;
      const amp = window.innerWidth < 640 ? 5 : 9;
      for (let i = 0; i < nodes.length; i += 1) {
        const phase = i * 0.42 + wave.t * 1.35;
        const y = Math.sin(phase) * amp;
        const r = Math.sin(phase) * 2.2;
        nodes[i].style.transform = `translate3d(0,${y.toFixed(2)}px,0) rotate(${r.toFixed(2)}deg)`;
      }
    };
    gsap.ticker.add(ticker);

    const sync = () => {
      const on = inView && !document.hidden;
      if (on) loop.play();
      else loop.pause();
    };

    const onVisibility = () => sync();
    document.addEventListener('visibilitychange', onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { rootMargin: '40px', threshold: 0 },
    );
    io.observe(root);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      gsap.ticker.remove(ticker);
      loop.kill();
      ctx.revert();
    };
  }, []);

  const list = prefersReducedMotion() ? techMarquee : items;

  return (
    <section
      id="home-next"
      ref={rootRef}
      className="gc-snake-marquee relative overflow-hidden border-y border-[rgba(47,76,115,0.14)] py-6 sm:py-7 md:py-8"
      aria-label="Regulatory compliance and trust"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#E8ECF2] via-[#F4F6F9] to-[#E8ECF2]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.4]" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 1440 88" preserveAspectRatio="none" fill="none">
          <path
            d="M0 52 C160 22 280 70 420 44 C560 18 660 66 800 40 C940 14 1060 68 1200 42 C1320 24 1400 58 1440 48"
            stroke="rgba(74,107,148,0.4)"
            strokeWidth="1.6"
          />
          <path
            d="M0 58 C200 32 340 74 480 48 C620 22 740 70 880 46 C1020 22 1140 72 1280 48 C1360 36 1410 60 1440 54"
            stroke="rgba(107,138,176,0.3)"
            strokeWidth="1.25"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#E8ECF2] via-[#E8ECF2]/88 to-transparent sm:w-24 md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#E8ECF2] via-[#F4F6F9]/88 to-transparent sm:w-24 md:w-32" />

      <div className="relative overflow-hidden py-2">
        <div
          data-track
          className="flex w-max items-center gap-6 px-4 will-change-transform sm:gap-9 sm:px-6 md:gap-11"
        >
          {list.map((item, index) => (
            <div
              key={`${item}-${index}`}
              data-marquee-item
              className="flex items-center gap-6 will-change-transform sm:gap-9 md:gap-11"
            >
              <Link
                to="/compliance"
                className="font-display text-[0.92rem] font-bold tracking-[-0.015em] whitespace-nowrap text-[#2F4C73] transition-colors duration-300 hover:text-[#4A6B94] sm:text-[1.02rem] md:text-[1.1rem]"
              >
                {item}
              </Link>
              <span
                className="relative grid h-2.5 w-2.5 shrink-0 place-items-center"
                aria-hidden="true"
              >
                <span className="absolute inset-0 rounded-full bg-[#4A6B94]/22" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#4A6B94]" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
