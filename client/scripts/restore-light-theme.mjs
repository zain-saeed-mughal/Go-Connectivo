import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cssPath = path.join(__dirname, '../src/index.css');
let css = fs.readFileSync(cssPath, 'utf8');

const lightBlock = `/* Light — exact previous navy SaaS theme (git HEAD / goconnectivo.com) */
[data-theme="light"] {
  --bg-primary: #f4f6f9;
  --bg-secondary: #e8ecf2;
  --surface: #ffffff;
  --accent-primary: #2f4c73;
  --accent-secondary: #4a6b94;
  --accent-soft: #6b8ab0;
  --accent-light: #8ba3c4;
  --neutral-soft: #9aa8c0;
  --accent: #2f4c73;
  --text-primary: #2f4c73;
  --text-secondary: #4a5d73;
  --text-muted: #6b7c8f;
  --text-on-accent: #f7f9fc;
  --border: rgba(74, 107, 148, 0.35);
  --border-soft: rgba(47, 76, 115, 0.14);
  --gradient-primary: linear-gradient(135deg, #2f4c73 0%, #4a6b94 100%);
  --gradient-soft: linear-gradient(135deg, #6b8ab0 0%, #8ba3c4 100%);
  --gradient-heading: linear-gradient(135deg, #6b8ab0 0%, #4a6b94 40%, #2f4c73 100%);
  --shadow-soft: 0 14px 40px rgba(47, 76, 115, 0.1);
  --shadow: 0 12px 40px rgba(28, 49, 79, 0.16);
  --shadow-glow: 0 0 40px rgba(74, 107, 148, 0.12);
  --body-glow-a: rgba(74, 107, 148, 0.14);
  --body-glow-b: rgba(107, 138, 176, 0.1);
  --body-grad-mid: #f8fafc;
  --overlay-rgb: 28, 49, 79;
  --focus-ring: rgba(74, 107, 148, 0.2);
  --luxe-navy: #2f4c73;
  --luxe-navy-dark: #243c5c;
  --luxe-navy-deep: #1c314f;
  --luxe-navy-mid: #4a6b94;
  --luxe-navy-soft: #6b8ab0;
  --luxe-navy-mist: #8ba3c4;
  --bg-surface: #ffffff;
  --accent-bright: #4a6b94;
  --nav-bg: #2f4c73;
  --nav-bg-scrolled: rgba(47, 76, 115, 0.97);
  --nav-border: rgba(107, 138, 176, 0.35);
  --nav-text: #d7e2e8;
  --nav-text-active: #ffffff;
}`;

css = css.replace(
  /\/\* Light —[\s\S]*?\n\}\n\n@theme \{/,
  `${lightBlock}\n\n@theme {`,
);

