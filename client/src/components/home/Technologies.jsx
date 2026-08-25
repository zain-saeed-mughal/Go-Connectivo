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
              className="group flex h-full flex-col border border-[rgba(47,76,115,0.1)] p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[#4A6B94]/40 hover:shadow-[0_14px_36px_rgba(47,76,115,0.1)] sm:p-6"
            >
              <div className="mb-4 flex min-h-[2.75rem] items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#4A6B94]/12 text-[#2F4C73] ring-1 ring-[#4A6B94]/10 transition-colors duration-300 group-hover:bg-[#4A6B94]/18">
                  <ServiceIcon name={group.icon} size={18} />
                </span>
                <h3 className="font-display text-lg leading-snug font-semibold tracking-[-0.02em] text-[#2F4C73]">
                  {group.title}
                </h3>
              </div>

              <p className="mb-4 flex-1 text-[0.9375rem] leading-relaxed text-[#5A6B7D] sm:text-sm">{group.description}</p>

              <Link
                to={categoryLinks[group.id] || '/services'}
                className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-[#2F4C73] transition-colors hover:text-[#4A6B94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A6B94]/45"
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
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#4A6B94] transition-colors hover:text-[#2F4C73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A6B94]/45"
          >
            View full services catalog
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
