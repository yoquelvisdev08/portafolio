import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { slideInRight, timings } from '../lib/motion';

const SectionIndicator = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('');
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

  useEffect(() => {
    const handleScroll = () => {
      const pageTop = window.scrollY;
      const buffer = 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;

          if (pageTop >= elementTop - buffer && pageTop < elementBottom - buffer) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      });
    }
  };

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
        <motion.div
          key={id}
          className="relative group"
        >
          <motion.button
            onClick={() => handleClick(id)}
            className={`h-4 w-4 rounded-full border border-[#EAD8B1]/50 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#EAD8B1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2744] ${
              activeSection === id
                ? 'scale-125 bg-[#EAD8B1]'
                : 'bg-[#EAD8B1]/45 hover:scale-110 hover:bg-[#EAD8B1]'
            }`}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.3 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            aria-label={t('accessibility.goToSection', { section: label })}
            aria-current={activeSection === id ? 'location' : undefined}
          />
          <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(100%+1rem)] whitespace-nowrap text-sm text-[#EAD8B1] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {label}
          </span>
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default SectionIndicator;
