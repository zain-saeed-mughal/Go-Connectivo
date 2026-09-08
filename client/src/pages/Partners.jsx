import { lazy, Suspense } from 'react';
import PartnerMark from '../components/ui/PartnerMark';
import { RevealCard, StaggerContainer } from '../components/motion';
import { marketingPartners } from '../data/content';
import { PageSeo } from '../components/seo/PageSeo';

const CTA = lazy(() => import('../components/home/CTA'));

export default function Partners() {
  return (
    <>
      <PageSeo
        path="/partners"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Marketing Partners', path: '/partners' },
        ]}
      />

      <section className="gc-section pt-52 sm:pt-56 md:pt-64">
        <div className="gc-container">
          <h1 className="font-display mb-8 text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-tight text-[var(--text-primary)] sm:mb-10">
            Marketing Partners
          </h1>

          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {marketingPartners.map((partner, index) => {
              const body = (
                <article className="partner-card gc-card group relative flex h-full flex-col overflow-hidden p-5 sm:p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <PartnerMark partner={partner} size="lg" />
                    <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-primary)] tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {partner.blurb}
                  </p>
                  <span className="sr-only">{partner.name}</span>
                </article>
              );

              return (
                <RevealCard key={partner.id}>
                  {partner.website ? (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full no-underline"
                    >
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </RevealCard>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[36vh]" aria-hidden />}>
        <CTA />
      </Suspense>
    </>
  );
}
