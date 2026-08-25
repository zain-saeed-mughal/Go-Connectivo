import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import TechMarquee from '../components/home/TechMarquee';
import AboutPreview from '../components/home/AboutPreview';
import WhyChoose from '../components/home/WhyChoose';
import ServicesBento from '../components/home/ServicesBento';
import WhyUs from '../components/home/WhyUs';
import Process from '../components/home/Process';
import Technologies from '../components/home/Technologies';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';
import ScrollChapter from '../components/motion/ScrollChapter';
import { ScrollTrigger } from '../motion/config';
import { prefetchHome3d } from '../motion/prefetchHome3d';
import { PageSeo } from '../components/seo/PageSeo';

export default function Home() {
  useEffect(() => {
    prefetchHome3d();

    const t1 = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 480);

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
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div id="home-scroll-root" data-home-scroll className="relative">
      <PageSeo path="/" includeOrg />
      <Hero />

      <TechMarquee />

      <ScrollChapter id="about" line="a">
        <AboutPreview />
      </ScrollChapter>

      <ScrollChapter id="why-choose" line="b">
        <WhyChoose />
      </ScrollChapter>

      <ScrollChapter id="services" line="c">
        <ServicesBento />
      </ScrollChapter>

      <ScrollChapter id="why-us" line="b">
        <WhyUs />
      </ScrollChapter>

      <ScrollChapter id="process" line="a">
        <Process />
      </ScrollChapter>

      <ScrollChapter id="platform" line="c">
        <Technologies />
      </ScrollChapter>

      <ScrollChapter id="testimonials" line="b">
        <Testimonials />
      </ScrollChapter>

      <ScrollChapter id="cta" line="a">
        <CTA />
      </ScrollChapter>
    </div>
  );
}
