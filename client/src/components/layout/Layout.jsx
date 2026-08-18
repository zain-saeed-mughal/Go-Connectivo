import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from '../ui/CustomCursor';
import { scrollToId, scrollToTop } from '../motion';
import { MotionScrollProgress } from '../motion/MotionParallax';
import PageTransition from '../motion/PageTransition';
import { ScrollTrigger } from '../../motion/config';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

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

    if (hash && !honorHash) {
      window.history.replaceState(null, '', `${location.pathname}${location.search}`);
    }

    scrollToTop();
    const raf = window.requestAnimationFrame(() => scrollToTop());
    const t1 = window.setTimeout(scrollToTop, 80);
    const t2 = window.setTimeout(() => {
      scrollToTop();
      ScrollTrigger.refresh();
      scrollToTop();
    }, 300);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [location.pathname, location.hash, location.search]);

  return (
    /*
      Fixed chrome stays in its own stacking layer above page pins.
      Do not put overflow-x clip on a page ancestor — it breaks pin + header
      when scrolling back from the bottom of the page.
    */
    <div className="relative min-h-screen bg-[#F4F6F9] text-[#2F4C73]">
      <CustomCursor />
      <MotionScrollProgress />
      <div className="noise" aria-hidden="true" />
      {/*
        Chrome layer sits in its own fixed stacking context above page pins.
        pointer-events none on the shell; Navbar re-enables hits on the island.
        Keeps header usable when scrolling back into the hero pin zone.
      */}
      <div className="pointer-events-none fixed inset-0 z-[100]">
        <Navbar />
      </div>

      {/*
        No overflow-x clip here — it becomes a containing block for fixed/pin
        and forces GSAP pinReparent, which fights the header on reverse scroll.
        Horizontal clip stays on body (#root / body overflow-x).
      */}
      <div className="relative z-0 max-w-[100vw]">
        <main className="relative z-0 min-w-0 w-full">
          {location.pathname === '/contact' ? (
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
