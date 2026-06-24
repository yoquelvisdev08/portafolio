import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectWindowCard from './ProjectWindowCard';
import SectionHeader from './SectionHeader';
import {
  reducedMotionVariant,
  listContainer,
  listItem,
  listViewport,
} from '../lib/motion';

function Projects() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const projects = t('projects.items', { returnObjects: true });

  return (
    <section
      id="projects"
      className="section-block scroll-mt-28"
      aria-label={t('projects.title')}
    >
      <div className="mx-auto max-w-container-max">
        <SectionHeader
          title={t('projects.title')}
          subtitle={t('projects.description')}
          showDivider={false}
          stacked
        />

        <motion.div
          className="project-window-grid grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
          role="list"
          variants={shouldReduceMotion ? reducedMotionVariant : listContainer}
          initial="hidden"
          whileInView="visible"
          viewport={listViewport}
        >
          {projects.map((project) => (
            <ProjectWindowCard
              key={project.title}
              project={project}
              shouldReduceMotion={shouldReduceMotion}
              motionProps={{
                variants: shouldReduceMotion ? reducedMotionVariant : listItem,
                role: 'listitem',
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
