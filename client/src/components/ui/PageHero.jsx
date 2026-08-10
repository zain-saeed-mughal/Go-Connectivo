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
    <section className="relative overflow-hidden px-4 pt-28 pb-12 sm:px-6 sm:pt-36 sm:pb-16">
      <div className="grid-fade pointer-events-none absolute inset-0 opacity-60" />
      <ParallaxElement
        speed={14}
        className="pointer-events-none absolute top-16 left-1/4 h-64 w-64 rounded-full bg-[#e86f0c]/20 blur-[110px]"
      />
      <ParallaxElement
        speed={-12}
        className="pointer-events-none absolute top-32 right-10 h-56 w-56 rounded-full bg-[#ff6b00]/20 blur-[110px]"
      />

      <div
        className={`relative mx-auto max-w-6xl ${
          hasImage ? 'grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12' : ''
        }`}
      >
        <div className={hasImage ? 'min-w-0' : ''}>
          {eyebrow && (
            <AnimatedSection from="up" duration={0.7}>
              <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-[#ff8a1f] uppercase">
                {eyebrow}
              </p>
            </AnimatedSection>
          )}

          <TextReveal
            as="h1"
            className={`font-display text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl md:text-6xl ${
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
                className={`mt-5 text-base leading-relaxed text-[#9a9ab0] md:text-lg ${
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
            <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-[#f58220]/10 blur-3xl sm:-inset-6" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12] shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:rounded-[1.75rem]">
              <img
                src={image}
                alt={imageAlt || title || 'Service illustration'}
                className="aspect-[16/11] w-full object-cover object-center"
                loading="eager"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/35 via-transparent to-transparent" />
            </div>
          </AnimatedSection>
        ) : null}
      </div>
    </section>
  );
}
