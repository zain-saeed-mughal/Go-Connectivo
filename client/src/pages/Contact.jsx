import { Clock3, Headset, Mail, MapPin, MessageSquareText, Timer } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import ContactForm from '../components/forms/ContactForm';
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

const nextSteps = [
  {
    icon: MessageSquareText,
    title: 'Tell us the floor',
    copy: 'Seats, call volume, and whether you need dialers, numbers, or carrier reach.',
  },
  {
    icon: Timer,
    title: 'Reply in one business day',
    copy: 'Sales reviews the note and comes back with a clear path — not a generic brochure.',
  },
  {
    icon: Headset,
    title: 'Live accounts stay covered',
    copy: 'Existing customers skip the queue: 24/7 support by phone, email, or chat.',
  },
];

function ContactBrief() {
  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {nextSteps.map((item) => (
          <li key={item.title} className="flex items-start gap-3.5">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[rgba(47,76,115,0.12)] bg-[#FFFFFF] text-[#2F4C73]">
              <item.icon size={16} strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#2F4C73]">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#6B7C8F]">{item.copy}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GetInTouchCard() {
  return (
    <div className="gc-card p-6 sm:p-7">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-[#4A6B94] uppercase">
        Direct line
      </p>
      <h2 className="font-display mt-2 text-xl font-semibold tracking-[-0.02em] text-[#2F4C73] sm:text-2xl">
        Get In Touch
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#6B7C8F]">
        Questions on dialers, voice, numbers, termination, or APIs — our team will point you to the
        right setup.
      </p>

      <ul className="mt-6 divide-y divide-[rgba(47,76,115,0.08)]">
        {details.map((detail) => (
          <li key={detail.title} className="flex items-start gap-3.5 py-4 first:pt-0 last:pb-0">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#2F4C73] text-[#FFFFFF]">
              <detail.icon size={16} strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold tracking-[0.08em] text-[#4A6B94] uppercase">
                {detail.title}
              </p>
              {detail.lines.map((line) =>
                detail.href ? (
                  <a
                    key={line}
                    href={detail.href}
                    className="mt-1 block text-sm leading-relaxed text-[#2F4C73] transition-colors duration-300 hover:text-[#4A6B94]"
                  >
                    {line}
                  </a>
                ) : (
                  <p key={line} className="mt-1 text-sm leading-relaxed text-[#4A5D73]">
                    {line}
                  </p>
                ),
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-l-2 border-[#4A6B94] bg-[#F4F6F9] px-4 py-3.5">
        <p className="text-sm font-semibold text-[#2F4C73]">24/7 customer support</p>
        <p className="mt-1 text-sm leading-relaxed text-[#6B7C8F]">
          Existing customers can reach technical support any time by phone, email, or live chat.
        </p>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <PageHero
        animated={false}
        className="pb-6 sm:pb-8 md:pb-8"
        eyebrow="Contact Us"
        title="Get in touch with"
        highlight="our team."
        description="Questions about dialers, Business VoIP, SIP trunks, numbers, VoIP Termination, contact-center tools, or APIs — we’re here to help."
        detail={<ContactBrief />}
        aside={<GetInTouchCard />}
      />

      <section className="pb-16 sm:pb-20">
        <div className="gc-container">
          <div className="gc-card mx-auto max-w-4xl p-6 sm:p-8 md:p-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#4A6B94] uppercase">
              Enquiry
            </p>
            <h2 className="font-display mt-2 text-xl font-semibold tracking-[-0.02em] text-[#2F4C73] sm:text-2xl">
              Send Us a Message
            </h2>
            <p className="mt-2 mb-8 max-w-xl text-sm leading-relaxed text-[#6B7C8F]">
              Fill in the form and we’ll get back to you shortly with a clear next step.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
