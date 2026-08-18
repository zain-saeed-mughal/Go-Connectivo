import { Check } from 'lucide-react';
import { whyUs } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import TelecomScene3DLazy from '../ui/TelecomScene3DLazy';
import { ImageReveal, StaggerContainer } from '../motion';

const featureChips = [
  'Predictive dialer',
  'Hosted PBX',
  'SIP Trunking',
  'VoIP Termination',
  'Local DIDs',
  'Call analytics',
];

export default function WhyUs() {
  return (
    <section className="gc-section">
      <div className="gc-container grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
        <div>
          <SectionHeading
            eyebrow="Why Businesses Choose Us"
            title="Practical advantages from day one."
            description="Lower costs, faster setup, and enterprise features without the enterprise overhead."
          />

          <StaggerContainer className="space-y-5" stagger={0.11} from="left">
            {whyUs.map((item) => (
              <div key={item.title} className="group flex items-start gap-4">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#4A6B94] to-[#2F4C73] text-[#FFFFFF] shadow-[0_6px_18px_rgba(47,76,115,0.35)] transition-transform duration-500 group-hover:scale-110">
                  <Check size={14} strokeWidth={3} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#2F4C73]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#6B7C8F]">{item.description}</p>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </div>

        <ImageReveal
          direction="up"
          className="gc-card"
          innerClassName="relative bg-gradient-to-br from-[#E8ECF2] via-[#E0E5ED] to-[#FFFFFF] p-8"
        >
          <div className="pointer-events-none absolute inset-0 hidden opacity-70 lg:block">
            <TelecomScene3DLazy variant="tower" className="min-h-full" interactive scrollScrub />
          </div>
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#2F4C73]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-[#4A6B94]/20 blur-3xl" />

          <div className="relative space-y-4">
            <div className="gc-card rounded-2xl p-5">
              <p className="text-sm font-medium text-[#8d8da8]">Traditional phone systems</p>
              <p className="mt-1.5 text-sm text-[#6B7C8F]">High cost · Slow setup</p>
            </div>

            <div className="gc-card gc-card-accent rounded-2xl p-5">
              <p className="text-sm font-medium text-[#2F4C73]">Go Connectivo</p>
              <p className="mt-1.5 text-sm text-[#6B8AB0]">
                Up to 60% savings · Minutes to launch
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3">
              {featureChips.map((feature) => (
                <span
                  key={feature}
                  className="gc-card-sm px-3 py-2 text-center text-[11px] leading-tight text-[#6B7C8F]"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </ImageReveal>
      </div>
    </section>
  );
}
