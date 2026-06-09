import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { slideInRight, timings } from '../lib/motion';

const SectionIndicator = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const sections = useMemo(
    () => [
      { id: 'header', label: t('nav.home', 'Home') },
      { id: 'about', label: t('nav.about') },
      { id: 'experience', label: t('nav.experience') },
      { id: 'skills', label: t('nav.skills') },
      { id: 'projects', label: t('nav.projects') },
      { id: 'education', label: t('nav.education') },
      { id: 'contact', label: t('nav.contact') },
    ],
    [t],
  );

  const { activeSection, scrollToSection } = useScrollSpy(
    sections.map((section) => section.id),
    120,
  );

  return (
    <motion.nav
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-[65%] transform flex-col gap-5 lg:flex"
      initial="hidden"
      animate="visible"
      variants={slideInRight}
      transition={{ delay: shouldReduceMotion ? timings.instant : timings.base }}
      aria-label={t('navigation.sectionIndicator', 'Section navigation')}
    >
      {sections.map(({ id, label }) => (
        <motion.div key={id} className="group relative">
          <motion.button
            type="button"
            onClick={() => scrollToSection(id, 100)}
            className={`h-4 w-4 rounded-full border border-outline transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-fixed focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
              activeSection === id
                ? 'scale-125 bg-primary-fixed'
                : 'bg-surface-container hover:scale-110 hover:bg-primary-fixed/60'
            }`}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.3 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            aria-label={t('accessibility.goToSection', { section: label })}
            aria-current={activeSection === id ? 'location' : undefined}
          />
          <span className="absolute left-0 top-1/2 -translate-x-[calc(100%+1rem)] -translate-y-1/2 whitespace-nowrap text-sm text-on-surface-variant opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {label}
          </span>
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default SectionIndicator;
