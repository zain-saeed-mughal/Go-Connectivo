import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import StatsBand from '../ui/StatsBand';
import { RevealCard, SlideUpOnView, StaggerContainer } from '../motion';

const pillars = [
  {
    title: 'Infrastructure that holds',
      copy: 'Redundant routes and monitored trunks so agents stay reachable when a path fails.',
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
    <section className="gc-section relative">
      <div className="gc-container mb-8 sm:mb-10">
        <StatsBand />
      </div>

      <div className="gc-container grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <SlideUpOnView className="min-w-0">
          <SectionHeading
            eyebrow="About"
            title="Your trusted partner in business communication."
            description="Go Connectivo delivers dialers, business voice, inbound numbers, carrier termination, contact-center tools, and APIs so contact centers and growing teams stay connected."
            className="!mb-4"
            animated={false}
          />
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
        </SlideUpOnView>

        <StaggerContainer className="grid min-w-0 gap-4" stagger={0.12} from="up">
          {pillars.map((item) => (
            <RevealCard
              key={item.title}
              as="article"
              className="p-5"
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
