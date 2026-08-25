import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import MagneticButton from '../components/ui/MagneticButton';
import CTA from '../components/home/CTA';
import { AnimatedSection, StaggerContainer } from '../components/motion';
import { faqCategories } from '../data/content';
import { PageSeo } from '../components/seo/PageSeo';

export default function Faqs() {
  const [openId, setOpenId] = useState('0-0');

  return (
    <>
      <PageSeo
        path="/faqs"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'FAQs', path: '/faqs' },
        ]}
      />
      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Got Questions?"
        highlight="We’ve Got Answers"
        description="Everything you need to know about dialers, business voice, numbers, VoIP Termination, contact-center tools, APIs, and support."
      />

      <section className="gc-section">
        <div className="gc-prose-width space-y-12">
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
                      className={`gc-card-sm overflow-hidden ${
                        open ? 'border-[#4A6B94]/40 shadow-[0_12px_36px_rgba(74,107,148,0.1)]' : ''
                      }`}
                    >
                      <button
                        type="button"
                        className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5 sm:py-4"
                        onClick={() => setOpenId(open ? null : id)}
                        aria-expanded={open}
                      >
                        <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-[#2F4C73] sm:text-[15px]">
                          {item.q}
                        </span>
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
                            <motion.div
                              initial={{ y: -8, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                              className="px-5 pb-5"
                            >
                              <p className="text-sm leading-relaxed text-[#6B7C8F]">{item.a}</p>
                              {item.related?.length ? (
                                <ul className="mt-3 flex flex-wrap gap-2">
                                  {item.related.map((link) => (
                                    <li key={`${item.q}-${link.to}`}>
                                      <Link
                                        to={link.to}
                                        className="inline-flex min-h-9 items-center rounded-lg border border-[rgba(47,76,115,0.12)] bg-[#F4F6F9] px-3 text-xs font-semibold text-[#2F4C73] transition-colors hover:border-[#4A6B94]/40 hover:bg-white"
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </motion.div>
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
            <div className="gc-card relative overflow-hidden bg-gradient-to-br from-[#E8ECF2] via-[#E0E5ED] to-[#FFFFFF] px-4 py-10 text-center sm:px-6 sm:py-12">
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
                  <MagneticButton to="/contact" className="w-full justify-center sm:w-auto">
                    Contact Support
                  </MagneticButton>
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
