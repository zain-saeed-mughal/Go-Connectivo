import { lazy, Suspense, useEffect } from 'react';
import Hero from '../components/home/Hero';
import TechMarquee from '../components/home/TechMarquee';
import ScrollChapter from '../components/motion/ScrollChapter';
import { ScrollTrigger } from '../motion/config';
import { prefetchHome3d } from '../motion/prefetchHome3d';
import { PageSeo } from '../components/seo/PageSeo';

const AboutPreview = lazy(() => import('../components/home/AboutPreview'));
const WhyChoose = lazy(() => import('../components/home/WhyChoose'));
const ServicesBento = lazy(() => import('../components/home/ServicesBento'));
const WhyUs = lazy(() => import('../components/home/WhyUs'));
const Process = lazy(() => import('../components/home/Process'));
const Technologies = lazy(() => import('../components/home/Technologies'));
const Testimonials = lazy(() => import('../components/home/Testimonials'));
const CTA = lazy(() => import('../components/home/CTA'));

function SectionFallback({ tall = false }) {
  return (
    <div
      className={tall ? 'min-h-[50vh] w-full' : 'min-h-[36vh] w-full'}
      aria-hidden
    />
  );
}

export default function Home() {
  useEffect(() => {
    prefetchHome3d();

    const raf = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div id="home-scroll-root" data-home-scroll className="relative">
      <PageSeo path="/" includeOrg />
      <Hero />

      <TechMarquee />

      <Suspense fallback={<SectionFallback />}>
        <ScrollChapter id="about" line="a">
          <AboutPreview />
        </ScrollChapter>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScrollChapter id="why-choose" line="b">
          <WhyChoose />
        </ScrollChapter>
      </Suspense>

      <Suspense fallback={<SectionFallback tall />}>
        <ScrollChapter id="services" line="c">
          <ServicesBento />
        </ScrollChapter>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScrollChapter id="why-us" line="b">
          <WhyUs />
        </ScrollChapter>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScrollChapter id="process" line="a">
          <Process />
        </ScrollChapter>
      </Suspense>

      <Suspense fallback={<SectionFallback tall />}>
        <ScrollChapter id="platform" line="c">
          <Technologies />
        </ScrollChapter>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScrollChapter id="testimonials" line="b">
          <Testimonials />
        </ScrollChapter>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScrollChapter id="cta" line="a">
          <CTA />
        </ScrollChapter>
      </Suspense>
    </div>
  );
}
