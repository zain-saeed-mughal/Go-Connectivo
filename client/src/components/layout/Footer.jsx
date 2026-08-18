import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import TopographyCanvas from '../ui/TopographyCanvas';
import { contactInfo, getCatalogServices, navLinks } from '../../data/content';
import { AnimatedSection, StaggerContainer } from '../motion';

const linkClass =
  'group inline-flex items-center text-sm text-[#D7E2E8] transition-colors duration-300 hover:text-[#FFFFFF]';

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
    'auto-dialer',
    'hosted-pbx',
    'voip-termination',
    'call-center-software',
    'sip-trunking',
    'did-services',
  ]
    .map((id) => getCatalogServices().find((service) => service.id === id))
    .filter(Boolean);

  return (
    <footer className="relative overflow-hidden border-t border-[#6B8AB0]/30 bg-[#1C314F] text-[#D7E2E8]">
      <TopographyCanvas />

      <StaggerContainer
        className="gc-container relative z-10 grid gap-8 py-12 sm:gap-10 sm:py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-16"
        stagger={0.09}
        start="top 95%"
      >
        <div className="space-y-4 lg:col-span-1">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-[#B8C9D1]">
            A mixed-use voice infrastructure bringing together dialers, business voice, carrier
            termination, contact-center tools, and APIs.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-xs font-bold tracking-[0.2em] text-[#8BA3C4] uppercase">
            NAVIGATION
          </h3>
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.path}>
                <FooterLink to={link.path}>{link.label}</FooterLink>
              </li>
            ))}
            <li>
              <FooterLink to="/contact">Contact</FooterLink>
            </li>
            <li>
              <FooterLink to="/compliance/robocall-mitigation-plan">
                Robocall Mitigation Plan
              </FooterLink>
            </li>
            <li>
              <FooterLink to="/compliance/acceptable-use-policy">
                Acceptable Use &amp; Calling Policy
              </FooterLink>
            </li>
            <li>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
            </li>
            <li>
              <FooterLink to="/terms">Terms &amp; Conditions</FooterLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-xs font-bold tracking-[0.2em] text-[#8BA3C4] uppercase">
            SOLUTIONS
          </h3>
          <ul className="space-y-2.5">
            {footerServices.map((service) => (
              <li key={service.id}>
                <FooterLink to={`/services/${service.id}`}>{service.title}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-xs font-bold tracking-[0.2em] text-[#8BA3C4] uppercase">
            INQUIRIES
          </h3>
          <p className="text-sm leading-relaxed text-[#B8C9D1]">{contactInfo.address}</p>
          <a
            href={`mailto:${contactInfo.email}`}
            className="mt-3 inline-block text-sm font-medium text-[#D7E2E8] transition-colors duration-300 hover:text-[#FFFFFF]"
          >
            {contactInfo.email}
          </a>
        </div>
      </StaggerContainer>

      <AnimatedSection from="none" duration={0.7} start="top 98%">
        <div className="relative z-10 border-t border-[#6B8AB0]/20">
          <div className="gc-container py-5 font-mono text-[11px] tracking-wider text-[#9BB0BA] sm:text-xs">
            <p>© {new Date().getFullYear()} GO CONNECTIVO LLC. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </AnimatedSection>
    </footer>
  );
}
