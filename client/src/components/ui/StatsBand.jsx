import { companyStats } from '../../data/content';
import { AnimatedCounter, StaggerContainer } from '../motion';

export default function StatsBand() {
  return (
    <StaggerContainer
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      stagger={0.1}
      from="scale"
    >
      {companyStats.map((stat) => (
        <div
          key={stat.label}
          className="group rounded-3xl border border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#4A6B94]/35"
        >
          <AnimatedCounter
            value={stat.value}
            suffix={stat.suffix}
            className="gradient-text-brand block font-display text-3xl font-bold tracking-[-0.02em] md:text-4xl"
          />
          <p className="mt-2 text-sm text-[#6B7C8F]">{stat.label}</p>
        </div>
      ))}
    </StaggerContainer>
  );
}
