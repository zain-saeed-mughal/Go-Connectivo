import LegalPolicyDocument from '../components/legal/LegalPolicyDocument';
import { acceptableUsePolicy } from '../data/acceptableUsePolicy';
import { PageSeo } from '../components/seo/PageSeo';

export default function AcceptableUsePolicy() {
  return (
    <>
      <PageSeo
        path="/compliance/acceptable-use-policy"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Compliance', path: '/compliance' },
          { name: 'Acceptable Use Policy', path: '/compliance/acceptable-use-policy' },
        ]}
      />
      <LegalPolicyDocument
        title="Acceptable Use"
        highlight="Calling Policy"
        description="Rules governing lawful use of Go Connectivo voice, SIP, VoIP termination, messaging, telephone-number, API, and related communications services."
        document={acceptableUsePolicy}
      />
    </>
  );
}
