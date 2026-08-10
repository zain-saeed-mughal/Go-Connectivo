import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../motion/config';

let lenisInstance = null;

export function scrollToTop(immediate = true) {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate });
  else window.scrollTo(0, 0);
}

/** Pause smooth page scroll (e.g. while hovering a scrollable mega-menu). */
export function stopPageScroll() {
  lenisInstance?.stop();
}

/** Resume smooth page scroll. */
export function startPageScroll() {
  lenisInstance?.start();
}

export default function SmoothScroll({ children }) {
  useEffect(() => {
    let refreshTimer = null;
    const refresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    };

    window.addEventListener('load', refresh);
    window.addEventListener('resize', refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    if (prefersReducedMotion()) {
      return () => {
        window.clearTimeout(refreshTimer);
        window.removeEventListener('load', refresh);
        window.removeEventListener('resize', refresh);
      };
    }

    const lenis = new Lenis({
      // Buttery wheel feel — long enough to glide, short enough to stay responsive.
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.15,
      syncTouch: false,
    });

    lenisInstance = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const onRaf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener('load', refresh);
      window.removeEventListener('resize', refresh);
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return children;
}
