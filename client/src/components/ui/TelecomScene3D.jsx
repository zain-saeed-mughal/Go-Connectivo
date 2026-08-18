import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ScrollTrigger, prefersReducedMotion, isCompactViewport } from '../../motion/config';
import { disposeRenderer } from '../../motion/webglSlots';

const NAVY = 0x2f4c73;
const MID = 0x4a6b94;
const LIGHT = 0x6b8ab0;
const SCREEN = 0x9ec4ef;

function disposeObject(obj) {
  obj.traverse?.((child) => {
    child.geometry?.dispose?.();
    if (child.material) {
      if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose?.());
      else child.material.dispose?.();
    }
  });
}

function matMetal(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: opts.metalness ?? 0.55,
    roughness: opts.roughness ?? 0.32,
    transparent: Boolean(opts.opacity != null && opts.opacity < 1),
    opacity: opts.opacity ?? 1,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 0,
  });
}

function matSoft(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: opts.metalness ?? 0.12,
    roughness: opts.roughness ?? 0.55,
    transparent: Boolean(opts.opacity != null && opts.opacity < 1),
    opacity: opts.opacity ?? 1,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 0,
  });
}

function matGlow(color, intensity = 0.55) {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: 0.2,
    roughness: 0.4,
    emissive: color,
    emissiveIntensity: intensity,
    transparent: true,
    opacity: 0.92,
  });
}

function makePhone() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.15, 2.2, 0.22, 2, 2, 2),
    matMetal(NAVY, { metalness: 0.65, roughness: 0.28 }),
  );
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(1.05, 2.05, 0.06),
    matMetal(MID, { metalness: 0.4, roughness: 0.4 }),
  );
  frame.position.z = 0.12;
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.88, 1.72), matGlow(SCREEN, 0.7));
  screen.position.z = 0.16;
  screen.userData.screenGlow = true;
  const cam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.06, 16),
    matMetal(0x1a2a40, { metalness: 0.8, roughness: 0.2 }),
  );
  cam.rotation.x = Math.PI / 2;
  cam.position.set(0.32, 0.92, -0.12);
  const notch = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 0.02), matSoft(0x152033));
  notch.position.set(0, 0.88, 0.17);
  g.add(body, frame, screen, cam, notch);
  return g;
}

function makeTower() {
  const g = new THREE.Group();
  const mast = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.2, 4.4, 16),
    matMetal(NAVY, { metalness: 0.7, roughness: 0.25 }),
  );
  mast.position.y = 1.15;
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.7, 0.22, 20),
    matMetal(MID, { metalness: 0.5, roughness: 0.4 }),
  );
  base.position.y = -0.95;
  g.add(mast, base);
  for (let i = 0; i < 3; i += 1) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.5 + i * 0.38, 0.045, 12, 48),
      matGlow(i === 0 ? LIGHT : MID, 0.45 - i * 0.08),
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 2.55 + i * 0.18;
    ring.userData.pulse = i;
    g.add(ring);
  }
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), matGlow(LIGHT, 0.9));
  tip.position.y = 3.45;
  g.add(tip);
  return g;
}

function makeHeadset() {
  const g = new THREE.Group();
  const band = new THREE.Mesh(
    new THREE.TorusGeometry(1.12, 0.09, 12, 48, Math.PI),
    matMetal(MID, { metalness: 0.45, roughness: 0.35 }),
  );
  band.rotation.z = Math.PI;
  const cupGeo = new THREE.SphereGeometry(0.4, 20, 20);
  const cupMat = matSoft(LIGHT, {
    metalness: 0.25,
    roughness: 0.4,
    emissive: MID,
    emissiveIntensity: 0.15,
  });
  const cupL = new THREE.Mesh(cupGeo, cupMat);
  cupL.position.set(-1.08, -0.12, 0);
  const cupR = new THREE.Mesh(cupGeo, cupMat.clone());
  cupR.position.set(1.08, -0.12, 0);
  const micArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 1.1, 10),
    matMetal(NAVY, { metalness: 0.6, roughness: 0.3 }),
  );
  micArm.position.set(0.55, -0.55, 0.35);
  micArm.rotation.z = 0.9;
  micArm.rotation.y = -0.4;
  const mic = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 14), matGlow(LIGHT, 0.35));
  mic.position.set(0.15, -0.95, 0.55);
  g.add(band, cupL, cupR, micArm, mic);
  return g;
}

