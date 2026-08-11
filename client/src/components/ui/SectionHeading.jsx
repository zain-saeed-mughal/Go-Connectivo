import { AnimatedSection, TextReveal } from '../motion';

export default function SectionHeading({ eyebrow, title, description, align = 'left', className = '' }) {
  const alignment =
    align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left';

  return (
    <div className={`mb-8 flex max-w-3xl flex-col gap-2.5 md:mb-10 ${alignment} ${className}`.trim()}>
      {eyebrow && (
        <AnimatedSection from="up" duration={0.7}>
          <p className="text-xs font-semibold tracking-[0.22em] text-[#4A6B94] uppercase">
            {eyebrow}
          </p>
        </AnimatedSection>
      )}

      <TextReveal
        as="h2"
        className="font-display text-[1.65rem] leading-tight font-bold tracking-[-0.03em] text-[#2F4C73] sm:text-4xl md:text-5xl"
        parts={[{ text: title }]}
        duration={0.95}
      />

      {description && (
        <AnimatedSection from="up" delay={0.08} duration={0.85}>
          <p className="max-w-2xl text-base leading-relaxed text-[#6B7C8F] md:text-lg">
            {description}
          </p>
        </AnimatedSection>
      )}
    </div>
  );
}
