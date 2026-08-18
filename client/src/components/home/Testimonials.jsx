import { Quote } from 'lucide-react';
import { testimonials } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import { RevealCard, StaggerContainer } from '../motion';

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);
}

export default function Testimonials() {
  return (
    <section className="gc-section">
      <div className="gc-container">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our clients say."
          description="Join thousands of satisfied businesses worldwide."
        />

        <StaggerContainer className="grid gap-4 md:grid-cols-3" stagger={0.13}>
          {testimonials.map((item) => (
            <RevealCard
              key={item.name}
              as="blockquote"
              className="group relative flex h-full flex-col justify-between p-6"
            >
              <Quote
                className="absolute top-5 right-5 text-[#4A6B94]/20 transition-all duration-500 group-hover:scale-110 group-hover:text-[#4A6B94]/35"
                size={40}
              />
              <p className="relative text-sm leading-relaxed text-[#4A5D73]">“{item.quote}”</p>

              <footer className="relative mt-6 flex items-center gap-3 border-t border-[rgba(47,76,115,0.1)] pt-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#4A6B94] to-[#2F4C73] text-xs font-semibold text-[#FFFFFF] transition-transform duration-500 group-hover:scale-105">
                  {initials(item.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-[#2F4C73]">{item.name}</span>
                  <span className="block text-xs text-[#6B7C8F]">{item.role}</span>
                </span>
              </footer>
            </RevealCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
