import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingIconsBackground from '../home/FloatingIconsBackground';
import { PageTransition, SmoothScroll, scrollToId, scrollToTop } from '../motion';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Only honor intentional deep-links (e.g. /services#all-services).
    // Ignore leftover #home-next style hashes so reload always starts at top.
    const hash = location.hash?.replace('#', '');
    const isDeepLink = hash === 'all-services';

    if (isDeepLink) {
      const timer = window.setTimeout(() => {
        scrollToId(hash, { offset: -96 });
      }, 360);
      return () => window.clearTimeout(timer);
    }

    // Clear accidental hashes (like #home-next) without navigating away.
    if (hash && hash !== 'all-services') {
      window.history.replaceState(null, '', `${location.pathname}${location.search}`);
    }

    scrollToTop(true);
    const t1 = window.setTimeout(() => scrollToTop(true), 50);
    const t2 = window.setTimeout(() => scrollToTop(true), 250);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [location.pathname, location.hash, location.search]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#F4F6F9] text-[#2F4C73]">
        <div className="noise" aria-hidden="true" />
        <FloatingIconsBackground />
        <Navbar />
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}
