import MagneticButton from '../components/ui/MagneticButton';

export default function NotFound() {
  return (
    <section className="gc-container flex min-h-[70vh] items-center pt-28">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#4A6B94] uppercase">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-[#2F4C73]">Page not found</h1>
        <p className="mt-3 text-[#6B7C8F]">The page you’re looking for doesn’t exist or was moved.</p>
        <div className="mt-8 flex justify-center">
          <MagneticButton to="/">Back home</MagneticButton>
        </div>
      </div>
    </section>
  );
}
