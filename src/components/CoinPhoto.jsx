import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PHOTO_FRONT = '/c188c5cb-1118-46df-bd8f-8ea71f8a6a26.jpg';
const PHOTO_BACK = '/me.JPG';
const COIN_COLOR = 0xead8b1;

const CoinPhoto = () => {
  const containerRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = 320;
    const height = 320;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 2.2;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    if (renderer.outputColorSpace !== undefined) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
    container.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    let coin = null;

    const createCoin = (texFront, texBack) => {
      const radius = 1;
      const thickness = 0.06;
      const segments = 64;

      [texFront, texBack].forEach((tex) => {
        tex.center.set(0.5, 0.5);
        tex.offset.set(0, 0);
        tex.repeat.set(1, 1);
        tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.rotation = -Math.PI / 2;
        tex.needsUpdate = true;
      });

      const matFront = new THREE.MeshBasicMaterial({
        map: texFront,
        side: THREE.FrontSide,
        toneMapped: false,
      });
      const matBack = new THREE.MeshBasicMaterial({
        map: texBack,
        side: THREE.BackSide,
        toneMapped: false,
      });
      const matEdge = new THREE.MeshBasicMaterial({
        color: COIN_COLOR,
        side: THREE.DoubleSide,
      });

      const geo = new THREE.CylinderGeometry(radius, radius, thickness, segments, 1, false);
      const materials = [
        matBack,
        matFront,
        matEdge,
      ];
      const mesh = new THREE.Mesh(geo, materials);
      mesh.rotation.x = Math.PI / 2;
      return mesh;
    };

    loader.load(PHOTO_FRONT, (texFront) => {
      if (texFront.colorSpace !== undefined) texFront.colorSpace = THREE.SRGBColorSpace;
      loader.load(PHOTO_BACK, (texBack) => {
        if (texBack.colorSpace !== undefined) texBack.colorSpace = THREE.SRGBColorSpace;
        coin = createCoin(texFront, texBack);
        scene.add(coin);
      });
    });

    const startTime = Date.now();
    const flipDelay = 400;
    const flipDuration = 1300;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const elapsed = Date.now() - startTime;

      if (coin && elapsed > flipDelay) {
        const t = Math.min((elapsed - flipDelay) / flipDuration, 1);
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        coin.rotation.y = ease * Math.PI;
        const tilt = 0.22 * Math.sin(ease * Math.PI);
        coin.rotation.x = Math.PI / 2 + tilt;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="rounded-full overflow-hidden shadow-2xl border-4 border-[#6A9AB0]/40 bg-[#001F3F]"
      style={{ width: 320, height: 320 }}
      aria-hidden="true"
    />
  );
};

export default CoinPhoto;
