import { motion, useScroll, useAnimation, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { slideInRight } from '../lib/motion';

const ScrollToTop = () => {
  const { scrollY } = useScroll();
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 200) {
        controls.start('visible');
      } else {
        controls.start('hidden');
      }
    });
  }, [scrollY, controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <motion.button
      className="fixed bottom-5 right-20 z-50 rounded-full border border-[#84afc2]/40 bg-[#143a5f] p-3 text-[#EAD8B1] shadow-lg backdrop-blur focus-visible:ring-2 focus-visible:ring-[#EAD8B1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2744]"
      initial="hidden"
      variants={slideInRight}
      animate={controls}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
      onClick={scrollToTop}
      aria-label={t('accessibility.scrollToTop')}
      title={t('accessibility.scrollToTop')}
      type="button"
    >
      <FaArrowUp size={20} />
    </motion.button>
  );
};

export default ScrollToTop;
