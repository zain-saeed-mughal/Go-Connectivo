import { useEffect, useRef } from 'react';
import {
  Cloud,
  Globe,
  Headset,
  Mic,
  Network,
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Radio,
  Server,
  ShieldCheck,
  Voicemail,
  Wifi,
  Zap,
} from 'lucide-react';
import { gsap, isCompactViewport, prefersReducedMotion } from '../../motion/config';

const ICONS = [
  { Icon: PhoneCall, x: 4, y: 14, size: 28, opacity: 0.28, rotate: -12 },
  { Icon: Cloud, x: 12, y: 32, size: 24, opacity: 0.24, rotate: 8 },
  { Icon: Headset, x: 94, y: 16, size: 30, opacity: 0.26, rotate: 10 },
  { Icon: PhoneIncoming, x: 96, y: 38, size: 24, opacity: 0.25, rotate: -6 },
  { Icon: Globe, x: 3, y: 52, size: 26, opacity: 0.25, rotate: 14 },
  { Icon: Zap, x: 97, y: 58, size: 22, opacity: 0.3, rotate: -18 },
  { Icon: Wifi, x: 5, y: 72, size: 24, opacity: 0.22, rotate: 4 },
  { Icon: PhoneOutgoing, x: 93, y: 74, size: 26, opacity: 0.25, rotate: 12 },
  { Icon: Server, x: 8, y: 88, size: 22, opacity: 0.22, rotate: -8 },
  { Icon: Mic, x: 90, y: 90, size: 24, opacity: 0.24, rotate: 6 },
  { Icon: ShieldCheck, x: 15, y: 20, size: 22, opacity: 0.22, rotate: -10 },
  { Icon: Voicemail, x: 85, y: 28, size: 22, opacity: 0.23, rotate: 8 },
  { Icon: Network, x: 10, y: 60, size: 26, opacity: 0.22, rotate: -4 },
  { Icon: Radio, x: 88, y: 48, size: 22, opacity: 0.24, rotate: 16 },
  { Icon: Phone, x: 96, y: 8, size: 20, opacity: 0.2, rotate: -14 },
  { Icon: Cloud, x: 2, y: 40, size: 20, opacity: 0.2, rotate: 20 },
  { Icon: Headset, x: 7, y: 8, size: 22, opacity: 0.22, rotate: -16 },
  { Icon: PhoneCall, x: 92, y: 64, size: 20, opacity: 0.23, rotate: 10 },
  { Icon: Globe, x: 14, y: 78, size: 20, opacity: 0.2, rotate: -20 },
  { Icon: Zap, x: 86, y: 82, size: 18, opacity: 0.22, rotate: 22 },
];

/**
 * Floating VoIP icons, desktop only.
 * GSAP alone owns transforms (no CSS transform) so context.revert() stays quiet.
 */
export default function FloatingIconsBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion() || isCompactViewport()) return undefined;

    const nodes = root.querySelectorAll('[data-float-icon]');
    const tweens = [];
    const ctx = gsap.context(() => {
      nodes.forEach((node, index) => {
        const rotate = Number(node.getAttribute('data-rotate') || 0);
        // Only GSAP transform props, never mix with CSS transform shorthand.
        gsap.set(node, {
          xPercent: -50,
          yPercent: -50,
          rotation: rotate,
          x: 0,
          y: 0,
          force3D: true,
        });

        tweens.push(
          gsap.to(node, {
            y: index % 2 === 0 ? -18 : 16,
            x: index % 3 === 0 ? 12 : -10,
            rotation: rotate + (index % 2 === 0 ? 12 : -12),
            duration: 5.5 + (index % 6) * 0.9,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.12,
          }),
        );
      });
    }, root);

    const onVisibility = () => {
      tweens.forEach((tween) => {
        if (document.hidden) tween.pause();
        else tween.resume();
      });
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      tweens.forEach((tween) => tween.kill());
      // Kill only, full revert fights leftover CSS/Motion transforms.
      ctx.kill(true);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[1] hidden overflow-hidden lg:block"
      aria-hidden="true"
    >
      <div className="absolute top-[10%] left-[5%] h-80 w-80 rounded-full bg-[var(--accent-soft)]/15 blur-[100px]" />
      <div className="absolute right-[4%] bottom-[12%] h-96 w-96 rounded-full bg-[var(--accent-soft)]/[0.08] blur-[110px]" />

      {ICONS.map(({ Icon, x, y, size, opacity, rotate }, index) => (
        <span
          key={`float-icon-${index}`}
          data-float-icon
          data-rotate={rotate}
          className="absolute text-[var(--text-secondary)]/70 will-change-transform"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            opacity,
          }}
        >
          <Icon size={size} strokeWidth={1.75} />
        </span>
      ))}
    </div>
  );
}
