import { companyStats } from '../../data/content';
import { RevealCard } from '../motion';

/** Capability strip — no invented customer counts or uptime percentages. */
export default function StatsBand() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {companyStats.map((stat) => (
        <RevealCard key={stat.label} className="px-3 py-6 text-center sm:px-4 sm:p-6">
          <p className="gradient-text-brand relative z-[2] font-display text-[1.15rem] leading-tight font-bold tracking-[-0.02em] text-balance sm:text-xl md:text-[1.35rem] lg:text-[1.45rem]">
            {stat.display}
          </p>
          <p className="relative z-[2] mt-2 text-xs leading-snug text-[#6B7C8F] sm:text-sm">
            {stat.label}
          </p>
        </RevealCard>
      ))}
    </div>
  );
}
