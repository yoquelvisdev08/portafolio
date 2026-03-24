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

  return (
    <motion.div 
      className="fixed bottom-5 left-5 z-50"
      initial="hidden"
      animate="visible"
      variants={shouldReduceMotion ? reducedMotionVariant : popIn}
      aria-label={t('accessibility.languageSelector')}
    >
      <div className="rounded-full border border-[#84afc2]/35 bg-[#173959]/95 p-2 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => changeLanguage('en')}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EAD8B1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2744]
              ${i18n.language === 'en' ? 'bg-[#6A9AB0] text-white' : 'hover:bg-[#6A9AB0]/50'}`}
            title={t('accessibility.switchToEnglish')}
            aria-label={t('accessibility.switchToEnglish')}
            aria-pressed={i18n.language === 'en'}
          >
            🇺🇸
          </button>
          <button 
            onClick={() => changeLanguage('es')}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EAD8B1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2744]
              ${i18n.language === 'es' ? 'bg-[#6A9AB0] text-white' : 'hover:bg-[#6A9AB0]/50'}`}
            title={t('accessibility.switchToSpanish')}
            aria-label={t('accessibility.switchToSpanish')}
            aria-pressed={i18n.language === 'es'}
          >
            🇩🇴
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageSelector; 
