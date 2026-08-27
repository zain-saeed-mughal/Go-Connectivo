import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

const STORAGE_KEY = 'gc-theme-v2';
const ThemeContext = createContext(null);

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* ignore */
  }
  return 'light';
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme === 'light' ? 'light' : 'dark';
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
  window.requestAnimationFrame(() => {
    window.dispatchEvent(new CustomEvent('gc-themechange', { detail: { theme } }));
  });
}

function setRevealPoint(x, y) {
  const root = document.documentElement;
  const px = Number.isFinite(x) ? `${x}px` : '50%';
  const py = Number.isFinite(y) ? `${y}px` : '12%';
  root.style.setProperty('--theme-x', px);
  root.style.setProperty('--theme-y', py);
}

function runThemeSwitch(apply) {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  root.classList.add('gc-theme-switching');
  const clearSwitching = () => {
    window.setTimeout(() => root.classList.remove('gc-theme-switching'), 90);
  };

  if (!reduced && typeof document.startViewTransition === 'function') {
    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          apply();
        });
      });
      transition.finished.finally(clearSwitching);
      return;
    } catch {
      /* fall through */
    }
  }

  flushSync(() => {
    apply();
  });
  clearSwitching();
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    applyTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount only
  }, []);

  const setTheme = useCallback((next, point) => {
    const resolved = next === 'light' ? 'light' : 'dark';
    if (resolved === themeRef.current) return;
    if (point) setRevealPoint(point.x, point.y);
    else setRevealPoint(window.innerWidth - 72, 48);

    runThemeSwitch(() => {
      applyTheme(resolved);
      setThemeState(resolved);
    });
  }, []);

  const toggleTheme = useCallback(
    (point) => {
      const next = themeRef.current === 'dark' ? 'light' : 'dark';
      setTheme(next, point);
    },
    [setTheme],
  );

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      isLight: theme === 'light',
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
