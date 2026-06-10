import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { popIn, reducedMotionVariant } from '../lib/motion';

const WHATSAPP_URLS = {
  es: 'https://wa.link/rozl9z',
  en: 'https://wa.link/kc3y76',
};

function WhatsAppFloat() {
  const { i18n, t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const language = i18n.language?.startsWith('es') ? 'es' : 'en';
  const href = WHATSAPP_URLS[language];

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      initial="hidden"
      animate="visible"
      variants={shouldReduceMotion ? reducedMotionVariant : popIn}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
      aria-label={t('accessibility.whatsapp')}
      title={t('accessibility.whatsapp')}
    >
      <FaWhatsapp size={28} aria-hidden="true" />
    </motion.a>
  );
}

export default WhatsAppFloat;
