import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
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
      >
        <div className="flex flex-wrap gap-3">
          <MagneticButton to="/contact">Get Started Today</MagneticButton>
          <MagneticButton to="/services" variant="secondary">
            View Services
          </MagneticButton>
        </div>
      </PageHero>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-5">
            <SectionHeading title="Built on reliability, engineered for scale" />
            <StaggerContainer className="space-y-5" stagger={0.1} from="up">
              {aboutIntro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-sm leading-relaxed text-[#9a9ab0] md:text-base"
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
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#f58220]/15 text-[#ffa04a]">
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
              className="rounded-3xl border border-white/8"
              innerClassName="bg-white/[0.03] p-6"
            >
              <h3 className="font-display text-xl font-semibold text-white">Our mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#9a9ab0]">
                Provide enterprise-grade VoIP solutions that empower businesses to communicate more
                effectively, reduce costs, and scale operations without limitations.
              </p>
            </ImageReveal>

            <ImageReveal
              direction="left"
              delay={0.12}
              className="rounded-3xl border border-white/8"
              innerClassName="bg-white/[0.03] p-6"
            >
              <h3 className="font-display text-xl font-semibold text-white">Our approach</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#9a9ab0]">
                Cutting-edge technology, exceptional customer service, and an unwavering commitment
                to reliability — backed by 24/7 expert support.
              </p>
            </ImageReveal>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <StatsBand />
        </div>
      </section>

      <section className="px-6 pb-20">
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
                className="rounded-3xl border border-white/8 bg-[#0c0c0c] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#f58220]/35"
              >
                <span className="font-display text-sm font-semibold text-[#ff8a1f]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9a9ab0]">{value.description}</p>
              </RevealCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="What we do" title="Our complete range of services." />
          <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {services.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="group rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#f58220]/35"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#f58220]/25 to-[#ff6b00]/20 text-[#ffb86b] transition-transform duration-500 group-hover:scale-105">
                  <ServiceIcon name={service.icon} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-white">
                  {service.title}
                </h3>
              </Link>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="How we work"
            title="From sign-up to fully configured in 24–48 hours."
          />
          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.09}>
            {processSteps.map((step) => (
              <article
                key={step.step}
                className="rounded-3xl border border-white/8 bg-[#0c0c0c] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#f58220]/35"
              >
                <div className="mb-4 grid h-8 w-8 place-items-center rounded-full border border-[#f58220]/40 bg-[#f58220]/10 text-xs font-semibold text-[#ffb86b]">
                  {step.step}
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9a9ab0]">{step.description}</p>
              </article>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Why businesses choose us" title="Advantages from day one." />
          <StaggerContainer className="grid gap-4 sm:grid-cols-2" stagger={0.09} from="scale">
            {whyUs.map((item) => (
              <RevealCard
                key={item.title}
                as="article"
                className="rounded-3xl border border-white/8 bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition-all duration-300 hover:border-[#f58220]/35"
              >
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9a9ab0]">{item.description}</p>
              </RevealCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTA />
    </>
  );
}