// Ensure dark also has nav tokens
if (!css.includes('--nav-bg:')) {
  css = css.replace(
    /(--accent-bright: #844ffc;)\n\}/,
    `$1\n  --nav-bg: #151b2e;\n  --nav-bg-scrolled: #1a2238;\n  --nav-border: rgba(132, 79, 252, 0.22);\n  --nav-text: #c6c8fd;\n  --nav-text-active: #ffffff;\n}`,
  );
}

const polishStart = css.indexOf('/* Light theme surface polish */');
if (polishStart === -1) {
  console.error('polish marker missing');
  process.exit(1);
}

const polish = `/* Light theme surface polish — match live/git light navy look */
[data-theme='light'] body {
  background:
    radial-gradient(ellipse 80% 50% at 100% -10%, rgba(74, 107, 148, 0.14), transparent 55%),
    radial-gradient(ellipse 55% 40% at 0% 100%, rgba(107, 138, 176, 0.1), transparent 50%),
    linear-gradient(165deg, #f8fafc 0%, #f4f6f9 42%, #eef2f7 100%);
  background-color: #f4f6f9;
  color: #2f4c73;
}

[data-theme='light'] .gradient-text {
  background: linear-gradient(135deg, #1c314f 0%, #2f4c73 50%, #4a6b94 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

[data-theme='light'] .gradient-text-brand {
  background: linear-gradient(135deg, #6b8ab0 0%, #4a6b94 40%, #2f4c73 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

[data-theme='light'] .gc-card {
  border: 1px solid rgba(47, 76, 115, 0.12);
  background:
    linear-gradient(165deg, rgba(255, 255, 255, 0.96) 0%, #ffffff 48%, rgba(244, 246, 249, 0.95) 100%);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.8) inset,
    0 10px 28px rgba(47, 76, 115, 0.06);
}

[data-theme='light'] .gc-card::before {
  background: linear-gradient(90deg, transparent, rgba(74, 107, 148, 0.45), transparent);
}

[data-theme='light'] .gc-card::after {
  background: radial-gradient(circle, rgba(74, 107, 148, 0.1), transparent 70%);
}

[data-theme='light'] .gc-card:hover {
  border-color: rgba(74, 107, 148, 0.4);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.9) inset,
    0 22px 50px rgba(47, 76, 115, 0.14);
}

[data-theme='light'] .gc-card-sm {
  border: 1px solid rgba(47, 76, 115, 0.12);
  background: linear-gradient(165deg, #ffffff 0%, #f8fafc 100%);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.85) inset,
    0 6px 18px rgba(47, 76, 115, 0.05);
}

[data-theme='light'] .gc-card-sm:hover {
  border-color: rgba(74, 107, 148, 0.35);
}

[data-theme='light'] .gc-card-accent {
  border-color: rgba(74, 107, 148, 0.35) !important;
  background: linear-gradient(165deg, rgba(232, 236, 242, 0.95) 0%, #ffffff 55%) !important;
}

[data-theme='light'] .glass {
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(47, 76, 115, 0.12);
}

[data-theme='light'] .glass-strong {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(47, 76, 115, 0.16);
}

[data-theme='light'] .gc-btn-primary {
  background: linear-gradient(135deg, #2f4c73 0%, #4a6b94 100%);
  color: #f7f9fc;
  box-shadow: 0 12px 32px rgba(47, 76, 115, 0.28);
}

[data-theme='light'] .gc-btn-secondary {
  border-color: rgba(107, 138, 176, 0.45);
  background: #ffffff;
  color: #2f4c73;
}

[data-theme='light'] .gc-input {
  background: #ffffff;
  border-color: rgba(47, 76, 115, 0.18);
  color: #2f4c73;
}

[data-theme='light'] .gc-input:focus {
  border-color: #4a6b94;
  box-shadow: 0 0 0 3px rgba(74, 107, 148, 0.18);
}

[data-theme='light'] .gc-nav-pill {
  border-color: rgba(107, 138, 176, 0.35);
  background: #2f4c73;
  box-shadow: 0 10px 35px rgba(28, 49, 79, 0.16);
}

[data-theme='light'] .hero-video {
  opacity: 0.9;
  filter: brightness(0.95) contrast(1.04) saturate(0.95);
}

[data-theme='light'] .hero-overlay-directional {
  background: linear-gradient(
    90deg,
    rgba(28, 49, 79, 0.86) 0%,
    rgba(47, 76, 115, 0.58) 36%,
    rgba(47, 76, 115, 0.22) 62%,
    transparent 100%
  );
}

@media (max-width: 639px) {
  [data-theme='light'] .hero-overlay-directional {
    background:
      linear-gradient(
        180deg,
        rgba(28, 49, 79, 0.5) 0%,
        rgba(47, 76, 115, 0.62) 48%,
        rgba(47, 76, 115, 0.34) 100%
      ),
      linear-gradient(
        90deg,
        rgba(28, 49, 79, 0.55) 0%,
        rgba(47, 76, 115, 0.28) 50%,
        rgba(47, 76, 115, 0.08) 100%
      );
  }
}

[data-theme='light'] .hero-overlay-vignette {
  background: radial-gradient(
    ellipse 95% 85% at 50% 45%,
    transparent 40%,
    rgba(28, 49, 79, 0.34) 100%
  );
}

[data-theme='light'] .hero-title {
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.35);
}

[data-theme='light'] .hero-fcc-panel {
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 18px 44px rgba(47, 76, 115, 0.12);
}

[data-theme='light'] .hero-fcc-heading-accent,
[data-theme='light'] .hero-fcc-heading-rest {
  color: #1c314f;
  text-shadow: none;
}

[data-theme='light'] .hero-fcc-eyebrow,
[data-theme='light'] .hero-fcc-line {
  text-shadow: none;
}

[data-theme='light'] .gc-cursor-ring {
  border-color: rgba(47, 76, 115, 0.35);
  background: rgba(47, 76, 115, 0.04);
}

[data-theme='light'] .gc-cursor-dot {
  background: #4a6b94;
  box-shadow: 0 0 0 1px rgba(47, 76, 115, 0.2);
}

[data-theme='light'] .gc-cursor-label {
  color: #2f4c73;
}

[data-theme='light'] ::selection {
  background: rgba(74, 107, 148, 0.28);
  color: #1c314f;
}

[data-theme='light'] .gc-scrollbar,
[data-theme='light'] html {
  scrollbar-color: rgba(74, 107, 148, 0.5) rgba(232, 236, 242, 0.95);
}

[data-theme='light'] .gc-scrollbar::-webkit-scrollbar-track,
[data-theme='light'] html::-webkit-scrollbar-track {
  background: rgba(232, 236, 242, 0.9);
}

[data-theme='light'] .gc-scrollbar::-webkit-scrollbar-thumb,
[data-theme='light'] html::-webkit-scrollbar-thumb {
  background: rgba(74, 107, 148, 0.45);
}
`;

css = css.slice(0, polishStart) + polish;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Updated light theme CSS to match git HEAD / live site');
