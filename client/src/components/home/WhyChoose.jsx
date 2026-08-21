import voipCloud from '../../assets/services/voip-1.webp';
import { whyChoose } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import ServiceIcon from '../ui/ServiceIcon';
import { RevealCard, SlideUpOnView, StaggerContainer } from '../motion';
import MotionParallax from '../motion/MotionParallax';

export default function WhyChoose() {
  return (
    <section className="gc-section relative overflow-x-clip">
      <MotionParallax
        speed={30}
        className="gc-glow pointer-events-none absolute top-24 left-1/3 h-48 w-48 rounded-full bg-[#2F4C73]/10 sm:h-64 sm:w-64"
      >
        <span className="block h-full w-full" aria-hidden="true" />
      </MotionParallax>

      <div className="gc-container relative">
        <div className="mb-8 grid items-center gap-6 md:mb-10 md:grid-cols-[1.15fr_0.75fr] md:gap-8 lg:items-center lg:gap-10">
          <SlideUpOnView>
            <SectionHeading
              eyebrow="Why Choose Go Connectivo?"
              title="Enterprise-grade voice built for modern floors."
              description="Dialers, trunks, numbers, and contact-center tools, with reliability and support baked in."
              className="!mb-0 min-w-0"
              animated={false}
            />
          </SlideUpOnView>

          <SlideUpOnView delay={0.12}>
            <div className="gc-card mx-auto w-full max-w-[280px] overflow-hidden sm:max-w-[320px] md:ml-auto md:max-w-[340px]">
              <img
                src={voipCloud}
                alt="Cloud VoIP connecting desk phones, mobiles, and softphones"
                className="aspect-[735/490] h-auto w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </SlideUpOnView>
        </div>

        <StaggerContainer
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
          from="up"
        >
          {whyChoose.map((item) => (
            <RevealCard key={item.title} as="article" className="group h-full p-6 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#4A6B94] to-[#2F4C73] text-[#FFFFFF] shadow-[0_10px_30px_rgba(47,76,115,0.35)] transition-all duration-500 group-hover:scale-105">
                <ServiceIcon name={item.icon} size={24} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-[#2F4C73]">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#6B7C8F]">{item.description}</p>
            </RevealCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
