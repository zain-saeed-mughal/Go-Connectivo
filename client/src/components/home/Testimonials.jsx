import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { homeProofPoints } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import { RevealCard, StaggerContainer } from '../motion';

/**
 * Replaces unverified testimonials with factual use-case cards.
 */
export default function Testimonials() {
  return (
    <section className="gc-section">
      <div className="gc-container">
        <SectionHeading
          eyebrow="Use cases"
          title="How teams use Go Connectivo."
          description="Common operating contexts we support, without fabricated quotes or unverified savings claims."
        />

        <StaggerContainer className="grid gap-4 md:grid-cols-3" stagger={0.1}>
          {homeProofPoints.map((item) => (
            <RevealCard key={item.title} className="flex h-full flex-col border border-[color:var(--border-soft)] p-5 sm:p-6">
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">{item.title}</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)] sm:text-sm">{item.text}</p>
              <Link
                to={item.to}
                className="mt-5 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-soft)]/45"
              >
                Explore related service <ArrowRight size={14} aria-hidden />
              </Link>
            </RevealCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
