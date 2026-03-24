import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { buttonInteractions, interactionTransition, fadeIn, reducedMotionVariant, timings } from '../lib/motion';

const Footer = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: FaGithub, 
      href: "https://github.com/yoquelvisdev08",
      ariaLabel: t('accessibility.socialGithub')
    },
    { 
      icon: FaLinkedin, 
      href: "https://www.linkedin.com/in/yoquelvis-jorge-abreu-5ba2a4234/",
      ariaLabel: t('accessibility.socialLinkedin')
    },
    { 
      icon: FaEnvelope, 
      href: "mailto:yoquelvis18@gmail.com",
      ariaLabel: t('accessibility.socialEmail')
    }
  ];

  return (
    <footer className="mt-24 border-t border-[#6A9AB0]/25 bg-gradient-to-r from-[#061427] via-[#0d2b48] to-[#154167] py-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col items-center justify-between gap-4 md:flex-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={shouldReduceMotion ? reducedMotionVariant : fadeIn}
          transition={{ duration: shouldReduceMotion ? timings.instant : timings.quick }}
        >
          <div className="text-center text-sm text-[#EAD8B1] md:text-left">
            {t('footer.copyright', { year: currentYear })}
          </div>
          <div className="flex space-x-4" aria-label={t('accessibility.footerSocialLinks')}>
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                aria-label={link.ariaLabel}
                className="rounded-full border border-[#84afc2]/35 bg-[#12304d]/70 p-2 text-[#EAD8B1] transition-colors hover:text-[#6A9AB0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EAD8B1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2744]"
                target="_blank"
                rel="noopener noreferrer"
                {...(shouldReduceMotion ? {} : buttonInteractions)}
                transition={interactionTransition}
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 
