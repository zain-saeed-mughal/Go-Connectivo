import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { prefersReducedMotion, isCompactViewport } from '../../motion/config';
import { disposeRenderer, installThreeGuards } from '../../motion/webglSlots';

installThreeGuards(THREE);

function cssHex(name, fallback) {
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!raw.startsWith('#') || raw.length < 7) return fallback;
  const n = Number.parseInt(raw.slice(1, 7), 16);
  return Number.isFinite(n) ? n : fallback;
}

let MID = 0x4a6b94;
let LIGHT = 0x6b8ab0;
let NAVY = 0x2f4c73;

function syncThemeColors() {
  NAVY = cssHex('--accent-primary', 0x2f4c73);
  MID = cssHex('--accent-secondary', 0x4a6b94);
  LIGHT = cssHex('--accent-soft', 0x6b8ab0);
}

function buildShape(shape) {
  const g = new THREE.Group();
  if (shape === 'phone') {
    g.add(
      new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 1.7, 0.22),
        new THREE.MeshBasicMaterial({ color: MID, transparent: true, opacity: 0.95 }),
      ),
    );
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.7, 1.25),
      new THREE.MeshBasicMaterial({ color: LIGHT, transparent: true, opacity: 0.55 }),
    );
    screen.position.z = 0.12;
    g.add(screen);
  } else if (shape === 'tower') {
    g.add(
      new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.18, 2.4, 8),
        new THREE.MeshBasicMaterial({ color: NAVY, transparent: true, opacity: 0.95 }),
      ),
    );
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.55, 0.05, 8, 28),
      new THREE.MeshBasicMaterial({ color: LIGHT, transparent: true, opacity: 0.7 }),
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.9;
    g.add(ring);
  } else if (shape === 'headset') {
    const band = new THREE.Mesh(
      new THREE.TorusGeometry(0.85, 0.07, 8, 32, Math.PI),
      new THREE.MeshBasicMaterial({ color: MID, transparent: true, opacity: 0.95 }),
    );
    band.rotation.z = Math.PI;
    g.add(band);
  } else if (shape === 'server') {
    for (let i = 0; i < 3; i += 1) {
      const slab = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.32, 0.9),
        new THREE.MeshBasicMaterial({ color: i === 1 ? LIGHT : NAVY, transparent: true, opacity: 0.9 }),
      );
      slab.position.y = (i - 1) * 0.42;
      g.add(slab);
    }
  } else if (shape === 'globe') {
    g.add(
      new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.95, 1),
        new THREE.MeshBasicMaterial({ color: LIGHT, wireframe: true, transparent: true, opacity: 0.75 }),
      ),
    );
  } else {
    const hub = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.45, 0),
      new THREE.MeshBasicMaterial({ color: MID, transparent: true, opacity: 0.95 }),
    );
    g.add(hub);
    for (let i = 0; i < 4; i += 1) {
      const a = (i / 4) * Math.PI * 2;
      const n = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 8, 8),
        new THREE.MeshBasicMaterial({ color: LIGHT, transparent: true, opacity: 0.9 }),
      );
      n.position.set(Math.cos(a) * 1.1, Math.sin(a) * 0.2, Math.sin(a) * 1.1);
      g.add(n);
    }
  }
  return g;
}

const SHAPE_FROM_ICON = {
  Phone: 'phone',
  PhoneCall: 'phone',
  PhoneIncoming: 'phone',
  PhoneOutgoing: 'phone',
  PhoneForwarded: 'phone',
  Smartphone: 'phone',
  Headset: 'headset',
  Headphones: 'headset',
  Mic: 'headset',
  Server: 'server',
  Monitor: 'server',
  Code2: 'server',
  Network: 'network',
  Globe: 'globe',
  Cloud: 'globe',
  Radio: 'tower',
  Wifi: 'tower',
  Cable: 'tower',
  Shield: 'network',
  ShieldCheck: 'network',
  Zap: 'network',
  Activity: 'network',
  Hash: 'network',
  MessageSquare: 'network',
  Voicemail: 'phone',
  DollarSign: 'server',
  Maximize2: 'network',
  ListOrdered: 'pipeline',
  MapPin: 'tower',
  MousePointerClick: 'network',
  ArrowUpRight: 'network',
  GitBranch: 'network',
  Disc: 'globe',
  BarChart3: 'server',
  Sparkles: 'network',
};

/**
 * Tiny WebGL telecom glyph for service cards. Pauses off-screen; skipped on mobile/reduced-motion.
 */
export default function TelecomIcon3D({ shape = 'network', iconName, className = '' }) {
  const ref = useRef(null);
  const resolved = SHAPE_FROM_ICON[iconName] || shape;

  useEffect(() => {
    const container = ref.current;
    if (!container || prefersReducedMotion() || isCompactViewport()) return undefined;

    syncThemeColors();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    let root = buildShape(resolved);
    scene.add(root);

    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 1.4;
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 1.2;
    };
    container.addEventListener('pointermove', onMove, { passive: true });
    container.addEventListener(
      'pointerleave',
      () => {
        mouse.x = 0;
        mouse.y = 0;
      },
      { passive: true },
    );

    const resize = () => {
      const w = container.clientWidth || 56;
      const h = container.clientHeight || 56;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
    };
    resize();

    let visible = false;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { threshold: 0.1 });
    io.observe(container);

    const rebuild = () => {
      syncThemeColors();
      scene.remove(root);
      root.traverse((child) => {
        child.geometry?.dispose?.();
        child.material?.dispose?.();
      });
      root = buildShape(resolved);
      scene.add(root);
    };
    window.addEventListener('gc-themechange', rebuild);

    let id = 0;
    const tick = () => {
      id = requestAnimationFrame(tick);
      if (!visible) return;
      root.rotation.y += 0.012;
      root.rotation.x = mouse.y * 0.35 + Math.sin(performance.now() / 900) * 0.08;
      root.rotation.z = mouse.x * 0.2;
      root.position.y = Math.sin(performance.now() / 700) * 0.08;
      renderer.render(scene, camera);
    };
    id = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
      window.removeEventListener('gc-themechange', rebuild);
      container.removeEventListener('pointermove', onMove);
      root.traverse((child) => {
        child.geometry?.dispose?.();
        child.material?.dispose?.();
      });
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      disposeRenderer(renderer);
    };
  }, [resolved]);

  const fallback = (
    <span className="block h-full w-full rounded-lg bg-gradient-to-br from-[var(--accent-soft)]/25 to-[var(--accent-soft)]/15" />
  );

  if (typeof window !== 'undefined' && (prefersReducedMotion() || isCompactViewport())) {
    return <div className={className}>{fallback}</div>;
  }

  return <div ref={ref} className={`h-14 w-14 shrink-0 ${className}`} aria-hidden="true" />;
}
