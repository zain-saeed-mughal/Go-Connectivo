import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ScrollTrigger, prefersReducedMotion, isCompactViewport } from '../../motion/config';
import { disposeRenderer, installThreeGuards } from '../../motion/webglSlots';

installThreeGuards(THREE);

function cssHex(name, fallback) {
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!raw.startsWith('#') || raw.length < 7) return fallback;
  const n = Number.parseInt(raw.slice(1, 7), 16);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Compact interactive holographic hub for section accents.
 * Colors follow active theme (navy light / purple dark).
 */
export default function HolographicHub3D({ className = '', interactive = true, onContextLost }) {
  const containerRef = useRef(null);
  const [themeTick, setThemeTick] = useState(0);

  useEffect(() => {
    const onTheme = () => setThemeTick((n) => n + 1);
    window.addEventListener('gc-themechange', onTheme);
    return () => window.removeEventListener('gc-themechange', onTheme);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return undefined;

    const soft = cssHex('--accent-soft', 0x6b8ab0);
    const mid = cssHex('--accent-secondary', 0x4a6b94);
    const primary = cssHex('--accent-primary', 0x2f4c73);

    const compact = isCompactViewport();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100,
    );
    camera.position.set(0, 0, compact ? 28 : 24);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: false,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const disposables = [];
    const track = (o) => {
      disposables.push(o);
      return o;
    };

    const root = new THREE.Group();
    scene.add(root);

    const hubGeo = track(new THREE.IcosahedronGeometry(3.4, 1));
    const hubMat = track(
      new THREE.MeshBasicMaterial({
        color: soft,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      }),
    );
    const hub = new THREE.Mesh(hubGeo, hubMat);
    root.add(hub);

    const shell = new THREE.Mesh(
      track(new THREE.SphereGeometry(4.1, 28, 28)),
      track(
        new THREE.MeshBasicMaterial({
          color: mid,
          transparent: true,
          opacity: 0.1,
          depthWrite: false,
        }),
      ),
    );
    root.add(shell);

    const ring = new THREE.Mesh(
      track(new THREE.TorusGeometry(7.2, 0.05, 10, 100)),
      track(
        new THREE.MeshBasicMaterial({
          color: mid,
          transparent: true,
          opacity: 0.45,
        }),
      ),
    );
    ring.rotation.x = Math.PI / 2.4;
    root.add(ring);

    const ring2 = new THREE.Mesh(
      track(new THREE.TorusGeometry(8.4, 0.035, 10, 100)),
      track(
        new THREE.MeshBasicMaterial({
          color: primary,
          transparent: true,
          opacity: 0.3,
        }),
      ),
    );
    ring2.rotation.x = Math.PI / 3.1;
    root.add(ring2);

    const sparkCount = compact ? 18 : 28;
    const sparkPos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i += 1) {
      sparkPos[i * 3] = (Math.random() - 0.5) * 18;
      sparkPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    const sparkGeo = track(new THREE.BufferGeometry());
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparks = new THREE.Points(
      sparkGeo,
      track(
        new THREE.PointsMaterial({
          color: soft,
          size: 0.28,
          transparent: true,
          opacity: 0.55,
          depthWrite: false,
          sizeAttenuation: true,
        }),
      ),
    );
    root.add(sparks);

    const nodes = [];
    for (let i = 0; i < 6; i += 1) {
      const a = (i / 6) * Math.PI * 2;
      const node = new THREE.Mesh(
        track(new THREE.SphereGeometry(0.28, 12, 12)),
        track(
          new THREE.MeshBasicMaterial({
            color: soft,
            transparent: true,
            opacity: 0.95,
          }),
        ),
      );
      node.position.set(Math.cos(a) * 5.2, Math.sin(a * 1.3) * 1.4, Math.sin(a) * 5.2);
      root.add(node);
      nodes.push(node);

      const link = new THREE.Line(
        track(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            node.position.clone(),
          ]),
        ),
        track(new THREE.LineBasicMaterial({ color: mid, transparent: true, opacity: 0.4 })),
      );
      root.add(link);
    }

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const scroll = { p: 0 };
    let animId = 0;
    let visible = true;
    let lost = false;

    const onPointer = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.ty = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    if (interactive) container.addEventListener('pointermove', onPointer);

    const onResize = () => {
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: '80px' },
    );
    io.observe(container);

    const handleLost = (e) => {
      e.preventDefault();
      lost = true;
      onContextLost?.();
    };
    renderer.domElement.addEventListener('webglcontextlost', handleLost, false);

    const triggers = [];
    if (!compact) {
      const chapter = container.closest('[data-scroll-chapter]') || container;
      triggers.push(
        ScrollTrigger.create({
          trigger: chapter,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 0.45,
          onUpdate: (self) => {
            scroll.p = self.progress;
          },
        }),
      );
    }

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!visible || lost) return;

      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      hub.rotation.y += 0.006 + scroll.p * 0.01;
      hub.rotation.x += 0.002;
      ring.rotation.z += 0.004;
      ring2.rotation.z -= 0.0025;
      sparks.rotation.y += 0.0008;

      root.rotation.y = mouse.x * 0.35 + scroll.p * 1.1;
      root.rotation.x = mouse.y * 0.25 + Math.sin(scroll.p * Math.PI) * 0.25;
      root.scale.setScalar(1 + scroll.p * 0.12);

      camera.position.x = mouse.x * 1.2;
      camera.position.y = mouse.y * 0.8 + scroll.p * 1.4;
      camera.position.z = (compact ? 28 : 24) - scroll.p * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      io.disconnect();
      triggers.forEach((t) => t.kill());
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleLost);
      if (interactive) container.removeEventListener('pointermove', onPointer);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      disposables.forEach((d) => d.dispose?.());
      disposeRenderer(renderer);
    };
  }, [interactive, onContextLost, themeTick]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full min-h-[220px] w-full overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
