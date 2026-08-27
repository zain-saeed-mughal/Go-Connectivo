import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { canEnhanceMotion } from '../../motion/config';
import {
  isWebglBackingOff,
  isWebglCoolingDown,
  noteWebglPressure,
  releaseWebglSlot,
  requestWebglSlot,
} from '../../motion/webglSlots';
import { useTheme } from '../../context/ThemeContext';
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
      // Free the browser WebGL slot immediately on R3F unmount.
      try {
        gl.dispose();
      } catch {
        /* ignore */
      }
      try {
        const ctx = gl.getContext?.();
        if (!ctx?.isContextLost?.()) gl.forceContextLoss();
      } catch {
        /* ignore */
      }
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
  const { theme } = useTheme();

  const syncSlot = useCallback(() => {
    if (!allowedMotion || document.hidden || !inViewRef.current) {
      releaseWebglSlot(slotId);
      setLive(false);
      return;
    }
    if (isWebglBackingOff(slotId) || isWebglCoolingDown()) {
      setLive(false);
      return;
    }
    const ok = requestWebglSlot(slotId, {
      // Lower than section stages so Services can take GPU on scroll.
      priority: 3,
      onEvict: () => setLive(false),
    });
    setLive(ok);
  }, [allowedMotion, slotId]);

  const onLost = useCallback(() => {
    noteWebglPressure();
    releaseWebglSlot(slotId);
    setLive(false);
    // Do not remount immediately — remounting after Context Lost creates more WebGL contexts.
  }, [slotId]);

  useEffect(() => {
    if (!allowedMotion) return undefined;

    const onVisibility = () => syncSlot();
    document.addEventListener('visibilitychange', onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.12) {
          window.clearTimeout(leaveTimer.current);
          inViewRef.current = true;
          syncSlot();
          return;
        }
        window.clearTimeout(leaveTimer.current);
        inViewRef.current = false;
        syncSlot();
      },
      { threshold: [0, 0.12, 0.25], rootMargin: '0px' },
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

  // Gentle retry after cooldown / eviction — not a 40ms spam loop.
  useEffect(() => {
    if (!allowedMotion || live || !inViewRef.current) return undefined;
    const id = window.setInterval(syncSlot, 800);
    return () => window.clearInterval(id);
  }, [allowedMotion, live, syncSlot]);

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
          <HeroNetworkScene progressRef={progressRef} theme={theme} />
        </Canvas>
      ) : null}
    </div>
  );
}
