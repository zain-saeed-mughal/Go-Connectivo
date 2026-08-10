import { useEffect, useRef } from 'react';
import { gsap, isCompactViewport, prefersReducedMotion } from '../../motion/config';

// Right-side cluster — keeps clear of hero copy on the left.
const nodes = [
  { x: 64, y: 22, label: 'Cloud PBX', depth: 1 },
  { x: 84, y: 16, label: 'SIP', depth: 0.6 },
  { x: 74, y: 40, label: 'Dialer', depth: 1.4 },
  { x: 91, y: 46, label: 'Inbound', depth: 0.8 },
  { x: 66, y: 64, label: 'Outbound', depth: 1.2 },
  { x: 85, y: 72, label: 'DID', depth: 0.7 },
];

const lines = [
  [64, 22, 74, 40],
  [84, 16, 74, 40],
  [74, 40, 91, 46],
  [74, 40, 66, 64],
  [91, 46, 85, 72],
  [66, 64, 85, 72],
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
    const pulses = root.querySelectorAll('[data-pulse]');
    const packets = root.querySelectorAll('[data-packet]');
    const arcs = root.querySelector('[data-arcs]');

    const ctx = gsap.context(() => {
      floating.forEach((node, index) => {
        gsap.to(node, {
          y: index % 2 === 0 ? -12 : 10,
          x: index % 3 === 0 ? 7 : -5,
          duration: 5.2 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.25,
        });
      });

      orbs.forEach((orb, index) => {
        gsap.to(orb, {
          xPercent: index % 2 === 0 ? 8 : -10,
          yPercent: index % 2 === 0 ? -6 : 8,
          duration: 16 + index * 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      paths.forEach((path, index) => {
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 1.8, delay: 0.5 + index * 0.12, ease: 'power2.out' },
        );
      });

      pulses.forEach((pulse, index) => {
        gsap.fromTo(
          pulse,
          { scale: 0.55, opacity: 0.55 },
          {
            scale: 2.1,
            opacity: 0,
            duration: 2.2,
            repeat: -1,
            ease: 'power1.out',
            delay: index * 0.35,
          },
        );
      });

      packets.forEach((packet, index) => {
        gsap.fromTo(
          packet,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.35,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.4,
          },
        );
        gsap.to(packet, {
          offsetDistance: '100%',
          duration: 2.8 + index * 0.35,
          repeat: -1,
          ease: 'none',
          delay: index * 0.45,
        });
      });

      if (arcs) {
        gsap.to(arcs, {
          rotate: 360,
          duration: 48,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        });
      }
    }, root);

    let quickSetters = [];
    if (!isCompactViewport()) {
      quickSetters = Array.from(layers).map((layer) => ({
        depth: parseFloat(layer.dataset.depth) || 1,
        x: gsap.quickTo(layer, 'x', { duration: 1.35, ease: 'power3.out' }),
        y: gsap.quickTo(layer, 'y', { duration: 1.35, ease: 'power3.out' }),
      }));
    }

    const onPointerMove = (event) => {
      const cx = event.clientX / window.innerWidth - 0.5;
      const cy = event.clientY / window.innerHeight - 0.5;
      quickSetters.forEach((setter) => {
        setter.x(cx * 20 * setter.depth);
        setter.y(cy * 16 * setter.depth);
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

      <div className="absolute top-[18%] left-[-10%] h-[55vh] w-[55vw] rounded-full bg-[#f58220]/[0.07] blur-[120px]" />

      <div
        data-arcs
        className="absolute top-1/2 right-[4%] hidden h-[min(58vh,480px)] w-[min(58vh,480px)] -translate-y-1/2 lg:block"
      >
        <svg className="h-full w-full opacity-[0.22]" viewBox="0 0 200 200" fill="none">
          <g stroke="#F58220" strokeWidth="9" strokeLinecap="round">
            <path d="M168 42a78 78 0 1 0 0 116" />
            <path d="M152 62a52 52 0 1 0 0 76" />
            <path d="M136 82a28 28 0 1 0 0 36" />
          </g>
          <circle cx="168" cy="100" r="3.5" fill="#FFB86B" opacity="0.9" />
        </svg>
        <div className="absolute inset-[18%] rounded-full border border-[#f58220]/15" />
        <div className="absolute inset-[32%] rounded-full border border-[#f58220]/10" />
      </div>

      <div
        data-orb
        className="absolute top-10 -left-24 h-72 w-72 rounded-full bg-[#e86f0c]/22 blur-[100px]"
      />
      <div
        data-orb
        className="absolute top-24 right-[-4rem] h-80 w-80 rounded-full bg-[#ff6b00]/28 blur-[110px]"
      />
      <div
        data-orb
        className="absolute right-1/4 bottom-10 h-56 w-56 rounded-full bg-[#ffb020]/12 blur-[90px]"
      />

      <div data-depth="0.55" className="absolute inset-0 hidden lg:block">
        <svg className="h-full w-full opacity-70" viewBox="0 0 100 100" preserveAspectRatio="none">
          <g stroke="rgba(255,138,31,0.35)" strokeWidth="0.2" fill="none">
            {lines.map(([x1, y1, x2, y2], index) => (
              <g key={`${x1}-${y1}-${x2}-${y2}`}>
                <line data-line x1={x1} y1={y1} x2={x2} y2={y2} />
                <circle
                  data-packet
                  r="0.55"
                  fill="#FFB86B"
                  style={{
                    offsetPath: `path('M ${x1} ${y1} L ${x2} ${y2}')`,
                    offsetRotate: '0deg',
                  }}
                />
                <circle
                  cx={(x1 + x2) / 2}
                  cy={(y1 + y2) / 2}
                  r="0.35"
                  fill="#F58220"
                  opacity="0.35"
                  className={index % 2 === 0 ? '' : 'hidden'}
                />
              </g>
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
              className="relative flex items-center gap-2 rounded-full border border-white/12 bg-[#0c0c0c]/75 px-3 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md will-change-transform"
            >
              <span
                data-pulse
                className="pointer-events-none absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#ff8a1f]/50"
              />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#ff8a1f] shadow-[0_0_14px_#ff8a1f]" />
              <span className="text-[11px] font-medium tracking-wide text-[#f0f0f0]">
                {node.label}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
