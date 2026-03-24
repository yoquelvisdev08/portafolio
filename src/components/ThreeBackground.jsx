import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const COLORS = {
  primary: '#6a9ab0',
  accent: '#ead8b1',
  mid: '#3a6d8c',
  deep: '#081426',
  glow: '#9ec6d8',
};

const POINTER_REACTIVITY = 0.035;

const createSoftParticleTexture = () => {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,0.98)');
  gradient.addColorStop(0.35, 'rgba(234,216,177,0.9)');
  gradient.addColorStop(1, 'rgba(234,216,177,0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
};

const fillParticlePositions = (positions, spreadX, spreadY, spreadZ) => {
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] = (Math.random() - 0.5) * spreadX;
    positions[i + 1] = (Math.random() - 0.5) * spreadY;
    positions[i + 2] = (Math.random() - 0.5) * spreadZ;
  }
};

const ThreeBackground = () => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const isRunningRef = useRef(true);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(COLORS.deep, prefersReducedMotion ? 0.046 : 0.035);

    const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 7.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: supportsFinePointer,
      alpha: true,
      powerPreference: isCoarsePointer ? 'default' : 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const maxDpr = prefersReducedMotion ? 1 : isCoarsePointer ? 1.25 : 1.75;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr));
    renderer.setClearColor(0x001f3f, 1);
    renderer.sortObjects = false;
    renderer.setScissorTest(false);
    container.appendChild(renderer.domElement);

    const toDispose = [];
    const particleTexture = createSoftParticleTexture();
    if (particleTexture) toDispose.push(particleTexture);

    const baseCount = prefersReducedMotion ? 130 : isCoarsePointer ? 190 : 300;
    const farCount = prefersReducedMotion ? 70 : isCoarsePointer ? 120 : 190;

    const basePositions = new Float32Array(baseCount * 3);
    fillParticlePositions(basePositions, 24, 20, 16);

    const baseGeo = new THREE.BufferGeometry();
    baseGeo.setAttribute('position', new THREE.BufferAttribute(basePositions, 3));

    const baseMat = new THREE.PointsMaterial({
      color: COLORS.accent,
      map: particleTexture,
      size: supportsFinePointer ? 0.2 : 0.16,
      sizeAttenuation: true,
      transparent: true,
      opacity: prefersReducedMotion ? 0.5 : 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const baseParticles = new THREE.Points(baseGeo, baseMat);
    scene.add(baseParticles);
    toDispose.push(baseGeo, baseMat);

    const farPositions = new Float32Array(farCount * 3);
    fillParticlePositions(farPositions, 32, 24, 28);
    const farGeo = new THREE.BufferGeometry();
    farGeo.setAttribute('position', new THREE.BufferAttribute(farPositions, 3));
    const farMat = new THREE.PointsMaterial({
      color: COLORS.primary,
      map: particleTexture,
      size: supportsFinePointer ? 0.11 : 0.09,
      sizeAttenuation: true,
      transparent: true,
      opacity: prefersReducedMotion ? 0.26 : 0.34,
      depthWrite: false,
      toneMapped: false,
    });
    const farParticles = new THREE.Points(farGeo, farMat);
    farParticles.position.z = -4;
    scene.add(farParticles);
    toDispose.push(farGeo, farMat);

    const glowGeo = new THREE.SphereGeometry(5.2, 22, 22);
    const glowMat = new THREE.MeshBasicMaterial({
      color: COLORS.glow,
      transparent: true,
      opacity: prefersReducedMotion ? 0.045 : 0.08,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    glowMesh.position.set(1.4, 0.8, -6.8);
    scene.add(glowMesh);
    toDispose.push(glowGeo, glowMat);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr));
    };

    const handleMouse = (e) => {
      if (!supportsFinePointer) return;
      hasInteractedRef.current = true;
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleVisibilityChange = () => {
      isRunningRef.current = !document.hidden;
    };

    const targetFps = prefersReducedMotion ? 20 : isCoarsePointer ? 30 : 45;
    const frameIntervalMs = 1000 / targetFps;
    let previousTimeMs = performance.now();
    let accumulator = 0;

    const animateStep = (deltaSec) => {
      baseParticles.rotation.y += deltaSec * (prefersReducedMotion ? 0.012 : 0.022);
      baseParticles.rotation.x += deltaSec * (prefersReducedMotion ? 0.004 : 0.007);
      farParticles.rotation.y -= deltaSec * (prefersReducedMotion ? 0.004 : 0.008);

      const idleX = Math.sin(previousTimeMs * 0.00012) * 0.18;
      const idleY = Math.cos(previousTimeMs * 0.0001) * 0.13;

      const targetX = hasInteractedRef.current ? mouseRef.current.x * 0.9 : idleX;
      const targetY = hasInteractedRef.current ? mouseRef.current.y * 0.55 : idleY;

      camera.position.x += (targetX - camera.position.x) * POINTER_REACTIVITY;
      camera.position.y += (targetY - camera.position.y) * POINTER_REACTIVITY;
      camera.lookAt(0, 0, 0);

      glowMesh.rotation.y += deltaSec * 0.015;
      renderer.render(scene, camera);
    };

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (!isRunningRef.current) return;

      const nowMs = performance.now();
      const elapsedMs = nowMs - previousTimeMs;
      previousTimeMs = nowMs;
      accumulator += elapsedMs;

      if (accumulator < frameIntervalMs) return;

      const stepCount = Math.min(Math.floor(accumulator / frameIntervalMs), 2);
      accumulator -= stepCount * frameIntervalMs;

      const deltaSec = (frameIntervalMs * stepCount) / 1000;
      animateStep(deltaSec);
    };

    window.addEventListener('resize', handleResize);
    if (supportsFinePointer) {
      window.addEventListener('mousemove', handleMouse, { passive: true });
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (supportsFinePointer) {
        window.removeEventListener('mousemove', handleMouse);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(frameRef.current);
      toDispose.forEach((d) => d.dispose?.());
      renderer.dispose();
      renderer.forceContextLoss();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ThreeBackground;
