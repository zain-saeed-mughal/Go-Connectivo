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
import CTA from '../components/home/CTALazy';
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
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[var(--accent-soft)]/25 to-[var(--accent-soft)]/15 text-[var(--text-secondary)]">
                  <ServiceIcon name={category.icon} size={22} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-[var(--text-primary)] sm:text-xl">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{category.description}</p>
                <ul className="mt-4 space-y-2">
                  {getServicesForCategory(category.id).map((service) => (
                    <li key={service.id}>
                      <Link
                        to={`/services/${service.id}`}
                        className="flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--accent-soft)]" />
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
                className="min-h-11 w-full rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 pl-11 text-sm text-[var(--text-primary)] shadow-sm transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--accent-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]/20"
              />
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
                <Search size={16} aria-hidden />
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
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
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-[var(--bg-secondary)] p-5 shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[color:var(--border)] hover:shadow-[var(--shadow-card-hover)] sm:p-[1.15rem]"
                data-cursor="hover"
              >
                <ServiceCardArt
                  name={service.icon}
                  className="pointer-events-none absolute -right-2 -bottom-1 h-[7.5rem] w-[7.5rem] text-[var(--text-primary)] opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.11] sm:h-32 sm:w-32"
                />

                <div className="relative z-10 mb-3.5 flex items-start justify-between gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--accent-soft)]/16 text-[var(--text-primary)] ring-1 ring-[var(--accent-soft)]/10 transition-colors duration-300 group-hover:bg-[var(--accent-soft)]/22 group-hover:ring-[var(--accent-soft)]/22 sm:h-11 sm:w-11">
                    <ServiceIcon name={service.icon} size={20} />
                  </span>
                  <span
                    className="font-display text-[11px] font-semibold tracking-[0.14em] text-[var(--text-secondary)]/80 tabular-nums"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="relative z-10 font-display text-base font-semibold tracking-tight text-[var(--text-primary)] sm:text-[1.05rem]">
                  {service.title}
                </h3>
                <p className="relative z-10 mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {service.description}
                </p>
                <span className="relative z-10 mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--text-secondary)] sm:min-h-0">
                  Learn More
                  <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-[var(--text-secondary)]">
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
                <div className="mb-4 grid h-8 w-8 place-items-center rounded-full border border-[var(--accent-soft)]/40 bg-[var(--accent-soft)]/15 text-xs font-semibold text-[var(--text-secondary)]">
                  {step.step}
                </div>
                <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{step.description}</p>
              </article>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTA />
    </>
  );
}
