import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import GenerateCV from './GenerateCV';
import CoinPhoto from './CoinPhoto';
import { revealContainer, revealItem, reducedMotionVariant } from '../lib/motion';

const Header = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const proofChips = t('header.proofChips', { returnObjects: true });
  const nameParts = t('home.name').split(' ');
  const first = nameParts[0] || '';
  const second = nameParts[1] || '';
  const third = nameParts[2] || '';

  return (
    <header className="py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="glass-effect flex flex-col items-center gap-8 rounded-3xl border border-[#6A9AB0]/25 p-7 md:flex-row md:items-start md:gap-12 md:p-10"
          initial="hidden"
          animate="visible"
          variants={shouldReduceMotion ? reducedMotionVariant : revealContainer}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
        >
          <motion.div
            className="md:mb-0"
            variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
            aria-label={`${t('home.name')} - ${t('header.title')}`}
          >
            <CoinPhoto />
          </motion.div>

          <div className="w-full text-center md:text-left">
            <motion.p
              className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#9dc0d0]"
              variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
            >
              {t('home.greeting')}
            </motion.p>
            <motion.h1
              className="mb-4 text-4xl font-extrabold leading-[0.94] tracking-tight text-[#EAD8B1] md:text-6xl lg:text-7xl"
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
            >
              <div className="flex flex-col space-y-2">
                <span className="inline-block text-shadow-[0_0_18px_rgba(132,175,194,0.3)]">&gt;_{first}</span>
                <span className="inline-block pl-4 text-shadow-[0_0_16px_rgba(132,175,194,0.24)]">&gt;_{second}</span>
                <span className="inline-block pl-8 text-shadow-[0_0_14px_rgba(132,175,194,0.2)]">&gt;_{third}</span>
              </div>
            </motion.h1>
            <motion.p
              className="mb-3 max-w-2xl text-xl font-semibold leading-relaxed text-[#eff5ff] md:text-3xl"
              variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
            >
              {t('header.title')}
            </motion.p>
            <motion.p
              className="mb-6 max-w-2xl text-base leading-7 text-[#d2e2f0] md:text-lg"
              variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
            >
              {t('home.description')}
            </motion.p>

            <motion.div
              className="mb-7 flex flex-wrap justify-center gap-2.5 md:justify-start"
              variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
            >
              {proofChips.map((chip, index) => (
                <span key={`${chip}-${index}`} className="proof-chip">
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start"
              variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
            >
              <GenerateCV />
              <a href="#contact" className="btn-secondary w-full sm:w-auto">
                {t('header.contactCta')}
              </a>
            </motion.div>

            <motion.div
              className="flex justify-center space-x-3 md:justify-start"
              variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
              aria-label={t('accessibility.headerSocialLinks')}
            >
              <a
                href="https://www.linkedin.com/in/yoquelvis-jorge-abreu-5ba2a4234/"
                className="rounded-full border border-[#7ea6ba]/35 bg-[#112f4b]/60 p-2.5 text-2xl text-white transition-colors duration-300 hover:text-[#6A9AB0] focus-visible:ring-2 focus-visible:ring-[#EAD8B1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2744]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('accessibility.socialLinkedin')}
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/yoquelvisdev08"
                className="rounded-full border border-[#7ea6ba]/35 bg-[#112f4b]/60 p-2.5 text-2xl text-white transition-colors duration-300 hover:text-gray-300 focus-visible:ring-2 focus-visible:ring-[#EAD8B1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2744]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('accessibility.socialGithub')}
              >
                <FaGithub />
              </a>
              <a
                href="https://www.instagram.com/yoquelvis_08"
                className="rounded-full border border-[#7ea6ba]/35 bg-[#112f4b]/60 p-2.5 text-2xl text-white transition-colors duration-300 hover:text-blue-300 focus-visible:ring-2 focus-visible:ring-[#EAD8B1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2744]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('accessibility.socialInstagram')}
              >
                <FaInstagram />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
