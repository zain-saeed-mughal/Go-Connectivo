import { techMarquee } from '../../data/content';
import { gsap, ScrollTrigger } from '../../motion/config';
import { useGsapContext } from '../../motion/useGsapContext';

export default function TechMarquee() {
  const items = [...techMarquee, ...techMarquee];

  const scope = useGsapContext(() => {
    const track = scope.current.querySelector('[data-track]');

    const loop = gsap.to(track, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    });

    ScrollTrigger.create({
      trigger: scope.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        gsap.to(loop, {
          timeScale: self.direction === -1 ? -1 : 1,
          duration: 0.7,
          ease: 'power2.out',
          overwrite: true,
        });
      },
    });
  }, []);

  return (
    <section
      id="home-next"
      ref={scope}
      className="relative border-y border-white/8 bg-[#080808] py-6"
      aria-label="Technology capabilities"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#080808] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#080808] to-transparent" />

      <div className="overflow-hidden">
        <div data-track className="flex w-max items-center gap-10 px-6 will-change-transform">
          {items.map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center gap-10">
              <span className="font-display text-sm font-semibold tracking-[0.18em] whitespace-nowrap text-[#8d8d8d] uppercase transition-colors duration-500 hover:text-[#ffb86b]">
                {item}
              </span>
              <span className="h-1 w-1 rounded-full bg-[#e86f0c]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
