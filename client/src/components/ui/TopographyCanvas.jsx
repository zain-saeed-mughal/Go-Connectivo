import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../motion/config';

/**
 * Footer backdrop. Only paints while the footer is on screen and the tab is
 * visible — otherwise it burns a full RAF loop on every page.
 */
export default function TopographyCanvas({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return undefined;

    const reduced = prefersReducedMotion();
    let width = 0;
    let height = 0;
    let animId = 0;
    let time = 0;
    let onScreen = false;
    let particles = [];

    const sizeCanvas = () => {
      const parent = canvas.parentElement;
      width = canvas.width = parent?.clientWidth || window.innerWidth;
      height = canvas.height = parent?.clientHeight || 450;

      const count = width < 768 ? 16 : 30;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
      }));
    };

    const drawContourPath = (offsetY, amplitude, frequency, strokeStyle) => {
      ctx.beginPath();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = strokeStyle;

      for (let x = 0; x <= width; x += 22) {
        const y =
          offsetY +
          Math.sin(x * frequency + time) * amplitude +
          Math.cos(x * frequency * 0.5 + time * 0.8) * (amplitude * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const paint = () => {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#1c314f');
      bgGrad.addColorStop(0.5, '#243c5c');
      bgGrad.addColorStop(1, '#2f4c73');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const contours = [
        { y: height * 0.15, amp: 25, freq: 0.004, color: 'rgba(107, 138, 176, 0.25)' },
        { y: height * 0.35, amp: 35, freq: 0.003, color: 'rgba(74, 107, 148, 0.3)' },
        { y: height * 0.55, amp: 28, freq: 0.005, color: 'rgba(139, 163, 196, 0.28)' },
        { y: height * 0.75, amp: 40, freq: 0.0025, color: 'rgba(107, 138, 176, 0.32)' },
        { y: height * 0.9, amp: 20, freq: 0.0045, color: 'rgba(74, 107, 148, 0.22)' },
      ];
      contours.forEach((c) => drawContourPath(c.y, c.amp, c.freq, c.color));

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.fillStyle = `rgba(139, 163, 196, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
    };

    // ~30fps is plenty for this ambient motion and halves the paint cost.
    const frameInterval = 1000 / 30;
    let last = 0;

    const render = (now) => {
      animId = requestAnimationFrame(render);
      if (now - last < frameInterval) return;
      last = now;
      time += 0.02;
      paint();
    };

    const start = () => {
      if (animId || reduced) return;
      last = 0;
      animId = requestAnimationFrame(render);
    };

    const stop = () => {
      if (!animId) return;
      cancelAnimationFrame(animId);
      animId = 0;
    };

    sizeCanvas();
    paint();

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !document.hidden) start();
        else stop();
      },
      { rootMargin: '120px' },
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        sizeCanvas();
        paint();
      }, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
