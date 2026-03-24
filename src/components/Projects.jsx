import React from 'react';
import { FaExternalLinkAlt, FaGithub, FaBarcode, FaUserCircle, FaTheaterMasks, FaCalendarAlt } from 'react-icons/fa';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  revealContainer,
  revealItem,
  reducedMotionVariant,
  listContainer,
  listItem,
  sectionViewport,
  listViewport,
  cardInteractions,
  buttonInteractions,
  interactionTransition,
} from '../lib/motion';

function Projects() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const projects = t('projects.items', { returnObjects: true });

  // Mapeo de iconos por tipo
  const iconMap = {
    barcode: <FaBarcode className="text-4xl text-[#EAD8B1]" />,
    avatar: <FaUserCircle className="text-4xl text-[#EAD8B1]" />,
    jokes: <FaTheaterMasks className="text-4xl text-[#EAD8B1]" />,
    schedule: <FaCalendarAlt className="text-4xl text-[#EAD8B1]" />
  };

  return (
    <motion.section
      className="my-24"
      aria-label={t('projects.title')}
      variants={shouldReduceMotion ? reducedMotionVariant : revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
    >
      <motion.h2 
        className="section-title"
        variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
      >
        {t('projects.title')}
      </motion.h2>
      <motion.p
        className="mb-10 mt-5 max-w-3xl text-center text-lg leading-8 text-slate-200"
        variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
      >
        {t('projects.description')}
      </motion.p>
      <motion.div
        className="grid grid-cols-1 gap-7 md:grid-cols-2"
        role="list"
        variants={shouldReduceMotion ? reducedMotionVariant : listContainer}
        initial="hidden"
        whileInView="visible"
        viewport={listViewport}
      >
        {projects.map((project, index) => (
          <motion.article 
            key={index} 
            className="card flex h-full flex-col"
            variants={shouldReduceMotion ? reducedMotionVariant : listItem}
            {...(shouldReduceMotion ? {} : cardInteractions)}
            role="listitem"
            itemScope
            itemType="https://schema.org/SoftwareApplication"
          >
            <div className="mb-5 flex items-center gap-3" aria-hidden="true">
              <span className="rounded-xl border border-[#7ea6ba]/35 bg-[#0f304d]/80 p-3">
                {iconMap[project.icon] || <span className="text-3xl">🚀</span>}
              </span>
              <h3 className="text-xl font-semibold text-[#EAD8B1]" itemProp="name">{project.title}</h3>
            </div>
            <p className="mb-5 flex-grow text-base leading-7 text-slate-100/95" itemProp="description">{project.description}</p>
            
            {project.technologies && (
              <div className="mb-5 flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i} 
                    className="soft-chip"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto flex flex-wrap gap-3">
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  aria-label={`${t('projects.viewProject')} ${project.title}`}
                  {...(shouldReduceMotion ? {} : buttonInteractions)}
                  transition={interactionTransition}
                >
                  {t('projects.viewProject')} <FaExternalLinkAlt className="ml-2" />
                </motion.a>
              )}
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  aria-label={`GitHub ${project.title}`}
                  {...(shouldReduceMotion ? {} : buttonInteractions)}
                  transition={interactionTransition}
                >
                  <FaGithub className="mr-2" /> GitHub
                </motion.a>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default Projects;
