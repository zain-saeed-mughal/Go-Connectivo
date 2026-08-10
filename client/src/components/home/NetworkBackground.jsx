import { useEffect, useRef } from 'react';
import { gsap, isCompactViewport, prefersReducedMotion } from '../../motion/config';

// Right-side cluster only — keeps clear of hero copy on the left.
const nodes = [
  { x: 64, y: 24, label: 'Cloud PBX', depth: 1 },
  { x: 84, y: 17, label: 'SIP', depth: 0.6 },
  { x: 74, y: 42, label: 'Dialer', depth: 1.4 },
  { x: 91, y: 47, label: 'Inbound', depth: 0.8 },
  { x: 66, y: 66, label: 'Outbound', depth: 1.2 },
  { x: 85, y: 74, label: 'DID', depth: 0.7 },
];

const lines = [
  [64, 24, 74, 42],
  [84, 17, 74, 42],
  [74, 42, 91, 47],
  [74, 42, 66, 66],
  [91, 47, 85, 74],
  [66, 66, 85, 74],
];

export default function NetworkBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return undefined;

    const floating = root.querySelectorAll('[data-float]');
    const orbs = root.querySelectorAll('[data-orb]');
    const paths = root.querySelectorAll('[data-line]');
    const layers = root.querySelectorAll('[data-depth]');

    const ctx = gsap.context(() => {
      floating.forEach((node, index) => {
        gsap.to(node, {
          y: index % 2 === 0 ? -10 : 8,
          x: index % 3 === 0 ? 6 : -4,
          duration: 5.5 + index * 0.55,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.3,
        });
      });

      orbs.forEach((orb, index) => {
        gsap.to(orb, {
          xPercent: index % 2 === 0 ? 6 : -8,
          yPercent: index % 2 === 0 ? -5 : 7,
          duration: 18 + index * 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Lines draw themselves once, then stay put.
      paths.forEach((path, index) => {
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 2, delay: 0.6 + index * 0.14, ease: 'power2.out' },
        );
      });
    }, root);

    // Mouse-reactive depth, pointer devices only.
    let quickSetters = [];
    if (!isCompactViewport()) {
      quickSetters = Array.from(layers).map((layer) => ({
        depth: parseFloat(layer.dataset.depth) || 1,
        x: gsap.quickTo(layer, 'x', { duration: 1.4, ease: 'power3.out' }),
        y: gsap.quickTo(layer, 'y', { duration: 1.4, ease: 'power3.out' }),
      }));
    }

    const onPointerMove = (event) => {
      const cx = event.clientX / window.innerWidth - 0.5;
      const cy = event.clientY / window.innerHeight - 0.5;
      quickSetters.forEach((setter) => {
        setter.x(cx * 18 * setter.depth);
        setter.y(cy * 14 * setter.depth);
      });
    };

    if (quickSetters.length) window.addEventListener('pointermove', onPointerMove);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 grid-fade opacity-70" />

      {/* Logo-inspired concentric arcs */}
      <svg
        className="absolute top-1/2 right-[8%] hidden h-[min(52vh,420px)] w-[min(52vh,420px)] -translate-y-1/2 opacity-[0.14] lg:block"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="#F58220" strokeWidth="10" strokeLinecap="round">
          <path d="M168 42a78 78 0 1 0 0 116" />
          <path d="M152 62a52 52 0 1 0 0 76" />
          <path d="M136 82a28 28 0 1 0 0 36" />
        </g>
      </svg>

      <div
        data-orb
        className="absolute top-10 -left-24 h-72 w-72 rounded-full bg-[#e86f0c]/20 blur-[100px]"
      />
      <div
        data-orb
        className="absolute top-24 right-[-4rem] h-80 w-80 rounded-full bg-[#ff6b00]/25 blur-[110px]"
      />
      <div
        data-orb
        className="absolute right-1/4 bottom-10 h-56 w-56 rounded-full bg-[#ffb020]/10 blur-[90px]"
      />

      <div data-depth="0.6" className="absolute inset-0 hidden lg:block">
        <svg className="h-full w-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
          <g stroke="rgba(255,138,31,0.3)" strokeWidth="0.18" fill="none">
            {lines.map(([x1, y1, x2, y2]) => (
              <line
                key={`${x1}-${y1}-${x2}-${y2}`}
                data-line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
              />
            ))}
          </g>
        </svg>
      </div>

      {nodes.map((node) => (
        <div
          key={node.label}
          data-depth={node.depth}
          className="absolute hidden lg:block"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2">
            <div
              data-float
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md will-change-transform"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff8a1f] shadow-[0_0_12px_#ff8a1f]" />
              <span className="text-[11px] font-medium tracking-wide text-[#e8e8e8]">
                {node.label}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
