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
          eyebrow="Built for"
          title="How teams use Go Connectivo."
          description="Common operating contexts we support, without fabricated customer quotes or unverified savings claims."
        />

        <StaggerContainer className="grid gap-4 md:grid-cols-3" stagger={0.1}>
          {homeProofPoints.map((item) => (
            <RevealCard key={item.title} className="flex h-full flex-col p-6">
              <h3 className="font-display text-lg font-semibold text-[#1C314F]">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4A5D73]">{item.text}</p>
              <Link
                to={item.to}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#4A6B94] hover:text-[#2F4C73]"
              >
                Explore related service <ArrowRight size={14} />
              </Link>
            </RevealCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
