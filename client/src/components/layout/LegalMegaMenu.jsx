import { Link } from 'react-router-dom';
import ServiceIcon from '../ui/ServiceIcon';
import { legalNavItems } from '../../data/content';

export default function LegalMegaMenu({ onNavigate }) {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl border border-[rgba(47,76,115,0.12)] bg-[#FFFFFF] shadow-[0_24px_80px_rgba(47,76,115,0.16)]"
      role="navigation"
      aria-label="Legal Compliance"
    >
      <ul className="p-2">
        {legalNavItems.map((item) => (
          <li key={item.id}>
            <Link
              to={item.path}
              onClick={() => onNavigate?.()}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors duration-150 hover:bg-[#E8ECF2]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#4A6B94] text-[#FFFFFF]">
                <ServiceIcon name={item.icon} size={16} />
              </span>
              <span className="min-w-0 text-sm font-medium leading-snug text-[#4A5D73] transition-colors group-hover:text-[#2F4C73]">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
