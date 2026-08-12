import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import voipVisual from '../../assets/services/voip-3.jpg';
import { featuredServices } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import ServiceIcon from '../ui/ServiceIcon';
import { Card3DList } from '../ui/animated-3d-card';
import { ImageReveal, ParallaxElement } from '../motion';

export default function ServicesBento() {
  const navigate = useNavigate();

  const cards = useMemo(
    () =>
      featuredServices.map((service, index) => {
        const themes = ['primary', 'accent', 'info', 'warning', 'secondary', 'neutral'];
        return {
          id: service.id,
          title: service.title,
          description: service.description,
          icon: <ServiceIcon name={service.icon} size={28} className="text-[#4A6B94]" />,
          theme: themes[index % themes.length],
          exploreLabel: 'Learn More',
          onClick: () => navigate(`/services/${service.id}`),
        };
      }),
    [navigate],
  );

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <ParallaxElement
        speed={12}
        className="pointer-events-none absolute top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#2F4C73]/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 grid items-center gap-6 md:mb-10 md:grid-cols-[1.15fr_0.75fr] md:gap-8 lg:gap-10">
          <SectionHeading
            eyebrow="Cloud Telephony & Voice"
            title="Dialers, PBX, inbound, and outbound — built for production floors."
            description="From predictive dialing and hosted PBX to DID origination and wholesale termination, Go Connectivo covers the voice stack contact centers actually use."
            className="!mb-0"
          />

          <ImageReveal
            direction="up"
            delay={0.08}
            className="group mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl border border-[rgba(47,76,115,0.12)] bg-[#FFFFFF] shadow-[0_14px_36px_rgba(47,76,115,0.1)] sm:max-w-[320px] sm:rounded-[1.25rem] md:ml-auto md:max-w-[340px]"
            zoomOnHover
          >
            <img
              src={voipVisual}
              alt="Cloud telephony and VoIP communication network"
              className="aspect-[735/490] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </ImageReveal>
        </div>

        <Card3DList cards={cards} columns={3} gap="md" size="md" variant="premium" className="mt-2" />
      </div>
    </section>
  );
}
