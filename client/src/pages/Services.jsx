import { Link } from 'react-router-dom';
import SectionHeading from '../components/ui/SectionHeading';
import PageHero from '../components/ui/PageHero';
import StatsBand from '../components/ui/StatsBand';
import ServiceIcon from '../components/ui/ServiceIcon';
import ServicesHoverSlider from '../components/ui/ServicesHoverSlider';
import CTA from '../components/home/CTA';
import { StaggerContainer } from '../components/motion';
import {
  getServicesForCategory,
  processSteps,
  serviceCategories,
  services,
} from '../data/content';

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Cloud Telephony,"
        highlight="Dialers & Voice"
        description="Hosted PBX, multi-mode dialers, inbound DIDs and toll-free, plus outbound termination — engineered for call centers and teams that live on the phone."
      />

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto mb-10 max-w-6xl">
          <SectionHeading
            eyebrow="Service pillars"
            title="Three ways we power your voice stack."
            description="Cloud telephony platforms, inbound presence, and outbound reach — adapted for how Go Connectivo customers operate."
          />
          <StaggerContainer className="grid gap-4 md:grid-cols-3" stagger={0.08}>
            {serviceCategories.map((category) => (
              <article
                key={category.id}
                className="rounded-3xl border border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#4A6B94]/35"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#4A6B94]/25 to-[#4A6B94]/15 text-[#6B8AB0]">
                  <ServiceIcon name={category.icon} size={22} />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-[#2F4C73]">{category.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7C8F]">{category.description}</p>
                <ul className="mt-4 space-y-2">
                  {getServicesForCategory(category.id)
                    .slice(0, 4)
                    .map((service) => (
                      <li key={service.id}>
                        <Link
                          to={`/services/${service.id}`}
                          className="flex items-center gap-2 text-sm text-[#4A5D73] transition-colors hover:text-[#2F4C73]"
                        >
                          <span className="h-1 w-1 rounded-full bg-[#4A6B94]" />
                          {service.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </article>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-16">
        <ServicesHoverSlider />
      </section>

      <section id="all-services" className="scroll-mt-28 px-6 pb-20">
        <div className="mx-auto mb-10 max-w-6xl">
          <SectionHeading
            eyebrow="Full catalog"
            title="Every capability on one floor."
            description="Browse every dialer, PBX, contact-center, and inbound/outbound voice service — tap any card for full details."
          />
        </div>

        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="group flex h-full flex-col rounded-3xl border border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#4A6B94]/4 hover:bg-[#FFFFFF] hover:shadow-[0_20px_50px_rgba(74,107,148,0.12)]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#4A6B94] to-[#2F4C73] text-[#FFFFFF] shadow-[0_10px_28px_rgba(74,107,148,0.35)] transition-transform duration-300 group-hover:scale-105">
                <ServiceIcon name={service.icon} size={22} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-[-0.02em] text-[#2F4C73]">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7C8F]">{service.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#6B8AB0] transition-colors group-hover:text-[#2F4C73]">
                Learn More
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <StatsBand />
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-10">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Onboarding"
            title="Up and running within 24–48 hours."
            description="A simple path from scoping dialers and trunks to a live production floor."
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

      <CTA />
    </>
  );
}