function makeServer() {
  const g = new THREE.Group();
  for (let i = 0; i < 3; i += 1) {
    const slab = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.42, 1.2),
      matMetal(i === 1 ? MID : NAVY, { metalness: 0.5, roughness: 0.35 }),
    );
    slab.position.y = (i - 1) * 0.55;
    const led = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.08, 0.04),
      matGlow(i === 1 ? 0x6ee7b7 : LIGHT, 0.8),
    );
    led.position.set(0.9, (i - 1) * 0.55, 0.62);
    g.add(slab, led);
  }
  return g;
}

function makeNodeCluster() {
  const g = new THREE.Group();
  const hubCore = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.55, 1),
    matMetal(MID, { metalness: 0.55, roughness: 0.3, emissive: LIGHT, emissiveIntensity: 0.25 }),
  );
  const hubWire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.72, 0),
    new THREE.MeshStandardMaterial({
      color: LIGHT,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      metalness: 0.3,
      roughness: 0.5,
      emissive: LIGHT,
      emissiveIntensity: 0.2,
    }),
  );
  g.add(hubCore, hubWire);
  const lineMat = new THREE.LineBasicMaterial({ color: LIGHT, transparent: true, opacity: 0.55 });
  for (let i = 0; i < 6; i += 1) {
    const a = (i / 6) * Math.PI * 2;
    const node = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 16, 16),
      matGlow(i % 2 ? LIGHT : MID, 0.4),
    );
    node.position.set(Math.cos(a) * 2.05, Math.sin(a * 1.3) * 0.4, Math.sin(a) * 2.05);
    g.add(node);
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      node.position.clone(),
    ]);
    g.add(new THREE.Line(geo, lineMat));
  }
  return g;
}

function makeSignalRings() {
  const g = new THREE.Group();
  for (let i = 0; i < 4; i += 1) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.2 + i * 0.7, 0.04, 10, 64),
      matSoft(i % 2 ? LIGHT : MID, {
        opacity: 0.5 - i * 0.07,
        metalness: 0.3,
        roughness: 0.45,
        emissive: i % 2 ? LIGHT : MID,
        emissiveIntensity: 0.2,
      }),
    );
    ring.rotation.x = Math.PI / 2.5;
    ring.userData.spin = (i % 2 === 0 ? 1 : -1) * (0.004 + i * 0.001);
    g.add(ring);
  }
  const core = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.55, 0),
    matMetal(NAVY, { metalness: 0.6, roughness: 0.28, emissive: MID, emissiveIntensity: 0.3 }),
  );
  g.add(core);
  return g;
}

function makeLinkBeam(from, to) {
  const start = new THREE.Vector3(...from);
  const end = new THREE.Vector3(...to);
  const dir = end.clone().sub(start);
  const len = dir.length();
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, len, 8),
    matGlow(LIGHT, 0.55),
  );
  beam.position.copy(mid);
  beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  beam.userData.pulseOpacity = true;
  return beam;
}

function makeOrbitDust(count = 18) {
  const g = new THREE.Group();
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2;
    const r = 3.4 + (i % 3) * 0.45;
    const mote = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 8, 8),
      matGlow(i % 2 ? LIGHT : MID, 0.5),
    );
    mote.position.set(Math.cos(a) * r, Math.sin(a * 1.7) * 0.55, Math.sin(a) * r * 0.55);
    mote.userData.orbit = a;
    mote.userData.orbitSpeed = 0.15 + (i % 5) * 0.02;
    mote.userData.orbitRadius = r;
    mote.userData.orbitYAmp = 0.45 + (i % 3) * 0.1;
    g.add(mote);
  }
  return g;
}

