import { useEffect } from 'react';
import LegalPolicyDocument from '../components/legal/LegalPolicyDocument';
import { acceptableUsePolicy } from '../data/acceptableUsePolicy';

export default function AcceptableUsePolicy() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Acceptable Use & Calling Policy | Go Connectivo';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <LegalPolicyDocument
      title="Acceptable Use"
      highlight="Calling Policy"
      description="Rules governing lawful use of Go Connectivo voice, SIP, VoIP termination, messaging, telephone-number, API, and related communications services."
      document={acceptableUsePolicy}
    />
  );
}
