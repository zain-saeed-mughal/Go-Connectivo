import SectionHeading from '../components/ui/SectionHeading';
import { StaggerContainer } from '../components/motion';

export default function Terms() {
  return (
    <section className="px-4 sm:px-6 pt-36 pb-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Legal"
          title="Terms & Conditions"
          description="General terms for using the Go Connectivo website and requesting services."
        />
        <StaggerContainer
          className="space-y-5 text-sm leading-relaxed text-[#6B7C8F]"
          stagger={0.1}
        >
          <p>
            Content on this website is provided for general information about Go Connectivo’s
            technology services. Submitting an inquiry does not create a binding engagement until
            both parties agree to a defined scope of work.
          </p>
          <p>
            Project deliverables, timelines, and commercial terms are established in separate
            agreements. Unauthorized use of site materials, branding, or proprietary assets is
            prohibited.
          </p>
          <p>
            Questions about these terms can be sent to{' '}
            <a className="text-[#6B8AB0] hover:text-[#2F4C73]" href="mailto:compliance@goconnectivo.com">
              compliance@goconnectivo.com
            </a>
            .
          </p>
        </StaggerContainer>
      </div>
    </section>
  );
}