function makeGroundShadow() {
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(4.8, 48),
    new THREE.MeshStandardMaterial({
      color: NAVY,
      transparent: true,
      opacity: 0.12,
      metalness: 0,
      roughness: 1,
      depthWrite: false,
    }),
  );
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = -2.35;
  return disc;
}

function makePacket(from, to, speed = 0.35, offset = 0) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), matGlow(LIGHT, 0.95));
  mesh.userData.packet = {
    from: new THREE.Vector3(...from),
    to: new THREE.Vector3(...to),
    speed,
    offset,
  };
  return mesh;
}

function tagFloat(obj, y, i, spin = 0.003) {
  obj.userData.homeY = y;
  obj.userData.floatAmp = 0.12 + (i % 3) * 0.03;
  obj.userData.floatSpeed = 0.55 + i * 0.12;
  obj.userData.spin = spin;
  obj.userData.servicesPiece = true;
  return obj;
}

function buildServiceWorld(focus, compact) {
  const root = new THREE.Group();
  root.userData.focus = focus;
  const n = compact ? 3 : 5;

  if (focus === 'voice') {
    const headset = tagFloat(makeHeadset(), 0.65, 0, -0.0025);
    headset.scale.setScalar(1.08);
    headset.position.set(0, 0.65, -0.15);
    root.add(headset);
    const wave = new THREE.Group();
    const bars = compact ? 7 : 11;
    for (let i = 0; i < bars; i += 1) {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 1, 0.16),
        matGlow(i % 2 ? LIGHT : MID, 0.5),
      );
      bar.position.set((i - (bars - 1) / 2) * 0.32, -0.9, 1.2);
      bar.userData.wave = i;
      wave.add(bar);
    }
    root.add(wave);
    [-2.55, 2.55].forEach((x, i) => {
      const phone = makePhone();
      phone.scale.setScalar(0.56);
      phone.position.set(x, -0.1, 0.3);
      phone.rotation.y = x > 0 ? -0.32 : 0.32;
      tagFloat(phone, -0.1, i + 1, 0.005);
      root.add(phone);
    });
    const rings = makeSignalRings();
    rings.scale.setScalar(0.46);
    rings.position.set(0, 1.65, -0.55);
    root.add(rings);
    root.add(makeGroundShadow());
    return root;
  }

  if (focus === 'pbx') {
    const server = tagFloat(makeServer(), 0.15, 0, 0.004);
    server.scale.setScalar(1.15);
    root.add(server);
    const rings = makeSignalRings();
    rings.scale.setScalar(0.55);
    rings.position.set(0, 1.65, 0);
    root.add(rings);
    const count = compact ? 3 : 4;
    for (let i = 0; i < count; i += 1) {
      const a = (i / count) * Math.PI * 2 + 0.4;
      const phone = makePhone();
      phone.scale.setScalar(0.55);
      phone.position.set(Math.cos(a) * 2.8, 0.2, Math.sin(a) * 2.8);
      tagFloat(phone, 0.2, i + 1, 0.008);
      phone.userData.orbit = a;
      phone.userData.orbitSpeed = 0.18;
      phone.userData.orbitRadius = 2.8;
      phone.userData.orbitYAmp = 0.22;
      root.add(phone);
      root.add(makeLinkBeam([0, 0.4, 0], [phone.position.x, 0.25, phone.position.z]));
    }
    root.add(makeGroundShadow());
    return root;
  }

  if (focus === 'dids') {
    const tower = tagFloat(makeTower(), -0.55, 0, 0.002);
    tower.scale.setScalar(0.62);
    tower.position.set(0, -0.55, -1.8);
    root.add(tower);
    const cols = compact ? 3 : 4;
    const rows = compact ? 2 : 3;
    let idx = 0;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const tile = new THREE.Mesh(
          new THREE.BoxGeometry(0.7, 0.7, 0.18),
          matMetal(idx % 2 ? MID : NAVY, {
            metalness: 0.45,
            roughness: 0.35,
            emissive: LIGHT,
            emissiveIntensity: 0.2,
          }),
        );
        tile.position.set((c - (cols - 1) / 2) * 1.05, (1 - r) * 0.95, 0.4);
        tile.userData.gridIndex = idx;
        tile.userData.servicesPiece = true;
        tile.userData.homeY = tile.position.y;
        tile.userData.floatAmp = 0.06;
        tile.userData.floatSpeed = 0.7 + idx * 0.05;
        root.add(tile);
        idx += 1;
      }
    }
    root.userData.gridCount = idx;
    root.add(makeGroundShadow());
    return root;
  }

  if (focus === 'termination') {
    const tower = tagFloat(makeTower(), -0.35, 0, 0.0025);
    tower.scale.setScalar(0.85);
    tower.position.set(0, -0.35, 0);
    root.add(tower);
    const dests = compact ? 4 : 6;
    for (let i = 0; i < dests; i += 1) {
      const a = (i / dests) * Math.PI * 2;
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), matGlow(i % 2 ? LIGHT : MID, 0.55));
      const x = Math.cos(a) * 3.4;
      const z = Math.sin(a) * 3.4;
      node.position.set(x, Math.sin(a * 2) * 0.4, z);
      tagFloat(node, node.position.y, i + 1, 0.01);
      root.add(node);
      root.add(makeLinkBeam([0, 2.4, 0], [x, node.position.y, z]));
      root.add(makePacket([0, 2.4, 0], [x, node.position.y, z], 0.28 + i * 0.04, i / dests));
    }
    const globe = makeNodeCluster();
    globe.scale.setScalar(0.42);
    globe.position.set(0, -1.35, 0);
    globe.userData.spin = 0.006;
    root.add(globe);
    root.add(makeGroundShadow());
    return root;
  }

  if (focus === 'contact') {
    const headset = tagFloat(makeHeadset(), 0.55, 0, -0.003);
    headset.scale.setScalar(1.05);
    headset.position.set(0, 0.55, 0);
    root.add(headset);
    const seats = compact ? 3 : 5;
    for (let i = 0; i < seats; i += 1) {
      const a = ((i + 0.5) / seats) * Math.PI * 1.2 - Math.PI * 0.6;
      const phone = makePhone();
      phone.scale.setScalar(0.48);
      phone.position.set(Math.sin(a) * 3.1, -0.55, -Math.cos(a) * 1.6 - 0.4);
      phone.rotation.y = -a * 0.45;
      phone.userData.dialIndex = i;
      tagFloat(phone, phone.position.y, i + 1, 0.006);
      root.add(phone);
    }
    root.userData.dialCount = seats;
    const hub = makeNodeCluster();
    hub.scale.setScalar(0.48);
    hub.position.set(0, -1.5, 1.1);
    hub.userData.spin = 0.005;
    root.add(hub);
    root.add(makeGroundShadow());
    return root;
  }

  if (focus === 'apis') {
    const core = makeSignalRings();
    core.scale.setScalar(0.85);
    core.position.set(0, 0.2, 0);
    root.add(core);
    const cluster = makeNodeCluster();
    cluster.scale.setScalar(0.95);
    cluster.userData.spin = 0.007;
    cluster.userData.homeY = 0;
    cluster.userData.floatAmp = 0.1;
    cluster.userData.floatSpeed = 0.6;
    cluster.userData.servicesPiece = true;
    root.add(cluster);
    const pts = [
      [-3.2, 0.8, 0.4],
      [3.2, 0.6, -0.3],
      [-1.6, -1.1, 1.6],
      [1.8, -0.9, 1.5],
      [0, 1.8, -1.2],
    ].slice(0, compact ? 3 : 5);
    pts.forEach((p, i) => {
      const node = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), matGlow(i % 2 ? LIGHT : MID, 0.5));
      node.position.set(...p);
      tagFloat(node, p[1], i, 0.012);
      root.add(node);
      root.add(makeLinkBeam([0, 0.2, 0], p));
      root.add(makePacket([0, 0.2, 0], p, 0.4 + i * 0.05, i * 0.18));
    });
    root.add(makeGroundShadow());
    if (!compact) root.add(makeOrbitDust(14));
    return root;
  }

  // Dialers — default live model
  for (let i = 0; i < n; i += 1) {
    const phone = makePhone();
    const mid = (n - 1) / 2;
    const x = (i - mid) * 1.55;
    phone.position.set(x, 0.25, Math.abs(i - mid) * -0.25);
    phone.rotation.y = (i - mid) * -0.18;
    phone.scale.setScalar(0.82);
    phone.userData.dialIndex = i;
    tagFloat(phone, 0.25, i, 0.004 + i * 0.0006);
    phone.userData._baseScale = 0.82;
    root.add(phone);
    if (i > 0) {
      const prev = [(i - 1 - mid) * 1.55, 0.35, Math.abs(i - 1 - mid) * -0.25];
      root.add(makePacket(prev, [x, 0.35, Math.abs(i - mid) * -0.25], 0.55, i * 0.2));
    }
  }
  root.userData.dialCount = n;
  const rings = makeSignalRings();
  rings.scale.setScalar(0.5);
  rings.position.set(0, 1.55, -0.9);
  root.add(rings);
  root.add(makeGroundShadow());
  if (!compact) root.add(makeOrbitDust(12));
  return root;
}

