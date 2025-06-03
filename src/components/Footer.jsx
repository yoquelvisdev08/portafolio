import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: FaGithub, 
      href: "https://github.com/yoquelvisdev08",
      ariaLabel: "GitHub Profile"
    },
    { 
      icon: FaLinkedin, 
      href: "https://www.linkedin.com/in/yoquelvis-jorge-abreu-5ba2a4234/",
      ariaLabel: "LinkedIn Profile"
    },
    { 
      icon: FaEnvelope, 
      href: "mailto:yoquelvis18@gmail.com",
      ariaLabel: "Email"
    }
  ];

  return (
    <footer className="mt-16 py-8 bg-gradient-to-r from-[#001F3F] via-[#3A6D8C] to-[#6A9AB0]">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-[#EAD8B1] mb-4 md:mb-0 text-center md:text-left">
            {t('footer.copyright', { year: currentYear })}
          </div>
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                aria-label={link.ariaLabel}
                className="text-[#EAD8B1] hover:text-[#6A9AB0] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <link.icon size={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 