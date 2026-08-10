import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { featuredServices } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import ServiceIcon from '../ui/ServiceIcon';
import { Card3DList } from '../ui/animated-3d-card';
import { ParallaxElement } from '../motion';

export default function ServicesBento() {
  const navigate = useNavigate();

  const cards = useMemo(
    () =>
      featuredServices.map((service) => ({
        id: service.id,
        title: service.title,
        description: service.description,
        icon: <ServiceIcon name={service.icon} size={28} className="text-[#ffb86b]" />,
        theme: 'primary',
        exploreLabel: 'Learn More',
        onClick: () => navigate(`/services/${service.id}`),
      })),
    [navigate],
  );

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 md:py-28">
      <ParallaxElement
        speed={12}
        className="pointer-events-none absolute top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#e86f0c]/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Cloud Telephony & Voice"
          title="Dialers, PBX, inbound, and outbound — built for production floors."
          description="From predictive dialing and hosted PBX to DID origination and wholesale termination, Go Connectivo covers the voice stack contact centers actually use."
        />

        <Card3DList cards={cards} columns={3} gap="md" size="md" variant="premium" className="mt-2" />
      </div>
    </section>
  );
}
