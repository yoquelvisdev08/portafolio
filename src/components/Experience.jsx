import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import {
  revealContainer,
  reducedMotionVariant,
  sectionViewport,
  listContainer,
  listItem,
} from '../lib/motion';

function Experience() {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const jobs = t('experience.jobs', { returnObjects: true });

  return (
    <motion.section
      id="experience"
      className="section-block scroll-mt-28"
      aria-label={t('experience.title')}
      variants={shouldReduceMotion ? reducedMotionVariant : revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
    >
      <div className="mx-auto max-w-container-max">
        <SectionHeader title={t('experience.title')} showDivider={false} stacked />

        <motion.div
          key={i18n.language}
          className="relative space-y-8"
          variants={shouldReduceMotion ? reducedMotionVariant : listContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <div
            className="absolute bottom-11 left-3 top-11 w-px -translate-x-1/2 bg-outline"
            aria-hidden="true"
          />

          {jobs.map((job, index) => (
            <motion.article
              key={`${i18n.language}-${index}`}
              className="relative flex items-start gap-6 md:gap-8"
              variants={shouldReduceMotion ? reducedMotionVariant : listItem}
              role="listitem"
              itemScope
              itemType="https://schema.org/JobPosting"
            >
              <div
                className={`relative z-10 mt-8 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface ${
                  index === 0 ? 'timeline-dot-active' : 'timeline-dot'
                }`}
                aria-hidden="true"
              >
                {index === 0 && <div className="h-2 w-2 rounded-full bg-primary-fixed" />}
              </div>

              <div
                className={`glass-card min-w-0 flex-1 rounded-card p-5 sm:p-6 lg:p-8 ${
                  index === 0 ? '' : 'opacity-80 transition-opacity hover:opacity-100'
                }`}
              >
                <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-on-surface" itemProp="title">
                      {job.title}
                    </h3>
                    <p className="mt-1 font-mono text-sm text-primary-fixed" itemProp="hiringOrganization">
                      {job.company}
                    </p>
                  </div>
                  <span className="self-start rounded bg-surface-container px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-on-surface-variant" itemProp="datePosted">
                    {job.period}
                  </span>
                </div>
                <p className="text-on-surface-variant" itemProp="description">
                  {job.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Experience;
