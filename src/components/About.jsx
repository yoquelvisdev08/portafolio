import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { revealContainer, revealItem, reducedMotionVariant, sectionViewport } from '../lib/motion';

function About() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={shouldReduceMotion ? reducedMotionVariant : revealContainer}
      aria-label={t('about.title')}
      className="my-24"
    >
      <motion.div variants={shouldReduceMotion ? reducedMotionVariant : revealItem}>
        <h2 className="section-title">{t('about.title')}</h2>
        <article className="card mt-6 space-y-5">
          {t('about.paragraphs', { returnObjects: true }).map((paragraph, index) => (
            <p key={index} className="text-base leading-8 text-slate-100 md:text-lg">
              {paragraph}
            </p>
          ))}
        </article>
      </motion.div>
    </motion.section>
  );
}

export default About;
