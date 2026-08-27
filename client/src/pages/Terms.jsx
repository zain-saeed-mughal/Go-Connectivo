import SectionHeading from '../components/ui/SectionHeading';
import { StaggerContainer } from '../components/motion';
import { PageSeo } from '../components/seo/PageSeo';

export default function Terms() {
  return (
    <section className="pt-32 pb-20 sm:pt-36 sm:pb-24">
      <PageSeo
        path="/terms"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Terms & Conditions', path: '/terms' },
        ]}
      />
      <div className="gc-prose-width">
        <SectionHeading
          eyebrow="Legal"
          title="Terms & Conditions"
          description="General terms for using the Go Connectivo website and requesting services."
        />
        <StaggerContainer
          className="space-y-5 text-sm leading-relaxed text-[var(--text-secondary)]"
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
            <a className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]" href="mailto:support@goconnectivo.com">
              support@goconnectivo.com
            </a>
            .
          </p>
        </StaggerContainer>
      </div>
    </section>
  );
}