function buildVariant(variant, compact) {
  const root = new THREE.Group();

  if (variant === 'services') {
    const pieces = [
      { build: makePhone, pos: [-3.4, 0.55, 0.1], scale: 1, spin: 0.0035 },
      { build: makeHeadset, pos: [0, 0.45, -0.55], scale: 0.92, spin: -0.0025 },
      { build: makeTower, pos: [3.3, -0.45, 0.15], scale: 0.78, spin: 0.002 },
      { build: makeNodeCluster, pos: [0.15, -1.45, 1.35], scale: 0.62, spin: 0.005 },
    ];
    if (compact) pieces.pop();

    pieces.forEach(({ build, pos, scale, spin }, i) => {
      const obj = build();
      obj.position.set(...pos);
      obj.scale.setScalar(scale);
      obj.userData.homeY = pos[1];
      obj.userData.floatAmp = 0.14 + (i % 3) * 0.04;
      obj.userData.floatSpeed = 0.5 + i * 0.16;
      obj.userData.spin = spin;
      obj.userData.servicesPiece = true;
      obj.userData._baseScale = scale;
      root.add(obj);
    });

    root.add(makeLinkBeam([-3.0, 0.5, 0], [-0.9, 0.4, -0.4]));
    root.add(makeLinkBeam([0.9, 0.4, -0.4], [2.9, 0.2, 0.1]));
    if (!compact) root.add(makeLinkBeam([0, 0.1, -0.3], [0.15, -1.1, 1.1]));

    const rings = makeSignalRings();
    rings.scale.setScalar(0.72);
    rings.position.set(0, 0.15, -0.8);
    root.add(rings);
    root.add(makeGroundShadow());

    if (!compact) {
      const dust = makeOrbitDust(16);
      root.add(dust);
    }
    return root;
  }

  if (variant === 'tower') {
    const tower = makeTower();
    tower.scale.setScalar(1.15);
    tower.userData.homeY = 0;
    root.add(tower);
    const orbit = makeNodeCluster();
    orbit.scale.setScalar(0.85);
    orbit.position.set(0, 0.4, 0);
    orbit.userData.homeY = 0.4;
    orbit.userData.spin = 0.004;
    root.add(orbit);
    return root;
  }

  if (variant === 'pipeline') {
    const count = compact ? 4 : 5;
    const linePts = [];
    for (let i = 0; i < count; i += 1) {
      const x = (i - (count - 1) / 2) * 2.4;
      const y = Math.sin(i) * 0.35;
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 18, 18),
        matGlow(i % 2 ? LIGHT : MID, 0.35),
      );
      node.position.set(x, y, 0);
      node.userData.homeY = y;
      node.userData.floatAmp = 0.15;
      node.userData.floatSpeed = 0.8 + i * 0.1;
      root.add(node);
      linePts.push(node.position.clone());
      if (i > 0) {
        root.add(
          makeLinkBeam(
            [linePts[i - 1].x, linePts[i - 1].y, linePts[i - 1].z],
            [linePts[i].x, linePts[i].y, linePts[i].z],
          ),
        );
      }
    }
    return root;
  }

  if (variant === 'platform') {
    const grid = makeSignalRings();
    grid.scale.setScalar(1.05);
    root.add(grid);

    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 2.1, 0.18, 48),
      matSoft(NAVY, { opacity: 0.45, roughness: 0.7, metalness: 0.2 }),
    );
    pedestal.position.y = -1.6;
    root.add(pedestal);

    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.85, 0),
      matMetal(MID, { metalness: 0.55, roughness: 0.28, emissive: LIGHT, emissiveIntensity: 0.25 }),
    );
    core.userData.homeY = 0;
    core.userData.spin = 0.012;
    core.userData.floatAmp = 0.1;
    core.userData.floatSpeed = 0.7;
    root.add(core);

    const satellites = [makePhone(), makeServer(), makeHeadset(), makeNodeCluster()];
    if (compact) satellites.pop();
    satellites.forEach((obj, i) => {
      const a = (i / satellites.length) * Math.PI * 2;
      obj.scale.setScalar(i === 3 ? 0.4 : 0.48);
      obj.position.set(Math.cos(a) * 3.6, Math.sin(a * 2) * 0.55, Math.sin(a) * 3.6);
      obj.userData.orbit = a;
      obj.userData.orbitSpeed = 0.22 + i * 0.04;
      obj.userData.orbitRadius = 3.6;
      obj.userData.spin = 0.008 + i * 0.002;
      obj.userData.floatAmp = 0.12;
      obj.userData.floatSpeed = 0.55 + i * 0.1;
      obj.userData.homeY = Math.sin(a * 2) * 0.55;
      root.add(obj);
    });
    return root;
  }

  const hub = makeNodeCluster();
  hub.scale.setScalar(1.2);
  hub.userData.homeY = 0;
  root.add(hub);
  const rings = makeSignalRings();
  rings.scale.setScalar(0.85);
  root.add(rings);
  return root;
}

