import 'dotenv/config';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import contactRoutes from './routes/contact.js';
import kycRoutes from './routes/kyc.js';
import adminRoutes from './routes/admin.js';
import { migrate } from './db/index.js';
import { ensureStorageRoot } from './services/storage.js';
import { cleanupExpiredSessions } from './services/adminAuth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const isProd = process.env.NODE_ENV === 'production';
const CLIENT_DIST = process.env.CLIENT_DIST || path.resolve(__dirname, '../client/dist');

migrate();
ensureStorageRoot();
cleanupExpiredSessions();

const allowedOrigins = [
  ...String(CLIENT_URL)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
];

app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS ?? 0));

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
);
app.use(cookieParser());

app.use((req, res, next) => {
  if (req.path.startsWith('/api/kyc') && req.method === 'POST') return next();
  return express.json({ limit: '1mb' })(req, res, next);
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

const kycLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many KYC submissions. Please try again later.' },
});

const adminApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 400,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Rate limit exceeded.' },
});

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    service: 'Go Connectivo API',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/kyc', kycLimiter, kycRoutes);

// Login attempts limited inside the admin router; general admin API limited here
app.use('/api/admin', adminApiLimiter, adminRoutes);

if (isProd && fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST, { index: false, maxAge: '7d' }));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    return res.sendFile(path.join(CLIENT_DIST, 'index.html'), (err) => {
      if (err) next(err);
    });
  });
}

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

app.use((err, _req, res, _next) => {
  console.error('[server] Unhandled error:', err);
  if (err?.type === 'entity.too.large' || err?.status === 413) {
    return res.status(413).json({
      success: false,
      message: 'Upload package is too large. Use smaller PDF/image files (max ~8MB each).',
    });
  }
  res.status(500).json({
    success: false,
    message: 'Internal server error.',
  });
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Go Connectivo API running on http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[server] Port ${PORT} is already in use. Stop the other process or change PORT.`);
  } else {
    console.error('[server] Failed to start:', err);
  }
  process.exit(1);
});
