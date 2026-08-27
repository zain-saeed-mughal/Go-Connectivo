import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import { RevealCard } from '../motion';
import { shuffleSeoBlockOrder } from '../../data/serviceSeoCards';

/**
 * SEO long-form blocks for ServiceDetail only, keeps Home/About/etc. unchanged.
 * Semantic HTML (article, section, h2–h3, p, ul, ol) for crawlers.
 */
export function ServiceSeoOverview({ seo }) {
  if (!seo?.overview) return null;
  return (
    <section className="gc-section-tight" aria-labelledby="seo-overview-heading">
      <article className="gc-card gc-card-panel gc-container p-5 sm:p-8 md:p-10">
        <h2
          id="seo-overview-heading"
          className="font-display text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-2xl"
        >
          {seo.overview.heading}
        </h2>
        <div className="mt-4 space-y-4">
          {seo.overview.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </section>
  );
}

export function ServiceSeoBenefits({ seo, serviceId }) {
  if (!seo?.benefits?.items?.length) return null;
  const items = serviceId
    ? shuffleSeoBlockOrder(`${serviceId}:benefits`, seo.benefits.items.map((_, i) => i)).map(
        (i) => seo.benefits.items[i],
      )
    : seo.benefits.items;
  return (
    <section className="gc-section-tight" aria-labelledby="seo-benefits-heading">
      <div className="gc-container">
        <h2
          id="seo-benefits-heading"
          className="font-display text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-2xl"
        >
          {seo.benefits.heading}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <RevealCard key={item.title} as="li" className="p-5 sm:p-6">
              <h3 className="font-display text-base font-semibold text-[var(--text-primary)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{item.text}</p>
            </RevealCard>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServiceSeoHowItWorks({ seo }) {
  if (!seo?.howItWorks?.steps?.length) return null;
  return (
    <section
      className="gc-section-tight"
      aria-labelledby="seo-how-heading"
    >
      <div className="gc-card gc-card-panel gc-container bg-[var(--bg-secondary)] p-5 sm:p-8 md:p-10">
        <h2
          id="seo-how-heading"
          className="font-display text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-2xl"
        >
          {seo.howItWorks.heading}
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {seo.howItWorks.steps.map((step, index) => (
            <RevealCard key={step.title} as="li" className="p-5">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--accent-soft)]/35 bg-[var(--accent-soft)]/15 text-xs font-semibold text-[var(--text-secondary)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-[var(--text-primary)]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{step.text}</p>
            </RevealCard>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ServiceSeoUseCases({ seo }) {
  if (!seo?.useCases?.items?.length) return null;
  return (
    <section className="gc-section-tight" aria-labelledby="seo-usecases-heading">
      <div className="gc-container">
        <h2
          id="seo-usecases-heading"
          className="font-display text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-2xl"
        >
          {seo.useCases.heading}
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {seo.useCases.items.map((item) => (
            <li
              key={item}
              className="gc-card-sm flex items-start gap-3 px-4 py-3.5 text-sm leading-snug text-[var(--text-secondary)]"
            >
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)]/18 text-[var(--text-secondary)]">
                <Check size={12} strokeWidth={3} aria-hidden />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServiceSeoRelated({ seo }) {
  if (!seo?.related?.length) return null;
  return (
    <section className="gc-section-tight" aria-labelledby="seo-related-heading">
      <div className="gc-container">
        <h2
          id="seo-related-heading"
          className="font-display text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-2xl"
        >
          Related pages
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {seo.related.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="inline-flex min-h-11 items-center rounded-xl border border-[color:var(--border-soft)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-soft)]/40"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServiceSeoFaqs({ seo }) {
  if (!seo?.faqs?.items?.length) return null;
  return (
    <section className="gc-section-tight" aria-labelledby="seo-faq-heading">
      <div className="gc-container">
        <h2
          id="seo-faq-heading"
          className="font-display text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-2xl"
        >
          {seo.faqs.heading}
        </h2>
        <div className="mt-6 space-y-3">
          {seo.faqs.items.map((item) => (
            <article
              key={item.q}
              className="gc-card-sm px-5 py-4 sm:px-6 sm:py-5"
            >
              <h3 className="font-display text-base font-semibold text-[var(--text-primary)]">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{item.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceSeoClosing({ seo, serviceTitle }) {
  if (!seo?.closing) return null;
  return (
    <section className="gc-section" aria-labelledby="seo-closing-heading">
      <div className="gc-card gc-card-panel gc-container overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--surface)] to-[var(--bg-primary)] px-5 py-8 sm:px-8 sm:py-10 md:px-12">
        <h2
          id="seo-closing-heading"
          className="font-display text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-2xl"
        >
          {seo.closing.heading}
        </h2>
        <div className="mt-3 max-w-3xl space-y-3">
          {seo.closing.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-6">
          <MagneticButton to="/contact" className="w-full justify-center sm:w-auto">
            Get started with {serviceTitle}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

/** Extra SEO card grids, each section has an h2 header + card h3 titles for crawlers. */
export function ServiceSeoCardSection({ section }) {
  if (!section?.cards?.length) return null;
  const headingId = `seo-cards-${section.key}-heading`;

  return (
    <section className="gc-section-tight" aria-labelledby={headingId}>
      <div className="gc-container">
        <header className="max-w-3xl">
          <h2
            id={headingId}
            className="font-display text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-2xl"
          >
            {section.heading}
          </h2>
          {section.intro ? (
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">{section.intro}</p>
          ) : null}
        </header>
        <ul
          className={`mt-6 grid gap-4 ${
            section.cards.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {section.cards.map((card) => (
            <RevealCard key={`${section.key}-${card.title}`} as="li" className="p-5 sm:p-6">
              <h3 className="font-display text-base font-semibold text-[var(--text-primary)]">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{card.text}</p>
            </RevealCard>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServiceSeoCardSections({ sections }) {
  if (!sections?.length) return null;
  return sections.map((section) => <ServiceSeoCardSection key={section.key} section={section} />);
}