function addStudioLights(scene) {
  const ambient = new THREE.AmbientLight(0xd7e2e8, 0.55);
  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(4.5, 7, 5);
  const fill = new THREE.DirectionalLight(0x9ec4ef, 0.55);
  fill.position.set(-5, 2.5, -2);
  const rim = new THREE.DirectionalLight(0x6b8ab0, 0.45);
  rim.position.set(0, 3, -6);
  const hemi = new THREE.HemisphereLight(0xe8eef5, 0x2f4c73, 0.35);
  scene.add(ambient, key, fill, rim, hemi);
  return () => {
    scene.remove(ambient, key, fill, rim, hemi);
    ambient.dispose?.();
    key.dispose?.();
    fill.dispose?.();
    rim.dispose?.();
    hemi.dispose?.();
  };
}

/**
 * Scroll-aware Three.js telecom scene.
 * Variants: services | tower | pipeline | platform | hub
 * serviceFocus (when variant=services|platform): dialers | voice | pbx | dids | termination | contact | apis
 */
export default function TelecomScene3D({
  variant = 'hub',
  serviceFocus = 'dids',
  className = '',
  interactive = true,
  scrollScrub = true,
  onContextLost,
}) {
  const containerRef = useRef(null);
  const serviceFocusRef = useRef(serviceFocus);
  serviceFocusRef.current = serviceFocus;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return undefined;

    const compact = isCompactViewport();
    const isLiveModel = variant === 'services' || variant === 'platform';
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.55, compact ? 14 : isLiveModel ? 11 : 12);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !compact,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 1 : 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isLiveModel ? 1.15 : 1.05;
    container.appendChild(renderer.domElement);

    const disposeLights = addStudioLights(scene);
    const makeWorld = () => {
      if (isLiveModel) {
        const world = buildServiceWorld(serviceFocusRef.current, compact);
        world.userData.focus = serviceFocusRef.current;
        world.userData.bornAt = performance.now();
        return world;
      }
      return buildVariant(variant, compact);
    };
    let root = makeWorld();
    scene.add(root);

    const sparkCount = compact ? 22 : isLiveModel ? 36 : 48;
    const sparkPos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i += 1) {
      sparkPos[i * 3] = (Math.random() - 0.5) * 16;
      sparkPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparks = new THREE.Points(
      sparkGeo,
      new THREE.PointsMaterial({
        color: LIGHT,
        size: isLiveModel ? 0.22 : 0.32,
        transparent: true,
        opacity: isLiveModel ? 0.4 : 0.45,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    );
    scene.add(sparks);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const scroll = { p: 0 };

    const onPointer = (e) => {
      if (!interactive || compact) return;
      const rect = container.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2.2;
      mouse.ty = -((e.clientY - rect.top) / rect.height - 0.5) * 1.6;
    };

    if (interactive && !compact) {
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

    const resize = () => {
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
    };
    resize();
    window.addEventListener('resize', resize);

    let visible = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          resize();
          renderer.render(scene, camera);
        }
      },
      { threshold: 0.02, rootMargin: '80px' },
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
    const handleRestored = () => {
      if (lost) return;
      resize();
      renderer.render(scene, camera);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleLost, false);
    renderer.domElement.addEventListener('webglcontextrestored', handleRestored, false);

    const triggers = [];
    if (scrollScrub && !compact) {
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

    const t0 = performance.now();
    const animate = (now) => {
      animId = requestAnimationFrame(animate);
      if (!visible || lost) return;

      if (isLiveModel && root.userData.focus !== serviceFocusRef.current) {
        scene.remove(root);
        disposeObject(root);
        root = makeWorld();
        scene.add(root);
      }

      const t = (now - t0) / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      root.children.forEach((child, i) => {
        if (child.userData.floatAmp != null && child.userData.homeY != null && child.userData.orbit == null) {
          child.position.y =
            child.userData.homeY + Math.sin(t * child.userData.floatSpeed + i) * child.userData.floatAmp;
        } else if (child.userData.floatAmp && child.userData.orbit == null && child.userData.homeY == null) {
          if (child.userData._baseY == null) child.userData._baseY = child.position.y;
          child.position.y =
            child.userData._baseY + Math.sin(t * child.userData.floatSpeed + i) * child.userData.floatAmp;
        }

        if (child.userData.spin) child.rotation.y += child.userData.spin;

        if (child.userData.orbit != null) {
          const a = child.userData.orbit + t * child.userData.orbitSpeed;
          const r = child.userData.orbitRadius;
          child.position.x = Math.cos(a) * r;
          child.position.z = Math.sin(a) * r * (child.userData.orbitZScale ?? 1);
          child.position.y = Math.sin(a * 2) * (child.userData.orbitYAmp ?? 0.45);
        }

        if (child.userData.packet) {
          const pk = child.userData.packet;
          const p = (t * pk.speed + pk.offset) % 1;
          child.position.lerpVectors(pk.from, pk.to, p);
          const s = 0.7 + Math.sin(p * Math.PI) * 0.55;
          child.scale.setScalar(s);
        }

        if (child.userData.pulseOpacity && child.material) {
          child.material.opacity = 0.35 + (0.5 + Math.sin(t * 2.1 + i) * 0.5) * 0.45;
          if (child.material.emissiveIntensity != null) {
            child.material.emissiveIntensity = 0.35 + Math.sin(t * 2.4 + i) * 0.25;
          }
        }

        if (child.userData.gridIndex != null && root.userData.gridCount) {
          const wave = Math.sin(t * 2.4 - child.userData.gridIndex * 0.55);
          if (child.material?.emissiveIntensity != null) {
            child.material.emissiveIntensity = 0.18 + Math.max(0, wave) * 0.7;
          }
        }

        if (child.userData.dialIndex != null && root.userData.dialCount) {
          const active = Math.floor(t * 2.1) % root.userData.dialCount === child.userData.dialIndex;
          child.traverse((sub) => {
            if (sub.userData.screenGlow && sub.material?.emissiveIntensity != null) {
              sub.material.emissiveIntensity = active ? 1.15 : 0.38;
            }
          });
        }

        child.children?.forEach((sub) => {
          if (sub.userData.pulse != null) {
            const s = 1 + Math.sin(t * 2 + sub.userData.pulse) * 0.1;
            sub.scale.setScalar(s);
            if (sub.material?.emissiveIntensity != null) {
              sub.material.emissiveIntensity = 0.35 + Math.sin(t * 2.2 + sub.userData.pulse) * 0.25;
            }
          }
          if (sub.userData.wave != null) {
            sub.scale.y = 0.32 + Math.abs(Math.sin(t * 3.6 + sub.userData.wave * 0.48)) * 1.45;
          }
          if (sub.userData.orbit != null) {
            const a = sub.userData.orbit + t * sub.userData.orbitSpeed;
            const r = sub.userData.orbitRadius;
            sub.position.x = Math.cos(a) * r;
            sub.position.z = Math.sin(a) * r * 0.55;
            sub.position.y = Math.sin(a * 1.7) * (sub.userData.orbitYAmp || 0.45);
            sub.rotation.y += 0.012;
          }
        });
      });

      if (isLiveModel) {
        const age = Math.min(1, (now - (root.userData.bornAt || now)) / 400);
        root.scale.setScalar(0.88 + age * 0.12);
      }

      const scrollTilt = scroll.p * (isLiveModel ? 0.95 : 0.85);
      root.rotation.y = mouse.x * 0.42 + scrollTilt + (isLiveModel ? Math.sin(t * 0.22) * 0.06 : 0);
      root.rotation.x = mouse.y * 0.28 + Math.sin(scroll.p * Math.PI) * 0.18;
      root.position.y = Math.sin(scroll.p * Math.PI) * 0.32;

      sparks.rotation.y += isLiveModel ? 0.0011 : 0.0009;
      sparks.rotation.x = scroll.p * 0.28;
      if (isLiveModel) sparks.material.opacity = 0.28 + Math.sin(t * 1.1) * 0.1;

      camera.position.x = mouse.x * 0.9;
      camera.position.y = 0.5 + mouse.y * 0.45 + scroll.p * 0.55;
      camera.position.z = (compact ? 14 : isLiveModel ? 11 : 12) - scroll.p * (isLiveModel ? 1.8 : 1.5);
      camera.lookAt(0, isLiveModel ? -0.2 : 0, 0);

      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      io.disconnect();
      triggers.forEach((tr) => tr.kill());
      window.removeEventListener('resize', resize);
      renderer.domElement.removeEventListener('webglcontextlost', handleLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleRestored);
      if (interactive) container.removeEventListener('pointermove', onPointer);
      disposeLights();
      disposeObject(root);
      sparkGeo.dispose();
      sparks.material.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      disposeRenderer(renderer);
    };
  }, [variant, interactive, scrollScrub, onContextLost]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full min-h-[200px] w-full overflow-hidden bg-gradient-to-br from-[#E8ECF2] via-[#F4F6F9] to-[#E0E5ED] ${className}`}
      aria-hidden="true"
    />
  );
}
