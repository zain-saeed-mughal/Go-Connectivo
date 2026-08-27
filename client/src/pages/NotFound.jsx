import MagneticButton from '../components/ui/MagneticButton';
import SeoHead from '../components/seo/SeoHead';

export default function NotFound() {
  return (
    <section className="gc-container flex min-h-[70vh] items-center pt-28">
      <SeoHead
        path="/404"
        title="Page Not Found | Go Connectivo"
        description="The requested page could not be found on Go Connectivo."
        noindex
      />
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-[var(--text-secondary)] uppercase">404</p>
        <h1 className="mt-3 font-display gradient-text-brand text-4xl font-bold">Page not found</h1>
        <p className="mt-3 text-[var(--text-secondary)]">The page you’re looking for doesn’t exist or was moved.</p>
        <div className="mt-8 flex justify-center">
          <MagneticButton to="/">Back home</MagneticButton>
        </div>
      </div>
    </section>
  );
}
