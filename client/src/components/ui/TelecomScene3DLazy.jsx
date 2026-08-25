import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { isCompactViewport, prefersReducedMotion } from '../../motion/config';
import { prefetchTelecomScene } from '../../motion/prefetchHome3d';
import { noteWebglPressure, releaseWebglSlot, requestWebglSlot } from '../../motion/webglSlots';

const Fallback = () => (
  <div
    className="h-full min-h-[200px] w-full bg-gradient-to-br from-[#E8ECF2] via-[#F4F6F9] to-[#E0E5ED]"
    aria-hidden
  />
);

/**
 * Glass-stage Three models (Services / Platform / WhyUs).
 *
 * - `eager`: start WebGL off-screen after a short delay so scroll-in is instant
 * - `keepAlive`: once mounted, stay mounted until another scene steals the slot
 */
export default function TelecomScene3DLazy({
  eager = false,
  keepAlive = true,
  warmDelay = 500,
  slotPriority = 12,
  ...props
}) {
  const holderRef = useRef(null);
  const leaveTimer = useRef(0);
  const slotId = useId();
  const [inView, setInView] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [SceneComp, setSceneComp] = useState(null);
  const [blocked, setBlocked] = useState(
    () => typeof window !== 'undefined' && (prefersReducedMotion() || isCompactViewport()),
  );

  const tryAcquire = useCallback(() => {
    const ok = requestWebglSlot(slotId, {
      priority: slotPriority,
      onEvict: () => setAllowed(false),
    });
    setAllowed(ok);
  }, [slotId, slotPriority]);

  const onContextLost = useCallback(() => {
    noteWebglPressure();
    releaseWebglSlot(slotId);
    setAllowed(false);
  }, [slotId]);

  // Resolve the chunk into a real component (avoids Suspense flash on scroll).
  useEffect(() => {
    if (blocked) return undefined;
    let cancelled = false;
    prefetchTelecomScene().then((results) => {
      if (cancelled) return;
      const mod = results?.[1];
      if (mod?.default) setSceneComp(() => mod.default);
      else {
        import('./TelecomScene3D')
          .then((m) => {
            if (!cancelled) setSceneComp(() => m.default);
          })
          .catch(() => {});
      }
    });
    return () => {
      cancelled = true;
    };
  }, [blocked]);

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

    prefetchTelecomScene();

    let warmTimer = 0;
    if (eager) {
      warmTimer = window.setTimeout(() => {
        setInView(true);
        tryAcquire();
      }, warmDelay);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const near = entry.isIntersecting;
        if (near) {
          window.clearTimeout(leaveTimer.current);
          setInView(true);
          tryAcquire();
          return;
        }
        if (keepAlive) {
          // Stay mounted; only yield if another stage steals the WebGL slot.
          return;
        }
        leaveTimer.current = window.setTimeout(() => {
          releaseWebglSlot(slotId);
          setAllowed(false);
          setInView(false);
        }, 800);
      },
      { rootMargin: '200% 0px 200% 0px', threshold: 0 },
    );
    observer.observe(el);

    return () => {
      window.clearTimeout(warmTimer);
      window.clearTimeout(leaveTimer.current);
      observer.disconnect();
      releaseWebglSlot(slotId);
    };
  }, [blocked, slotId, tryAcquire, eager, warmDelay, keepAlive]);

  useEffect(() => {
    if (blocked || !inView || allowed) return undefined;
    const id = window.setInterval(tryAcquire, 40);
    return () => window.clearInterval(id);
  }, [blocked, inView, allowed, tryAcquire]);

  const show = !blocked && allowed && SceneComp;

  return (
    <div ref={holderRef} className="h-full w-full">
      {show ? <SceneComp {...props} onContextLost={onContextLost} /> : <Fallback />}
    </div>
  );
}
