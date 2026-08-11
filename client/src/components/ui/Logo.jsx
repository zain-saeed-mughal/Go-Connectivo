import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

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
        className={`w-auto object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-[1.03] ${
          compact ? 'h-9 sm:h-10' : 'h-11 sm:h-12'
        }`}
      />
    </Link>
  );
}
