import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import StatsBand from '../ui/StatsBand';
import { AnimatedSection, RevealCard, StaggerContainer } from '../motion';

const pillars = [
  {
    title: 'Infrastructure that holds',
    copy: 'Redundant systems and a 99.9% uptime guarantee so you never miss a call.',
  },
  {
    title: 'Scales with your team',
    copy: 'Grow from 5 to 5,000 users seamlessly on our cloud-based architecture.',
  },
  {
    title: 'Support that responds',
    copy: '24/7 expert technical support via phone, email, and live chat.',
  },
];

export default function AboutPreview() {
  return (
    <section className="relative px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto mb-8 max-w-6xl sm:mb-10">
        <StatsBand />
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-10">
        <div>
          <SectionHeading
            eyebrow="About"
            title="Your trusted partner in business communication."
            description="Go Connectivo delivers cloud telephony, dialer platforms, and inbound/outbound voice so contact centers and growing teams stay connected."
            className="!mb-4"
          />
          <AnimatedSection from="up" delay={0.05}>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#6B8AB0] transition-colors duration-300 hover:text-[#2F4C73]"
            >
              Learn more about us
              <ArrowUpRight
                size={16}
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </AnimatedSection>
        </div>

        <StaggerContainer className="grid gap-4" stagger={0.12} from="left">
          {pillars.map((item) => (
            <RevealCard
              key={item.title}
              as="article"
              className="rounded-2xl border border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#4A6B94]/35 hover:bg-white/[0.05]"
            >
              <h3 className="font-display text-lg font-semibold text-[#2F4C73]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7C8F]">{item.copy}</p>
            </RevealCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
