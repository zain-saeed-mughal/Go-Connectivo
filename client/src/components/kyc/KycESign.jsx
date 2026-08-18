import { useEffect, useRef, useState } from 'react';
import { Eraser } from 'lucide-react';

function toMeta(dataUrl) {
  return {
    name: 'e-signature.png',
    size: Math.round((dataUrl.length * 3) / 4),
    type: 'image/png',
    dataUrl,
    uploadedAt: new Date().toISOString(),
    method: 'draw',
  };
}

/**
 * Draw-on-canvas e-signature. Stores the same { dataUrl, name, type } shape as uploads.
 */
export default function KycESign({ value, onChange, error }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const [hasInk, setHasInk] = useState(Boolean(value?.dataUrl));

  const setupCanvas = (restoreUrl) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = '#1C314F';
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (restoreUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
      };
      img.src = restoreUrl;
    }
  };

  useEffect(() => {
    setupCanvas(value?.dataUrl);
    const onResize = () => setupCanvas(canvasRef.current ? canvasRef.current.toDataURL('image/png') : value?.dataUrl);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const point = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const src = event.touches?.[0] || event.changedTouches?.[0] || event;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  const start = (event) => {
    event.preventDefault();
    drawing.current = true;
    last.current = point(event);
  };

  const move = (event) => {
    if (!drawing.current) return;
    event.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const next = point(event);
    const prev = last.current;
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(next.x, next.y);
    ctx.stroke();
    last.current = next;
    setHasInk(true);
  };

  const end = (event) => {
    if (!drawing.current) return;
    event.preventDefault();
    drawing.current = false;
    last.current = null;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onChange(toMeta(dataUrl));
  };

  const clear = () => {
    setupCanvas(null);
    setHasInk(false);
    onChange(null);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-[#2F4C73]">
          E-signature <span className="text-rose-600">*</span>
        </p>
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-[#4A6B94] hover:bg-[#EEF3F8]"
        >
          <Eraser className="h-3.5 w-3.5" />
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className={`h-40 w-full touch-none rounded-xl border bg-white ${
          error ? 'border-rose-400' : 'border-[rgba(47,76,115,0.16)]'
        }`}
        style={{ cursor: 'crosshair', touchAction: 'none' }}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        onPointerCancel={end}
      />
      <p className="mt-1.5 text-xs text-[#6B7C8F]">
        {hasInk ? 'Signature captured. Draw again or clear to redo.' : 'Draw your signature in the box using mouse or finger.'}
      </p>
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}
