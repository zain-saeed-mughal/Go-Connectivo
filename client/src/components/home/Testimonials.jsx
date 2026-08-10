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
    <section className="px-4 py-16 sm:px-6 sm:py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
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
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#f58220]/35 hover:shadow-[0_20px_60px_rgba(255,107,0,0.1)]"
            >
              <Quote
                className="absolute top-5 right-5 text-[#f58220]/20 transition-all duration-500 group-hover:scale-110 group-hover:text-[#f58220]/35"
                size={40}
              />
              <p className="relative text-sm leading-relaxed text-[#d0d0e0]">“{item.quote}”</p>

              <footer className="relative mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#f58220] to-[#ff6b00] text-xs font-semibold text-white transition-transform duration-500 group-hover:scale-105">
                  {initials(item.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{item.name}</span>
                  <span className="block text-xs text-[#9a9ab0]">{item.role}</span>
                </span>
              </footer>
            </RevealCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
