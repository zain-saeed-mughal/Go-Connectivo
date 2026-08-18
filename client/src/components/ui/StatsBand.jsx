import { companyStats } from '../../data/content';
import { AnimatedCounter, RevealCard } from '../motion';

export default function StatsBand() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {companyStats.map((stat) => (
        <RevealCard key={stat.label} className="px-4 py-6 text-center sm:p-6">
          <AnimatedCounter
            value={stat.value}
            suffix={stat.suffix}
            className="gradient-text-brand relative z-[2] block font-display text-[1.75rem] font-bold tracking-[-0.02em] sm:text-3xl md:text-4xl"
          />
          <p className="relative z-[2] mt-2 text-xs text-[#6B7C8F] sm:text-sm">{stat.label}</p>
        </RevealCard>
      ))}
    </div>
  );
}
