import PageHero from '../components/ui/PageHero';
import MagneticButton from '../components/ui/MagneticButton';
import CTA from '../components/home/CTA';
import { RevealCard, StaggerContainer } from '../components/motion';
import { complianceItems } from '../data/content';
import { PageSeo } from '../components/seo/PageSeo';

/**
 * Brand-style lockup: seal mark + wordmark title (VIP compliance rows).
 */
function ComplianceBrandLockup({ mark, title, index }) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-3 sm:gap-3.5">
      <span
        className="inline-flex h-11 min-w-[3.25rem] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1C314F] via-[#2F4C73] to-[#4A6B94] px-2.5 shadow-[0_8px_22px_rgba(47,76,115,0.28)] ring-1 ring-white/15"
        aria-hidden
      >
        <span className="font-display text-[11px] font-extrabold tracking-[0.12em] text-[#F4F6F9] uppercase sm:text-xs">
          {mark}
        </span>
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[#6B8AB0] uppercase">
          Credential {String(index + 1).padStart(2, '0')}
        </p>
        <h2 className="font-display text-lg font-bold tracking-[-0.03em] text-[#1C314F] sm:text-xl md:text-[1.35rem]">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function Compliance() {
  return (
    <>
      <PageSeo
        path="/compliance"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Compliance', path: '/compliance' },
        ]}
      />
      <PageHero
        eyebrow="Trust & governance"
        title="Legal"
        highlight="Compliance"
        description="How Go Connectivo approaches caller authentication, federal reporting, numbering, privacy, and abuse prevention across our voice network."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <MagneticButton to="/contact" className="w-full justify-center sm:w-auto">
            Talk to our team
          </MagneticButton>
          <MagneticButton
            to="/compliance/robocall-mitigation-plan"
            variant="secondary"
            className="w-full justify-center sm:w-auto"
          >
            Robocall Mitigation Plan
          </MagneticButton>
        </div>
      </PageHero>

      <section className="gc-section">
        <div className="gc-container">
          <StaggerContainer className="grid gap-4 sm:gap-5" stagger={0.06} from="up">
            {complianceItems.map((item, index) => (
              <RevealCard
                key={item.title}
                as="article"
                id={item.id}
                className="group relative scroll-mt-28 overflow-hidden border border-[rgba(47,76,115,0.1)] bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#EEF3F8] p-5 shadow-[0_12px_40px_rgba(28,49,79,0.06)] sm:p-6 md:p-7"
                data-cursor-label="Read"
              >
                <div
                  className="pointer-events-none absolute -right-8 top-0 h-28 w-28 rounded-full bg-[#6B8AB0]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="relative flex flex-col gap-4">
                  <ComplianceBrandLockup mark={item.mark} title={item.title} index={index} />
                  <p className="border-t border-[rgba(47,76,115,0.08)] pt-3 text-sm leading-relaxed text-[#5A6F86] sm:text-[0.95rem]">
                    {item.body}
                  </p>
                  {item.id === 'rmp' ? (
                    <MagneticButton
                      to="/compliance/robocall-mitigation-plan"
                      variant="secondary"
                      className="w-full justify-center sm:w-auto"
                    >
                      Read Robocall Mitigation Plan
                    </MagneticButton>
                  ) : null}
                </div>
              </RevealCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTA />
    </>
  );
}
