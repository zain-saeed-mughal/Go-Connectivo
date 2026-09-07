import { useEffect } from 'react';
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from './animated-slideshow';
import { AnimatedSection } from '../motion';
import { featuredServices } from '../../data/content';
import businessVoipImg from '../../assets/services/illustrations/slider/business-voip.webp';
import sipTrunkingImg from '../../assets/services/illustrations/slider/sip-trunking.webp';
import contactCenterImg from '../../assets/services/illustrations/slider/contact-center.webp';
import voipTerminationImg from '../../assets/services/illustrations/slider/voip-termination.webp';
import autoDialerImg from '../../assets/services/illustrations/slider/auto-dialer.webp';
import didServicesImg from '../../assets/services/illustrations/slider/did-services.webp';

/**
 * Featured service titles + square illustrations sized for the rounded preview box.
 */
const SLIDER_IMAGES = {
  'business-voip': businessVoipImg,
  'sip-trunking': sipTrunkingImg,
  'call-center-software': contactCenterImg,
  'voip-termination': voipTerminationImg,
  'auto-dialer': autoDialerImg,
  'did-services': didServicesImg,
};

const SERVICE_SLIDES = featuredServices.map((service) => ({
  id: service.id,
  title: service.title,
  imageUrl: SLIDER_IMAGES[service.id] || businessVoipImg,
}));

export default function ServicesHoverSlider() {
  // Warm the browser cache so hover swaps never wait on network.
  useEffect(() => {
    SERVICE_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.imageUrl;
    });
  }, []);

  return (
    <AnimatedSection from="up" duration={0.9}>
      <HoverSlider className="gc-card gc-card-panel gc-container overflow-hidden px-4 py-7 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
        <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-[var(--text-secondary)] uppercase sm:mb-6">
          / our services
        </p>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 xl:gap-10">
          <div className="order-2 flex min-w-0 flex-col justify-center space-y-1 sm:space-y-1.5 lg:order-1 lg:min-h-full lg:py-1">
            {SERVICE_SLIDES.map((slide, index) => (
              <TextStaggerHover
                key={slide.id}
                index={index}
                to={`/services/${slide.id}`}
                className="min-h-11 w-full min-w-0 cursor-pointer py-1.5 font-display text-[0.95rem] font-bold tracking-tight break-words text-[var(--text-primary)] uppercase sm:min-h-0 sm:py-1 sm:text-2xl md:text-3xl lg:text-[2rem] lg:leading-tight xl:text-4xl"
                text={slide.title}
              />
            ))}
          </div>

          <HoverSliderImageWrap className="relative order-1 mx-auto aspect-square w-full max-w-[min(100%,22rem)] overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-[var(--bg-secondary)] shadow-[var(--shadow-card)] sm:max-w-md lg:order-2 lg:mx-0 lg:max-w-none lg:justify-self-end">
            {SERVICE_SLIDES.map((slide, index) => (
              <div key={slide.id} className="size-full overflow-hidden rounded-2xl">
                <HoverSliderImage
                  index={index}
                  imageUrl={slide.imageUrl}
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="h-full w-full rounded-2xl object-cover object-center"
                  loading="eager"
                  fetchPriority={index === 0 ? 'high' : 'low'}
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
