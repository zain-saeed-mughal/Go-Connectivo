import { ArrowRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import HolographicHub3D from '../ui/HolographicHub3DLazy';
import { AnimatedSection, ParallaxElement, TextReveal } from '../motion';
import { ease } from '../../motion/config';
import { createReveal } from '../../motion/reveal';
import { useGsapContext } from '../../motion/useGsapContext';

export default function CTA() {
  const scope = useGsapContext(() => {
    createReveal({
      targets: scope.current,
      trigger: scope.current,
      from: { clipPath: 'inset(5% 3% 5% 3% round 2rem)', autoAlpha: 0 },
      to: { clipPath: 'inset(0% 0% 0% 0% round 2rem)', autoAlpha: 1 },
      duration: 1,
      start: 'top 90%',
      ease: ease.reveal,
    });
  }, []);

  return (
    <section className="gc-section">
      <div
        ref={scope}
        className="gc-card gc-container relative overflow-hidden px-5 py-9 sm:px-10 sm:py-14 md:px-16"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--surface)] to-[var(--bg-primary)]" />
        <div className="pointer-events-none absolute top-1/2 right-[-8%] hidden h-[320px] w-[320px] -translate-y-1/2 opacity-55 md:block lg:right-0 lg:h-[380px] lg:w-[380px]">
          <HolographicHub3D className="h-full min-h-full w-full" />
        </div>
        <ParallaxElement
          speed={16}
          className="absolute top-0 -left-10 h-48 w-48 rounded-full bg-[var(--accent-soft)]/28 blur-3xl"
        />
        <ParallaxElement
          speed={-14}
          className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-[var(--accent-soft)]/18 blur-3xl"
        />

        <div className="relative max-w-2xl">
          <AnimatedSection from="up" duration={0.6}>
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--text-primary)] uppercase">
              Next step
            </p>
          </AnimatedSection>

          <TextReveal
            as="h2"
            className="mt-3 font-display text-[1.65rem] font-bold tracking-[-0.03em] break-words sm:text-4xl md:text-5xl"
            parts={[
              { text: 'Ready to launch your', className: 'gradient-text-brand' },
              { text: 'voice stack?', className: 'gradient-text-brand' },
            ]}
            delay={0.04}
            duration={0.65}
          />

          <AnimatedSection from="up" delay={0.08}>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
              Tell us whether you need Business VoIP, contact center, SIP trunking, or VoIP
              Termination, and we will scope a stack that fits how your floor works.
            </p>
          </AnimatedSection>

          <AnimatedSection from="up" delay={0.12}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <MagneticButton to="/contact" className="w-full justify-center sm:w-auto">
                Get Started
                <ArrowRight
                  size={16}
                  className="transition-transform duration-500 group-hover/btn:translate-x-1"
                />
              </MagneticButton>
              <MagneticButton to="/services" variant="secondary" className="w-full justify-center sm:w-auto">
                Explore Services
              </MagneticButton>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
