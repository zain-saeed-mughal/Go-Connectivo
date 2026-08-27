import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { canEnhanceMotion, gsap, ScrollTrigger } from '../../motion/config';

/**
 * Scroll-drawn network lines, begin at first section below Hero (#home-next).
 * Lightweight: cached path lengths, no per-frame getTotalLength / gsap.set.
 */
export default function ScrollAtmosphere() {
  const rootRef = useRef(null);
  const pathA = useRef(null);
  const pathB = useRef(null);
  const pathC = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome || !canEnhanceMotion()) return undefined;

    const root = rootRef.current;
    const a = pathA.current;
    const b = pathB.current;
    const c = pathC.current;
    if (!root || !a || !b || !c) return undefined;

    const paths = [a, b, c];
    const lengths = paths.map((path) => path.getTotalLength());
    paths.forEach((path, i) => {
      path.style.strokeDasharray = `${lengths[i]}`;
      path.style.strokeDashoffset = `${lengths[i]}`;
      path.style.opacity = '0';
    });
    root.style.opacity = '0';

    const draw = (path, length, progress) => {
      path.style.strokeDashoffset = `${length * (1 - progress)}`;
    };

    const triggers = [];
    const startEl = document.getElementById('home-next');
    const endEl = document.getElementById('home-scroll-root');

    triggers.push(
      ScrollTrigger.create({
        trigger: startEl || endEl || document.body,
        start: 'top 70%',
        endTrigger: endEl || document.body,
        end: 'bottom bottom',
        scrub: true,
        fastScrollEnd: true,
        onUpdate: (self) => {
          const p = self.progress;
          root.style.opacity = String(Math.min(1, p * 8));
          draw(a, lengths[0], Math.min(1, p * 1.25));
          draw(b, lengths[1], Math.min(1, Math.max(0, (p - 0.12) * 1.35)));
          draw(c, lengths[2], Math.min(1, Math.max(0, (p - 0.32) * 1.45)));
          a.style.opacity = String(0.14 + p * 0.28);
          b.style.opacity = String(0.1 + Math.max(0, p - 0.1) * 0.32);
          c.style.opacity = String(0.08 + Math.max(0, p - 0.28) * 0.3);
          root.style.setProperty('--gc-story-progress', String(p));
        },
        onLeaveBack: () => {
          root.style.opacity = '0';
          paths.forEach((path, i) => {
            path.style.strokeDashoffset = `${lengths[i]}`;
            path.style.opacity = '0';
          });
        },
      }),
    );

    const chapters = gsap.utils.toArray('[data-scroll-chapter]');
    chapters.forEach((chapter) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: chapter,
          start: 'top 62%',
          end: 'bottom 42%',
          onEnter: () => chapter.setAttribute('data-chapter-active', ''),
          onEnterBack: () => chapter.setAttribute('data-chapter-active', ''),
          onLeave: () => chapter.removeAttribute('data-chapter-active'),
          onLeaveBack: () => chapter.removeAttribute('data-chapter-active'),
        }),
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [isHome, location.pathname]);

  if (!isHome) return null;

  return (
    <div
      ref={rootRef}
      className="gc-scroll-atmosphere pointer-events-none fixed inset-0 z-[2] hidden lg:block"
      aria-hidden="true"
      style={{ opacity: 0, contain: 'strict' }}
    >
      <svg className="h-full w-full" viewBox="0 0 1440 2400" preserveAspectRatio="xMidYMid slice" fill="none">
        <path
          ref={pathA}
          d="M180 40 C260 220 120 420 240 620 C360 820 80 980 200 1180 C320 1380 140 1580 260 1780 C360 1940 200 2100 280 2320"
          stroke="var(--line-soft)"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={pathB}
          d="M720 20 C640 200 820 380 700 560 C580 740 860 920 740 1100 C620 1280 880 1460 760 1640 C660 1780 840 1960 760 2140 C700 2240 780 2320 740 2380"
          stroke="var(--line-soft)"
          strokeWidth="1.1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={pathC}
          d="M1260 60 C1180 240 1320 420 1200 620 C1080 820 1340 980 1220 1180 C1100 1380 1360 1560 1240 1760 C1140 1920 1320 2080 1220 2280"
          stroke="var(--line-soft)"
          strokeWidth="1.1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
