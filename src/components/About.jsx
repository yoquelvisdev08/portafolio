import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120
    }
  }
};

function About() {
  const { t } = useTranslation();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
    >
      <motion.div variants={itemVariants}>
        <h2 className="section-title">{t('about.title')}</h2>
        <div className="card mt-4">
          {t('about.paragraphs', { returnObjects: true }).map((paragraph, index) => (
            <p key={index} className="mb-4 text-white">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

export default About;
