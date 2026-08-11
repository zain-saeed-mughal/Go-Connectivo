import { technologies } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import { RevealCard, StaggerContainer } from '../motion';

export default function Technologies() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-20">
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
              className="rounded-3xl border border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#4A6B94]/30"
            >
              <h3 className="font-display text-lg font-semibold text-[#2F4C73]">{group.group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] px-3 py-1.5 text-xs text-[#6B7C8F] transition-all duration-300 hover:border-[#4A6B94]/35 hover:text-[#2F4C73]"
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
