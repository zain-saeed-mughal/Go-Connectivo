import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import voipVisual from '../../assets/services/voip-3.webp';
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
          icon: <TelecomIcon3DLazy name={service.icon} size={28} />,
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
        className="gc-glow pointer-events-none absolute top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#2F4C73]/10 sm:h-72 sm:w-72"
      />

      <div ref={scope} className="gc-container relative">
        <div className="mb-8 grid items-center gap-6 md:mb-10 md:grid-cols-[1.15fr_0.75fr] md:gap-8 lg:items-center lg:gap-10">
          <SlideUpOnView>
            <SectionHeading
              eyebrow="Services"
              title="Dialers, voice, numbers, and carrier reach, built for production floors."
              description="From predictive dialing and hosted PBX to DIDs, VoIP Termination, contact-center tools, and APIs, Go Connectivo covers the stack contact centers actually use."
              className="!mb-0"
              animated={false}
            />
          </SlideUpOnView>

          <SlideUpOnView delay={0.12}>
            <div className="gc-card mx-auto w-full max-w-[280px] overflow-hidden sm:max-w-[320px] md:ml-auto md:max-w-[340px]">
              <img
                src={voipVisual}
                alt="Business voice, dialers, and VoIP network"
                className="aspect-[735/490] h-auto w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </SlideUpOnView>
        </div>

        {/* Glass 3D services stage */}
        <div
          data-services-shell
          className="relative mb-10 hidden lg:block"
          style={{ perspective: '1400px' }}
        >
          <div
            data-services-orbit
            className="pointer-events-none absolute top-1/2 left-1/2 h-[118%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#4A6B94]/15"
            aria-hidden
          />
          <div
            data-services-orbit
            className="pointer-events-none absolute top-1/2 left-1/2 h-[148%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6B8AB0]/10"
            aria-hidden
          />

          <div
            data-services-stage
            className="relative overflow-hidden rounded-[1.75rem] border border-[rgba(47,76,115,0.12)] bg-gradient-to-br from-[#FFFFFF]/95 via-[#F4F6F9]/9 to-[#E8ECF2]/85 shadow-[0_28px_90px_rgba(47,76,115,0.12)] [transform-style:preserve-3d]"
          >
            <div
              data-services-glow
              className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A6B94]/20 blur-3xl"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.55),transparent_65%)]" />

            <div className="relative z-[1] flex items-center justify-between gap-4 px-6 pt-5 sm:px-8">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#4A6B94] uppercase">
                Production stack
              </p>
              <p className="text-xs text-[#6B7C8F]">
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
                keepAlive
                warmDelay={280}
                slotPriority={13}
              />
            </div>

            <div className="relative z-[1] flex flex-wrap items-center gap-2 border-t border-[rgba(47,76,115,0.08)] px-6 py-4 sm:px-8">
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
