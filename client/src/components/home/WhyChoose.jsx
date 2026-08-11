import voipCloud from '../../assets/services/voip-1.jpg';
import { whyChoose } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import ServiceIcon from '../ui/ServiceIcon';
import { ImageReveal, ParallaxElement, RevealCard, StaggerContainer } from '../motion';

export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <ParallaxElement
        speed={14}
        className="pointer-events-none absolute top-24 left-1/3 h-64 w-64 rounded-full bg-[#2F4C73]/10 blur-[110px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 grid items-center gap-6 md:mb-10 md:grid-cols-[1.15fr_0.75fr] md:gap-8 lg:gap-10">
          <SectionHeading
            eyebrow="Why Choose Go Connectivo?"
            title="Enterprise-grade solutions designed for modern businesses."
            description="Reliability, scale, and support built into every deployment."
            className="!mb-0"
          />

          <ImageReveal
            direction="right"
            delay={0.08}
            className="group mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl border border-[rgba(47,76,115,0.12)] bg-[#FFFFFF] shadow-[0_14px_36px_rgba(47,76,115,0.1)] sm:max-w-[320px] sm:rounded-[1.25rem] md:ml-auto md:max-w-[340px]"
            zoomOnHover
          >
            <img
              src={voipCloud}
              alt="Cloud VoIP connecting desk phones, mobiles, and softphones"
              className="aspect-[735/490] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </ImageReveal>
        </div>

        <StaggerContainer
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
          from="scale"
        >
          {whyChoose.map((item) => (
            <RevealCard
              key={item.title}
              as="article"
              className="group rounded-3xl border border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-[#4A6B94]/40 hover:bg-white/[0.05] hover:shadow-[0_20px_60px_rgba(74,107,148,0.12)]"
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#4A6B94] to-[#2F4C73] text-[#FFFFFF] shadow-[0_10px_30px_rgba(47,76,115,0.35)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_14px_38px_rgba(74,107,148,0.5)]">
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
