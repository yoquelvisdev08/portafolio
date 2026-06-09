import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaNodeJs,
  FaPython,
  FaReact,
} from 'react-icons/fa';
import { listItem, reducedMotionVariant } from '../lib/motion';

const CUBE_FACES = [
  { id: 'react', Icon: FaReact, tone: 'face-react', labelKey: 'about.cube.faces.react' },
  { id: 'node', Icon: FaNodeJs, tone: 'face-node', labelKey: 'about.cube.faces.node' },
  { id: 'sql', Icon: FaDatabase, tone: 'face-sql', labelKey: 'about.cube.faces.sql' },
  { id: 'python', Icon: FaPython, tone: 'face-python', labelKey: 'about.cube.faces.python' },
  { id: 'git', Icon: FaGitAlt, tone: 'face-git', labelKey: 'about.cube.faces.git' },
  { id: 'docker', Icon: FaDocker, tone: 'face-docker', labelKey: 'about.cube.faces.docker' },
];

const FACE_POSITIONS = [
  'dev-cube-face--front',
  'dev-cube-face--back',
  'dev-cube-face--right',
  'dev-cube-face--left',
  'dev-cube-face--top',
  'dev-cube-face--bottom',
];

const INITIAL_ROTATION = { x: -18, y: 28 };
const AUTO_SPIN_SPEED = 22;
const DRAG_SENSITIVITY = 0.45;
const PARALLAX_STRENGTH = { x: 18, y: 22 };
const DAMPING = 0.94;

function normalizeAngle(angle) {
  return ((angle % 360) + 360) % 360;
}

function getActiveFaceId(rotX, rotY) {
  const normals = [
    { id: 'react', vector: [0, 0, 1] },
    { id: 'python', vector: [0, 0, -1] },
    { id: 'node', vector: [1, 0, 0] },
    { id: 'git', vector: [-1, 0, 0] },
    { id: 'sql', vector: [0, 1, 0] },
    { id: 'docker', vector: [0, -1, 0] },
  ];

  const xRad = (rotX * Math.PI) / 180;
  const yRad = (rotY * Math.PI) / 180;
  const cosX = Math.cos(xRad);
  const sinX = Math.sin(xRad);
  const cosY = Math.cos(yRad);
  const sinY = Math.sin(yRad);

  let bestId = 'react';
  let bestDepth = -Infinity;

  normals.forEach(({ id, vector: [vx, vy, vz] }) => {
    const rotatedY = vy * cosX - vz * sinX;
    const rotatedZ = vy * sinX + vz * cosX;
    const worldX = vx * cosY + rotatedZ * sinY;
    const worldZ = -vx * sinY + rotatedZ * cosY;
    const depth = -worldZ;

    if (depth > bestDepth) {
      bestDepth = depth;
      bestId = id;
    }
  });

  return bestId;
}

