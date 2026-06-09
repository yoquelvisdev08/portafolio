import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { popIn, reducedMotionVariant } from '../lib/motion';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const buttonClass = (active) =>
    `flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
      active
        ? 'bg-primary-fixed text-on-primary'
        : 'text-on-surface-variant hover:bg-surface-container-high'
    }`;

  return (
    <motion.div
      className="fixed bottom-5 left-5 z-50"
      initial="hidden"
      animate="visible"
      variants={shouldReduceMotion ? reducedMotionVariant : popIn}
      aria-label={t('accessibility.languageSelector')}
    >
      <div className="glass-card rounded-full p-2 shadow-2xl">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => changeLanguage('en')}
            className={buttonClass(i18n.language === 'en')}
            title={t('accessibility.switchToEnglish')}
            aria-label={t('accessibility.switchToEnglish')}
            aria-pressed={i18n.language === 'en'}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => changeLanguage('es')}
            className={buttonClass(i18n.language === 'es')}
            title={t('accessibility.switchToSpanish')}
            aria-label={t('accessibility.switchToSpanish')}
            aria-pressed={i18n.language === 'es'}
          >
            ES
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageSelector;
