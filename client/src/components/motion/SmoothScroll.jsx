/** Native window scroll helpers (no smooth-scroll library). */
import { ScrollTrigger } from '../../motion/config';

export function scrollToTop() {
  if (typeof window === 'undefined') return;
  ScrollTrigger.clearScrollMemory?.('manual');
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function scrollToId(id, { offset = 0 } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo(0, Math.max(0, top));
}
