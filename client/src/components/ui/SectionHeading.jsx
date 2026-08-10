import { AnimatedSection, TextReveal } from '../motion';

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment =
    align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left';

  return (
    <div className={`mb-10 flex max-w-3xl flex-col gap-3 md:mb-14 ${alignment}`}>
      {eyebrow && (
        <AnimatedSection from="up" duration={0.7}>
          <p className="text-xs font-semibold tracking-[0.22em] text-[#ff8a1f] uppercase">
            {eyebrow}
          </p>
        </AnimatedSection>
      )}

      <TextReveal
        as="h2"
        className="font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl"
        parts={[{ text: title }]}
        duration={0.95}
      />

      {description && (
        <AnimatedSection from="up" delay={0.08} duration={0.85}>
          <p className="max-w-2xl text-base leading-relaxed text-[#9a9ab0] md:text-lg">
            {description}
          </p>
        </AnimatedSection>
      )}
    </div>
  );
}
