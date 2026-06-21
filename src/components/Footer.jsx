import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import SiteBrand from './SiteBrand';
import { buttonInteractions, interactionTransition, fadeIn, reducedMotionVariant, timings } from '../lib/motion';

const Footer = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaGithub,
      href: 'https://github.com/yoquelvisdev08',
      label: t('accessibility.socialGithub'),
      name: 'GitHub',
    },
    {
      icon: FaLinkedin,
      href: 'https://www.linkedin.com/in/yoquelvis-jorge-abreu-5ba2a4234/',
      label: t('accessibility.socialLinkedin'),
      name: 'LinkedIn',
    },
    {
      icon: FaEnvelope,
      href: 'mailto:yoquelvis18@gmail.com',
      label: t('accessibility.socialEmail'),
      name: 'Email',
    },
  ];

  return (
    <footer className="relative z-10 w-full border-t border-outline-variant bg-surface-container-low/80 py-12 backdrop-blur-md">
      <motion.div
        className="page-x mx-auto flex max-w-container-max flex-col items-center justify-between gap-6 md:flex-row"
        initial="hidden"
        animate="visible"
        variants={shouldReduceMotion ? reducedMotionVariant : fadeIn}
        transition={{ duration: shouldReduceMotion ? timings.instant : timings.quick }}
      >
        <a
          href="#header"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          aria-label={t('nav.brandAria')}
        >
          <span className="material-symbols-outlined text-[18px] text-primary-fixed">code</span>
          <SiteBrand size="footer" />
        </a>

        <p className="text-center text-sm text-on-surface-variant md:text-left">
          {t('footer.copyright', { year: currentYear })}
        </p>

        <div className="flex gap-6 font-mono text-xs font-bold uppercase tracking-widest" aria-label={t('accessibility.footerSocialLinks')}>
          {socialLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className="flex items-center gap-2 text-on-surface-variant transition-colors hover:text-primary-fixed"
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              {...(shouldReduceMotion ? {} : buttonInteractions)}
              transition={interactionTransition}
            >
              <link.icon size={16} aria-hidden="true" />
              <span className="hidden sm:inline">{link.name}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
