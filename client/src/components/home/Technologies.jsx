import { useState } from 'react';
import { technologies } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import TelecomScene3DLazy from '../ui/TelecomScene3DLazy';
import ServiceIcon from '../ui/ServiceIcon';
import { gsap, ease, prefersReducedMotion } from '../../motion/config';
import { useGsapContext } from '../../motion/useGsapContext';

const groupIcons = {
  'Dialer Solutions': 'PhoneOutgoing',
  'Business Voice': 'Phone',
  'Inbound & Numbers': 'PhoneIncoming',
  'Outbound & Carrier': 'Radio',
  'Contact Center': 'Headset',
  'API & Messaging': 'Code2',
};

const PLATFORM_MODELS = [
  { id: 'voice', label: 'Voice' },
  { id: 'dialers', label: 'Dialers' },
  { id: 'dids', label: 'Numbers' },
  { id: 'termination', label: 'Carrier' },
  { id: 'contact', label: 'Contact Center' },
  { id: 'apis', label: 'API' },
];

/**
 * Platform stack, Lusion-inspired glass stage + orbit rings + staggered tiles.
 */
export default function Technologies() {
  const [platformFocus, setPlatformFocus] = useState('voice');
  const scope = useGsapContext(() => {
    const root = scope.current;
    if (!root) return undefined;

    const stage = root.querySelector('[data-stack-stage]');
    const glow = root.querySelector('[data-stack-glow]');
    const rings = gsap.utils.toArray('[data-orbit]', root);
    const cards = gsap.utils.toArray('[data-stack-card]', root);
    const chips = gsap.utils.toArray('[data-stack-chip]', root);
    const chapter = root.closest('[data-scroll-chapter]') || root;
    const cleanups = [];

    gsap.set(cards, { y: 36, autoAlpha: 0 });
    gsap.set(chips, { y: 10, autoAlpha: 0 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: chapter,
          start: 'top 78%',
          once: true,
        },
      })
      .to(cards, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.08,
        ease: ease.soft,
        duration: 0.45,
      })
      .to(
        chips,
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.015,
          ease: ease.soft,
          duration: 0.3,
        },
        0.12,
      );

    if (rings.length) {
      rings.forEach((ring, i) => {
        gsap.to(ring, {
          rotate: i % 2 === 0 ? 360 : -360,
          duration: 48 + i * 14,
          ease: 'none',
          repeat: -1,
        });
      });
    }

    if (!prefersReducedMotion() && stage && glow) {
      const onMove = (event) => {
        const rect = stage.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        gsap.to(glow, {
          x: x * 56,
          y: y * 36,
          duration: 0.75,
          ease: 'power3.out',
          overwrite: 'auto',
        });
        gsap.to(stage, {
          rotateX: -y * 5,
          rotateY: x * 6,
          duration: 0.75,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };
      const onLeave = () => {
        gsap.to(glow, { x: 0, y: 0, duration: 0.9, ease: 'power3.out' });
        gsap.to(stage, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'power3.out' });
      };
      stage.addEventListener('pointermove', onMove);
      stage.addEventListener('pointerleave', onLeave);
      cleanups.push(() => {
        stage.removeEventListener('pointermove', onMove);
        stage.removeEventListener('pointerleave', onLeave);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section className="gc-section relative overflow-x-clip">
      <div ref={scope} className="gc-container relative">
        <SectionHeading
          eyebrow="Platform"
          title="Every feature your business communication needs."
          description="Dialers, business voice, inbound numbers, outbound & carrier voice, contact center, and API & messaging, one coherent stack."
        />

        {/* Glass 3D stage */}
        <div className="relative mb-10 hidden lg:block" style={{ perspective: '1400px' }}>
          {/* Orbital rings outside the card */}
          <div
            data-orbit
            className="pointer-events-none absolute top-1/2 left-1/2 h-[120%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#4A6B94]/15"
            aria-hidden
          />
          <div
            data-orbit
            className="pointer-events-none absolute top-1/2 left-1/2 h-[150%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6B8AB0]/10"
            aria-hidden
          />

          <div
            data-stack-stage
            className="relative overflow-hidden rounded-[1.75rem] border border-[rgba(47,76,115,0.12)] bg-gradient-to-br from-[#FFFFFF]/95 via-[#F4F6F9]/9 to-[#E8ECF2]/85 shadow-[0_28px_90px_rgba(47,76,115,0.12)] [transform-style:preserve-3d]"
          >
            <div
              data-stack-glow
              className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A6B94]/20 blur-3xl"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.55),transparent_65%)]" />

            <div className="relative z-[1] flex items-center justify-between gap-4 px-6 pt-5 sm:px-8">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#4A6B94] uppercase">
                Coherent stack
              </p>
              <p className="text-xs text-[#6B7C8F]">
                Live platform model · {PLATFORM_MODELS.find((s) => s.id === platformFocus)?.label}
              </p>
            </div>

            <div className="relative z-[1] h-[280px] w-full sm:h-[320px] md:h-[360px]">
              <TelecomScene3DLazy
                variant="platform"
                serviceFocus={platformFocus}
                className="min-h-full"
                interactive
                scrollScrub
                eager
                keepAlive
                warmDelay={550}
                slotPriority={14}
              />
            </div>

            <div className="relative z-[1] flex flex-wrap items-center gap-2 border-t border-[rgba(47,76,115,0.08)] px-6 py-4 sm:px-8">
              {PLATFORM_MODELS.map((item) => {
                const active = platformFocus === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-stack-chip
                    aria-pressed={active}
                    onClick={() => setPlatformFocus(item.id)}
                    className={`rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-sm transition ${
                      active
                        ? 'border-[#2F4C73] bg-[#2F4C73] text-white'
                        : 'border-[rgba(47,76,115,0.12)] bg-[#FFFFFF]/70 text-[#4A5D73] hover:border-[#4A6B94] hover:bg-[#FFFFFF]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stack groups */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {technologies.map((group) => (
            <article
              key={group.group}
              data-stack-card
              className="gc-card group relative flex h-full flex-col overflow-hidden p-5 text-left sm:p-6"
            >
              <div className="pointer-events-none absolute -right-8 top-0 h-32 w-32 rounded-full bg-[#6B8AB0]/12 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="mb-4 flex min-h-[2.75rem] items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#4A6B94] to-[#2F4C73] text-[#FFFFFF] shadow-[0_12px_28px_rgba(47,76,115,0.28)] transition-transform duration-500 group-hover:scale-105">
                  <ServiceIcon name={groupIcons[group.group] || 'Cloud'} size={18} />
                </span>
                <h3 className="font-display text-lg leading-snug font-semibold tracking-[-0.02em] text-[#2F4C73]">
                  {group.group}
                </h3>
              </div>

              <div className="flex flex-col items-start gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    data-stack-chip
                    className="inline-flex min-h-[1.75rem] w-full items-center rounded-full border border-[rgba(47,76,115,0.12)] bg-[#F8FAFC] px-3 py-1.5 text-left text-xs leading-snug text-[#6B7C8F] transition-colors duration-300 group-hover:border-[#4A6B94]/30 group-hover:text-[#2F4C73]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
