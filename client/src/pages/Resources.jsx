import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Shield, PhoneCall, FileText } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import CTA from '../components/home/CTA';
import { PageSeo } from '../components/seo/PageSeo';
import { getCatalogServices } from '../data/content';

const guides = [
  {
    icon: BookOpen,
    title: 'FAQs',
    text: 'Practical answers on dialers, Business VoIP, numbers, termination, APIs, and support.',
    to: '/faqs',
  },
  {
    icon: Shield,
    title: 'Legal compliance hub',
    text: 'How Go Connectivo approaches robocall mitigation, caller authentication, and responsible use.',
    to: '/compliance',
  },
  {
    icon: FileText,
    title: 'Robocall Mitigation Plan',
    text: 'Published policies and controls for identifying and mitigating potentially unlawful voice traffic.',
    to: '/compliance/robocall-mitigation-plan',
  },
  {
    icon: FileText,
    title: 'Acceptable Use & Calling Policy',
    text: 'Rules for lawful use of dialers, VoIP, messaging, numbers, and related services.',
    to: '/compliance/acceptable-use-policy',
  },
];

const topicLinks = [
  { label: 'Auto dialer', to: '/services/auto-dialer' },
      { label: 'Cloud PBX', to: '/services/hosted-pbx' },
  { label: 'SIP trunking', to: '/services/sip-trunking' },
  { label: 'VoIP termination', to: '/services/voip-termination' },
  { label: 'Wholesale termination', to: '/services/wholesale-termination' },
  { label: 'Call center software', to: '/services/call-center-software' },
  { label: 'Voice API', to: '/services/voice-api' },
  { label: 'DID numbers', to: '/services/did-services' },
];

export default function Resources() {
  const catalogCount = getCatalogServices().length;

  return (
    <>
      <PageSeo
        path="/resources"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Resources', path: '/resources' },
        ]}
      />
      <PageHero
        eyebrow="Resources"
        title="Guides, policies, and service explainers"
        description="First-hand materials from Go Connectivo, FAQs, compliance documents, and deep links into our voice service catalog. No fabricated case studies or invented rankings."
      />

      <section className="gc-section">
        <div className="gc-container grid gap-4 sm:grid-cols-2">
          {guides.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="group rounded-2xl border border-[rgba(47,76,115,0.1)] bg-white p-6 transition-colors hover:border-[#4A6B94]/40"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#2F4C73] text-white">
                  <Icon size={18} aria-hidden />
                </span>
                <h2 className="font-display mt-4 text-lg font-semibold text-[#1C314F] group-hover:text-[#2F4C73]">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#4A5D73]">{item.text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#4A6B94]">
                  Open <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="gc-section bg-[#F0F3F8]/80">
        <div className="gc-container">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#4A6B94] uppercase">
                Service library
              </p>
              <h2 className="font-display mt-2 text-2xl font-bold tracking-[-0.02em] text-[#1C314F] sm:text-3xl">
                Explore {catalogCount} voice services
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[#4A5D73]">
                Start with these high-intent topics, or open the full services index.
              </p>
            </div>
            <Link
              to="/services"
              className="hidden shrink-0 text-sm font-semibold text-[#4A6B94] hover:text-[#2F4C73] sm:inline-flex sm:items-center sm:gap-1"
            >
              All services <ArrowRight size={14} />
            </Link>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {topicLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex min-h-11 items-center gap-2 rounded-xl border border-[rgba(47,76,115,0.1)] bg-white px-4 py-3 text-sm font-medium text-[#2F4C73] hover:border-[#4A6B94]/35"
                >
                  <PhoneCall size={14} className="text-[#4A6B94]" aria-hidden />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 sm:hidden">
            <Link to="/services" className="text-sm font-semibold text-[#4A6B94]">
              View all services →
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
