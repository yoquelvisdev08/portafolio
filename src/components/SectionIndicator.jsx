import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

const SectionIndicator = () => {
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();

  const sections = [
    { id: 'header', label: 'Header' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const pageTop = window.scrollY;
      const pageBottom = pageTop + window.innerHeight;
      const buffer = 100; // Ajuste para mejorar la detección

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
    handleScroll(); // Llamada inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Ajuste para el scroll
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div 
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      {sections.map(({ id, label }) => (
        <motion.div
          key={id}
          className="relative group"
        >
          <motion.button
            onClick={() => handleClick(id)}
            className={`w-5 h-5 rounded-full cursor-pointer transition-all duration-300 ${
              activeSection === id
                ? 'bg-[#EAD8B1] scale-150'
                : 'bg-[#EAD8B1]/50 hover:bg-[#EAD8B1] hover:scale-125'
            }`}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          />
          <span className="absolute left-0 transform -translate-x-[calc(100%+1rem)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#EAD8B1] whitespace-nowrap text-sm">
            {label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SectionIndicator;
