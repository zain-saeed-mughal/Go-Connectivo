import LegalPolicyDocument from '../components/legal/LegalPolicyDocument';
import { robocallMitigationPlan } from '../data/robocallMitigationPlan';
import { PageSeo } from '../components/seo/PageSeo';

export default function RobocallMitigationPlan() {
  return (
    <>
      <PageSeo
        path="/compliance/robocall-mitigation-plan"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Compliance', path: '/compliance' },
          { name: 'Robocall Mitigation Plan', path: '/compliance/robocall-mitigation-plan' },
        ]}
      />
      <LegalPolicyDocument
        title="Robocall"
        highlight="Mitigation Plan"
        description="Policies, monitoring practices, customer-verification controls, and enforcement measures used by Go Connectivo to identify and mitigate potentially unlawful voice traffic."
        document={robocallMitigationPlan}
      />
    </>
  );
}
