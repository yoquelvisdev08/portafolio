import React from 'react';
import { FaBriefcase } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

function Experience() {
  const { t, i18n } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="my-16" aria-label={t('experience.title')}>
      <h2 className="section-title">{t('experience.title')}</h2>
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={i18n.language}
        role="list"
      >
        <AnimatePresence>
          {t('experience.jobs', { returnObjects: true }).map((exp, index) => (
            <motion.article 
              key={`${i18n.language}-${index}`}
              variants={itemVariants}
              className="card bg-gradient-to-br from-[#001F3F] to-[#3A6D8C]"
              initial="hidden"
              animate="visible"
              exit="hidden"
              role="listitem"
              itemScope
              itemType="https://schema.org/JobPosting"
            >
            <div className="flex items-center mb-4">
              <FaBriefcase className="text-2xl text-[#6A9AB0] mr-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-[#EAD8B1]" itemProp="title">{exp.title}</h3>
            </div>
            <p className="text-white mb-2" itemProp="hiringOrganization">{exp.company}</p>
            <p className="text-white/70 mb-4" itemProp="datePosted">{exp.period}</p>
            <p className="text-white" itemProp="description">{exp.description}</p>
            </motion.article>
        ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default Experience;
