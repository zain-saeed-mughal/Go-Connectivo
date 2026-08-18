import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ScrollTrigger, prefersReducedMotion, isCompactViewport } from '../../motion/config';
import { disposeRenderer } from '../../motion/webglSlots';

/**
 * Compact interactive holographic hub for section accents.
 * Brand navy only — scroll-scrubbed when inside a chapter.
 */
export default function HolographicHub3D({ className = '', interactive = true, onContextLost }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return undefined;

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
        color: 0x6b8ab0,
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
          color: 0x4a6b94,
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
          color: 0x4a6b94,
          transparent: true,
          opacity: 0.45,
        }),
      ),
    );
    ring.rotation.x = Math.PI / 2.4;
    root.add(ring);

    const ring2 = new THREE.Mesh(
      track(new THREE.TorusGeometry(9.4, 0.04, 10, 100)),
      track(
        new THREE.MeshBasicMaterial({
          color: 0x2f4c73,
          transparent: true,
          opacity: 0.28,
        }),
      ),
    );
    ring2.rotation.x = Math.PI / 3.2;
    ring2.rotation.y = 0.35;
    root.add(ring2);

    const nodeGeo = track(new THREE.SphereGeometry(0.42, 12, 12));
    const nodeMat = track(
      new THREE.MeshBasicMaterial({ color: 0x6b8ab0, transparent: true, opacity: 0.95 }),
    );
    const lineMat = track(
      new THREE.LineBasicMaterial({ color: 0x4a6b94, transparent: true, opacity: 0.4 }),
    );
    const count = compact ? 5 : 6;
    for (let i = 0; i < count; i += 1) {
      const a = (i / count) * Math.PI * 2;
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(a) * 7.2, Math.sin(a) * 0.35, Math.sin(a) * 7.2);
      root.add(node);
      const geo = track(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), node.position.clone()]));
      root.add(new THREE.Line(geo, lineMat));
    }

    const sparkCount = compact ? 40 : 70;
    const sparkPos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i += 1) {
      sparkPos[i * 3] = (Math.random() - 0.5) * 28;
      sparkPos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    const sparkGeo = track(new THREE.BufferGeometry());
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparks = new THREE.Points(
      sparkGeo,
      track(
        new THREE.PointsMaterial({
          color: 0x6b8ab0,
          size: 0.55,
          transparent: true,
          opacity: 0.5,
          depthWrite: false,
        }),
      ),
    );
    scene.add(sparks);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const scroll = { p: 0 };
    const onPointer = (e) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2.4;
      mouse.ty = -((e.clientY - rect.top) / rect.height - 0.5) * 1.8;
    };
    if (interactive) {
      container.addEventListener('pointermove', onPointer, { passive: true });
      container.addEventListener(
        'pointerleave',
        () => {
          mouse.tx = 0;
          mouse.ty = 0;
        },
        { passive: true },
      );
    }

    const onResize = () => {
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.08 },
    );
    io.observe(container);

    let animId = 0;
    let lost = false;
    const handleLost = (e) => {
      e.preventDefault();
      if (lost) return;
      lost = true;
      visible = false;
      cancelAnimationFrame(animId);
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
  }, [interactive, onContextLost]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full min-h-[220px] w-full overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
