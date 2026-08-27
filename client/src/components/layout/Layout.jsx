import { useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';
import { scrollToId, scrollToTop } from '../motion';
import { MotionScrollProgress } from '../motion/MotionParallax';
import PageTransition from '../motion/PageTransition';
import { ScrollTrigger } from '../../motion/config';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const skipTransition = isHome || location.pathname === '/contact';

  useEffect(() => {
    document.documentElement.classList.remove('gc-custom-cursor');
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Before paint: pin scroll at top so pages (esp. About) open from the top.
  // Do NOT kill ScrollTriggers here — child layout effects run first; killing
  // afterward would destroy Hero FCC scrub and leave body copy stuck hidden.
  useLayoutEffect(() => {
    const hash = location.hash?.replace('#', '');
    const honorHash =
      location.pathname === '/compliance' ||
      location.pathname.startsWith('/compliance/');

    if (hash && honorHash) return undefined;

    if (hash && !honorHash) {
      window.history.replaceState(null, '', `${location.pathname}${location.search}`);
    }

    scrollToTop();
    return undefined;
  }, [location.pathname, location.hash, location.search]);

  useEffect(() => {
    const hash = location.hash?.replace('#', '');
    const honorHash =
      location.pathname === '/compliance' ||
      location.pathname.startsWith('/compliance/');

    if (hash && honorHash) {
      const jump = () => scrollToId(hash, { offset: -96 });
      const t1 = window.setTimeout(jump, 80);
      const t2 = window.setTimeout(jump, 320);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }

    // Retries: AnimatePresence mode="wait" unmounts the tall previous page after
    // ~180ms; without late scrolls, Y can stay mid-document on shorter routes.
    scrollToTop();
    const raf = window.requestAnimationFrame(() => {
      scrollToTop();
      ScrollTrigger.refresh();
    });
    const t1 = window.setTimeout(() => scrollToTop(), 200);
    const t2 = window.setTimeout(() => {
      scrollToTop();
      ScrollTrigger.refresh();
    }, 380);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [location.pathname, location.hash, location.search]);

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <MotionScrollProgress />
      <div className="noise" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-[100]">
        <Navbar />
      </div>

      <div className="relative z-0 max-w-[100vw]">
        <main className="relative z-0 min-w-0 w-full">
          {skipTransition ? (
            <Outlet />
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <PageTransition key={location.pathname}>
                <Outlet />
              </PageTransition>
            </AnimatePresence>
          )}
        </main>
        <div className="relative z-0 min-w-0">
          <Footer />
        </div>
      </div>
    </div>
  );
}
