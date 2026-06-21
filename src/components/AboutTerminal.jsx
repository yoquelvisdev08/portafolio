import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function AboutTerminal({ motionProps = {} }) {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const paragraphs = t('about.paragraphs', { returnObjects: true });

  const terminalLines = useMemo(() => {
    if (!Array.isArray(paragraphs)) {
      return [];
    }

    return [
      t('about.terminalCommand'),
      ...paragraphs.map((paragraph) => `> ${paragraph}`),
    ];
  }, [paragraphs, i18n.language, t]);

  const lineMotion = (index) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: {
            duration: 0.35,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          },
        };

  return (
    <motion.article
      className="about-terminal w-full min-w-0 overflow-hidden rounded-card border border-outline bg-surface-container-low lg:col-span-7"
      {...motionProps}
    >
      <div className="flex items-center justify-between border-b border-outline bg-surface-container px-4 py-3">
        <div className="terminal-dots mb-0" aria-hidden="true">
          <div className="terminal-dot dot-red" />
          <div className="terminal-dot dot-yellow" />
          <div className="terminal-dot dot-green" />
        </div>
        <p className="truncate font-mono text-[11px] text-on-surface-variant sm:text-xs">{t('about.terminalTitle')}</p>
      </div>

      <div className="about-terminal__body space-y-2 p-4 font-mono text-[13px] leading-relaxed text-on-surface sm:p-6 sm:text-[15px]">
        {terminalLines.map((line, index) => {
          const isCommand = index === 0;

          return (
            <motion.p
              key={`${i18n.language}-${index}-${line.slice(0, 24)}`}
              {...lineMotion(index)}
              className={
                isCommand
                  ? 'about-terminal__command text-primary-fixed'
                  : 'whitespace-pre-wrap text-on-surface-variant'
              }
            >
              {line}
            </motion.p>
          );
        })}

        <motion.p
          {...lineMotion(terminalLines.length)}
          className="text-primary-fixed"
        >
          {t('about.terminalPrompt')}
          <span className="about-terminal__cursor ml-0.5 inline-block h-[1.1em] w-2 bg-primary-fixed align-[-2px]" />
        </motion.p>
      </div>
    </motion.article>
  );
}

export default AboutTerminal;
