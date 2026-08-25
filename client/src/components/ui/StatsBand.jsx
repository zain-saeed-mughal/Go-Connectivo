import { companyStats } from '../../data/content';
import { RevealCard } from '../motion';

/** Capability strip — no invented customer counts or uptime percentages. */
export default function StatsBand() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {companyStats.map((stat) => (
        <RevealCard key={stat.label} className="px-4 py-6 text-center sm:p-6">
          <p className="gradient-text-brand relative z-[2] font-display text-[1.75rem] font-bold tracking-[-0.02em] sm:text-3xl md:text-4xl">
            {stat.display}
          </p>
          <p className="relative z-[2] mt-2 text-xs text-[#6B7C8F] sm:text-sm">{stat.label}</p>
        </RevealCard>
      ))}
    </div>
  );
}
