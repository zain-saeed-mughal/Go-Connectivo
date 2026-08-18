import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ClipboardList, LogOut, Mail, Shield } from 'lucide-react';
import logo from '../../assets/logo.webp';
import { adminLogout, adminMe } from '../../lib/adminApi';
import ConfirmDialog from './ConfirmDialog';

const AdminAuthContext = createContext(null);

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    adminMe()
      .then((res) => {
        if (alive) setUser(res.data.user);
      })
      .catch((err) => {
        // 401 = logged out; network errors leave user null without noisy UI
        if (alive) setUser(null);
        if (err?.code === 'NETWORK' || err?.status === 0) {
          console.warn('[admin] API unreachable while checking session');
        }
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      setUser,
      logout: async () => {
        try {
          await adminLogout();
        } catch {
          /* ignore */
        }
        setUser(null);
      },
    }),
    [user, loading],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function RequireAdmin({ children }) {
  const { user, loading } = useAdminAuth();
  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#E8ECF2] text-sm text-[#4A6B94]">
        Checking session…
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      navigate('/admin/login');
    } finally {
      setLoggingOut(false);
      setConfirmLogout(false);
    }
  };

  return (
    <div className="admin-portal min-h-screen bg-[#E8ECF2] text-[#2F4C73]">
      <header className="sticky top-0 z-30 border-b border-[rgba(47,76,115,0.12)] bg-[#1C314F] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="flex items-center gap-3 text-left"
          >
            <img src={logo} alt="" className="h-8 w-auto opacity-95" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9BB0C9]">
                Secure operations
              </p>
              <p className="font-display text-sm font-bold">Admin Console</p>
            </div>
          </button>
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium">{user.fullName}</p>
                <p className="text-[11px] text-[#9BB0C9]">
                  <Shield className="mr-1 inline h-3 w-3" />
                  {user.role.replace('_', ' ')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setConfirmLogout(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-medium hover:bg-white/10"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </header>
      <nav className="border-b border-[rgba(47,76,115,0.12)] bg-white">
        <div className="mx-auto flex max-w-7xl gap-1 px-4 sm:px-6">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `inline-flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium ${
                isActive
                  ? 'border-[#2F4C73] text-[#1C314F]'
                  : 'border-transparent text-[#5A6F86] hover:text-[#1C314F]'
              }`
            }
          >
            <ClipboardList className="h-4 w-4" />
            KYC applications
          </NavLink>
          <NavLink
            to="/admin/contacts"
            className={({ isActive }) =>
              `inline-flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium ${
                isActive
                  ? 'border-[#2F4C73] text-[#1C314F]'
                  : 'border-transparent text-[#5A6F86] hover:text-[#1C314F]'
              }`
            }
          >
            <Mail className="h-4 w-4" />
            Contact inquiries
          </NavLink>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>

      <ConfirmDialog
        open={confirmLogout}
        title="Confirm logout"
        message="Are you sure you want to log out of the Admin Console?"
        confirmLabel="Log out"
        busy={loggingOut}
        onCancel={() => {
          if (!loggingOut) setConfirmLogout(false);
        }}
        onConfirm={handleLogout}
      />
    </div>
  );
}
