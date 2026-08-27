import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import voipVisual from '../../assets/services/voip-3.webp';
import SectionHeading from '../ui/SectionHeading';
import StatsBand from '../ui/StatsBand';
import { SlideUpOnView } from '../motion';

/**
 * About teaser — company positioning + capability strip + visual.
 */
export default function AboutPreview() {
  return (
    <section className="gc-section relative !pt-4 sm:!pt-6 md:!pt-8">
      <div className="gc-container mb-8 sm:mb-10">
        <StatsBand />
      </div>

      <div className="gc-container">
        <SlideUpOnView
          distance={28}
          className="grid items-center gap-6 md:grid-cols-[1.15fr_0.85fr] md:gap-8 lg:gap-10"
        >
          <div className="min-w-0">
            <SectionHeading
              eyebrow="About"
              title="A practical voice partner for production floors."
              description="Go Connectivo helps contact centers and growing teams run Business VoIP, contact-center tools, SIP trunks, numbers, and VoIP Termination with clear support and guided onboarding."
              className="!mb-5 lg:!mb-6"
              animated={false}
            />
            <Link
              to="/about"
              className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-soft)]/45"
            >
              Learn more about us
              <ArrowUpRight
                size={16}
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </div>

          <div className="gc-card mx-auto w-full max-w-[240px] overflow-hidden sm:max-w-[280px] md:ml-auto md:max-w-[300px]">
            <img
              src={voipVisual}
              alt="Business voice, dialers, and VoIP network"
              className="aspect-[735/490] h-auto w-full object-cover"
              width={735}
              height={490}
              loading="lazy"
              decoding="async"
            />
          </div>
        </SlideUpOnView>
      </div>
    </section>
  );
}
