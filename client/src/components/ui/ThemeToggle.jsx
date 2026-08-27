import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Navbar light / dark theme toggle.
 * onNav: sit on navy/dark pill — use light icon contrast.
 */
export default function ThemeToggle({ className = '', onNav = false }) {
  const { isDark, toggleTheme } = useTheme();

  const navTone = onNav
    ? 'border-white/30 bg-white/15 text-white hover:border-white/55 hover:bg-white/25'
    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--accent-secondary)] hover:text-[var(--accent-secondary)]';

  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }}
      className={`gc-tap inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm transition-[border-color,background-color,color,transform] duration-200 ${navTone} ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className="relative grid h-[18px] w-[18px] place-items-center" aria-hidden="true">
        <Sun
          size={18}
          strokeWidth={2}
          className={`absolute transition-all duration-200 ${
            isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-90 opacity-0'
          }`}
        />
        <Moon
          size={18}
          strokeWidth={2}
          className={`absolute transition-all duration-200 ${
            isDark ? 'scale-50 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
          }`}
        />
      </span>
    </button>
  );
}
