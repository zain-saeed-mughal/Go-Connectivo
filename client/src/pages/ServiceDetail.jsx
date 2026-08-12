import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceIcon from '../components/ui/ServiceIcon';
import MagneticButton from '../components/ui/MagneticButton';
import CTA from '../components/home/CTA';
import { RevealCard, StaggerContainer } from '../components/motion';
import {
  getCategoryById,
  getServiceById,
  getServicesForCategory,
  services,
} from '../data/content';
import { getServiceHeroImage } from '../data/serviceImages';

export default function ServiceDetail() {
  const { slug } = useParams();
  const serviceId = String(slug || '')
    .trim()
    .toLowerCase();
  const service = getServiceById(serviceId);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const category = getCategoryById(service.category);
  const related = getServicesForCategory(service.category)
    .filter((item) => item.id !== service.id)
    .slice(0, 3);

  const moreServices = services.filter((item) => item.id !== service.id).slice(0, 6);
  const heroImage = getServiceHeroImage(service.id);

  return (
    <>
      <PageHero
        eyebrow={category?.title || 'Services'}
        title={service.title}
        highlight=""
        description={service.description}
        image={heroImage}
        imageAlt={`${service.title} illustration`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <MagneticButton to="/contact" className="w-full justify-center sm:w-auto">
            Get Started
          </MagneticButton>
          <MagneticButton to="/services" variant="secondary" className="w-full justify-center sm:w-auto">
            All Services
          </MagneticButton>
        </div>
      </PageHero>

      <section className="px-4 sm:px-6 pb-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealCard className="rounded-3xl border border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] p-5 sm:p-7 md:p-9">
            <div className="mb-6 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#4A6B94] to-[#2F4C73] text-[#FFFFFF] shadow-[0_12px_32px_rgba(74,107,148,0.35)]">
                <ServiceIcon name={service.icon} size={26} />
              </span>
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-[#4A6B94] uppercase">
                  {category?.title || 'Service'}
                </p>
                <h2 className="font-display text-2xl font-semibold text-[#2F4C73]">{service.title}</h2>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[#6B7C8F] md:text-base">{service.description}</p>

            <div className="mt-8">
              <h3 className="font-display text-lg font-semibold text-[#2F4C73]">What you get</h3>
              <ul className="mt-4 space-y-3">
                {service.capabilities.map((capability) => (
                  <li key={capability} className="flex items-start gap-3 text-sm text-[#4A5D73]">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#4A6B94]/15 text-[#6B8AB0]">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
          </RevealCard>

          <div className="space-y-4">
            <RevealCard className="rounded-3xl border border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] p-6">
              <h3 className="font-display text-lg font-semibold text-[#2F4C73]">Ready to deploy?</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7C8F]">
                Tell us about your seats, call volume, and markets — we’ll map {service.title} into
                your stack and share next steps.
              </p>
              <div className="mt-5">
                <MagneticButton to="/contact" className="w-full justify-center sm:w-auto">
                  Talk to sales
                </MagneticButton>
              </div>
            </RevealCard>

            {related.length > 0 ? (
              <RevealCard className="rounded-3xl border border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] p-6">
                <h3 className="font-display text-lg font-semibold text-[#2F4C73]">
                  More in {category?.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {related.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/services/${item.id}`}
                        className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/[0.04]"
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#4A6B94]/15 text-[#6B8AB0]">
                          <ServiceIcon name={item.icon} size={16} />
                        </span>
                        <span className="text-sm font-medium text-[#4A5D73] group-hover:text-[#2F4C73]">
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </RevealCard>
            ) : null}

            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6B8AB0] transition-colors hover:text-[#2F4C73]"
            >
              <ArrowLeft size={16} />
              Back to all services
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Explore more"
            title="Other capabilities on the platform."
            description="Jump into another dialer, PBX, or voice service."
          />
          <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {moreServices.map((item) => (
              <Link
                key={item.id}
                to={`/services/${item.id}`}
                className="group rounded-2xl border border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#4A6B94]/35"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#4A6B94]/15 text-[#6B8AB0] transition-transform group-hover:scale-105">
                  <ServiceIcon name={item.icon} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-[#2F4C73]">{item.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-[#6B7C8F]">{item.description}</p>
              </Link>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTA />
    </>
  );
}
