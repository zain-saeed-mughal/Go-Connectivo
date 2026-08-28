import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import MagneticButton from '../components/ui/MagneticButton';
import CTA from '../components/home/CTALazy';
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
                <div className="mb-5 border-b border-[color:var(--border-soft)] pb-3">
                  <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                    <span className="mr-3 text-sm font-semibold text-[var(--text-secondary)]">
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
                        open ? 'border-[var(--accent-soft)]/40 shadow-[var(--shadow-soft)]' : ''
                      }`}
                    >
                      <button
                        type="button"
                        className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5 sm:py-4"
                        onClick={() => setOpenId(open ? null : id)}
                        aria-expanded={open}
                      >
                        <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-[var(--text-primary)] sm:text-[15px]">
                          {item.q}
                        </span>
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-[transform,border-color,background-color] duration-500 ${
                            open
                              ? 'rotate-45 border-[var(--accent-soft)]/50 bg-[var(--accent-soft)]/18'
                              : 'border-[color:var(--border-soft)] bg-[var(--surface)]/80'
                          }`}
                        >
                          <Plus size={15} className="text-[var(--text-secondary)]" />
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
                              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{item.a}</p>
                              {item.related?.length ? (
                                <ul className="mt-3 flex flex-wrap gap-2">
                                  {item.related.map((link) => (
                                    <li key={`${item.q}-${link.to}`}>
                                      <Link
                                        to={link.to}
                                        className="inline-flex min-h-9 items-center rounded-lg border border-[color:var(--border-soft)] bg-[var(--bg-primary)] px-3 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-soft)]/40 hover:bg-[var(--surface)]"
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
            <div className="gc-card relative overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-secondary)] to-[var(--surface)] px-4 py-10 text-center sm:px-6 sm:py-12">
              <div className="pointer-events-none absolute -top-12 left-1/4 h-40 w-40 rounded-full bg-[var(--accent-soft)]/22 blur-3xl" />
              <div className="pointer-events-none absolute right-1/4 -bottom-12 h-44 w-44 rounded-full bg-[var(--accent-soft)]/20 blur-3xl" />

              <div className="relative">
                <h2 className="font-display gradient-text-brand text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                  Still have questions?
                </h2>
                <p className="mt-3 text-sm text-[var(--text-secondary)] md:text-base">
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
