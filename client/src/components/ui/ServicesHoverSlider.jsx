import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from './animated-slideshow';
import { AnimatedSection } from '../motion';
import { featuredServices } from '../../data/content';

/**
 * Featured service titles + Unsplash imagery (call center / telephony themed).
 */
export const SERVICE_SLIDES = featuredServices.map((service) => {
  const images = {
    'auto-dialer':
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2400&auto=format&fit=crop',
    'hosted-pbx':
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2400&auto=format&fit=crop',
    'call-center-software':
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2400&auto=format&fit=crop',
    'inbound-services':
      'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2400&auto=format&fit=crop',
    'outbound-services':
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2400&auto=format&fit=crop',
    'wholesale-termination':
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2400&auto=format&fit=crop',
  };

  return {
    id: service.id,
    title: service.title,
    imageUrl:
      images[service.id] ||
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2400&auto=format&fit=crop',
  };
});

export default function ServicesHoverSlider() {
  return (
    <AnimatedSection from="up" duration={0.9}>
      <HoverSlider className="mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] border border-white/8 bg-[#0c0c0c] px-4 py-10 sm:rounded-[2rem] sm:px-6 sm:py-12 md:px-12 md:py-16">
        <p className="mb-6 text-xs font-semibold tracking-[0.22em] text-[#ff8a1f] uppercase">
          / our services
        </p>

        <div className="flex flex-col items-stretch justify-between gap-10 lg:flex-row lg:items-center lg:gap-14">
          <div className="flex min-w-0 flex-1 flex-col space-y-1.5 md:space-y-2.5">
            {SERVICE_SLIDES.map((slide, index) => (
              <TextStaggerHover
                key={slide.id}
                index={index}
                to={`/services/${slide.id}`}
                className="cursor-pointer font-display text-xl font-bold tracking-tight text-white uppercase sm:text-2xl md:text-3xl lg:text-4xl"
                text={slide.title}
              />
            ))}
          </div>

          <HoverSliderImageWrap className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#141414] lg:max-w-xl lg:flex-1">
            {SERVICE_SLIDES.map((slide, index) => (
              <div key={slide.id} className="size-full">
                <HoverSliderImage
                  index={index}
                  imageUrl={slide.imageUrl}
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="size-full max-h-none object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            ))}
          </HoverSliderImageWrap>
        </div>
      </HoverSlider>
    </AnimatedSection>
  );
}
