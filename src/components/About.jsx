import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AboutDevCube from './AboutDevCube';
import SectionHeader from './SectionHeader';
import {
  listContainer,
  listItem,
  revealItem,
  reducedMotionVariant,
  sectionViewport,
} from '../lib/motion';

function About() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const motionViewport = { ...sectionViewport, amount: 0.18, margin: '0px 0px -6% 0px' };
  const paragraphs = t('about.paragraphs', { returnObjects: true });

  return (
    <section
      id="about"
      className="section-block scroll-mt-28"
      aria-label={t('about.title')}
    >
      <div className="mx-auto max-w-container-max">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
        >
          <SectionHeader title={t('about.title')} showDivider={false} />
        </motion.div>

        <motion.div
          className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-12"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={shouldReduceMotion ? reducedMotionVariant : listContainer}
        >
          <motion.article
            className="glass-card rounded-card p-5 sm:p-6 lg:col-span-7 lg:p-8"
            variants={shouldReduceMotion ? reducedMotionVariant : listItem}
          >
            <div className="space-y-5 font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
              {Array.isArray(paragraphs) &&
                paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
            </div>
          </motion.article>

          <AboutDevCube />
        </motion.div>
      </div>
    </section>
  );
}

export default About;
