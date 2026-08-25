import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import TopographyCanvas from '../ui/TopographyCanvas';
import { contactInfo, getCatalogServices, navLinks } from '../../data/content';
import { AnimatedSection, StaggerContainer } from '../motion';

const linkClass =
  'group inline-flex items-center text-[0.8125rem] text-[#D7E2E8] transition-colors duration-300 hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BA3C4]/60 sm:text-sm';

function FooterLink({ to, children }) {
  return (
    <Link to={to} className={linkClass}>
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#8BA3C4] transition-transform duration-400 group-hover:scale-x-100" />
      </span>
    </Link>
  );
}

export default function Footer() {
  const footerServices = [
    'business-voip',
    'sip-trunking',
    'call-center-software',
    'voip-termination',
    'auto-dialer',
    'did-services',
  ]
    .map((id) => getCatalogServices().find((service) => service.id === id))
    .filter(Boolean);

  const companyLinks = [
    ...navLinks.filter((link) => link.path !== '/'),
    { label: 'Contact', path: '/contact' },
  ];

  const legalLinks = [
    { label: 'Privacy', path: '/privacy' },
    { label: 'Terms', path: '/terms' },
    { label: 'Compliance', path: '/compliance' },
    { label: 'RMP', path: '/compliance/robocall-mitigation-plan' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[#6B8AB0]/30 bg-[#1C314F] text-[#D7E2E8]">
      <TopographyCanvas />

      <StaggerContainer
        className="gc-container relative z-10 grid gap-8 py-10 sm:gap-10 sm:py-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10 lg:py-14"
        stagger={0.09}
        start="top 95%"
      >
        <div className="space-y-4 md:col-span-2 lg:col-span-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-[#B8C9D1]">
            Business VoIP, contact center, SIP trunking, and VoIP Termination with clear technical
            support.
          </p>
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center rounded-full border border-[#8BA3C4]/45 px-5 py-2.5 text-sm font-semibold text-[#FFFFFF] transition-colors hover:border-[#FFFFFF]/70 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BA3C4]/60"
          >
            Get Started
          </Link>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-3.5 font-mono text-[10px] font-bold tracking-[0.2em] text-[#8BA3C4] uppercase sm:text-xs">
            Company
          </h3>
          <ul className="space-y-2">
            {companyLinks.map((link) => (
              <li key={link.path}>
                <FooterLink to={link.path}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="mb-3.5 font-mono text-[10px] font-bold tracking-[0.2em] text-[#8BA3C4] uppercase sm:text-xs">
            Solutions
          </h3>
          <ul className="space-y-2">
            {footerServices.map((service) => (
              <li key={service.id}>
                <FooterLink to={`/services/${service.id}`}>{service.title}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="mb-3.5 font-mono text-[10px] font-bold tracking-[0.2em] text-[#8BA3C4] uppercase sm:text-xs">
            Contact
          </h3>
          <p className="max-w-[16rem] text-sm leading-relaxed text-[#B8C9D1]">{contactInfo.address}</p>
          <a
            href={`mailto:${contactInfo.email}`}
            className="mt-3 inline-block text-sm font-medium text-[#D7E2E8] transition-colors duration-300 hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BA3C4]/60"
          >
            {contactInfo.email}
          </a>
          <p className="mt-2 text-sm text-[#9BB0BA]">{contactInfo.support}</p>
        </div>
      </StaggerContainer>

      <AnimatedSection from="none" duration={0.7} start="top 98%">
        <div className="relative z-10 border-t border-[#6B8AB0]/20">
          <div className="gc-container flex flex-col gap-3 py-4 sm:py-5">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {legalLinks.map((link) => (
                <FooterLink key={link.path} to={link.path}>
                  {link.label}
                </FooterLink>
              ))}
            </div>
            <div className="flex flex-col gap-1.5 font-mono text-[11px] tracking-wider text-[#9BB0BA] sm:flex-row sm:items-center sm:justify-between sm:text-xs">
              <p>© {new Date().getFullYear()} GO CONNECTIVO LLC. ALL RIGHTS RESERVED.</p>
              <p className="text-[#7A8F99]">FCC RMD certified voice infrastructure</p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </footer>
  );
}
