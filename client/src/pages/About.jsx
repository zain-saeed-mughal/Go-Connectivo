import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import PageHero from '../components/ui/PageHero';
import MagneticButton from '../components/ui/MagneticButton';
import ServiceIcon from '../components/ui/ServiceIcon';
import { RevealCard, StaggerContainer } from '../components/motion';
import {
  aboutIntro,
  coreValues,
  processSteps,
  serviceCategories,
} from '../data/content';
import { PageSeo } from '../components/seo/PageSeo';

const StatsBand = lazy(() => import('../components/ui/StatsBand'));
const CTA = lazy(() => import('../components/home/CTA'));

/** Shared with preload — one cache entry for LCP. */
const ABOUT_HERO = '/about-hero.webp';

const categoryLinks = {
  'business-communications': '/services/business-voip',
  'contact-center': '/services/call-center-software',
  'numbers-inbound': '/services/did-services',
  'carrier-voice': '/services/voip-termination',
  'apis-messaging': '/services/voice-api',
};

/** About-only advantages — softened, no unverified guarantees. */
const aboutAdvantages = [
  {
    title: 'Clear commercial scope',
    description:
      'Transparent rate decks and defined deliverables for seats, trunks, numbers, and termination.',
  },
  {
    title: 'Guided onboarding',
    description: 'Structured provisioning for dialers, PBX seats, SIP trunks, and numbers.',
  },
  {
    title: 'Specialist voice support',
    description: 'Support that understands trunks, campaigns, IVR, and routing, not only tickets.',
  },
  {
    title: 'One accountable partner',
    description:
      'Business VoIP, contact center, SIP, numbers, and termination under one operating relationship.',
  },
];

function SectionFallback({ minHeight = '36vh' }) {
  return <div className="w-full" style={{ minHeight }} aria-hidden />;
}

