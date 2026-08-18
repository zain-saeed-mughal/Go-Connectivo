import { lazy, Suspense, useCallback, useEffect, useId, useRef, useState } from 'react';
import { isCompactViewport, prefersReducedMotion } from '../../motion/config';
import { noteWebglPressure, releaseWebglSlot, requestWebglSlot } from '../../motion/webglSlots';

const Scene = lazy(() => import('./TelecomScene3D'));

const Fallback = () => (
  <div
    className="h-full min-h-[200px] w-full bg-gradient-to-br from-[#E8ECF2] via-[#F4F6F9] to-[#E0E5ED]"
    aria-hidden
  />
);

/**
 * Mounts Three only while near viewport; releases WebGL slot when leaving
 * so browsers don't hit Context Lost from too many live canvases.
 */
export default function TelecomScene3DLazy(props) {
  const holderRef = useRef(null);
  const leaveTimer = useRef(0);
  const slotId = useId();
  const [inView, setInView] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [blocked, setBlocked] = useState(
    () => typeof window !== 'undefined' && (prefersReducedMotion() || isCompactViewport()),
  );

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
    const sync = () => setBlocked(prefersReducedMotion() || isCompactViewport());
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  useEffect(() => {
    if (blocked) {
      releaseWebglSlot(slotId);
      setAllowed(false);
      return undefined;
    }

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
        // Delay unmount so scroll-back does not flash the gradient fallback.
        leaveTimer.current = window.setTimeout(() => {
          releaseWebglSlot(slotId);
          setAllowed(false);
          setInView(false);
        }, 1600);
      },
      { rootMargin: '280px 0px 280px 0px', threshold: 0 },
    );
    observer.observe(el);
    return () => {
      window.clearTimeout(leaveTimer.current);
      observer.disconnect();
      releaseWebglSlot(slotId);
    };
  }, [blocked, slotId, tryAcquire]);

  // Retry if we were in view but the budget was full (e.g. hero still held a slot)
  useEffect(() => {
    if (blocked || !inView || allowed) return undefined;
    const id = window.setInterval(tryAcquire, 900);
    return () => window.clearInterval(id);
  }, [blocked, inView, allowed, tryAcquire]);

  const show = !blocked && allowed;

  return (
    <div ref={holderRef} className="h-full w-full">
      {show ? (
        <Suspense fallback={<Fallback />}>
          <Scene {...props} onContextLost={onContextLost} />
        </Suspense>
      ) : (
        <Fallback />
      )}
    </div>
  );
}
