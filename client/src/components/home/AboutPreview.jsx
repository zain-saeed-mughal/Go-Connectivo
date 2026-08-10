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
    <section className="relative px-4 py-16 sm:px-6 sm:py-24 md:py-28">
      <div className="mx-auto mb-16 max-w-6xl">
        <StatsBand />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <SectionHeading
            eyebrow="About"
            title="Your trusted partner in business communication."
            description="Go Connectivo delivers cloud telephony, dialer platforms, and inbound/outbound voice so contact centers and growing teams stay connected."
          />
          <AnimatedSection from="up" delay={0.05}>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#ffb86b] transition-colors duration-300 hover:text-white"
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
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#f58220]/35 hover:bg-white/[0.05]"
            >
              <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#9a9ab0]">{item.copy}</p>
            </RevealCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
