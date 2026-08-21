import { Outlet } from 'react-router-dom';
import logo from '../../assets/logo.webp';

/**
 * Isolated KYC shell, no public Navbar/Footer/mega-menu.
 * Accessible only via direct /kyc URL.
 */
export default function KycLayout() {
  return (
    <div className="kyc-portal relative min-h-screen bg-[#E8ECF2] text-[#2F4C73]">
      <div className="kyc-watermark" aria-hidden="true">
        <img src={logo} alt="" className="kyc-watermark__logo" />
        <p className="kyc-watermark__wordmark">GO CONNECTIVO</p>
      </div>

      <header className="relative z-10 border-b border-[rgba(47,76,115,0.12)] bg-[#1C314F]/95 text-white backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4 sm:px-6">
          <img src={logo} alt="Go Connectivo" className="h-9 w-auto opacity-95 sm:h-10" />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9BB0C9]">
              Confidential · Direct access only
            </p>
            <h1 className="truncate font-display text-sm font-bold tracking-[-0.01em] sm:text-base">
              Call Center KYC & Onboarding Application
            </h1>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-[rgba(47,76,115,0.1)] py-6 text-center text-[11px] text-[#6B7C8F]">
        © {new Date().getFullYear()} Go Connectivo · KYC records retained for compliance review
      </footer>
    </div>
  );
}
