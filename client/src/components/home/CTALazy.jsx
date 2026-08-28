import { lazy, Suspense } from 'react';

const CTA = lazy(() => import('./CTA'));

/** Defers CTA + optional HolographicHub WebGL until the chunk is needed. */
export default function CTALazy() {
  return (
    <Suspense fallback={<div className="min-h-[36vh] w-full" aria-hidden />}>
      <CTA />
    </Suspense>
  );
}
