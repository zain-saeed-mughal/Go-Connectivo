import { lazy, Suspense, useCallback, useEffect, useId, useRef, useState } from 'react';
import { isCompactViewport, prefersReducedMotion } from '../../motion/config';
import { noteWebglPressure, releaseWebglSlot, requestWebglSlot } from '../../motion/webglSlots';

const Hub = lazy(() => import('./HolographicHub3D'));

/**
 * CTA hub — live only in view; shares the global WebGL budget.
 */
export default function HolographicHub3DLazy(props) {
  const holderRef = useRef(null);
  const leaveTimer = useRef(0);
  const slotId = useId();
  const [inView, setInView] = useState(false);
  const [allowed, setAllowed] = useState(false);

  const tryAcquire = useCallback(() => {
    const ok = requestWebglSlot(slotId, {
      priority: 1,
      onEvict: () => setAllowed(false),
    });
    setAllowed(ok);
  }, [slotId]);

  const onContextLost = useCallback(() => {
    noteWebglPressure();
    releaseWebglSlot(slotId);
    setAllowed(false);
  }, [slotId]);

  useEffect(() => {
    if (prefersReducedMotion() || isCompactViewport()) return undefined;
    const el = holderRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const near = entry.isIntersecting;
        if (near) {
          window.clearTimeout(leaveTimer.current);
          setInView(true);
          tryAcquire();
          return;
        }
        leaveTimer.current = window.setTimeout(() => {
          releaseWebglSlot(slotId);
          setAllowed(false);
          setInView(false);
        }, 1600);
      },
      { rootMargin: '120px 0px 120px 0px', threshold: 0 },
    );
    observer.observe(el);

    return () => {
      window.clearTimeout(leaveTimer.current);
      observer.disconnect();
      releaseWebglSlot(slotId);
    };
  }, [slotId, tryAcquire]);

  useEffect(() => {
    if (!inView || allowed) return undefined;
    if (prefersReducedMotion() || isCompactViewport()) return undefined;
    const id = window.setInterval(tryAcquire, 900);
    return () => window.clearInterval(id);
  }, [inView, allowed, tryAcquire]);

  const show = allowed;

  return (
    <div ref={holderRef} className="h-full w-full">
      {show ? (
        <Suspense fallback={null}>
          <Hub {...props} onContextLost={onContextLost} />
        </Suspense>
      ) : null}
    </div>
  );
}
