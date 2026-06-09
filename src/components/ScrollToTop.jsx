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
      className="fixed bottom-6 right-6 z-50 rounded-full border border-outline bg-surface-container p-3 text-primary-fixed shadow-lg backdrop-blur-md transition-colors hover:border-primary-fixed hover:bg-primary-fixed/10 focus-visible:ring-2 focus-visible:ring-primary-fixed focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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
      <FaArrowUp size={18} aria-hidden="true" />
    </motion.button>
  );
};

export default ScrollToTop;
