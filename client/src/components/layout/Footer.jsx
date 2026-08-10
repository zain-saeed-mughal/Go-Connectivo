import { Link } from 'react-router-dom';
import { Clock3, Mail, MapPin } from 'lucide-react';
import Logo from '../ui/Logo';
import { contactInfo, navLinks, services } from '../../data/content';
import { AnimatedSection, StaggerContainer } from '../motion';

const linkClass =
  'group inline-flex items-center text-sm text-[#9a9ab0] transition-colors duration-300 hover:text-white';

function FooterLink({ to, children }) {
  return (
    <Link to={to} className={linkClass}>
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#ff8a1f] transition-transform duration-400 group-hover:scale-x-100" />
      </span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-[#050505]">
      <div className="pointer-events-none absolute top-0 -left-20 h-64 w-64 rounded-full bg-[#e86f0c]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-[#ff6b00]/15 blur-3xl" />

      <StaggerContainer
        className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        stagger={0.09}
        start="top 95%"
      >
        <div className="space-y-4 lg:col-span-1">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-[#9a9ab0]">
            Leading provider of premium VoIP solutions for businesses of all sizes. Reliable,
            scalable, and cost-effective communication services.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold tracking-[0.08em] text-[#ffb86b] uppercase">
            Services
          </h3>
          <ul className="space-y-2.5">
            {services.slice(0, 5).map((service) => (
              <li key={service.id}>
                <FooterLink to={`/services/${service.id}`}>{service.title}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold tracking-[0.08em] text-[#ffb86b] uppercase">
            Company
          </h3>
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.path}>
                <FooterLink to={link.path}>{link.label}</FooterLink>
              </li>
            ))}
            <li>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
            </li>
            <li>
              <FooterLink to="/terms">Terms &amp; Conditions</FooterLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold tracking-[0.08em] text-[#ffb86b] uppercase">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-[#9a9ab0]">
            <li className="flex items-start gap-3">
              <Mail size={16} className="mt-0.5 text-[#ff8a1f]" />
              <a
                href={`mailto:${contactInfo.email}`}
                className="transition-colors duration-300 hover:text-white"
              >
                {contactInfo.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 text-[#ff8a1f]" />
              <span>{contactInfo.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock3 size={16} className="mt-0.5 text-[#ff8a1f]" />
              <span>{contactInfo.support}</span>
            </li>
          </ul>
        </div>
      </StaggerContainer>

      <AnimatedSection from="none" duration={0.7} start="top 98%">
        <div className="relative border-t border-white/8">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-[#6b6b82] sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Go Connectivo. All rights reserved.</p>
            <p>Built for clarity, performance, and long-term products.</p>
          </div>
        </div>
      </AnimatedSection>
    </footer>
  );
}
