import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout, {
  AdminAuthProvider,
  RequireAdmin,
} from '../components/admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminContacts from './admin/AdminContacts';
import AdminApplication from './admin/AdminApplication';

export default function AdminRoutes() {
  useEffect(() => {
    document.title = 'Admin | Go Connectivo';
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
    };
  }, []);

  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="applications/:id" element={<AdminApplication />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminAuthProvider>
  );
}
