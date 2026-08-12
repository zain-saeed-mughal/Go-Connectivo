import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from './animated-slideshow';
import { AnimatedSection } from '../motion';
import { featuredServices } from '../../data/content';
import autoDialersImg from '../../assets/services/auto-dialers.jpg';
import cloudPbxImg from '../../assets/services/cloud-pbx.jpg';
import callCenterSoftwareImg from '../../assets/services/call-center-software.jpg';
import inboundVoiceImg from '../../assets/services/inbound-voice.jpg';
import outboundVoiceImg from '../../assets/services/outbound-voice.jpg';
import wholesaleVoiceImg from '../../assets/services/wholesale-voice.jpg';

/**
 * Featured service titles + imagery (local assets where provided).
 */
export const SERVICE_SLIDES = featuredServices.map((service) => {
  const images = {
    'auto-dialer': autoDialersImg,
    'hosted-pbx': cloudPbxImg,
    'call-center-software': callCenterSoftwareImg,
    'inbound-services': inboundVoiceImg,
    'outbound-services': outboundVoiceImg,
    'wholesale-termination': wholesaleVoiceImg,
  };

  return {
    id: service.id,
    title: service.title,
    imageUrl: images[service.id] || autoDialersImg,
  };
});

export default function ServicesHoverSlider() {
  return (
    <AnimatedSection from="up" duration={0.9}>
      <HoverSlider className="mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] border border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] px-4 py-8 sm:rounded-[2rem] sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
        <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-[#4A6B94] uppercase sm:mb-6">
          / our services
        </p>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 xl:gap-10">
          <div className="order-2 flex min-w-0 flex-col justify-center space-y-1 sm:space-y-1.5 lg:order-1 lg:min-h-full lg:py-1">
            {SERVICE_SLIDES.map((slide, index) => (
              <TextStaggerHover
                key={slide.id}
                index={index}
                to={`/services/${slide.id}`}
                className="min-h-11 w-full min-w-0 cursor-pointer py-1.5 font-display text-[0.95rem] font-bold tracking-tight break-words text-[#2F4C73] uppercase sm:min-h-0 sm:py-1 sm:text-2xl md:text-3xl lg:text-[2rem] lg:leading-tight xl:text-4xl"
                text={slide.title}
              />
            ))}
          </div>

          <HoverSliderImageWrap className="relative order-1 mx-auto aspect-square w-full max-w-[min(100%,22rem)] overflow-hidden rounded-2xl border border-[rgba(47,76,115,0.12)] bg-[#E8ECF2] sm:max-w-md lg:order-2 lg:mx-0 lg:max-w-none lg:justify-self-end">
            {SERVICE_SLIDES.map((slide, index) => (
              <div key={slide.id} className="size-full">
                <HoverSliderImage
                  index={index}
                  imageUrl={slide.imageUrl}
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="h-full w-full object-cover object-center"
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
