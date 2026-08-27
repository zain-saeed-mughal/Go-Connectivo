import ServiceIcon from './ServiceIcon';

/**
 * Service card icons, Lucide only (no per-card WebGL).
 * Keeps a single WebGL budget for section scenes + hero globe so canvases
 * don't go blank from browser context limits.
 */
export default function TelecomIcon3DLazy({ name, size = 28, className = '' }) {
  return <ServiceIcon name={name} size={size} className={`text-[var(--text-secondary)] ${className}`} />;
}
