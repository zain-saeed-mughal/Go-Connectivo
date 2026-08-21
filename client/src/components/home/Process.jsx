import { processSteps } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import { gsap, ScrollTrigger, ease, prefersReducedMotion } from '../../motion/config';
import { useGsapContext } from '../../motion/useGsapContext';

/** Node X positions along the journey SVG (viewBox 0–1000). */
const NODE_X = [40, 280, 520, 760, 960];
const NODE_Y = [100, 95, 92, 78, 90];

/**
 * Onboarding journey, Lusion-style scroll path (SVG + GSAP, no WebGL).
 */
export default function Process() {
  const scope = useGsapContext(() => {
    const root = scope.current;
    if (!root) return undefined;

    const path = root.querySelector('[data-journey-path]');
    const progress = root.querySelector('[data-journey-progress]');
    const nodes = gsap.utils.toArray('[data-journey-node]', root);
    const cards = gsap.utils.toArray('[data-step]', root);
    const stage = root.querySelector('[data-journey-stage]');
    const glow = root.querySelector('[data-journey-glow]');
    const chapter = root.closest('[data-scroll-chapter]') || root;
    const cleanups = [];

    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    }

    gsap.set(nodes, { scale: 0.6, autoAlpha: 0.3 });
    gsap.set(cards, { y: 28, autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: chapter,
        start: 'top 70%',
        end: 'bottom 55%',
        scrub: 0.65,
        invalidateOnRefresh: true,
      },
    });

    if (path) {
      tl.to(path, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0);
    }
    if (progress) {
      tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0);
    }

    gsap.to(nodes, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.35,
      stagger: 0.08,
      ease: ease.soft,
      scrollTrigger: {
        trigger: chapter,
        start: 'top 72%',
        once: true,
      },
    });

    gsap.to(cards, {
      y: 0,
      autoAlpha: 1,
      duration: 0.4,
      stagger: 0.08,
      ease: ease.soft,
      scrollTrigger: {
        trigger: chapter,
        start: 'top 72%',
        once: true,
      },
    });

    const pulse = gsap.to(nodes, {
      boxShadow: '0 0 0 12px rgba(74,107,148,0.1)',
      duration: 1.7,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.2,
      paused: true,
    });

    const pulseTrigger = ScrollTrigger.create({
      trigger: chapter,
      start: 'top 75%',
      end: 'bottom 40%',
      onEnter: () => pulse.play(),
      onEnterBack: () => pulse.play(),
      onLeave: () => pulse.pause(),
      onLeaveBack: () => pulse.pause(),
    });
    cleanups.push(() => pulseTrigger.kill());

    if (!prefersReducedMotion() && stage && glow) {
      const onMove = (event) => {
        const rect = stage.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        gsap.to(glow, { x: x * 40, y: y * 28, duration: 0.7, ease: 'power3.out', overwrite: 'auto' });
        gsap.to(stage, {
          rotateX: -y * 4,
          rotateY: x * 5,
          duration: 0.7,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };
      const onLeave = () => {
        gsap.to(glow, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' });
        gsap.to(stage, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power3.out' });
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
          eyebrow="Onboarding"
          title="A clear path from sign-up to launch."
          description="Most customers are up and running within 24–48 hours."
        />

        <div
          data-journey-stage
          className="relative mb-8 hidden overflow-hidden rounded-[1.75rem] border border-[rgba(47,76,115,0.12)] bg-gradient-to-br from-[#FFFFFF]/90 via-[#F4F6F9]/95 to-[#E8ECF2]/80 p-6 shadow-[0_24px_80px_rgba(47,76,115,0.1)] [transform-style:preserve-3d] sm:p-8 lg:block"
          style={{ perspective: '1200px' }}
        >
          <div
            data-journey-glow
            className="pointer-events-none absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A6B94]/18 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.4]"
            aria-hidden
            style={{
              backgroundImage:
                'radial-gradient(circle at 18% 28%, rgba(107,138,176,0.22), transparent 42%), radial-gradient(circle at 82% 68%, rgba(47,76,115,0.14), transparent 46%)',
            }}
          />

          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={`dust-${i}`}
                className="absolute h-1 w-1 rounded-full bg-[#6B8AB0]/40"
                style={{
                  left: `${6 + ((i * 41) % 88)}%`,
                  top: `${10 + ((i * 59) % 78)}%`,
                  opacity: 0.2 + (i % 4) * 0.12,
                }}
              />
            ))}
          </div>

          <div className="relative z-[1]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#4A6B94] uppercase">
                Launch path
              </p>
              <div className="h-1.5 w-44 overflow-hidden rounded-full bg-[rgba(47,76,115,0.1)] sm:w-64">
                <div
                  data-journey-progress
                  className="h-full origin-left rounded-full bg-gradient-to-r from-[#2F4C73] via-[#4A6B94] to-[#6B8AB0]"
                />
              </div>
            </div>

            <div className="relative">
              <svg
                className="h-40 w-full"
                viewBox="0 0 1000 180"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                <path
                  d="M40 110 C160 40, 240 150, 320 100 S480 35, 560 105 S700 160, 820 80 S920 45, 960 100"
                  stroke="rgba(47,76,115,0.12)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  data-journey-path
                  d="M40 110 C160 40, 240 150, 320 100 S480 35, 560 105 S700 160, 820 80 S920 45, 960 100"
                  stroke="url(#gc-journey-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gc-journey-grad" x1="0" y1="0" x2="1000" y2="0">
                    <stop stopColor="#2F4C73" />
                    <stop offset="0.55" stopColor="#4A6B94" />
                    <stop offset="1" stopColor="#6B8AB0" />
                  </linearGradient>
                </defs>
              </svg>

              {processSteps.map((step, index) => (
                <div
                  key={step.step}
                  data-journey-node
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  style={{
                    left: `${(NODE_X[index] / 1000) * 100}%`,
                    top: `${(NODE_Y[index] / 180) * 100}%`,
                  }}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-[#4A6B94]/50 bg-[#FFFFFF] font-display text-xs font-bold text-[#2F4C73] shadow-[0_12px_32px_rgba(47,76,115,0.18)]">
                    {step.step}
                  </span>
                  <span className="mt-2 max-w-[6.5rem] text-center text-[10px] font-semibold tracking-[0.12em] text-[#4A5D73] uppercase">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <article
              key={step.step}
              data-step
              className="gc-card group relative flex h-full flex-col overflow-hidden p-5 sm:p-6"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#4A6B94]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-[#4A6B94]/35 bg-[#4A6B94]/10 font-display text-xs font-bold text-[#4A6B94] transition-[background-color,border-color,transform] duration-500 group-hover:scale-105 group-hover:border-[#4A6B94]/60 group-hover:bg-[#4A6B94]/18">
                  {step.step}
                </span>
                <span className="text-[10px] font-semibold tracking-[0.18em] text-[#6B8AB0] uppercase">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-[#2F4C73]">
                {step.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7C8F]">{step.description}</p>
              <div className="mt-5 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#4A6B94]/50 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
