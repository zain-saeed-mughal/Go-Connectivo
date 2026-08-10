import { technologies } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import { RevealCard, StaggerContainer } from '../motion';

export default function Technologies() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Platform"
          title="Every feature your business communication needs."
          description="Dialers, hosted PBX, inbound presence, outbound termination, and contact-center tools in one voice stack."
        />

        <StaggerContainer
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
          from="scale"
        >
          {technologies.map((group) => (
            <RevealCard
              key={group.group}
              as="article"
              className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#f58220]/30"
            >
              <h3 className="font-display text-lg font-semibold text-white">{group.group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/8 bg-[#0c0c0c] px-3 py-1.5 text-xs text-[#b7b7cb] transition-all duration-300 hover:border-[#f58220]/35 hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </RevealCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
