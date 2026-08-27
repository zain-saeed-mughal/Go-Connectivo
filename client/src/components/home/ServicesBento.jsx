import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { featuredServices } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import TelecomIcon3DLazy from '../ui/TelecomIcon3DLazy';
import TelecomScene3DLazy from '../ui/TelecomScene3DLazy';
import { Card3DList } from '../ui/animated-3d-card';
import { ParallaxElement, SlideUpOnView } from '../motion';
import { gsap, ease, prefersReducedMotion } from '../../motion/config';
import { useGsapContext } from '../../motion/useGsapContext';

const SERVICE_MODELS = [
  { id: 'dids', label: 'DIDs' },
  { id: 'dialers', label: 'Dialers' },
  { id: 'pbx', label: 'Hosted PBX' },
  { id: 'termination', label: 'Termination' },
  { id: 'contact', label: 'Contact Center' },
  { id: 'apis', label: 'APIs' },
];

/**
 * Services, glass 3D stage (phone / headset / tower) + staggered service cards.
 */
export default function ServicesBento() {
  const navigate = useNavigate();
  const [serviceFocus, setServiceFocus] = useState('dids');

  const cards = useMemo(
    () =>
      featuredServices.map((service, index) => {
        const themes = ['primary', 'accent', 'info', 'warning', 'secondary', 'neutral'];
        return {
          id: service.id,
          title: service.title,
          description: service.description,
          icon: <TelecomIcon3DLazy name={service.icon} size={22} />,
          artKey: service.icon,
          index,
          theme: themes[index % themes.length],
          exploreLabel: 'Learn More',
          onClick: () => navigate(`/services/${service.id}`),
        };
      }),
    [navigate],
  );

  const scope = useGsapContext(() => {
    const root = scope.current;
    if (!root) return undefined;

    const stage = root.querySelector('[data-services-stage]');
    const glow = root.querySelector('[data-services-glow]');
    const rings = gsap.utils.toArray('[data-services-orbit]', root);
    const chips = gsap.utils.toArray('[data-services-chip]', root);
    const chapter = root.closest('[data-scroll-chapter]') || root;
    const cleanups = [];

    if (chips.length) {
      gsap.from(chips, {
        y: 8,
        autoAlpha: 0,
        stagger: 0.04,
        duration: 0.28,
        ease: ease.soft,
        immediateRender: false,
        scrollTrigger: {
          trigger: chapter,
          start: 'top 78%',
          once: true,
        },
      });
    }

    rings.forEach((ring, i) => {
      gsap.to(ring, {
        rotate: i % 2 === 0 ? 360 : -360,
        duration: 52 + i * 16,
        ease: 'none',
        repeat: -1,
      });
    });

    if (!prefersReducedMotion() && stage && glow) {
      const onMove = (event) => {
        const rect = stage.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        gsap.to(glow, {
          x: x * 52,
          y: y * 34,
          duration: 0.7,
          ease: 'power3.out',
          overwrite: 'auto',
        });
        gsap.to(stage, {
          rotateX: -y * 5,
          rotateY: x * 6,
          duration: 0.7,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };
      const onLeave = () => {
        gsap.to(glow, { x: 0, y: 0, duration: 0.85, ease: 'power3.out' });
        gsap.to(stage, { rotateX: 0, rotateY: 0, duration: 0.85, ease: 'power3.out' });
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
      <ParallaxElement
        speed={12}
        className="gc-glow pointer-events-none absolute top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[var(--accent-soft)]/12 sm:h-72 sm:w-72"
      />

      <div ref={scope} className="gc-container relative">
        <SlideUpOnView className="mb-8 md:mb-10">
          <SectionHeading
            eyebrow="Solutions"
            title="Services your floor can buy and deploy."
            description="Flagship capabilities across Business VoIP, contact center, SIP, numbers, and VoIP Termination."
            className="!mb-0"
            animated={false}
          />
        </SlideUpOnView>

        {/* Glass 3D services stage */}
        <div
          data-services-shell
          className="relative mb-10 hidden lg:block"
          style={{ perspective: '1400px' }}
        >
          <div
            data-services-orbit
            className="pointer-events-none absolute top-1/2 left-1/2 h-[118%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent-soft)]/15"
            aria-hidden
          />
          <div
            data-services-orbit
            className="pointer-events-none absolute top-1/2 left-1/2 h-[148%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent-soft)]/10"
            aria-hidden
          />

          <div
            data-services-stage
            className="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--border-soft)] bg-gradient-to-br from-[var(--surface)]/95 via-[var(--bg-secondary)]/90 to-[var(--bg-secondary)]/85 shadow-[var(--shadow)] [transform-style:preserve-3d]"
          >
            <div
              data-services-glow
              className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-soft)]/20 blur-3xl"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--glow-radial),transparent_65%)]" />

            <div className="relative z-[1] flex items-center justify-between gap-4 px-6 pt-5 sm:px-8">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[var(--text-secondary)] uppercase">
                Production stack
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Live services model · {SERVICE_MODELS.find((s) => s.id === serviceFocus)?.label}
              </p>
            </div>

            <div className="relative z-[1] h-[280px] w-full sm:h-[320px] md:h-[360px]">
              <TelecomScene3DLazy
                variant="services"
                serviceFocus={serviceFocus}
                className="min-h-full"
                interactive
                scrollScrub
                eager
                keepAlive={false}
                warmDelay={600}
                slotPriority={13}
              />
            </div>

            <div className="relative z-[1] flex flex-wrap items-center gap-2 border-t border-[color:var(--border-soft)] px-6 py-4 sm:px-8">
              {SERVICE_MODELS.map((item) => {
                const active = serviceFocus === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-services-chip
                    aria-pressed={active}
                    onClick={() => setServiceFocus(item.id)}
                    className={`rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-sm transition ${
                      active
                        ? 'border-transparent bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-on-accent)] shadow-[var(--shadow-card-hover)]'
                        : 'border-[color:var(--border-soft)] bg-[var(--surface)]/70 text-[var(--text-secondary)] hover:border-[var(--accent-secondary)]/50 hover:bg-[var(--surface)]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <Card3DList
          cards={cards}
          columns={3}
          gap="md"
          size="md"
          variant="premium"
          className="mt-2"
          enableTilt={false}
        />
      </div>
    </section>
  );
}
