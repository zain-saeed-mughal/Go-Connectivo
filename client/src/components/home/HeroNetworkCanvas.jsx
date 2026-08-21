import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { canEnhanceMotion } from '../../motion/config';
import { noteWebglPressure, releaseWebglSlot, requestWebglSlot } from '../../motion/webglSlots';
import HeroNetworkScene from './HeroNetworkScene';

function ContextGuard({ onLost }) {
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);
  const onLostRef = useRef(onLost);
  onLostRef.current = onLost;

  useEffect(() => {
    const canvas = gl.domElement;
    const handleLost = (e) => {
      e.preventDefault();
      onLostRef.current();
    };
    const handleRestored = () => invalidate();
    canvas.addEventListener('webglcontextlost', handleLost, false);
    canvas.addEventListener('webglcontextrestored', handleRestored, false);
    return () => {
      canvas.removeEventListener('webglcontextlost', handleLost);
      canvas.removeEventListener('webglcontextrestored', handleRestored);
    };
  }, [gl, invalidate]);

  return null;
}

/**
 * Hero globe, high-priority WebGL slot; fully unmounts off-screen to free GPU.
 */
export default function HeroNetworkCanvas({ progressRef, className = '' }) {
  const hostRef = useRef(null);
  const inViewRef = useRef(true);
  const leaveTimer = useRef(0);
  const slotId = useId();
  const [live, setLive] = useState(false);
  const allowedMotion = canEnhanceMotion();

  const syncSlot = useCallback(() => {
    if (!allowedMotion || document.hidden || !inViewRef.current) {
      releaseWebglSlot(slotId);
      setLive(false);
      return;
    }
    const ok = requestWebglSlot(slotId, {
      priority: 10,
      onEvict: () => setLive(false),
    });
    setLive(ok);
  }, [allowedMotion, slotId]);

  const onLost = useCallback(() => {
    noteWebglPressure();
    releaseWebglSlot(slotId);
    setLive(false);
    // Do not remount, remounting after Context Lost creates more WebGL contexts.
  }, [slotId]);

  useEffect(() => {
    if (!allowedMotion) return undefined;

    const onVisibility = () => syncSlot();
    document.addEventListener('visibilitychange', onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.clearTimeout(leaveTimer.current);
          inViewRef.current = true;
          syncSlot();
          return;
        }
        leaveTimer.current = window.setTimeout(() => {
          inViewRef.current = false;
          syncSlot();
        }, 1800);
      },
      { threshold: 0, rootMargin: '50% 0px 80% 0px' },
    );
    if (hostRef.current) io.observe(hostRef.current);
    syncSlot();

    return () => {
      window.clearTimeout(leaveTimer.current);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      releaseWebglSlot(slotId);
      setLive(false);
    };
  }, [allowedMotion, slotId, syncSlot]);

  if (!allowedMotion) return null;

  return (
    <div
      ref={hostRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {live ? (
        <Canvas
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: 'high-performance',
            premultipliedAlpha: false,
            failIfMajorPerformanceCaveat: false,
          }}
          dpr={1}
          camera={{ position: [0.2, 0.15, 4.2], fov: 36, near: 0.1, far: 40 }}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
          frameloop="always"
          performance={{ min: 0.5 }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.toneMapping = 0;
          }}
        >
          <ContextGuard onLost={onLost} />
          <HeroNetworkScene progressRef={progressRef} />
        </Canvas>
      ) : null}
    </div>
  );
}
