import { AnimatedSection, ParallaxElement, TextReveal } from '../motion';

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  children,
  image,
  imageAlt = '',
}) {
  const hasImage = Boolean(image);

  return (
    <section className="relative overflow-x-clip overflow-y-hidden px-5 pt-28 pb-12 sm:px-6 sm:pt-36 sm:pb-16">
      <div className="grid-fade pointer-events-none absolute inset-0 opacity-60" />
      <ParallaxElement
        speed={14}
        className="pointer-events-none absolute top-16 left-1/4 h-64 w-64 rounded-full bg-[#4A6B94]/20 blur-[110px]"
      />
      <ParallaxElement
        speed={-12}
        className="pointer-events-none absolute top-32 right-10 h-56 w-56 rounded-full bg-[#6B8AB0]/15 blur-[110px]"
      />

      <div
        className={`relative mx-auto w-full min-w-0 max-w-6xl ${
          hasImage ? 'grid items-center gap-8 lg:grid-cols-[1.15fr_0.75fr] lg:gap-10' : ''
        }`}
      >
        <div className={hasImage ? 'min-w-0' : ''}>
          {eyebrow && (
            <AnimatedSection from="up" duration={0.7}>
              <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-[#4A6B94] uppercase">
                {eyebrow}
              </p>
            </AnimatedSection>
          )}

          <TextReveal
            as="h1"
            className={`font-display text-[1.75rem] leading-[1.12] font-extrabold tracking-[-0.03em] break-words text-[#2F4C73] sm:text-5xl sm:leading-none sm:tracking-[-0.04em] md:text-6xl ${
              hasImage ? 'max-w-xl' : 'max-w-3xl'
            }`}
            parts={[
              { text: title },
              ...(highlight ? [{ text: highlight, className: 'gradient-text-brand' }] : []),
            ]}
            duration={0.95}
          />

          {description && (
            <AnimatedSection from="up" delay={0.1} duration={0.85}>
              <p
                className={`mt-5 text-base leading-relaxed text-[#8A9AA8] md:text-lg ${
                  hasImage ? 'max-w-lg' : 'max-w-2xl'
                }`}
              >
                {description}
              </p>
            </AnimatedSection>
          )}

          {children && (
            <AnimatedSection from="up" delay={0.16} duration={0.8}>
              <div className="mt-8">{children}</div>
            </AnimatedSection>
          )}
        </div>

        {hasImage ? (
          <AnimatedSection from="right" delay={0.12} duration={0.9} className="relative">
            <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-[#4A6B94]/10 blur-3xl sm:-inset-5" />
            <div className="relative mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl border border-[rgba(47,76,115,0.12)] bg-[#FFFFFF] shadow-[0_14px_36px_rgba(47,76,115,0.1)] sm:max-w-[320px] sm:rounded-[1.25rem] md:ml-auto md:max-w-[340px]">
              <img
                src={image}
                alt={imageAlt || title || 'Service illustration'}
                className="aspect-[3/2] w-full object-cover object-center"
                loading="eager"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#F4F6F9]/40 via-transparent to-transparent" />
            </div>
          </AnimatedSection>
        ) : null}
      </div>
    </section>
  );
}
