import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingIconsBackground from '../home/FloatingIconsBackground';
import { PageTransition, SmoothScroll, scrollToTop } from '../motion';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      // Wait for route content / Lenis to settle, then scroll to section.
      const timer = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 320);
      return () => window.clearTimeout(timer);
    }

    scrollToTop(true);
    return undefined;
  }, [location.pathname, location.hash]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#050505] text-white">
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
