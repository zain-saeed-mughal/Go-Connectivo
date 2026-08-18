import { getSessionUser, roleAtLeast } from '../services/adminAuth.js';

export function clientMeta(req) {
  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    null;
  return {
    ip,
    userAgent: req.headers['user-agent'] || null,
  };
}

export function requireAdmin(req, res, next) {
  const sessionId = req.cookies?.gc_admin_session;
  const session = getSessionUser(sessionId);
  if (!session) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }
  req.admin = session.user;
  req.adminSessionId = session.sessionId;
  return next();
}

export function requireRole(minRole) {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }
    if (!roleAtLeast(req.admin.role, minRole)) {
      return res.status(403).json({ success: false, message: 'Insufficient permissions.' });
    }
    return next();
  };
}
