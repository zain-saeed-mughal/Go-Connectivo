import PageHero from '../ui/PageHero';
import MagneticButton from '../ui/MagneticButton';
import CTA from '../home/CTA';

function SectionBody({ section }) {
  return (
    <>
      {section.paragraphs?.map((text) => (
        <p key={text.slice(0, 48)} className="mt-3 text-sm leading-relaxed text-[#5A6F86] sm:text-[0.95rem]">
          {text}
        </p>
      ))}
      {section.bullets?.length ? (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#5A6F86] sm:text-[0.95rem]">
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {section.after?.map((text) => (
        <p key={text.slice(0, 48)} className="mt-3 text-sm leading-relaxed text-[#5A6F86] sm:text-[0.95rem]">
          {text}
        </p>
      ))}
    </>
  );
}

export default function LegalPolicyDocument({
  eyebrow = 'Legal Compliance',
  title,
  highlight,
  description,
  contentsLabel = 'Contents',
  document,
}) {
  const contactSection = document.sections.find((section) => section.id === 'contact');
  const bodySections = document.sections.filter((section) => section.id !== 'contact');

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} highlight={highlight} description={description}>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <MagneticButton to="/contact" className="w-full justify-center sm:w-auto">
            Talk to our team
          </MagneticButton>
          <MagneticButton to="/compliance" variant="secondary" className="w-full justify-center sm:w-auto">
            Legal Compliance
          </MagneticButton>
        </div>
      </PageHero>

      <section className="gc-section pt-0">
        <div className="gc-container max-w-4xl">
          <article className="overflow-hidden rounded-2xl border border-[rgba(47,76,115,0.1)] bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#EEF3F8] p-5 shadow-[0_12px_40px_rgba(28,49,79,0.06)] sm:p-8 md:p-10">
            {document.intro.map((text) => (
              <p
                key={text.slice(0, 40)}
                className="mt-4 text-sm leading-relaxed text-[#5A6F86] first:mt-0 sm:text-[0.95rem]"
              >
                {text}
              </p>
            ))}

            <nav aria-label={contentsLabel} className="mt-8 border-t border-[rgba(47,76,115,0.08)] pt-6">
              <p className="font-display text-sm font-semibold text-[#2F4C73]">{contentsLabel}</p>
              <ol className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {document.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-sm text-[#4A6B94] transition-colors hover:text-[#2F4C73]"
                    >
                      {section.number}. {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {bodySections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 mt-7 border-t border-[rgba(47,76,115,0.08)] pt-7"
              >
                <h2 className="font-display text-lg font-bold tracking-[-0.03em] text-[#1C314F] sm:text-xl">
                  {section.number}. {section.title}
                </h2>
                <SectionBody section={section} />
              </section>
            ))}

            {contactSection ? (
              <section
                id={contactSection.id}
                className="scroll-mt-28 mt-7 border-t border-[rgba(47,76,115,0.08)] pt-7"
              >
                <h2 className="font-display text-lg font-bold tracking-[-0.03em] text-[#1C314F] sm:text-xl">
                  {contactSection.number}. {contactSection.title}
                </h2>
                <SectionBody section={contactSection} />
                <div className="mt-4 rounded-xl border border-[rgba(47,76,115,0.1)] bg-white p-4 sm:p-5">
                  <p className="font-display text-base font-semibold text-[#1C314F]">
                    {document.contact.team}
                  </p>
                  <p className="mt-2 text-sm text-[#5A6F86]">
                    Email:{' '}
                    <a
                      className="font-semibold text-[#4A6B94] hover:text-[#2F4C73]"
                      href={`mailto:${document.contact.email}`}
                    >
                      {document.contact.email}
                    </a>
                  </p>
                  {document.contact.address.map((line) => (
                    <p key={line} className="text-sm leading-relaxed text-[#5A6F86]">
                      {line}
                    </p>
                  ))}
                </div>
                {document.contact.closing ? (
                  <p className="mt-4 text-sm leading-relaxed text-[#5A6F86] sm:text-[0.95rem]">
                    {document.contact.closing}
                  </p>
                ) : null}
              </section>
            ) : null}
          </article>
        </div>
      </section>

      <CTA />
    </>
  );
}
