import React from 'react';
import { FaDatabase, FaDocker, FaGit, FaJs, FaNode, FaPython, FaReact } from 'react-icons/fa';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { SiCsharp } from 'react-icons/si';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';
import SkillCard3D from './SkillCard3D';
import {
  revealContainer,
  reducedMotionVariant,
  sectionViewport,
  listViewport,
  listContainer,
  listItem,
} from '../lib/motion';

const iconMap = {
  React: FaReact,
  JavaScript: FaJs,
  'Node.js': FaNode,
  Python: FaPython,
  SQL: FaDatabase,
  Git: FaGit,
  'Machine Learning': GiArtificialIntelligence,
  Docker: FaDocker,
  'PL/SQL': FaDatabase,
  'C#': SiCsharp,
};

const iconColors = {
  React: 'text-secondary',
  JavaScript: 'text-yellow-400',
  'Node.js': 'text-green-500',
  Python: 'text-blue-400',
  SQL: 'text-orange-400',
  Git: 'text-red-400',
  'Machine Learning': 'text-purple-400',
  Docker: 'text-cyan-400',
  'PL/SQL': 'text-orange-300',
  'C#': 'text-indigo-400',
};

function Skills() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const skills = t('skills.skillDetails', { returnObjects: true });

  return (
    <motion.section
      id="skills"
      className="section-block scroll-mt-28"
      aria-label={t('skills.title')}
      variants={shouldReduceMotion ? reducedMotionVariant : revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
    >
      <div className="mx-auto max-w-container-max">
        <SectionHeader
          title={t('skills.title')}
          subtitle={t('skills.description')}
          showDivider={false}
          stacked
        />

        <motion.div
          className="skill-card-3d-grid grid grid-cols-1 gap-card-gap sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
          variants={shouldReduceMotion ? reducedMotionVariant : listContainer}
          initial="hidden"
          whileInView="visible"
          viewport={listViewport}
        >
          {skills.map((skill, index) => {
            const SkillIcon = iconMap[skill.name];
            const iconColor = iconColors[skill.name] || 'text-secondary';

            return (
              <SkillCard3D
                key={skill.name}
                shouldReduceMotion={shouldReduceMotion}
                motionProps={{
                  variants: shouldReduceMotion ? reducedMotionVariant : listItem,
                  role: 'listitem',
                  itemScope: true,
                  itemType: 'https://schema.org/Thing',
                }}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded border border-outline bg-surface transition-colors group-hover:border-primary-fixed ${iconColor}`}
                  >
                    {SkillIcon ? (
                      <SkillIcon className="text-xl" aria-hidden="true" />
                    ) : (
                      <span className="material-symbols-outlined">integration_instructions</span>
                    )}
                  </div>
                  <span className="skill-level-badge">{skill.competency}</span>
                </div>
                <h3 className="mb-1 text-xl font-semibold text-on-surface" itemProp="name">
                  {skill.name}
                </h3>
                <p className="mb-4 min-h-[40px] text-sm text-on-surface-variant" itemProp="description">
                  {skill.description}
                </p>
                <div className="flex items-center justify-between font-mono text-sm">
                  <span className="text-on-surface-variant">{t('skills.projectsCompleted')}</span>
                  <span className="font-bold text-primary-fixed" itemProp="aggregateRating">
                    {skill.projects}+
                  </span>
                </div>
              </SkillCard3D>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Skills;
