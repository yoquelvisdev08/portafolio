import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { useTypewriter } from '../hooks/useTypewriter';

function AboutTerminal({ motionProps = {} }) {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const paragraphs = t('about.paragraphs', { returnObjects: true });

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const terminalLines = useMemo(() => {
    if (!Array.isArray(paragraphs)) {
      return [];
    }

    return [
      t('about.terminalCommand'),
      '',
      ...paragraphs.map((paragraph) => `> ${paragraph}`),
    ];
  }, [paragraphs, t, i18n.language]);

  const { visibleLines, isComplete, isTyping } = useTypewriter(terminalLines, {
    enabled: inView && !shouldReduceMotion,
    speed: 14,
    linePause: 360,
    startDelay: 300,
  });

  return (
    <motion.article
      ref={ref}
      className="about-terminal overflow-hidden rounded-card border border-outline bg-surface-container-low lg:col-span-7"
      {...motionProps}
    >
      <div className="flex items-center justify-between border-b border-outline bg-surface-container px-4 py-3">
        <div className="terminal-dots mb-0" aria-hidden="true">
          <div className="terminal-dot dot-red" />
          <div className="terminal-dot dot-yellow" />
          <div className="terminal-dot dot-green" />
        </div>
        <p className="font-mono text-xs text-on-surface-variant">{t('about.terminalTitle')}</p>
      </div>

      <div
        className="about-terminal__body space-y-4 p-5 font-mono text-sm leading-relaxed text-on-surface-variant sm:p-6 sm:text-[15px]"
        aria-live="polite"
      >
        {terminalLines.map((line, index) => {
          if (!shouldReduceMotion && index >= visibleLines.length && !isComplete) {
            return null;
          }

          const content = shouldReduceMotion ? line : (visibleLines[index] ?? '');

          if (line === '' && content === '') {
            return <div key={`spacer-${index}`} className="h-2" aria-hidden="true" />;
          }

          const isCommand = index === 0;
          const isActiveLine = !shouldReduceMotion && isTyping && index === visibleLines.length - 1;

          return (
            <p
              key={`${i18n.language}-${index}-${line.slice(0, 24)}`}
              className={isCommand ? 'text-primary-fixed' : 'whitespace-pre-wrap'}
            >
              {content}
              {isActiveLine && (
                <span className="about-terminal__cursor ml-0.5 inline-block h-[1.1em] w-2 bg-primary-fixed align-[-2px]" />
              )}
            </p>
          );
        })}

        {!shouldReduceMotion && isComplete && (
          <p className="text-primary-fixed">
            {t('about.terminalPrompt')}
            <span className="about-terminal__cursor ml-0.5 inline-block h-[1.1em] w-2 bg-primary-fixed align-[-2px]" />
          </p>
        )}
      </div>
    </motion.article>
  );
}

export default AboutTerminal;