export default function About() {
  useEffect(() => {
    const existing = document.querySelector('link[data-about-hero-preload]');
    if (existing) return undefined;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = ABOUT_HERO;
    link.type = 'image/webp';
    link.setAttribute('fetchpriority', 'high');
    link.dataset.aboutHeroPreload = '1';
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, []);

  return (
    <>
      <PageSeo
        path="/about"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      />

      <PageHero
        eyebrow="About Go Connectivo"
        title="Your Trusted"
        highlight="VoIP Partner"
        description="A voice infrastructure company for contact centers and growing teams, focused on reliability, clear support, and practical go-live."
        image={ABOUT_HERO}
        imageAlt="Professional headset for VoIP and contact center support"
        imageWidth={735}
        imageHeight={490}
        className="!pb-8 sm:!pb-12 md:!pb-14"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <MagneticButton to="/contact" className="w-full justify-center sm:w-auto">
            Talk to Us
          </MagneticButton>
          <MagneticButton to="/services" variant="secondary" className="w-full justify-center sm:w-auto">
            View Services
          </MagneticButton>
        </div>
      </PageHero>

      <section className="gc-section !pt-6 sm:!pt-8">
        <div className="gc-prose-width space-y-4 sm:space-y-5">
          <SectionHeading
            title="Built on reliability, engineered for scale"
            description="Who we are and how we approach voice infrastructure."
          />
          <StaggerContainer className="space-y-4 sm:space-y-5" stagger={0.08} from="up">
            {aboutIntro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="gc-prose-muted text-[0.975rem] leading-[1.7] sm:text-base">
                {paragraph}
              </p>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <Suspense fallback={<SectionFallback />}>
        <section className="gc-section">
          <div className="gc-container">
            <SectionHeading
              eyebrow="Core capabilities"
              title="Four pillars of the Go Connectivo stack."
              description="Business calling, numbers, carrier voice, and contact-center tools, organized the way voice teams buy."
              className="!mb-8"
            />
            <StatsBand />
          </div>
        </section>
      </Suspense>

      <section className="gc-section">
        <div className="gc-container">
          <SectionHeading
            eyebrow="Our values"
            title="Principles that shape every engagement."
            description="The standards we hold from first conversation through long-term operations."
          />
          <StaggerContainer
            className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3 sm:gap-4"
            stagger={0.08}
            from="scale"
          >
            {coreValues.map((value) => (
              <RevealCard
                key={value.title}
                as="article"
                className="group w-full border border-[rgba(47,76,115,0.1)] p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[#4A6B94]/35 hover:shadow-[0_12px_32px_rgba(47,76,115,0.09)] sm:w-[calc(50%-0.5rem)] sm:p-6 lg:w-[calc(33.333%-0.7rem)] lg:max-w-[17.5rem]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#4A6B94]/12 text-[#2F4C73] ring-1 ring-[#4A6B94]/10 transition-colors duration-300 group-hover:bg-[#4A6B94]/18">
                  <ServiceIcon name={value.icon} size={18} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-[#2F4C73]">{value.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#5A6B7D] sm:text-sm">
                  {value.description}
                </p>
              </RevealCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="gc-section">
        <div className="gc-container">
          <SectionHeading
            eyebrow="Capabilities"
            title="What Go Connectivo provides."
            description="Five clear product groups, not an endless catalog dump. Explore a category or open the full services list."
          />
          <StaggerContainer
            className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
            stagger={0.07}
            from="up"
          >
            {serviceCategories.map((group) => (
              <RevealCard
                key={group.id}
                as="article"
                className="group flex h-full flex-col border border-[rgba(47,76,115,0.1)] p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[#4A6B94]/40 hover:shadow-[0_14px_36px_rgba(47,76,115,0.1)] sm:p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#4A6B94]/12 text-[#2F4C73] ring-1 ring-[#4A6B94]/10 transition-colors duration-300 group-hover:bg-[#4A6B94]/18">
                    <ServiceIcon name={group.icon} size={18} />
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-[#2F4C73]">
                    {group.title}
                  </h3>
                </div>
                <p className="mb-4 flex-1 text-[0.9375rem] leading-relaxed text-[#5A6B7D] sm:text-sm">
                  {group.description}
                </p>
                <Link
                  to={categoryLinks[group.id] || '/services'}
                  className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-[#2F4C73] transition-colors hover:text-[#4A6B94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A6B94]/45"
                >
                  Explore
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </RevealCard>
            ))}
          </StaggerContainer>
          <div className="mt-8 text-center sm:mt-10">
            <Link
              to="/services"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#4A6B94] transition-colors hover:text-[#2F4C73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A6B94]/45"
            >
              View All Services
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="gc-section">
        <div className="gc-container">
          <SectionHeading
            eyebrow="How we work"
            title="A clear path from requirements to launch"
            description="A simple operating path from scoping your stack to production-ready access."
          />
          <StaggerContainer className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5" stagger={0.08}>
            {processSteps.map((step) => (
              <article
                key={step.step}
                className="group flex h-full flex-col rounded-2xl border border-[rgba(47,76,115,0.1)] bg-gradient-to-br from-[#FFFFFF] via-[#F7F9FC] to-[#E8EEF6] p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[#4A6B94]/35 hover:shadow-[0_12px_32px_rgba(47,76,115,0.09)]"
              >
                <div className="mb-3.5 grid h-8 w-8 place-items-center rounded-full border border-[#4A6B94]/30 bg-[#4A6B94]/10 text-xs font-semibold text-[#4A6B94] transition-colors duration-300 group-hover:border-[#4A6B94]/50 group-hover:bg-[#4A6B94]/16">
                  {step.step}
                </div>
                <h3 className="font-display text-base font-semibold text-[#2F4C73] sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-[#5A6B7D] sm:text-sm">
                  {step.description}
                </p>
              </article>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="gc-section-tight">
        <div className="gc-container">
          <SectionHeading
            eyebrow="Advantages"
            title="Why teams work with Go Connectivo."
            description="Practical reasons buyers choose a focused voice partner."
          />
          <StaggerContainer className="grid gap-3 sm:grid-cols-2 sm:gap-4" stagger={0.08} from="up">
            {aboutAdvantages.map((item) => (
              <RevealCard
                key={item.title}
                as="article"
                className="border border-[rgba(47,76,115,0.1)] p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[#4A6B94]/35 hover:shadow-[0_12px_32px_rgba(47,76,115,0.09)] sm:p-6"
              >
                <h3 className="font-display text-lg font-semibold text-[#2F4C73] sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#5A6B7D] sm:text-sm">
                  {item.description}
                </p>
              </RevealCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <Suspense fallback={<SectionFallback minHeight="40vh" />}>
        <CTA />
      </Suspense>
    </>
  );
}
