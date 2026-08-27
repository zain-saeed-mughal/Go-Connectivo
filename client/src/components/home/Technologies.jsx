import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { serviceCategories } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import ServiceIcon from '../ui/ServiceIcon';
import { StaggerContainer, RevealCard } from '../motion';

const categoryLinks = {
  'business-communications': '/services/business-voip',
  'contact-center': '/services/call-center-software',
  'numbers-inbound': '/services/did-services',
  'carrier-voice': '/services/voip-termination',
  'apis-messaging': '/services/voice-api',
};

/**
 * Features / platform map — browse by category (no second 3D stage).
 */
export default function Technologies() {
  return (
    <section className="gc-section relative overflow-x-clip">
      <div className="gc-container relative">
        <SectionHeading
          eyebrow="Features"
          title="Browse the stack by category."
          description="Five clear product groups so buyers can jump straight to the right service pages."
        />

        <StaggerContainer
          className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
          stagger={0.07}
          from="up"
        >
          {serviceCategories.map((group) => (
            <RevealCard
              key={group.id}
              as="article"
              className="group flex h-full flex-col border border-[color:var(--border-soft)] p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-soft)]/40 hover:shadow-[var(--shadow-card-hover)] sm:p-6"
            >
              <div className="mb-4 flex min-h-[2.75rem] items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--accent-soft)]/16 text-[var(--text-primary)] ring-1 ring-[var(--accent-soft)]/10 transition-colors duration-300 group-hover:bg-[var(--accent-soft)]/22">
                  <ServiceIcon name={group.icon} size={18} />
                </span>
                <h3 className="font-display text-lg leading-snug font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                  {group.title}
                </h3>
              </div>

              <p className="mb-4 flex-1 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)] sm:text-sm">{group.description}</p>

              <Link
                to={categoryLinks[group.id] || '/services'}
                className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-soft)]/45"
              >
                Explore
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </RevealCard>
          ))}
        </StaggerContainer>

        <div className="mt-8 text-center sm:mt-10">
          <Link
            to="/services"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-soft)]/45"
          >
            View full services catalog
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
