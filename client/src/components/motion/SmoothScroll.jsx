import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../motion/config';

let lenisInstance = null;
let pendingTop = false;

export function scrollToTop(immediate = true) {
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
    pendingTop = false;
  } else {
    pendingTop = true;
  }
}

/** Pause smooth page scroll (e.g. while hovering a scrollable mega-menu). */
export function stopPageScroll() {
  lenisInstance?.stop();
}

/** Resume smooth page scroll. */
export function startPageScroll() {
  lenisInstance?.start();
}

export function scrollToId(id, { offset = 0, immediate = false } = {}) {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset, immediate });
  } else {
    el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'start' });
  }
}

export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Hard reset on first paint / reload — before Lenis takes over.
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    let refreshTimer = null;
    const refresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    };

    window.addEventListener('load', refresh);
    window.addEventListener('resize', refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    if (prefersReducedMotion()) {
      scrollToTop(true);
      return () => {
        window.clearTimeout(refreshTimer);
        window.removeEventListener('load', refresh);
        window.removeEventListener('resize', refresh);
      };
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.15,
      syncTouch: false,
      autoRaf: false,
    });

    lenisInstance = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    // Always start at top unless URL has an intentional hash (handled by Layout).
    if (!window.location.hash || pendingTop) {
      lenis.scrollTo(0, { immediate: true });
      pendingTop = false;
    }

    const onRaf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    // Catch late browser scroll restoration.
    const forceTop = () => {
      if (window.location.hash) return;
      lenis.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    };
    const t1 = window.setTimeout(forceTop, 0);
    const t2 = window.setTimeout(forceTop, 100);
    const t3 = window.setTimeout(forceTop, 400);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      window.clearTimeout(refreshTimer);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener('load', refresh);
      window.removeEventListener('resize', refresh);
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return children;
}
