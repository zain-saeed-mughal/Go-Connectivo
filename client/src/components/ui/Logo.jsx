import { Link } from 'react-router-dom';
import logo from '../../assets/logo.webp';

export default function Logo({ compact = false, to = '/' }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center no-underline"
      aria-label="Go Connectivo home"
    >
      <img
        src={logo}
        alt="Go Connectivo"
        decoding="async"
        fetchPriority="high"
        className={`w-auto max-h-full object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-[1.03] ${
          compact ? 'h-8 sm:h-9' : 'h-10 sm:h-11'
        }`}
      />
    </Link>
  );
}
