import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import MagneticButton from '../components/ui/MagneticButton';
import CTA from '../components/home/CTA';
import { AnimatedSection, StaggerContainer } from '../components/motion';
import { faqCategories } from '../data/content';

export default function Faqs() {
  const [openId, setOpenId] = useState('0-0');

  return (
    <>
      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Got Questions?"
        highlight="We’ve Got Answers"
        description="Everything you need to know about our dialers, cloud PBX, inbound/outbound voice, and support."
      />

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {faqCategories.map((group, groupIndex) => (
            <div key={group.category}>
              <AnimatedSection from="up" duration={0.7}>
                <div className="mb-5 border-b border-[rgba(47,76,115,0.12)] pb-3">
                  <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-[#2F4C73]">
                    <span className="mr-3 text-sm font-semibold text-[#4A6B94]">
                      {String(groupIndex + 1).padStart(2, '0')}
                    </span>
                    {group.category}
                  </h2>
                </div>
              </AnimatedSection>

              <StaggerContainer className="space-y-3" stagger={0.07} from="left">
                {group.items.map((item, itemIndex) => {
                  const id = `${groupIndex}-${itemIndex}`;
                  const open = openId === id;

                  return (
                    <div
                      key={item.q}
                      className={`overflow-hidden rounded-2xl border transition-[border-color,background-color,box-shadow] duration-500 ${
                        open
                          ? 'border-[#4A6B94]/35 bg-white/[0.05] shadow-[0_10px_40px_rgba(74,107,148,0.08)]'
                          : 'border-[rgba(47,76,115,0.1)] bg-[#FFFFFF] hover:border-[rgba(47,76,115,0.16)]'
                      }`}
                    >
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                        onClick={() => setOpenId(open ? null : id)}
                        aria-expanded={open}
                      >
                        <span className="min-w-0 flex-1 font-medium text-[#2F4C73]">{item.q}</span>
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-[transform,border-color,background-color] duration-500 ${
                            open
                              ? 'rotate-45 border-[#4A6B94]/50 bg-[#4A6B94]/15'
                              : 'border-[rgba(47,76,115,0.12)] bg-[#FFFFFF]/80'
                          }`}
                        >
                          <Plus size={15} className="text-[#4A6B94]" />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <motion.p
                              initial={{ y: -8, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                              className="px-5 pb-5 text-sm leading-relaxed text-[#6B7C8F]"
                            >
                              {item.a}
                            </motion.p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </StaggerContainer>
            </div>
          ))}

          <AnimatedSection from="scale">
            <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(47,76,115,0.12)] bg-gradient-to-br from-[#E8ECF2] via-[#E0E5ED] to-[#FFFFFF] px-6 py-12 text-center">
              <div className="pointer-events-none absolute -top-12 left-1/4 h-40 w-40 rounded-full bg-[#2F4C73]/25 blur-3xl" />
              <div className="pointer-events-none absolute right-1/4 -bottom-12 h-44 w-44 rounded-full bg-[#4A6B94]/20 blur-3xl" />

              <div className="relative">
                <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[#2F4C73] sm:text-3xl">
                  Still have questions?
                </h2>
                <p className="mt-3 text-sm text-[#4A5D73] md:text-base">
                  Our team is here to help! Contact us for personalized assistance.
                </p>
                <div className="mt-7 flex justify-center">
                  <MagneticButton to="/contact">Contact Support</MagneticButton>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTA />
    </>
  );
}
