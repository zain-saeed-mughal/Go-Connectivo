import { Clock3, Mail, MapPin } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import ContactForm from '../components/forms/ContactForm';
import { ImageReveal, StaggerContainer } from '../components/motion';
import { contactInfo } from '../data/content';

const details = [
  {
    icon: MapPin,
    title: 'Our Location',
    lines: ['522 Glenwood Ave', 'Williamsport PA 17701, USA'],
  },
  {
    icon: Mail,
    title: 'Email Address',
    lines: [contactInfo.email],
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: Clock3,
    title: 'Business Hours',
    lines: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 2:00 PM'],
  },
];

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get in touch with"
        highlight="our team."
        description="Questions about dialers, cloud PBX, inbound/outbound voice, or support — we’re here to help."
      />

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <ImageReveal
            direction="left"
            className="rounded-3xl border border-[rgba(47,76,115,0.1)]"
            innerClassName="bg-[#FFFFFF] p-7 md:p-8"
          >
            <h3 className="font-display text-2xl font-semibold text-[#2F4C73]">Get In Touch</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7C8F]">
              Have questions about our services? Our team is here to help you.
            </p>

            <StaggerContainer className="mt-8 space-y-6" stagger={0.1} from="left">
              {details.map((detail) => (
                <div key={detail.title} className="group flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#4A6B94] to-[#2F4C73] text-[#FFFFFF] shadow-[0_8px_24px_rgba(47,76,115,0.3)] transition-transform duration-500 group-hover:scale-105">
                    <detail.icon size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#2F4C73]">{detail.title}</p>
                    {detail.lines.map((line) =>
                      detail.href ? (
                        <a
                          key={line}
                          href={detail.href}
                          className="mt-1 block text-sm text-[#6B7C8F] transition-colors duration-300 hover:text-[#2F4C73]"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="mt-1 text-sm text-[#6B7C8F]">
                          {line}
                        </p>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </StaggerContainer>

            <div className="mt-8 rounded-2xl border border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] p-5">
              <p className="text-sm font-semibold text-[#2F4C73]">24/7 Customer Support</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#6B7C8F]">
                Existing customers can reach our technical support team any time via phone, email,
                or live chat.
              </p>
            </div>
          </ImageReveal>

          <ImageReveal
            direction="right"
            delay={0.1}
            className="rounded-3xl border border-[rgba(47,76,115,0.1)]"
            innerClassName="bg-[#FFFFFF]/80 p-7 backdrop-blur md:p-8"
          >
            <h3 className="font-display text-2xl font-semibold text-[#2F4C73]">Send Us a Message</h3>
            <p className="mt-2 mb-7 text-sm text-[#6B7C8F]">
              Fill out the form below and we’ll get back to you shortly.
            </p>
            <ContactForm />
          </ImageReveal>
        </div>
      </section>
    </>
  );
}