function AboutDevCube() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const sceneRef = useRef(null);
  const cubeRef = useRef(null);
  const frameRef = useRef(null);
  const stateRef = useRef({
    x: INITIAL_ROTATION.x,
    y: INITIAL_ROTATION.y,
    pointerX: 0,
    pointerY: 0,
    velocityX: 0,
    velocityY: 0,
    isDragging: false,
    lastClientX: 0,
    lastClientY: 0,
    lastActiveFace: 'react',
  });
  const [activeFace, setActiveFace] = useState('react');

  useEffect(() => {
    const applyTransform = () => {
      const state = stateRef.current;
      const parallaxMultiplier = state.isDragging ? 0 : 1;
      const renderX = state.x + state.pointerY * PARALLAX_STRENGTH.x * parallaxMultiplier;
      const renderY = state.y + state.pointerX * PARALLAX_STRENGTH.y * parallaxMultiplier;

      if (cubeRef.current) {
        cubeRef.current.style.transform = `rotateX(${renderX}deg) rotateY(${renderY}deg)`;
      }

      const nextFace = getActiveFaceId(renderX, normalizeAngle(renderY));
      if (nextFace !== state.lastActiveFace) {
        state.lastActiveFace = nextFace;
        setActiveFace(nextFace);
      }
    };

    let lastTime = performance.now();

    const animate = (now) => {
      const delta = Math.min((now - lastTime) / 1000, 0.032);
      lastTime = now;
      const state = stateRef.current;

      if (!state.isDragging && !shouldReduceMotion) {
        state.y += AUTO_SPIN_SPEED * delta;
        state.x += state.velocityX * delta;
        state.y += state.velocityY * delta;
        state.velocityX *= DAMPING;
        state.velocityY *= DAMPING;

        if (Math.abs(state.velocityX) < 0.05) state.velocityX = 0;
        if (Math.abs(state.velocityY) < 0.05) state.velocityY = 0;
      }

      state.pointerX += (0 - state.pointerX) * 0.1;
      state.pointerY += (0 - state.pointerY) * 0.1;

      applyTransform();
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [shouldReduceMotion]);

  const handlePointerDown = (event) => {
    if (shouldReduceMotion) {
      return;
    }

    const state = stateRef.current;
    state.isDragging = true;
    state.lastClientX = event.clientX;
    state.lastClientY = event.clientY;
    state.velocityX = 0;
    state.velocityY = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add('dev-cube-scene--dragging');
  };

  const handlePointerMove = (event) => {
    const state = stateRef.current;

    if (sceneRef.current) {
      const rect = sceneRef.current.getBoundingClientRect();
      state.pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      state.pointerY = (event.clientY - rect.top) / rect.height - 0.5;
    }

    if (!state.isDragging || shouldReduceMotion) {
      return;
    }

    const deltaX = event.clientX - state.lastClientX;
    const deltaY = event.clientY - state.lastClientY;

    state.y += deltaX * DRAG_SENSITIVITY;
    state.x -= deltaY * DRAG_SENSITIVITY;
    state.velocityY = deltaX * DRAG_SENSITIVITY * 16;
    state.velocityX = -deltaY * DRAG_SENSITIVITY * 16;
    state.lastClientX = event.clientX;
    state.lastClientY = event.clientY;
  };

  const endDrag = (event) => {
    const state = stateRef.current;
    state.isDragging = false;
    event.currentTarget.classList.remove('dev-cube-scene--dragging');

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <motion.div
      className="dev-cube-panel lg:col-span-5"
      variants={shouldReduceMotion ? reducedMotionVariant : listItem}
      aria-label={t('about.cube.ariaLabel')}
    >
      <div className="dev-cube-panel__glow" aria-hidden="true" />

      <div
        ref={sceneRef}
        className="dev-cube-scene"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={(event) => {
          stateRef.current.pointerX = 0;
          stateRef.current.pointerY = 0;
          if (stateRef.current.isDragging) {
            endDrag(event);
          }
        }}
        role="presentation"
      >
        <div className="dev-cube-orbit dev-cube-orbit--outer" aria-hidden="true" />
        <div className="dev-cube-orbit dev-cube-orbit--inner" aria-hidden="true" />

        <div ref={cubeRef} className="dev-cube">
          {CUBE_FACES.map((face, index) => (
            <div
              key={face.id}
              className={`dev-cube-face ${FACE_POSITIONS[index]} ${face.tone} ${
                activeFace === face.id ? 'dev-cube-face--active' : ''
              }`}
              aria-hidden="true"
            >
              <face.Icon className="dev-cube-face__icon" />
              <span className="dev-cube-face__label">{t(face.labelKey)}</span>
            </div>
          ))}
        </div>

        <div className="dev-cube-shadow" aria-hidden="true" />
      </div>

      <div className="dev-cube-panel__meta">
        <p className="dev-cube-panel__title">{t('about.cube.title')}</p>
        <p className="dev-cube-panel__hint">{t('about.cube.hint')}</p>
        <p className="dev-cube-panel__active">
          <span className="dev-cube-panel__active-dot" aria-hidden="true" />
          {t(`about.cube.faces.${activeFace}`)}
        </p>
      </div>
    </motion.div>
  );
}

export default AboutDevCube;
