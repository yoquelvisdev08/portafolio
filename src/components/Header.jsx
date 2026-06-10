import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import HeroPhoto from './HeroPhoto';
import { revealContainer, revealItem, reducedMotionVariant } from '../lib/motion';

const Header = () => {
  const { t } = useTranslation();
  const { isBlue } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const proofChips = t('header.proofChips', { returnObjects: true });
  const nameParts = t('home.name').split(' ');

  return (
    <header
      id="header"
      className={`relative flex items-center overflow-hidden ${
        isBlue ? 'pb-10 pt-28 sm:pt-32 md:pt-36' : 'pb-10 pt-20 sm:pt-24'
      }`}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(800px,150vw)] w-[min(800px,150vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-fixed/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="page-x relative z-10 mx-auto grid w-full max-w-container-max grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-8">
        <motion.div
          className="order-2 flex flex-col items-start gap-6 lg:order-1 lg:gap-8"
          initial="hidden"
          animate="visible"
          variants={shouldReduceMotion ? reducedMotionVariant : revealContainer}
        >
          <motion.div
            className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-primary-fixed/30 bg-primary-fixed/10 px-3 py-2 text-xs sm:px-4 sm:text-label-caps font-label-caps text-primary-fixed shadow-[0_0_15px_rgba(195,244,0,0.15)]"
            variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary-fixed" />
            {t('header.availability')}
          </motion.div>

          <motion.div variants={shouldReduceMotion ? reducedMotionVariant : revealItem}>
            <h1
              className={`font-display text-balance leading-[1.1] text-3xl sm:text-4xl md:text-5xl lg:text-display ${
                isBlue ? 'text-white' : 'text-on-surface'
              }`}
            >
              {isBlue ? (
                <>
                  <span className="mb-4 block font-code-sm text-code-sm uppercase tracking-widest text-primary-fixed opacity-80">
                    {t('home.greetingBlue')}
                  </span>
                  <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    {nameParts[0]}
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-white/90 to-white/50 bg-clip-text text-transparent">
                    {nameParts.slice(1).join(' ')}
                  </span>
                </>
              ) : (
                <>
                  <span className="mb-2 block font-code-sm text-code-sm text-primary opacity-90">
                    {t('home.greetingLight')}
                  </span>
                  {nameParts.map((part) => (
                    <span key={part} className="block">
                      &gt;_{part}
                    </span>
                  ))}
                </>
              )}
            </h1>
          </motion.div>

          {!isBlue && (
            <motion.h2
              className="font-headline-lg text-xl text-secondary opacity-90 sm:text-headline-lg"
              variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
            >
              {t('header.title')}
            </motion.h2>
          )}

          {isBlue && (
            <motion.div className="flex items-center gap-4" variants={shouldReduceMotion ? reducedMotionVariant : revealItem}>
              <div className="h-1 w-12 bg-primary-fixed" />
              <h2 className="font-headline-lg m-0 text-xl text-secondary opacity-90 sm:text-headline-lg">
                {t('header.title')}
              </h2>
            </motion.div>
          )}

          <motion.p
            className="max-w-xl font-body-lg text-body-lg text-on-surface-variant md:text-xl"
            variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
          >
            {t('home.description')}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-2.5"
            variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
          >
            {proofChips.map((chip, index) => (
              <span key={`${chip}-${index}`} className="proof-chip">
                {chip}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-2 flex flex-wrap gap-4"
            variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
          >
            <a
              href="#contact"
              className={`btn-primary font-bold ${isBlue ? 'rounded-full px-8 py-4 shadow-[0_0_20px_rgba(195,244,0,0.2)] hover:-translate-y-1' : ''}`}
            >
              {isBlue ? t('header.primaryCta') : t('header.contactCta')}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </motion.div>

          <motion.div
            className="flex gap-3"
            variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
            aria-label={t('accessibility.headerSocialLinks')}
          >
            {[
              { href: 'https://www.linkedin.com/in/yoquelvis-jorge-abreu-5ba2a4234/', icon: FaLinkedin, label: t('accessibility.socialLinkedin') },
              { href: 'https://github.com/yoquelvisdev08', icon: FaGithub, label: t('accessibility.socialGithub') },
              { href: 'https://www.instagram.com/yoquelvis_08', icon: FaInstagram, label: t('accessibility.socialInstagram') },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-outline bg-surface-container text-xl text-on-surface transition-colors hover:text-primary-fixed"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className={`order-1 flex w-full min-w-0 justify-center lg:order-2 lg:w-auto lg:justify-end ${
            isBlue ? 'lg:pt-[6.5rem]' : 'lg:pt-[5.5rem]'
          }`}
          variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
        >
          <HeroPhoto />
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
