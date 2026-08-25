import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Home ships with the initial bundle; everything else is code-split and then
// prefetched while the browser is idle, so navigation is still instant.
const loaders = {
  about: () => import('./pages/About'),
  services: () => import('./pages/Services'),
  serviceDetail: () => import('./pages/ServiceDetail'),
  faqs: () => import('./pages/Faqs'),
  resources: () => import('./pages/Resources'),
  compliance: () => import('./pages/Compliance'),
  robocallPlan: () => import('./pages/RobocallMitigationPlan'),
  acceptableUse: () => import('./pages/AcceptableUsePolicy'),
  contact: () => import('./pages/Contact'),
  privacy: () => import('./pages/Privacy'),
  terms: () => import('./pages/Terms'),
  notFound: () => import('./pages/NotFound'),
};

const KycLayout = lazy(() => import('./components/kyc/KycLayout'));
const Kyc = lazy(() => import('./pages/Kyc'));
const AdminRoutes = lazy(() => import('./pages/AdminRoutes'));

const About = lazy(loaders.about);
const Services = lazy(loaders.services);
const ServiceDetail = lazy(loaders.serviceDetail);
const Faqs = lazy(loaders.faqs);
const Resources = lazy(loaders.resources);
const Compliance = lazy(loaders.compliance);
const RobocallMitigationPlan = lazy(loaders.robocallPlan);
const AcceptableUsePolicy = lazy(loaders.acceptableUse);
const Contact = lazy(loaders.contact);
const Privacy = lazy(loaders.privacy);
const Terms = lazy(loaders.terms);
const NotFound = lazy(loaders.notFound);

// Keeps page height stable while a chunk resolves (usually already cached).
const RouteFallback = () => <div className="min-h-[70vh]" aria-hidden="true" />;

function PrefetchRoutes() {
  useEffect(() => {
    let cancelled = false;
    const queue = Object.values(loaders);

    // Don't fight LCP / mobile audits: wait longer, and skip on data-saver / 2g.
    const nav = typeof navigator !== 'undefined' ? navigator : null;
    const conn = nav?.connection;
    if (conn?.saveData) return undefined;
    if (conn?.effectiveType && /2g/.test(conn.effectiveType)) return undefined;

    const runNext = () => {
      if (cancelled) return;
      const next = queue.shift();
      if (!next) return;
      Promise.resolve(next())
        .catch(() => {})
        .then(() => {
          if (cancelled) return;
          schedule();
        });
    };

    const schedule = () => {
      if (cancelled || queue.length === 0) return;
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(runNext, { timeout: 4000 });
      } else {
        window.setTimeout(runNext, 600);
      }
    };

    const startTimer = window.setTimeout(schedule, 2500);

    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
    };
  }, []);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <PrefetchRoutes />
      <Routes>
        <Route
          path="admin/*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AdminRoutes />
            </Suspense>
          }
        />

        {/* Hidden KYC portal, not linked from public nav/footer; noindex */}
        <Route
          path="kyc"
          element={
            <Suspense fallback={<RouteFallback />}>
              <KycLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<RouteFallback />}>
                <Kyc />
              </Suspense>
            }
          />
        </Route>

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="about"
            element={
              <Suspense fallback={<RouteFallback />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="services"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Services />
              </Suspense>
            }
          />
          <Route
            path="services/:slug"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ServiceDetail />
              </Suspense>
            }
          />
          <Route
            path="faqs"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Faqs />
              </Suspense>
            }
          />
          <Route
            path="resources"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Resources />
              </Suspense>
            }
          />
          <Route
            path="compliance"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Compliance />
              </Suspense>
            }
          />
          <Route
            path="compliance/robocall-mitigation-plan"
            element={
              <Suspense fallback={<RouteFallback />}>
                <RobocallMitigationPlan />
              </Suspense>
            }
          />
          <Route
            path="compliance/acceptable-use-policy"
            element={
              <Suspense fallback={<RouteFallback />}>
                <AcceptableUsePolicy />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="privacy"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Privacy />
              </Suspense>
            }
          />
          <Route
            path="terms"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Terms />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteFallback />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
