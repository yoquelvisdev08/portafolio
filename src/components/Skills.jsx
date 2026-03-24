import React from 'react';
import { FaReact, FaJs, FaNode, FaGit, FaDatabase, FaPython, FaInfoCircle, FaDocker } from 'react-icons/fa';
import { SiCsharp } from 'react-icons/si';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  revealContainer,
  revealItem,
  reducedMotionVariant,
  sectionViewport,
  listViewport,
  listContainer,
  listItem,
  cardInteractions,
} from '../lib/motion';

const iconMap = {
  'React': FaReact,
  'JavaScript': FaJs,
  'Node.js': FaNode,
  'Python': FaPython,
  'SQL': FaDatabase,
  'Git': FaGit,
  'Machine Learning': GiArtificialIntelligence,
  'Docker': FaDocker,
  'PL/SQL': FaDatabase,
  'C#': SiCsharp
};

function Skills() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const skills = t('skills.skillDetails', { returnObjects: true });

  return (
    <motion.section
      className="my-24"
      aria-label={t('skills.title')}
      variants={shouldReduceMotion ? reducedMotionVariant : revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
    >
      <motion.h2
        className="section-title mb-8"
        variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
      >
        {t('skills.title')}
      </motion.h2>
      <motion.div
        className="mb-7 mt-4 flex items-center justify-center text-slate-200"
        variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
      >
        <FaInfoCircle className="mr-2 text-[#6A9AB0]" aria-hidden="true" />
        <p>{t('skills.description')}</p>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        role="list"
        variants={shouldReduceMotion ? reducedMotionVariant : listContainer}
        initial="hidden"
        whileInView="visible"
        viewport={listViewport}
      >
        {skills.map((skill, index) => {
          const SkillIcon = iconMap[skill.name] || FaInfoCircle;
          
          return (
            <motion.article 
              key={index}
              className="card"
              variants={shouldReduceMotion ? reducedMotionVariant : listItem}
              {...(shouldReduceMotion ? {} : cardInteractions)}
              role="listitem"
              itemScope
              itemType="https://schema.org/Thing"
            >
              <div className="mb-4 flex items-center">
                <SkillIcon className="text-4xl text-[#6A9AB0] mr-4" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-bold text-[#EAD8B1]" itemProp="name">{skill.name}</h3>
                  <p className="text-sm text-white/85" itemProp="additionalType">{skill.competency}</p>
                </div>
              </div>
              <div className="surface-panel">
                <div className="mb-2 flex justify-between">
                  <span className="text-slate-200">{t('skills.projectsCompleted')}</span>
                  <span className="font-bold text-[#EAD8B1]" itemProp="aggregateRating">{skill.projects}</span>
                </div>
                <p className="text-sm italic leading-6 text-slate-200" itemProp="description">{skill.description}</p>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </motion.section>
  );
}

export default Skills;
