import React from 'react';
import { FaReact, FaJs, FaHtml5, FaCss3, FaNode, FaGit, FaDatabase, FaLinux, FaApple, FaPython, FaInfoCircle, FaDocker } from 'react-icons/fa';
import { SiSelenium, SiPowerbi } from 'react-icons/si';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { VscServerProcess } from 'react-icons/vsc';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const iconMap = {
  'React': FaReact,
  'JavaScript': FaJs,
  'Node.js': FaNode,
  'Python': FaPython,
  'SQL': FaDatabase,
  'Git': FaGit,
  'Machine Learning': GiArtificialIntelligence,
  'Docker': FaDocker
};

function Skills() {
  const { t } = useTranslation();
  const skills = t('skills.skillDetails', { returnObjects: true });

  return (
    <section className="my-16">
      <motion.h2 
        className="section-title text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('skills.title')}
      </motion.h2>
      <motion.div
        className="flex items-center justify-center mb-4 text-blue-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <FaInfoCircle className="info-icon mr-2" />
        <p>{t('skills.description')}</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => {
          const SkillIcon = iconMap[skill.name] || FaInfoCircle;
          
          return (
            <motion.div 
              key={index}
              className="bg-gradient-to-br from-[#001F3F] to-[#3A6D8C] rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <SkillIcon className="text-4xl text-[#6A9AB0] mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-[#EAD8B1]">{skill.name}</h3>
                  <p className="text-sm text-white/80">{skill.competency}</p>
                </div>
              </div>
              <div className="bg-[#002B4D] rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-white/70">{t('skills.projectsCompleted')}</span>
                  <span className="font-bold text-[#EAD8B1]">{skill.projects}</span>
                </div>
                <p className="text-sm text-white/70 italic">{skill.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Skills;
