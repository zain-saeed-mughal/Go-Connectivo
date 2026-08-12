import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import voipHeadset from '../assets/services/voip-2.jpg';
import SectionHeading from '../components/ui/SectionHeading';
import PageHero from '../components/ui/PageHero';
import StatsBand from '../components/ui/StatsBand';
import MagneticButton from '../components/ui/MagneticButton';
import ServiceIcon from '../components/ui/ServiceIcon';
import CTA from '../components/home/CTA';
import { ImageReveal, RevealCard, StaggerContainer } from '../components/motion';
import { aboutIntro, coreValues, processSteps, services, whyUs } from '../data/content';

const commitments = [
  'Enterprise-grade infrastructure',
  'No long-term contracts',
  'Transparent pricing, no hidden fees',
  '14-day free trial available',
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Go Connectivo"
        title="Your Trusted"
        highlight="VoIP Partner"
        description="Leading the future of business communication with reliable, scalable, and cost-effective solutions."
        image={voipHeadset}
        imageAlt="Professional headset for VoIP and contact center support"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <MagneticButton to="/contact" className="w-full justify-center sm:w-auto">
            Get Started Today
          </MagneticButton>
          <MagneticButton to="/services" variant="secondary" className="w-full justify-center sm:w-auto">
            View Services
          </MagneticButton>
        </div>
      </PageHero>

      <section className="px-4 sm:px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-5">
            <SectionHeading title="Built on reliability, engineered for scale" />
            <StaggerContainer className="space-y-5" stagger={0.1} from="up">
              {aboutIntro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-sm leading-relaxed text-[#6B7C8F] md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </StaggerContainer>

            <StaggerContainer
              as="ul"
              className="grid gap-3 pt-2 sm:grid-cols-2"
              stagger={0.07}
              from="left"
            >
              {commitments.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#c3c3d4]">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#4A6B94]/15 text-[#6B8AB0]">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </StaggerContainer>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <ImageReveal
              direction="left"
              className="rounded-3xl border border-[rgba(47,76,115,0.1)]"
              innerClassName="bg-[#FFFFFF] p-6"
            >
              <h3 className="font-display text-xl font-semibold text-[#2F4C73]">Our mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#6B7C8F]">
                Provide enterprise-grade VoIP solutions that empower businesses to communicate more
                effectively, reduce costs, and scale operations without limitations.
              </p>
            </ImageReveal>

            <ImageReveal
              direction="left"
              delay={0.12}
              className="rounded-3xl border border-[rgba(47,76,115,0.1)]"
              innerClassName="bg-[#FFFFFF] p-6"
            >
              <h3 className="font-display text-xl font-semibold text-[#2F4C73]">Our approach</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#6B7C8F]">
                Cutting-edge technology, exceptional customer service, and an unwavering commitment
                to reliability — backed by 24/7 expert support.
              </p>
            </ImageReveal>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <StatsBand />
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Our values"
            title="Principles that shape every engagement."
            description="The standards we hold ourselves to, from first call through long-term support."
          />
          <StaggerContainer
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            stagger={0.09}
            from="scale"
          >
            {coreValues.map((value, index) => (
              <RevealCard
                key={value.title}
                as="article"
                className="rounded-3xl border border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#4A6B94]/35"
              >
                <span className="font-display text-sm font-semibold text-[#4A6B94]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-[#2F4C73]">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7C8F]">{value.description}</p>
              </RevealCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="What we do" title="Our complete range of services." />
          <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {services.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="group rounded-2xl border border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#4A6B94]/35"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#4A6B94]/25 to-[#4A6B94]/20 text-[#6B8AB0] transition-transform duration-500 group-hover:scale-105">
                  <ServiceIcon name={service.icon} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-[#2F4C73]">
                  {service.title}
                </h3>
              </Link>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="How we work"
            title="From sign-up to fully configured in 24–48 hours."
          />
          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.09}>
            {processSteps.map((step) => (
              <article
                key={step.step}
                className="rounded-3xl border border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#4A6B94]/35"
              >
                <div className="mb-4 grid h-8 w-8 place-items-center rounded-full border border-[#4A6B94]/40 bg-[#4A6B94]/10 text-xs font-semibold text-[#6B8AB0]">
                  {step.step}
                </div>
                <h3 className="font-display text-lg font-semibold text-[#2F4C73]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7C8F]">{step.description}</p>
              </article>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-10">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Why businesses choose us" title="Advantages from day one." />
          <StaggerContainer className="grid gap-4 sm:grid-cols-2" stagger={0.09} from="scale">
            {whyUs.map((item) => (
              <RevealCard
                key={item.title}
                as="article"
                className="rounded-3xl border border-[rgba(47,76,115,0.1)] bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition-all duration-300 hover:border-[#4A6B94]/35"
              >
                <h3 className="font-display text-xl font-semibold text-[#2F4C73]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7C8F]">{item.description}</p>
              </RevealCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTA />
    </>
  );
}
