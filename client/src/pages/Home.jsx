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

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <AboutPreview />
      <WhyChoose />
      <ServicesBento />
      <WhyUs />
      <Process />
      <Technologies />
      <Testimonials />
      <CTA />
    </>
  );
}
