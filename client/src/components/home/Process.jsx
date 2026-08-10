import { processSteps } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import { ease } from '../../motion/config';
import { createReveal } from '../../motion/reveal';
import { useGsapContext } from '../../motion/useGsapContext';

export default function Process() {
  const scope = useGsapContext(() => {
    const grid = scope.current.querySelector('[data-steps]');

    createReveal({
      targets: scope.current.querySelectorAll('[data-step]'),
      trigger: grid || scope.current,
      from: { autoAlpha: 0, y: 28 },
      to: { autoAlpha: 1, y: 0 },
      duration: 0.85,
      stagger: 0.1,
      start: 'top 88%',
      ease: ease.soft,
    });

    createReveal({
      targets: scope.current.querySelectorAll('[data-dot]'),
      trigger: grid || scope.current,
      from: { scale: 0.7, autoAlpha: 0 },
      to: { scale: 1, autoAlpha: 1 },
      duration: 0.6,
      stagger: 0.1,
      start: 'top 88%',
      ease: ease.soft,
    });
  }, []);

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Onboarding"
          title="A clear path from sign-up to launch."
          description="Most customers are up and running within 24-48 hours."
        />

        <div ref={scope} className="relative">
          <div data-steps className="gc-stagger-pending relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step) => (
              <article
                key={step.step}
                data-step
                className="group relative rounded-3xl border border-white/8 bg-[#0c0c0c] p-5 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-[#f58220]/35"
              >
                <div
                  data-dot
                  className="relative z-[2] mb-4 grid h-8 w-8 place-items-center rounded-full border border-[#f58220]/40 bg-[#0c0c0c] text-xs font-semibold text-[#ffb86b] transition-[border-color,background-color] duration-500 group-hover:border-[#f58220]/70 group-hover:bg-[#16120a]"
                >
                  {step.step}
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9a9ab0]">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
