import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds, buffer = 120) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (!element) continue;

        const top = element.offsetTop;
        const bottom = top + element.offsetHeight;

        if (scrollY >= top - buffer && scrollY < bottom - buffer) {
          setActiveSection(sectionId);
          return;
        }
      }

      if (scrollY < 200 && sectionIds.includes('header')) {
        setActiveSection('header');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, buffer]);

  const scrollToSection = (sectionId, offset = 100) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return { activeSection, scrollToSection };
}
