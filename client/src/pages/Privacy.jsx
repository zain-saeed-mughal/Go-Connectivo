import SectionHeading from '../components/ui/SectionHeading';
import { StaggerContainer } from '../components/motion';

export default function Privacy() {
  return (
    <section className="pt-32 pb-20 sm:pt-36 sm:pb-24">
      <div className="gc-prose-width">
        <SectionHeading
          eyebrow="Legal"
          title="Privacy Policy"
          description="How Go Connectivo handles information submitted through this website."
        />
        <StaggerContainer
          className="space-y-5 text-sm leading-relaxed text-[#6B7C8F]"
          stagger={0.1}
        >
          <p>
            When you contact us through our inquiry form, we collect the details you provide —
            such as name, email, phone, subject, and message — solely to respond to your request
            and evaluate potential collaboration.
          </p>
          <p>
            We do not sell personal information. Inquiry data is processed securely on our server
            and retained only as needed for business communication and operational records.
          </p>
          <p>
            For privacy questions, email{' '}
            <a className="text-[#6B8AB0] hover:text-[#2F4C73]" href="mailto:support@goconnectivo.com">
              support@goconnectivo.com
            </a>
            .
          </p>
        </StaggerContainer>
      </div>
    </section>
  );
}
