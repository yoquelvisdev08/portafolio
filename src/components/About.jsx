import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AboutDevCube from './AboutDevCube';
import AboutTerminal from './AboutTerminal';
import SectionHeader from './SectionHeader';
import {
  listContainer,
  listItem,
  reducedMotionVariant,
  sectionViewport,
} from '../lib/motion';

function About() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const motionViewport = { ...sectionViewport, amount: 0.18, margin: '0px 0px -6% 0px' };

  return (
    <section
      id="about"
      className="section-block scroll-mt-28"
      aria-label={t('about.title')}
    >
      <div className="mx-auto w-full min-w-0 max-w-container-max">
        <motion.div
          className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={shouldReduceMotion ? reducedMotionVariant : listContainer}
        >
          <div className="lg:col-span-12">
            <SectionHeader title={t('about.title')} showDivider={false} compact />
          </div>

          <AboutTerminal
            motionProps={{
              variants: shouldReduceMotion ? reducedMotionVariant : listItem,
            }}
          />

          <AboutDevCube />
        </motion.div>
      </div>
    </section>
  );
}

export default About;
