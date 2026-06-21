import React, { useCallback, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { heroPhotos } from '../data/portfolioData';
import HeroBookBadge from './HeroBookBadge';

const TILT_STRENGTH = { x: 16, y: 20 };
const BASE_ROTATION = { x: -6, y: 10 };

function HeroPhoto() {
  const { t } = useTranslation();
  const { isBlue } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const sceneRef = useRef(null);
  const stageRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);
  const photoSrc = isBlue ? heroPhotos.dark : heroPhotos.light;

  const applyStageTransform = useCallback(() => {
    if (!stageRef.current) {
      return;
    }

    const pointer = pointerRef.current;
    const rotateX = BASE_ROTATION.x + pointer.y * TILT_STRENGTH.x;
    const rotateY = BASE_ROTATION.y + pointer.x * TILT_STRENGTH.y;

    stageRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    const animate = () => {
      const state = pointerRef.current;
      state.x += (0 - state.x) * 0.08;
      state.y += (0 - state.y) * 0.08;
      applyStageTransform();
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [applyStageTransform, shouldReduceMotion]);

  const handlePointerMove = (event) => {
    if (!sceneRef.current || shouldReduceMotion) {
      return;
    }

    const rect = sceneRef.current.getBoundingClientRect();
    pointerRef.current = {
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    };
    applyStageTransform();
  };

  const handlePointerLeave = () => {
    pointerRef.current = { x: 0, y: 0 };
    if (!shouldReduceMotion) {
      applyStageTransform();
    }
  };

  return (
    <div className="hero-photo-3d relative mx-auto aspect-square w-full max-w-[min(100%,18rem)] sm:max-w-[20rem] md:h-[450px] md:w-[450px] md:max-w-none">
      <div className="hero-photo-3d__ambient" aria-hidden="true" />
      <div className="hero-photo-3d__ambient hero-photo-3d__ambient--secondary" aria-hidden="true" />

      <div
        ref={sceneRef}
        className="hero-photo-3d__scene"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        role="presentation"
      >
        <div
          ref={stageRef}
          className="hero-photo-3d__stage"
          style={{
            transform: `rotateX(${BASE_ROTATION.x}deg) rotateY(${BASE_ROTATION.y}deg)`,
          }}
        >
          <div className="hero-photo-3d__plate hero-photo-3d__plate--back" aria-hidden="true" />
          <div className="hero-photo-3d__plate hero-photo-3d__plate--mid" aria-hidden="true" />

          <div className="hero-photo-3d__frame group">
            <div className="hero-photo-3d__shine" aria-hidden="true" />
            <img
              src={photoSrc}
              alt={t('home.name')}
              className={`hero-photo-3d__img ${isBlue ? '' : 'hero-photo-img grayscale hover:grayscale-0'}`}
              loading="eager"
              draggable="false"
            />
          </div>
        </div>

        <div className="hero-photo-3d__shadow" aria-hidden="true" />
      </div>

      <HeroBookBadge />
    </div>
  );
}

export default HeroPhoto;
