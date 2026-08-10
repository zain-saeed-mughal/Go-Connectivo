import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card3DList } from './animated-3d-card';
import ServiceIcon from './ServiceIcon';
import { SERVICE_SLIDES } from './ServicesHoverSlider';
import { services } from '../../data/content';

/**
 * VoIP service cards with 3D tilt / hover animation.
 * Learn More opens the individual service detail page.
 */
export default function ServicesCards3D({
  columns = 3,
  gap = 'lg',
  size = 'md',
  variant = 'premium',
  exploreLabel = 'Learn More',
  showImages = true,
  items = services,
  className = '',
}) {
  const navigate = useNavigate();

  const cards = useMemo(
    () =>
      items.map((service) => {
        const slide = SERVICE_SLIDES.find((s) => s.id === service.id);
        return {
          id: service.id,
          title: service.title,
          description: service.description,
          image: showImages ? slide?.imageUrl : undefined,
          icon: <ServiceIcon name={service.icon} size={28} className="text-[#ffb86b]" />,
          theme: 'primary',
          exploreLabel,
          onClick: () => navigate(`/services/${service.id}`),
        };
      }),
    [navigate, exploreLabel, showImages, items],
  );

  return (
    <Card3DList
      cards={cards}
      columns={columns}
      gap={gap}
      size={size}
      variant={variant}
      className={className}
    />
  );
}
