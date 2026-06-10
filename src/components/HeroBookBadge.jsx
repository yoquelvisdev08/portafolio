import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const INTRO_DURATION_MS = 2800;
const ICON_SIZE = 68;
const PANEL_PADDING_RIGHT = 22;

const panelEase = {
  duration: 0.42,
  ease: [0.33, 1, 0.68, 1],
};

function HeroBookBadge() {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const copyRef = useRef(null);
  const [copyWidth, setCopyWidth] = useState(0);
  const [expanded, setExpanded] = useState(!shouldReduceMotion);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024,
  );

  const measureCopy = () => {
    if (!copyRef.current) {
      return;
    }

    setCopyWidth(copyRef.current.scrollWidth);
  };

  useLayoutEffect(() => {
    measureCopy();
  }, [t, i18n.language]);

  useEffect(() => {
    if (!copyRef.current || typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const observer = new ResizeObserver(measureCopy);
    observer.observe(copyRef.current);

    return () => observer.disconnect();
  }, [t, i18n.language]);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setExpanded(false);
    }, INTRO_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [shouldReduceMotion]);

  const handleEnter = () => setExpanded(true);
  const handleLeave = () => setExpanded(false);
  const handleClick = () => setExpanded((prev) => !prev);

  const panelTransition = shouldReduceMotion ? { duration: 0 } : panelEase;
  const expandedPanelWidth = copyWidth + PANEL_PADDING_RIGHT;
  const expandedWidth = Math.min(
    ICON_SIZE + expandedPanelWidth,
    Math.max(ICON_SIZE, viewportWidth - 24),
  );
  const expandedPanelContentWidth = Math.max(ICON_SIZE, expandedWidth - ICON_SIZE);
  const isCompact = viewportWidth < 640;
  const badgeOffset = isCompact ? '-12%' : '-38%';

  return (
    <motion.aside
      className="absolute bottom-2 left-0 z-30 max-w-[calc(100vw-1.5rem)] cursor-pointer"
      style={{
        width: ICON_SIZE,
        height: ICON_SIZE,
        transform: `translateX(${badgeOffset})`,
      }}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.33, 1, 0.68, 1] }}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleClick();
        }
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`${t('header.heroBadgeValue')}. ${t('header.heroBadgeLabel')}`}
    >
      <motion.div
        className="hero-badge pointer-events-none absolute left-0 top-0 overflow-hidden shadow-lg"
        style={{ height: ICON_SIZE, transformOrigin: 'left center' }}
        initial={false}
        animate={{
          width: expanded ? expandedWidth : ICON_SIZE,
          borderRadius: expanded ? 18 : ICON_SIZE / 2,
        }}
        transition={panelTransition}
        aria-hidden={!expanded}
      >
        <div
          className="flex h-full items-center"
          style={{ width: expandedWidth, paddingRight: PANEL_PADDING_RIGHT }}
        >
          <div aria-hidden="true" style={{ width: ICON_SIZE, flexShrink: 0 }} />
          <div
            className={`pl-1 ${isCompact ? 'max-w-[calc(100vw-6rem)] whitespace-normal' : 'whitespace-nowrap'}`}
            style={{ width: expandedPanelContentWidth }}
          >
            <p className="font-mono text-sm font-semibold leading-snug text-on-surface sm:text-base">
              {t('header.heroBadgeValue')}
            </p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
              {t('header.heroBadgeLabel')}
            </p>
          </div>
        </div>
      </motion.div>

      <div
        className="hero-badge-icon pointer-events-none relative z-10 flex items-center justify-center rounded-full"
        style={{ width: ICON_SIZE, height: ICON_SIZE }}
      >
        <span className="material-symbols-outlined text-[32px]" aria-hidden="true">
          menu_book
        </span>
      </div>

      <div
        ref={copyRef}
        className="pointer-events-none invisible absolute left-0 top-0 -z-10 whitespace-nowrap"
        aria-hidden="true"
      >
        <p className="font-mono text-sm font-semibold leading-snug sm:text-base">
          {t('header.heroBadgeValue')}
        </p>
        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest">
          {t('header.heroBadgeLabel')}
        </p>
      </div>
    </motion.aside>
  );
}

export default HeroBookBadge;
