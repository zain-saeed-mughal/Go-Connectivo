import { whyChoose } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import ServiceIcon from '../ui/ServiceIcon';
import { ParallaxElement, RevealCard, StaggerContainer } from '../motion';

export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 md:py-28">
      <ParallaxElement
        speed={14}
        className="pointer-events-none absolute top-24 left-1/3 h-64 w-64 rounded-full bg-[#e86f0c]/10 blur-[110px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Why Choose Go Connectivo?"
          title="Enterprise-grade solutions designed for modern businesses."
          description="Reliability, scale, and support built into every deployment."
        />

        <StaggerContainer
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
          from="scale"
        >
          {whyChoose.map((item) => (
            <RevealCard
              key={item.title}
              as="article"
              className="group rounded-3xl border border-white/8 bg-white/[0.03] p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-[#f58220]/40 hover:bg-white/[0.05] hover:shadow-[0_20px_60px_rgba(255,107,0,0.12)]"
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#f58220] to-[#ff6b00] text-white shadow-[0_10px_30px_rgba(232,111,12,0.35)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_14px_38px_rgba(245,130,32,0.5)]">
                <ServiceIcon name={item.icon} size={24} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#9a9ab0]">{item.description}</p>
            </RevealCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
