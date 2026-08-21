import { useEffect } from 'react';
import KycWizard from '../components/kyc/KycWizard';

/**
 * Hidden Go Connectivo KYC portal, not linked from public navigation.
 */
export default function Kyc() {
  useEffect(() => {
    document.title = 'KYC Onboarding | Go Connectivo';
    let robots = document.querySelector('meta[name="robots"]');
    const created = !robots;
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    const prev = robots.getAttribute('content');
    robots.setAttribute('content', 'noindex, nofollow, noarchive');
    return () => {
      if (created) robots.remove();
      else if (prev != null) robots.setAttribute('content', prev);
      else robots.removeAttribute('content');
    };
  }, []);

  return (
    <div>
      <div className="mb-6 rounded-2xl border border-[rgba(47,76,115,0.12)] bg-white/90 p-5 sm:p-6">
        <p className="font-display text-lg font-bold tracking-[-0.02em] text-[#1C314F] sm:text-xl">
          GO CONNECTIVO
        </p>
        <h2 className="mt-1 font-display text-xl font-bold text-[#2F4C73] sm:text-2xl">
          KYC APPLICATION
        </h2>
        <p className="mt-1 text-sm font-medium text-[#4A6B94]">
          Company onboarding · Beneficial ownership · Technical profile · Compliance
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[#5A6F86]">
          <strong className="font-semibold text-[#2F4C73]">Instructions:</strong> Complete all
          sections accurately. This application forms part of your service agreement with Go
          Connectivo and is required for interconnect, fraud monitoring, and regulatory compliance
          (including TSR, TCPA, and STIR/SHAKEN where applicable).
        </p>
      </div>

      <KycWizard />
    </div>
  );
}
