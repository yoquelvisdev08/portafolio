import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const PHASE_TIMING = {
  pulse: 650,
  switch: 1800,
  fly: 820,
};

const COMPILE_SNIPPETS = [
  'import { ThemeProvider } from "./context/ThemeContext";',
  'const tokens = loadDesignTokens("blue-dark");',
  'surface.apply({ background: tokens.bg, contrast: "aa" });',
  'bundle.graph.add("react", "vite", "tailwindcss");',
  'optimizer.run({ treeshake: true, minify: "esbuild" });',
  'compiler.emit("theme.css", { modules: 128, gzip: "4.2kb" });',
  'hydrate(document.documentElement, { "data-theme": "blue" });',
  'runtime.verifyAccessibility({ focusRing: true });',
  'pipeline.stage("render").push(hero, navbar, sections);',
  'cache.purge("light-theme-v1");',
  'deploy.publish({ target: "production", status: "building" });',
];

function measureToggleAnchor(anchorEl) {
  if (!anchorEl) {
    return null;
  }

  const button = anchorEl.querySelector('.theme-toggle-button') ?? anchorEl;
  const rect = button.getBoundingClientRect();

  if (rect.width <= 0 || rect.height <= 0) {
    return null;
  }

  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function measureElementCenter(element) {
  if (!element) {
    return null;
  }

  const rect = element.getBoundingClientRect();

  if (rect.width <= 0 || rect.height <= 0) {
    return null;
  }

  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function ThemeIntroOverlay() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const {
    introActive,
    introPhase,
    setIntroPhase,
    applyThemeVisual,
    finishIntro,
    skipIntro,
    themeToggleRef,
  } = useTheme();

  const toggleStageRef = useRef(null);
  const [bootLineIndex, setBootLineIndex] = useState(0);
  const [bootCharIndex, setBootCharIndex] = useState(0);
  const [compileLines, setCompileLines] = useState([]);
  const [flyFrom, setFlyFrom] = useState(null);
  const [flyTo, setFlyTo] = useState(null);
  const [showDarkIcon, setShowDarkIcon] = useState(false);
  const [wipeProgress, setWipeProgress] = useState(0);

  const bootLines = useMemo(
    () => [
      t('themeIntro.bootLine1'),
      t('themeIntro.bootLine2'),
      t('themeIntro.bootLine3'),
    ],
    [t],
  );

  const currentBootLine = bootLines[bootLineIndex] ?? '';
  const showToggle = introPhase === 'pulse' || introPhase === 'switch' || introPhase === 'fly';
  const isSwitching = introPhase === 'switch';
  const isFlying = introPhase === 'fly';
  const isCompleted = isFlying;
  const showBootContent = introPhase === 'boot' || introPhase === 'pulse';

  useEffect(() => {
    if (introActive && shouldReduceMotion) {
      skipIntro();
    }
  }, [introActive, shouldReduceMotion, skipIntro]);

  useEffect(() => {
    if (!introActive || introPhase !== 'boot' || shouldReduceMotion) {
      return undefined;
    }

    if (bootCharIndex < currentBootLine.length) {
      const timer = window.setTimeout(() => setBootCharIndex((value) => value + 1), 18);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      if (bootLineIndex < bootLines.length - 1) {
        setBootLineIndex((value) => value + 1);
        setBootCharIndex(0);
        return;
      }

      setIntroPhase('pulse');
    }, 420);

    return () => window.clearTimeout(timer);
  }, [
    bootCharIndex,
    bootLineIndex,
    bootLines.length,
    currentBootLine.length,
    introActive,
    introPhase,
    setIntroPhase,
    shouldReduceMotion,
  ]);

  useEffect(() => {
    if (!introActive || introPhase !== 'pulse' || shouldReduceMotion) {
      return undefined;
    }

    const timer = window.setTimeout(() => setIntroPhase('switch'), PHASE_TIMING.pulse);
    return () => window.clearTimeout(timer);
  }, [introActive, introPhase, setIntroPhase, shouldReduceMotion]);

  useEffect(() => {
    if (!introActive || introPhase !== 'switch' || shouldReduceMotion) {
      return undefined;
    }

    applyThemeVisual('blue');
    setShowDarkIcon(true);

    const wipeStart = window.setTimeout(() => {
      setWipeProgress(1);
    }, 120);

    let snippetIndex = 0;
    setCompileLines([COMPILE_SNIPPETS[0]]);

    const compileTimer = window.setInterval(() => {
      snippetIndex += 1;
      const nextLine = COMPILE_SNIPPETS[snippetIndex % COMPILE_SNIPPETS.length];
      setCompileLines((previous) => [...previous.slice(-10), nextLine]);
    }, 90);

    const flyTimer = window.setTimeout(() => {
      setIntroPhase('fly');
    }, PHASE_TIMING.switch);

    return () => {
      window.clearTimeout(wipeStart);
      window.clearTimeout(flyTimer);
      window.clearInterval(compileTimer);
    };
  }, [applyThemeVisual, introActive, introPhase, setIntroPhase, shouldReduceMotion]);

  useEffect(() => {
    if (!introActive || introPhase !== 'fly' || shouldReduceMotion) {
      return undefined;
    }

    const measureAndFly = () => {
      const from = measureElementCenter(toggleStageRef.current);
      const measured = measureToggleAnchor(themeToggleRef.current);
      const fallback = {
        x: window.innerWidth - Math.max(56, Math.min(72, window.innerWidth * 0.14)),
        y: Math.max(52, 36 + (window.visualViewport?.offsetTop ?? 0)),
      };

      setFlyFrom(from);
      setFlyTo(measured ?? fallback);
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(measureAndFly);
    });

    const finishTimer = window.setTimeout(() => {
      finishIntro();
    }, PHASE_TIMING.fly + 120);

    return () => {
      window.clearTimeout(finishTimer);
    };
  }, [finishIntro, introActive, introPhase, shouldReduceMotion, themeToggleRef]);

  if (!introActive || shouldReduceMotion) {
    return null;
  }

  const wipeRadius = 8 + wipeProgress * 165;

  return (
    <div className="theme-intro" aria-live="polite" aria-label={t('themeIntro.ariaLabel')}>
      <motion.div
        className="theme-intro__white-layer"
        style={{
          clipPath: `circle(${wipeRadius}% at 50% 46%)`,
        }}
        animate={{
          opacity: isFlying ? 0 : 1,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="theme-intro__grid" aria-hidden="true" />
      <div className="theme-intro__scanline" aria-hidden="true" />
      <div className="theme-intro__noise" aria-hidden="true" />

      <motion.div
        className="theme-intro__content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="theme-intro__stage">
          <motion.div
            className={`theme-intro__terminal-window${
              isCompleted ? ' theme-intro__terminal-window--completed' : ''
            }`}
            layout
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="theme-intro__terminal-chrome">
              <div className="terminal-dots mb-0" aria-hidden="true">
                <div className="terminal-dot dot-red" />
                <div className="terminal-dot dot-yellow" />
                <div className="terminal-dot dot-green" />
              </div>
              <p className="theme-intro__terminal-title">
                {isCompleted ? t('themeIntro.completedTitle') : t('themeIntro.terminalTitle')}
              </p>
            </div>

            <div className="theme-intro__terminal-body">
              {showBootContent && (
                <>
                  <p className="theme-intro__eyebrow">{t('themeIntro.eyebrow')}</p>
                  <div className="theme-intro__terminal">
                    {bootLines.slice(0, bootLineIndex + 1).map((line, index) => {
                      const text =
                        index === bootLineIndex ? line.slice(0, bootCharIndex) : line;

                      return (
                        <p key={`${index}-${line.slice(0, 12)}`} className="theme-intro__terminal-line">
                          <span className="theme-intro__prompt">&gt;</span>
                          {text}
                          {index === bootLineIndex && bootLineIndex < bootLines.length && (
                            <span className="theme-intro__cursor" />
                          )}
                        </p>
                      );
                    })}
                  </div>
                  <div className="theme-intro__progress" aria-hidden="true">
                    <motion.span
                      className="theme-intro__progress-bar"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX:
                          (bootLineIndex + bootCharIndex / Math.max(currentBootLine.length, 1)) /
                          bootLines.length,
                      }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    />
                  </div>
                </>
              )}

              {isSwitching && (
                <div className="theme-intro__compile" aria-hidden="true">
                  <p className="theme-intro__compile-label">{t('themeIntro.compiling')}</p>
                  <div className="theme-intro__compile-stream">
                    {compileLines.map((line, index) => (
                      <p key={`${line}-${index}`} className="theme-intro__compile-line">
                        <span className="theme-intro__prompt">&gt;</span>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {isCompleted && (
                <motion.div
                  className="theme-intro__completed"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="theme-intro__completed-line">
                    <span className="theme-intro__prompt">&gt;</span>
                    {t('themeIntro.completed')}
                    <span className="theme-intro__cursor" />
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {showToggle && (
            <div
              ref={toggleStageRef}
              className={`theme-intro__toggle-wrap${isFlying ? ' theme-intro__toggle-wrap--hidden' : ''}`}
            >
              <motion.button
                type="button"
                className="theme-intro__toggle-demo theme-toggle-button flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-outline bg-surface-container text-on-surface-variant"
                aria-hidden="true"
                tabIndex={-1}
                animate={{
                  boxShadow:
                    introPhase === 'switch'
                      ? [
                          '0 0 0 0 rgba(195, 244, 0, 0.45)',
                          '0 0 0 20px rgba(195, 244, 0, 0)',
                        ]
                      : '0 0 0 0 rgba(195, 244, 0, 0)',
                }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              >
                <motion.span
                  className="material-symbols-outlined text-[20px]"
                  key={showDarkIcon ? 'dark' : 'light'}
                  initial={{ rotate: -180, opacity: 0, scale: 0.4 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {showDarkIcon ? 'dark_mode' : 'light_mode'}
                </motion.span>
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isFlying && flyFrom && flyTo && (
          <motion.div
            className="theme-intro__toggle-floater"
            initial={{
              left: flyFrom.x,
              top: flyFrom.y,
            }}
            animate={{
              left: flyTo.x,
              top: flyTo.y,
            }}
            transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="theme-intro__toggle-demo theme-toggle-button flex h-10 w-10 items-center justify-center rounded-full border border-outline bg-surface-container text-on-surface-variant"
              aria-hidden="true"
              tabIndex={-1}
            >
              <span className="material-symbols-outlined text-[20px]">dark_mode</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button type="button" className="theme-intro__skip" onClick={skipIntro}>
        {t('themeIntro.skip')}
      </button>
    </div>
  );
}

export default ThemeIntroOverlay;
