import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceIcon from '../components/ui/ServiceIcon';
import MagneticButton from '../components/ui/MagneticButton';
import CTA from '../components/home/CTA';
import {
  ServiceSeoBenefits,
  ServiceSeoCardSection,
  ServiceSeoClosing,
  ServiceSeoFaqs,
  ServiceSeoHowItWorks,
  ServiceSeoOverview,
  ServiceSeoRelated,
  ServiceSeoUseCases,
} from '../components/services/ServiceSeoBlocks';
import { RevealCard, StaggerContainer } from '../components/motion';
import {
  getCategoryById,
  getServiceById,
  getServicesForCategory,
  services,
} from '../data/content';
import { getServiceHeroImage } from '../data/serviceImages';
import { getServiceSeoContent } from '../data/serviceSeoContent';
import {
  buildServiceSeoCardSections,
  shuffleSeoBlockOrder,
} from '../data/serviceSeoCards';
import { PageSeo } from '../components/seo/PageSeo';

export default function ServiceDetail() {
  const { slug } = useParams();
  const serviceId = String(slug || '')
    .trim()
    .toLowerCase();
  const service = getServiceById(serviceId);

  if (service?.redirectTo) {
    return <Navigate to={`/services/${service.redirectTo}`} replace />;
  }

  const seo = service ? getServiceSeoContent(service) : null;

  if (!service || !seo) {
    return <Navigate to="/services" replace />;
  }

  const category = getCategoryById(service.category);
  const related = getServicesForCategory(service.category)
    .filter((item) => item.id !== service.id)
    .slice(0, 3);

  const moreServices = services
    .filter((item) => item.id !== service.id && !item.hiddenFromCatalog)
    .slice(0, 6);
  const heroImage = getServiceHeroImage(service.id);
  const seoCardSections = buildServiceSeoCardSections(service);
  const midBlockOrder = shuffleSeoBlockOrder(service.id, [
    'benefits',
    'cards-0',
    'howItWorks',
    'cards-1',
    'useCases',
    'cards-2',
  ]);
  const path = `/services/${service.id}`;

  const midBlocks = {
    benefits: <ServiceSeoBenefits key="benefits" seo={seo} serviceId={service.id} />,
    howItWorks: <ServiceSeoHowItWorks key="howItWorks" seo={seo} />,
    useCases: <ServiceSeoUseCases key="useCases" seo={seo} />,
    'cards-0': seoCardSections[0] ? (
      <ServiceSeoCardSection key="cards-0" section={seoCardSections[0]} />
    ) : null,
    'cards-1': seoCardSections[1] ? (
      <ServiceSeoCardSection key="cards-1" section={seoCardSections[1]} />
    ) : null,
    'cards-2': seoCardSections[2] ? (
      <ServiceSeoCardSection key="cards-2" section={seoCardSections[2]} />
    ) : null,
  };

  return (
    <>
      <PageSeo
        path={path}
        title={seo.metaTitle}
        description={seo.metaDescription}
        noindex={Boolean(service.hiddenFromCatalog)}
        service={{ name: service.title, description: seo.metaDescription }}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path },
        ]}
      />
      <PageHero
        eyebrow={category?.title || 'Services'}
        title={service.title}
        highlight=""
        description={service.description}
        image={heroImage}
        imageAlt={`${service.title} illustration`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <MagneticButton to="/contact" className="w-full justify-center sm:w-auto">
            Get Started
          </MagneticButton>
          <MagneticButton to="/services" variant="secondary" className="w-full justify-center sm:w-auto">
            All Services
          </MagneticButton>
        </div>
      </PageHero>

      {/* SEO block 1, overview (after hero) */}
      <ServiceSeoOverview seo={seo} />

      <section className="gc-section">
        <div className="gc-container grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealCard className="p-5 sm:p-7 md:p-9">
            <div className="mb-6 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-on-accent)] shadow-[var(--shadow-card-hover)]">
                <ServiceIcon name={service.icon} size={26} />
              </span>
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-[var(--text-secondary)] uppercase">
                  {category?.title || 'Service'}
                </p>
                <h2 className="font-display gradient-text-brand text-2xl font-semibold">{service.title}</h2>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">{service.description}</p>

            <div className="mt-8">
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">What you get</h3>
              <ul className="mt-4 space-y-3">
                {service.capabilities.map((capability) => (
                  <li key={capability} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)]/18 text-[var(--text-secondary)]">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
          </RevealCard>

          <div className="space-y-4">
            <RevealCard className="p-6">
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">Ready to deploy?</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                Tell us about your seats, call volume, and markets, we’ll map {service.title} into
                your stack and share next steps.
              </p>
              <div className="mt-5">
                <MagneticButton to="/contact" className="w-full justify-center sm:w-auto">
                  Talk to sales
                </MagneticButton>
              </div>
            </RevealCard>

            {related.length > 0 ? (
              <RevealCard className="p-6">
                <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                  More in {category?.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {related.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/services/${item.id}`}
                        className="group flex min-h-11 items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-[var(--bg-secondary)]"
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--accent-soft)]/18 text-[var(--text-secondary)]">
                          <ServiceIcon name={item.icon} size={16} />
                        </span>
                        <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </RevealCard>
            ) : null}

            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              <ArrowLeft size={16} />
              Back to all services
            </Link>
          </div>
        </div>
      </section>

      {/* SEO mid blocks, order + card sets vary by service (seeded, SEO-stable) */}
      {midBlockOrder.map((key) => midBlocks[key])}

      <section className="gc-section">
        <div className="gc-container">
          <SectionHeading
            eyebrow="Explore more"
            title="Other capabilities on the platform."
            description="Explore another dialer, voice, number, termination, or contact-center service."
          />
          <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {moreServices.map((item) => (
              <Link
                key={item.id}
                to={`/services/${item.id}`}
                className="gc-card group block p-5"
                data-cursor="hover"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--accent-soft)]/18 text-[var(--text-secondary)] transition-transform group-hover:scale-105">
                  <ServiceIcon name={item.icon} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-[var(--text-primary)]">{item.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-[var(--text-secondary)]">{item.description}</p>
              </Link>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SEO blocks 5–6, before CTA */}
      <ServiceSeoRelated seo={seo} />
      <ServiceSeoFaqs seo={seo} />
      <ServiceSeoClosing seo={seo} serviceTitle={service.title} />

      <CTA />
    </>
  );
}
