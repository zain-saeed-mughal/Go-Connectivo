import { Check } from 'lucide-react';
import { whyUs } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import TelecomScene3DLazy from '../ui/TelecomScene3DLazy';
import { SlideUpOnView, StaggerContainer } from '../motion';

const featureChips = [
  'Business VoIP',
  'SIP Trunking',
  'Contact Center',
  'VoIP Termination',
  'DID Numbers',
  'Dialers',
];

/**
 * Advantages — commercial outcomes with a smooth panel entrance.
 * Outer shell avoids .gc-card preserve-3d so border-radius actually clips.
 */
export default function WhyUs() {
  return (
    <section className="gc-section">
      <div className="gc-container grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
        <SlideUpOnView className="min-w-0" distance={36}>
          <SectionHeading
            eyebrow="Advantages"
            title="Practical gains from day one."
            description="Clear rates, guided provisioning, and voice-specialist support without legacy overhead."
            animated={false}
          />

          <StaggerContainer className="space-y-5" stagger={0.1} from="up" start="top 88%">
            {whyUs.map((item) => (
              <div key={item.title} className="group flex items-start gap-4">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-on-accent)] shadow-[var(--shadow-card-hover)] transition-transform duration-500 group-hover:scale-110">
                  <Check size={14} strokeWidth={3} aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </SlideUpOnView>

        <SlideUpOnView className="min-w-0" distance={44} delay={0.08}>
          <div className="why-us-panel relative isolate overflow-hidden rounded-[1.25rem] border border-[color:var(--border-soft)] p-6 shadow-[var(--shadow-card)] sm:rounded-[1.5rem] sm:p-8">
            {/* 3D tower backdrop — clipped by overflow:hidden on panel */}
            <div className="why-us-panel__scene pointer-events-none absolute inset-0 z-0 hidden lg:block">
              <TelecomScene3DLazy
                variant="tower"
                className="min-h-full"
                interactive={false}
                scrollScrub={false}
                keepAlive={false}
                slotPriority={4}
              />
            </div>
            <div className="pointer-events-none absolute -top-10 -right-10 z-0 h-40 w-40 rounded-full bg-[var(--accent-primary)]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-8 z-0 h-44 w-44 rounded-full bg-[var(--accent-secondary)]/15 blur-3xl" />

            <StaggerContainer
              className="relative z-[1] space-y-4"
              stagger={0.09}
              from="up"
              start="top 90%"
              delay={0.12}
            >
              <div className="rounded-2xl border border-[color:var(--border-soft)] bg-[var(--surface)]/92 p-5 backdrop-blur-[2px]">
                <p className="text-sm font-medium text-[var(--text-secondary)]">Traditional phone systems</p>
                <p className="mt-1.5 text-sm text-[var(--text-secondary)]">Higher overhead · Slower change cycles</p>
              </div>

              <div className="rounded-2xl border border-[color:var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]">
                <p className="text-sm font-medium text-[var(--text-primary)]">Go Connectivo</p>
                <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
                  Competitive rates · Guided go-live · Specialist support
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3">
                {featureChips.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-xl border border-[color:var(--border-soft)] bg-[var(--surface)]/90 px-3 py-2 text-center text-[11px] leading-tight text-[var(--text-secondary)]"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </SlideUpOnView>
      </div>
    </section>
  );
}
