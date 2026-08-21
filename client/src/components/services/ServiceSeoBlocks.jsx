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
          className="font-display text-xl font-semibold tracking-[-0.02em] text-[#2F4C73] sm:text-2xl"
        >
          {seo.overview.heading}
        </h2>
        <div className="mt-4 space-y-4">
          {seo.overview.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-[#6B7C8F] md:text-base">
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
          className="font-display text-xl font-semibold tracking-[-0.02em] text-[#2F4C73] sm:text-2xl"
        >
          {seo.benefits.heading}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <RevealCard key={item.title} as="li" className="p-5 sm:p-6">
              <h3 className="font-display text-base font-semibold text-[#2F4C73]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7C8F]">{item.text}</p>
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
      <div className="gc-card gc-card-panel gc-container bg-[#F8FAFC] p-5 sm:p-8 md:p-10">
        <h2
          id="seo-how-heading"
          className="font-display text-xl font-semibold tracking-[-0.02em] text-[#2F4C73] sm:text-2xl"
        >
          {seo.howItWorks.heading}
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {seo.howItWorks.steps.map((step, index) => (
            <RevealCard key={step.title} as="li" className="p-5">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-[#4A6B94]/35 bg-[#4A6B94]/10 text-xs font-semibold text-[#4A6B94]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-[#2F4C73]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7C8F]">{step.text}</p>
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
          className="font-display text-xl font-semibold tracking-[-0.02em] text-[#2F4C73] sm:text-2xl"
        >
          {seo.useCases.heading}
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {seo.useCases.items.map((item) => (
            <li
              key={item}
              className="gc-card-sm flex items-start gap-3 px-4 py-3.5 text-sm leading-snug text-[#4A5D73]"
            >
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#4A6B94]/15 text-[#6B8AB0]">
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

export function ServiceSeoFaqs({ seo }) {
  if (!seo?.faqs?.items?.length) return null;
  return (
    <section className="gc-section-tight" aria-labelledby="seo-faq-heading">
      <div className="gc-container">
        <h2
          id="seo-faq-heading"
          className="font-display text-xl font-semibold tracking-[-0.02em] text-[#2F4C73] sm:text-2xl"
        >
          {seo.faqs.heading}
        </h2>
        <div className="mt-6 space-y-3">
          {seo.faqs.items.map((item) => (
            <article
              key={item.q}
              className="gc-card-sm px-5 py-4 sm:px-6 sm:py-5"
            >
              <h3 className="font-display text-base font-semibold text-[#2F4C73]">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7C8F]">{item.a}</p>
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
      <div className="gc-card gc-card-panel gc-container overflow-hidden bg-gradient-to-br from-[#E8ECF2] via-[#FFFFFF] to-[#F4F6F9] px-5 py-8 sm:px-8 sm:py-10 md:px-12">
        <h2
          id="seo-closing-heading"
          className="font-display text-xl font-semibold tracking-[-0.02em] text-[#2F4C73] sm:text-2xl"
        >
          {seo.closing.heading}
        </h2>
        <div className="mt-3 max-w-3xl space-y-3">
          {seo.closing.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-[#4A5D73] md:text-base">
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
            className="font-display text-xl font-semibold tracking-[-0.02em] text-[#2F4C73] sm:text-2xl"
          >
            {section.heading}
          </h2>
          {section.intro ? (
            <p className="mt-3 text-sm leading-relaxed text-[#6B7C8F] md:text-base">{section.intro}</p>
          ) : null}
        </header>
        <ul
          className={`mt-6 grid gap-4 ${
            section.cards.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {section.cards.map((card) => (
            <RevealCard key={`${section.key}-${card.title}`} as="li" className="p-5 sm:p-6">
              <h3 className="font-display text-base font-semibold text-[#2F4C73]">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7C8F]">{card.text}</p>
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
