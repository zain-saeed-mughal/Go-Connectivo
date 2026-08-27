import voipCloud from '../../assets/services/voip-1.webp';
import { whyChoose } from '../../data/content';
import ServiceIcon from '../ui/ServiceIcon';
import { RevealCard, SlideUpOnView, StaggerContainer } from '../motion';
import MotionParallax from '../motion/MotionParallax';

/**
 * Why Choose — reliability, support, go-live, pricing (distinct from About / WhyUs).
 */
export default function WhyChoose() {
  return (
    <section className="gc-section relative overflow-x-clip">
      <MotionParallax
        speed={30}
        className="gc-glow pointer-events-none absolute top-24 left-1/3 h-48 w-48 rounded-full bg-[var(--accent-soft)]/12 sm:h-64 sm:w-64"
      >
        <span className="block h-full w-full" aria-hidden="true" />
      </MotionParallax>

      <div className="gc-container relative">
        <SlideUpOnView className="mb-8 grid items-center gap-6 md:mb-10 md:grid-cols-[1.2fr_0.8fr] md:gap-10 lg:gap-12">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[var(--text-secondary)] uppercase sm:text-xs sm:tracking-[0.22em]">
              Why Choose Go Connectivo
            </p>
            <h2 className="font-display gradient-text-brand mt-2.5 max-w-xl text-[clamp(1.35rem,4.2vw,2.75rem)] leading-[1.15] font-bold tracking-[-0.03em] text-balance">
              Built for reliability, support, and a clean go-live.
            </h2>
            <p className="gc-prose-muted mt-3 max-w-lg text-[15px] leading-relaxed">
              Infrastructure and specialist help that keep voice floors productive after launch.
            </p>
          </div>

          <div className="gc-card mx-auto w-full max-w-[240px] overflow-hidden sm:max-w-[280px] md:ml-auto md:max-w-[300px]">
            <img
              src={voipCloud}
              alt="Cloud VoIP connecting desk phones, mobiles, and softphones"
              className="aspect-[735/490] h-auto w-full object-cover"
              width={735}
              height={490}
              loading="lazy"
              decoding="async"
            />
          </div>
        </SlideUpOnView>

        <StaggerContainer
          className="grid auto-rows-fr gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
          stagger={0.08}
          from="up"
        >
          {whyChoose.map((item) => (
            <RevealCard
              key={item.title}
              as="article"
              className="group flex h-full flex-col border border-[color:var(--border-soft)] px-4 py-5 text-left transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-soft)]/35 hover:shadow-[var(--shadow-soft)] sm:px-5 sm:py-5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-[color:var(--border-soft)] bg-[var(--accent-soft)]/16 text-[var(--text-primary)] transition-colors duration-300 group-hover:bg-[var(--accent-soft)]/22">
                <ServiceIcon name={item.icon} size={18} />
              </span>
              <h3 className="font-display mt-4 text-[15px] font-semibold leading-snug text-[var(--text-primary)] sm:text-base">
                {item.title}
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[0.9375rem]">
                {item.description}
              </p>
            </RevealCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
