import { Link } from 'react-router-dom';
import ServiceIcon from '../ui/ServiceIcon';
import { legalNavItems } from '../../data/content';

export default function LegalMegaMenu({ onNavigate }) {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-[var(--surface)] shadow-[var(--shadow)]"
      role="navigation"
      aria-label="Legal Compliance"
    >
      <ul className="p-2">
        {legalNavItems.map((item) => (
          <li key={item.id}>
            <Link
              to={item.path}
              onClick={() => onNavigate?.()}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors duration-150 hover:bg-[var(--bg-secondary)]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-on-accent)]">
                <ServiceIcon name={item.icon} size={16} />
              </span>
              <span className="min-w-0 text-sm font-medium leading-snug text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)]">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
