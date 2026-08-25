import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
  // Light split only — JS / CSS / rest of assets. No deep nesting.
  build: {
    rollupOptions: {
      output: {
        // Vendors change far less often than page code — separate chunks keep
        // them cached across deploys instead of busting the whole bundle.
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return undefined;
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) {
            return 'react';
          }
          if (/[\\/]node_modules[\\/]gsap[\\/]/.test(id)) return 'gsap';
          if (/[\\/]node_modules[\\/](framer-motion|motion|motion-dom|motion-utils)[\\/]/.test(id)) {
            return 'motion';
          }
          if (/[\\/]node_modules[\\/]three[\\/]/.test(id)) return 'three';
          if (/[\\/]node_modules[\\/]@react-three[\\/]/.test(id)) return 'r3f';
          return undefined;
        },
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (name && path.extname(name).toLowerCase() === '.css') {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err, _req, res) => {
            console.warn('[vite proxy] API unreachable:', err.message);
            if (res && !res.headersSent) {
              res.writeHead(502, { 'Content-Type': 'application/json' });
              res.end(
                JSON.stringify({
                  success: false,
                  message:
                    'API server is offline. Start it with: cd server && npm run dev',
                }),
              );
            }
          });
        },
      },
    },
  },
});
