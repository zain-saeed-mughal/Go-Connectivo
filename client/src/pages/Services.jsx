import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import voipVisual from '../assets/services/voip-4.webp';
import SectionHeading from '../components/ui/SectionHeading';
import PageHero from '../components/ui/PageHero';
import StatsBand from '../components/ui/StatsBand';
import ServiceIcon from '../components/ui/ServiceIcon';
import ServiceCardArt from '../components/ui/ServiceCardArt';
import ServicesHoverSlider from '../components/ui/ServicesHoverSlider';
import CTA from '../components/home/CTA';
import { RevealCard, StaggerContainer } from '../components/motion';
import {
  getCatalogServices,
  getServicesForCategory,
  processSteps,
  serviceCategories,
} from '../data/content';
import { PageSeo } from '../components/seo/PageSeo';

export default function Services() {
  const [searchQuery, setSearchQuery] = useState('');

  const catalogServices = getCatalogServices();
  const filteredServices = catalogServices.filter((service) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      service.title.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      (service.id && service.id.toLowerCase().includes(query))
    );
  });
  return (
    <>
      <PageSeo
        path="/services"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />
      <PageHero
        eyebrow="Our Services"
        title="VoIP, Dialer & Contact Center Services"
        highlight=""
        description="Dialer solutions, business voice, inbound numbers, outbound & carrier voice (including VoIP Termination), contact-center platforms, and API & messaging, engineered for call centers and teams that live on the phone."
        image={voipVisual}
        imageAlt="VoIP desk phone and cloud telephony interface"
      />

      <section className="gc-section">
        <div className="gc-container mb-10">
          <SectionHeading
            eyebrow="Service pillars"
            title="Organized for how voice teams buy."
            description="Dialers, business voice, numbers, carrier outbound, contact center, and APIs, clear categories, no guessing."
          />
          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {serviceCategories.map((category) => (
              <RevealCard
                key={category.id}
                as="article"
                className="p-5 sm:p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#4A6B94]/25 to-[#4A6B94]/15 text-[#6B8AB0]">
                  <ServiceIcon name={category.icon} size={22} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-[#2F4C73] sm:text-xl">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7C8F]">{category.description}</p>
                <ul className="mt-4 space-y-2">
                  {getServicesForCategory(category.id).map((service) => (
                    <li key={service.id}>
                      <Link
                        to={`/services/${service.id}`}
                        className="flex items-center gap-2 text-sm text-[#4A5D73] transition-colors hover:text-[#2F4C73]"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-[#4A6B94]" />
                        <span className="min-w-0 leading-snug">{service.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </RevealCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="gc-section">
        <ServicesHoverSlider />
      </section>

      <section id="all-services" className="gc-section scroll-mt-28">
        <div className="gc-container mb-10">
          <SectionHeading
            eyebrow="Full catalog"
            title="Every capability on one floor."
            description="Browse dialers, business voice, numbers, carrier termination, contact-center tools, and APIs, tap any card for full details."
          />
          <div className="mt-6 flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="search"
                placeholder="Search services (e.g. PBX, Dialer, SIP, SMS...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-h-11 w-full rounded-full border border-[rgba(47,76,115,0.2)] bg-[#FFFFFF] px-5 py-3 pl-11 text-sm text-[#2F4C73] shadow-sm transition-all focus:border-[#4A6B94] focus:outline-none focus:ring-2 focus:ring-[#4A6B94]/20"
              />
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7C8F]">
                <Search size={16} aria-hidden />
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#6B7C8F] hover:text-[#2F4C73]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="gc-container grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(47,76,115,0.13)] bg-gradient-to-br from-[#FFFFFF] via-[#F7F9FC] to-[#E8EEF6] p-5 shadow-[0_12px_32px_rgba(47,76,115,0.07)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#4A6B94]/60 hover:shadow-[0_18px_44px_rgba(47,76,115,0.13)] sm:p-[1.15rem]"
                data-cursor="hover"
              >
                <ServiceCardArt
                  name={service.icon}
                  className="pointer-events-none absolute -right-2 -bottom-1 h-[7.5rem] w-[7.5rem] text-[#2F4C73] opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.11] sm:h-32 sm:w-32"
                />

                <div className="relative z-10 mb-3.5 flex items-start justify-between gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#4A6B94]/12 text-[#2F4C73] ring-1 ring-[#4A6B94]/10 transition-colors duration-300 group-hover:bg-[#4A6B94]/18 group-hover:ring-[#4A6B94]/22 sm:h-11 sm:w-11">
                    <ServiceIcon name={service.icon} size={20} />
                  </span>
                  <span
                    className="font-display text-[11px] font-semibold tracking-[0.14em] text-[#6B8AB0]/80 tabular-nums"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="relative z-10 font-display text-base font-semibold tracking-tight text-[#2F4C73] sm:text-[1.05rem]">
                  {service.title}
                </h3>
                <p className="relative z-10 mt-2 flex-1 text-sm leading-relaxed text-[#5A6B7D]">
                  {service.description}
                </p>
                <span className="relative z-10 mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-[#2F4C73] transition-colors duration-300 group-hover:text-[#4A6B94] sm:min-h-0">
                  Learn More
                  <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-[#6B7C8F]">
              No services match "{searchQuery}". Try searching for dialers, PBX, or termination.
            </div>
          )}
        </div>
      </section>

      <section className="gc-section">
        <div className="gc-container">
          <StatsBand />
        </div>
      </section>

      <section className="gc-section-tight">
        <div className="gc-container">
          <SectionHeading
            eyebrow="Onboarding"
            title="Up and running within 24–48 hours."
            description="A simple path from scoping dialers, trunks, numbers, and contact-center tools to a live production floor."
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

      <CTA />
    </>
  );
}
