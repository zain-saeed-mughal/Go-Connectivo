import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function themeColor(name, fallback) {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/** Brand accents — resolved from active theme CSS vars (navy fallbacks) */
function getSceneColors() {
  return {
    navy: themeColor('--accent-primary', '#2F4C73'),
    mid: themeColor('--accent-secondary', '#4A6B94'),
    light: themeColor('--accent-soft', '#6B8AB0'),
    soft: themeColor('--accent-light', '#8BA3C4'),
  };
}

function Meridians({ radius = 1.35, count = 10, color }) {
  const geos = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI;
      const pts = [];
      for (let j = 0; j <= 48; j += 1) {
        const t = (j / 48) * Math.PI;
        pts.push(
          new THREE.Vector3(
            radius * Math.sin(t) * Math.cos(a),
            radius * Math.cos(t),
            radius * Math.sin(t) * Math.sin(a),
          ),
        );
      }
      return new THREE.BufferGeometry().setFromPoints(pts);
    });
  }, [radius, count]);

  return (
    <group>
      {geos.map((geo, i) => (
        <line key={`mer-${i}`} geometry={geo}>
          <lineBasicMaterial color={color} transparent opacity={0.55} depthWrite={false} />
        </line>
      ))}
    </group>
  );
}

function Parallels({ radius = 1.35, count = 7, color }) {
  const geos = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const y = ((i + 1) / (count + 1)) * 2 - 1;
      const r = Math.sqrt(Math.max(0, 1 - y * y)) * radius;
      const pts = [];
      for (let j = 0; j <= 64; j += 1) {
        const a = (j / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, y * radius, Math.sin(a) * r));
      }
      return new THREE.BufferGeometry().setFromPoints(pts);
    });
  }, [radius, count]);

  return (
    <group>
      {geos.map((geo, i) => (
        <line key={`par-${i}`} geometry={geo}>
          <lineBasicMaterial color={color} transparent opacity={0.42} depthWrite={false} />
        </line>
      ))}
    </group>
  );
}

/**
 * World globe, elegant scale-in on page open, then scroll-driven motion.
 */
export default function HeroNetworkScene({ progressRef, theme = 'dark' }) {
  const colors = useMemo(() => getSceneColors(), [theme]);
  const root = useRef(null);
  const glow = useRef(null);
  const ring = useRef(null);
  const shell = useRef(null);
  const wire = useRef(null);
  const intro = useRef(0);
  const spin = useRef(0);

  useFrame((_, delta) => {
    const p = progressRef.current ?? 0;
    const g = root.current;
    if (!g) return;

    // Entrance once, then stay fully visible
    intro.current = Math.min(1, intro.current + delta / 0.85);
    const t = intro.current;
    const enter = 1 - (1 - t) ** 3;

    // Continuous idle spin (slow) + scroll progress drives reverse-capable yaw
    spin.current += delta * 0.1;
    g.visible = true;
    g.scale.setScalar(0.95 + enter * 0.2 + p * 0.22);
    // p↓ on scroll-up → rotation reverses relative to progress
    g.rotation.y = spin.current + p * Math.PI * 1.35 - 0.35 * (1 - enter);
    g.rotation.x = 0.2 + p * 0.35;
    g.position.y = (1 - enter) * 0.28 + p * 0.12;

    const fade = enter;
    if (shell.current) shell.current.material.opacity = 0.28 * fade;
    if (wire.current) wire.current.material.opacity = 0.55 * fade;
    if (glow.current) glow.current.material.opacity = (0.14 + p * 0.1) * fade;
    if (ring.current) {
      // Ring angle also scrub-reverses with progress
      ring.current.rotation.z = p * Math.PI * 1.6 + spin.current * 0.4;
      ring.current.material.opacity = (0.45 + p * 0.25) * fade;
    }
  });

  return (
    <>
      <CameraRig progressRef={progressRef} introRef={intro} />
      <group ref={root} position={[0.05, 0.02, 0]} scale={0.01}>
        <mesh ref={shell}>
          <sphereGeometry args={[1.32, 48, 48]} />
          <meshBasicMaterial color={colors.navy} transparent opacity={0} depthWrite={false} />
        </mesh>

        <mesh ref={wire}>
          <sphereGeometry args={[1.35, 28, 28]} />
          <meshBasicMaterial color={colors.light} wireframe transparent opacity={0} />
        </mesh>

        <Meridians radius={1.36} count={12} color={colors.soft} />
        <Parallels radius={1.36} count={8} color={colors.light} />

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.36, 0.012, 8, 96]} />
          <meshBasicMaterial color={colors.soft} transparent opacity={0.7} depthWrite={false} />
        </mesh>

        <mesh ref={glow}>
          <sphereGeometry args={[1.55, 32, 32]} />
          <meshBasicMaterial
            color={colors.mid}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>

        <mesh ref={ring} rotation={[Math.PI / 2.6, 0.35, 0.2]}>
          <torusGeometry args={[1.85, 0.018, 8, 100]} />
          <meshBasicMaterial color={colors.light} transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </>
  );
}

function CameraRig({ progressRef, introRef }) {
  useFrame(({ camera }) => {
    const p = progressRef.current ?? 0;
    const enter = introRef?.current ?? 1;
    const e = 1 - (1 - Math.min(1, enter)) ** 3;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0.15 + p * 0.25, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.12 + p * 0.15, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 4.6 - e * 0.4 - p * 0.45, 0.08);
    camera.lookAt(0.05, 0.02, 0);
  });
  return null;
}
