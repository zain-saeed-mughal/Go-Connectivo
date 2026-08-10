import { ArrowRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
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
    <section className="px-4 py-16 sm:px-6 sm:py-24 md:py-28">
      <div
        ref={scope}
        className="gc-will-reveal relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 px-6 py-14 sm:px-10 md:px-16"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1208] via-[#14100a] to-[#050505]" />
        <ParallaxElement
          speed={16}
          className="absolute top-0 -left-10 h-48 w-48 rounded-full bg-[#e86f0c]/30 blur-3xl"
        />
        <ParallaxElement
          speed={-14}
          className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-[#ff6b00]/25 blur-3xl"
        />

        <div className="relative max-w-2xl">
          <AnimatedSection from="up" duration={0.6}>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#ffb86b] uppercase">
              Next step
            </p>
          </AnimatedSection>

          <TextReveal
            as="h2"
            className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl"
            parts={[
              { text: 'Ready to transform your business' },
              { text: 'communication?', className: 'gradient-text-brand' },
            ]}
            delay={0.04}
            duration={0.65}
          />

          <AnimatedSection from="up" delay={0.08}>
            <p className="mt-4 text-base leading-relaxed text-[#b0b0c4]">
              Get started with Go Connectivo today and experience the difference.
            </p>
          </AnimatedSection>

          <AnimatedSection from="up" delay={0.12}>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton to="/contact">
                Start Free Trial
                <ArrowRight
                  size={16}
                  className="transition-transform duration-500 group-hover/btn:translate-x-1"
                />
              </MagneticButton>
              <MagneticButton to="/services" variant="secondary">
                View Services
              </MagneticButton>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
