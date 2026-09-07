import { useTheme } from '../../context/ThemeContext';

/**
 * Partner monogram or official logo mark.
 * logoDark   — swapped in on dark theme when present
 * logoOnDark — force dark pad (for light-on-dark assets)
 * logoOnLight — force light pad on light theme (for dark-on-light assets)
 */
export default function PartnerMark({ partner, size = 'md', className = '' }) {
  const { isLight } = useTheme();
  const logoSrc =
    !isLight && partner.logoDark ? partner.logoDark : partner.logo || partner.logoDark;

  const box =
    size === 'lg'
      ? 'h-12 w-[8.5rem] rounded-xl px-2.5'
      : size === 'sm'
        ? 'h-8 w-[6rem] rounded-md px-1.5'
        : 'h-9 w-[7rem] rounded-lg px-2';

  let padClass = '';
  if (isLight) {
    if (partner.logoOnLight) padClass = 'partner-mark--on-light';
    else if (partner.logoOnDark) padClass = 'partner-mark--on-dark';
  } else if (partner.logoOnDark) {
    padClass = 'partner-mark--on-dark';
  } else if (partner.logoOnLight) {
    // Same clear light chip as light theme — keeps black wordmarks readable
    padClass = 'partner-mark--on-light';
  }

  if (logoSrc) {
    return (
      <span
        className={`partner-mark partner-mark--logo inline-flex shrink-0 items-center justify-center ${box} ${padClass} ${className}`}
      >
        <img
          src={logoSrc}
          alt=""
          className="h-full w-full object-contain"
          loading="lazy"
          decoding="async"
        />
        <span className="sr-only">{partner.name}</span>
      </span>
    );
  }

  const monoBox =
    size === 'lg'
      ? 'h-12 w-12 rounded-xl text-sm'
      : size === 'sm'
        ? 'h-8 w-8 rounded-md text-[10px]'
        : 'h-9 w-9 rounded-lg text-[11px]';

  return (
    <span
      className={`partners-mega__mark partner-card__mark grid shrink-0 place-items-center font-display font-bold tracking-wide text-[var(--text-on-accent)] ${monoBox} ${className}`}
      aria-hidden
    >
      {partner.monogram}
    </span>
  );
}
