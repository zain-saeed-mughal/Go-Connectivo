import { useEffect, useRef, useState } from 'react';
import { canEnhanceMotion, gsap } from '../../motion/config';

/**
 * Soft morphing cursor — desktop fine-pointer only.
 * Position lives on an outer wrapper; size/scale on the inner ring so GSAP
 * never fights the translate (that was sticking the circle on the navbar).
 */
export default function CustomCursor() {
  const ringWrapRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(canEnhanceMotion());
    sync();
    const mqHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqWidth = window.matchMedia('(max-width: 1023px)');
    mqHover.addEventListener('change', sync);
    mqMotion.addEventListener('change', sync);
    mqWidth.addEventListener('change', sync);
    return () => {
      mqHover.removeEventListener('change', sync);
      mqMotion.removeEventListener('change', sync);
      mqWidth.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('gc-custom-cursor');
      return undefined;
    }

    const wrap = ringWrapRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!wrap || !ring || !dot || !label) return undefined;

    document.documentElement.classList.add('gc-custom-cursor');

    gsap.set([wrap, dot], { xPercent: -50, yPercent: -50, force3D: true });
    gsap.set(ring, { scale: 1, force3D: true });

    // quickTo keeps GSAP as the single owner of transforms — no stuck frames.
    const moveWrapX = gsap.quickTo(wrap, 'x', { duration: 0.18, ease: 'power3.out' });
    const moveWrapY = gsap.quickTo(wrap, 'y', { duration: 0.18, ease: 'power3.out' });
    const moveDotX = gsap.quickTo(dot, 'x', { duration: 0.01, ease: 'none' });
    const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.01, ease: 'none' });

    let mode = 'default';
    let labelText = '';
    let visible = false;

    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to([wrap, dot], { opacity: 1, duration: 0.18, overwrite: 'auto' });
    };

    const hide = () => {
      visible = false;
      gsap.to([wrap, dot], { opacity: 0, duration: 0.15, overwrite: 'auto' });
    };

    const applyMode = (next, nextLabel) => {
      if (mode === next && labelText === nextLabel) return;
      mode = next;
      labelText = nextLabel;
      label.textContent = nextLabel;
      label.style.opacity = nextLabel ? '1' : '0';

      const size = next === 'hover' ? 52 : next === 'text' ? 68 : 34;
      gsap.to(ring, {
        width: size,
        height: size,
        borderColor:
          next === 'hover'
            ? 'rgba(74, 107, 148, 0.55)'
            : next === 'text'
              ? 'rgba(47, 76, 115, 0.35)'
              : 'rgba(47, 76, 115, 0.28)',
        backgroundColor:
          next === 'hover' ? 'rgba(107, 138, 176, 0.12)' : 'rgba(255,255,255,0.01)',
        duration: 0.22,
        ease: 'power3.out',
        overwrite: 'auto',
      });
      gsap.to(dot, {
        scale: next === 'hover' ? 0.35 : next === 'text' ? 0 : 1,
        duration: 0.22,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    const resolveTarget = (target) => {
      if (!(target instanceof Element)) return { mode: 'default', label: '' };
      // Ignore our own cursor nodes if they ever intercept hits.
      if (target.closest('.gc-cursor-root')) return { mode: mode, label: labelText };

      const labeled = target.closest('[data-cursor-label]');
      if (labeled) {
        return { mode: 'hover', label: labeled.getAttribute('data-cursor-label') || '' };
      }
      const hover = target.closest(
        'a, button, [role="button"], [data-cursor="hover"], .gc-card, input, textarea, select',
      );
      if (hover) {
        if (hover.matches('input, textarea')) return { mode: 'text', label: '' };
        return { mode: 'hover', label: '' };
      }
      return { mode: 'default', label: '' };
    };

    let scrolling = false;
    let scrollTimer = 0;
    const onScroll = () => {
      scrolling = true;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        scrolling = false;
      }, 120);
    };

    const onMove = (event) => {
      const { clientX: x, clientY: y } = event;
      moveDotX(x);
      moveDotY(y);
      moveWrapX(x);
      moveWrapY(y);
      show();
      // Skip heavy closest() walks while the user is wheel-scrolling
      if (scrolling) return;
      const next = resolveTarget(event.target);
      applyMode(next.mode, next.label);
    };

    const onDown = () => {
      gsap.to(ring, { scale: 0.88, duration: 0.14, overwrite: 'auto' });
    };
    const onUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.22, ease: 'power3.out', overwrite: 'auto' });
    };

    // Seed at current pointer if available; otherwise center.
    moveDotX(window.innerWidth / 2);
    moveDotY(window.innerHeight / 2);
    moveWrapX(window.innerWidth / 2);
    moveWrapY(window.innerHeight / 2);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', hide);

    return () => {
      document.documentElement.classList.remove('gc-custom-cursor');
      window.clearTimeout(scrollTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', hide);
      gsap.killTweensOf([wrap, ring, dot]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="gc-cursor-root" aria-hidden="true">
      <div ref={ringWrapRef} className="gc-cursor-ring-wrap">
        <div ref={ringRef} className="gc-cursor-ring">
          <span ref={labelRef} className="gc-cursor-label" />
        </div>
      </div>
      <div ref={dotRef} className="gc-cursor-dot" />
    </div>
  );
}
