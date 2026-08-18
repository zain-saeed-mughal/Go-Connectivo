import { Link } from 'react-router-dom';
import voipHeadset from '../assets/services/voip-2.webp';
import SectionHeading from '../components/ui/SectionHeading';
import PageHero from '../components/ui/PageHero';
import StatsBand from '../components/ui/StatsBand';
import MagneticButton from '../components/ui/MagneticButton';
import ServiceIcon from '../components/ui/ServiceIcon';
import CTA from '../components/home/CTA';
import { RevealCard, StaggerContainer } from '../components/motion';
import { aboutIntro, coreValues, getCatalogServices, processSteps, whyUs } from '../data/content';

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Go Connectivo"
        title="Your Trusted"
        highlight="VoIP Partner"
        description="Reliable dialers, business voice, numbers, VoIP Termination, contact-center platforms, and APIs — built to scale with your team."
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

      <section className="gc-section">
        <div className="gc-prose-width space-y-5">
          <SectionHeading title="Built on reliability, engineered for scale" />
          <StaggerContainer className="space-y-5" stagger={0.1} from="up">
            {aboutIntro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="gc-prose-muted"
              >
                {paragraph}
              </p>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="gc-section">
        <div className="gc-container">
          <StatsBand />
        </div>
      </section>

      <section className="gc-section">
        <div className="gc-container">
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
                className="p-6"
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

      <section className="gc-section">
        <div className="gc-container">
          <SectionHeading
            eyebrow="What we do"
            title="Our complete range of services."
            description="Browse the full catalog — dialers, business voice, numbers, carrier outbound, contact center, and APIs."
          />
          <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {getCatalogServices().map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="gc-card group block p-5"
                data-cursor="hover"
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

      <section className="gc-section">
        <div className="gc-container">
          <SectionHeading
            eyebrow="How we work"
            title="From sign-up to fully configured in 24–48 hours."
          />
          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.09}>
            {processSteps.map((step) => (
              <article
                key={step.step}
                className="gc-card h-full p-5"
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

      <section className="gc-section-tight">
        <div className="gc-container">
          <SectionHeading eyebrow="Why businesses choose us" title="Advantages from day one." />
          <StaggerContainer className="grid gap-4 sm:grid-cols-2" stagger={0.09} from="scale">
            {whyUs.map((item) => (
              <RevealCard
                key={item.title}
                as="article"
                className="p-6"
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
