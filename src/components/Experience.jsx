import React from 'react';
import { FaBriefcase } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import {
  revealContainer,
  reducedMotionVariant,
  sectionViewport,
  listViewport,
  listContainer,
  listItem,
  cardInteractions,
} from '../lib/motion';

function Experience() {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="my-24" aria-label={t('experience.title')}>
      <h2 className="section-title">{t('experience.title')}</h2>
      <motion.div
        className="mt-7 space-y-7"
        variants={shouldReduceMotion ? reducedMotionVariant : revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
      >
        <motion.div
          key={i18n.language}
          role="list"
          variants={shouldReduceMotion ? reducedMotionVariant : listContainer}
          initial="hidden"
          whileInView="visible"
          viewport={listViewport}
          className="space-y-7"
        >
          {t('experience.jobs', { returnObjects: true }).map((exp, index) => (
            <motion.article
              key={`${i18n.language}-${index}`}
              variants={shouldReduceMotion ? reducedMotionVariant : listItem}
              className="card p-7"
              {...(shouldReduceMotion ? {} : cardInteractions)}
              role="listitem"
              itemScope
              itemType="https://schema.org/JobPosting"
            >
            <div className="mb-4 flex items-center">
              <FaBriefcase className="text-2xl text-[#6A9AB0] mr-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-[#EAD8B1]" itemProp="title">{exp.title}</h3>
            </div>
            <p className="mb-2 text-white/95" itemProp="hiringOrganization">{exp.company}</p>
            <p className="mb-4 text-sm uppercase tracking-wide text-white/75" itemProp="datePosted">{exp.period}</p>
            <p className="leading-7 text-white/95" itemProp="description">{exp.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Experience;
