import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock, LoaderCircle, ServerCrash, ShieldCheck } from 'lucide-react';
import { adminHealth, adminLogin } from '../../lib/adminApi';
import { useAdminAuth } from '../../components/admin/AdminLayout';

export default function AdminLogin() {
  const { user, setUser, loading } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@goconnectivo.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [apiOnline, setApiOnline] = useState(null);

  useEffect(() => {
    let alive = true;
    const check = () => {
      adminHealth().then((res) => {
        if (alive) setApiOnline(res.ok);
      });
    };
    check();
    const id = window.setInterval(check, 8000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-portal', 'admin');
    return () => {
      if (root.getAttribute('data-portal') === 'admin') {
        root.removeAttribute('data-portal');
      }
    };
  }, []);

  if (!loading && user) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const health = await adminHealth();
      if (!health.ok) {
        throw new Error(
          'API server is offline. Open a terminal and run: cd server && npm run dev',
        );
      }
      const res = await adminLogin(email, password);
      setUser(res.data.user);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
      setApiOnline(err.code === 'NETWORK' ? false : apiOnline);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[#1C314F] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-6 text-center">
          <svg
            viewBox="0 0 64 64"
            className="mx-auto h-14 w-14"
            fill="none"
            aria-hidden="true"
          >
            <g
              transform="translate(32 32)"
              stroke="#F58220"
              strokeWidth="3.2"
              strokeLinecap="round"
            >
              <path d="M10.5 -21 A24 24 0 1 0 10.5 21" />
              <path d="M7.5 -14 A16 16 0 1 0 7.5 14" />
              <path d="M5 -7.5 A8.5 8.5 0 1 0 5 7.5" />
            </g>
          </svg>
          <h1 className="mt-4 font-display text-xl font-bold text-[#1C314F]">Admin Sign In</h1>
          <p className="mt-1 text-sm text-[#5A6F86]">
            KYC compliance console · authorized staff only
          </p>
        </div>

        <div
          className={`mb-4 flex items-start gap-2 rounded-xl border px-3 py-2.5 text-xs ${
            apiOnline === false
              ? 'border-rose-200 bg-rose-50 text-rose-800'
              : apiOnline
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-[rgba(47,76,115,0.12)] bg-[#F8FAFC] text-[#5A6F86]'
          }`}
        >
          {apiOnline === false ? (
            <ServerCrash className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          <span>
            {apiOnline === false
              ? 'API offline, start the backend: cd server && npm run dev (port 5000)'
              : apiOnline
                ? 'Secure API connected'
                : 'Checking API connection…'}
          </span>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-[#2F4C73]">Work email</span>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[rgba(47,76,115,0.16)] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#1C314F] outline-none focus:border-[#4A6B94] focus:bg-white"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-[#2F4C73]">Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-[rgba(47,76,115,0.16)] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#1C314F] outline-none focus:border-[#4A6B94] focus:bg-white"
            />
          </label>

          {error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={busy || apiOnline === false}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F4C73] px-4 py-3 text-sm font-semibold text-white hover:bg-[#243d5c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
            {busy ? 'Signing in…' : 'Sign in securely'}
          </button>
        </form>

        <p className="mt-5 text-center text-[11px] leading-relaxed text-[#6B7C8F]">
          Default super admin: <span className="font-medium text-[#2F4C73]">admin@goconnectivo.com</span>
          <br />
          Change passwords in production via server environment variables.
        </p>
      </div>
    </div>
  );
}
