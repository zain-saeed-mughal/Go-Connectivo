import { useEffect } from 'react';
import LegalPolicyDocument from '../components/legal/LegalPolicyDocument';
import { robocallMitigationPlan } from '../data/robocallMitigationPlan';

export default function RobocallMitigationPlan() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Robocall Mitigation Plan | Go Connectivo';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <LegalPolicyDocument
      title="Robocall"
      highlight="Mitigation Plan"
      description="Policies, monitoring practices, customer-verification controls, and enforcement measures used by Go Connectivo to identify and mitigate potentially unlawful voice traffic."
      document={robocallMitigationPlan}
    />
  );
}
