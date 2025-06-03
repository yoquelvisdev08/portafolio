import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <motion.div 
      className="fixed left-6 bottom-6 z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }}
    >
      <div className="bg-[#3A6D8C] rounded-full shadow-2xl">
        <div className="flex space-x-2 p-2">
          <button 
            onClick={() => changeLanguage('en')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 
              ${i18n.language === 'en' ? 'bg-[#6A9AB0] text-white' : 'hover:bg-[#6A9AB0]/50'}`}
            title="English"
          >
            🇺🇸
          </button>
          <button 
            onClick={() => changeLanguage('es')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 
              ${i18n.language === 'es' ? 'bg-[#6A9AB0] text-white' : 'hover:bg-[#6A9AB0]/50'}`}
            title="Español"
          >
            🇪🇸
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageSelector; 