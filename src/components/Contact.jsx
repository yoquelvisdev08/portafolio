import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import {
  revealContainer,
  revealItem,
  reducedMotionVariant,
  listContainer,
  listItem,
  buttonInteractions,
  sectionViewport,
  listViewport,
} from '../lib/motion';

const Contact = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const contactItems = t('contact.contactItems', { returnObjects: true });

  return (
    <motion.section
      className="my-24 py-2"
      aria-label={t('contact.title')}
      variants={shouldReduceMotion ? reducedMotionVariant : revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
    >
      <motion.h2
        className="section-title mb-5"
        variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
      >
        {t('contact.title')}
      </motion.h2>
      <motion.div
        className="card p-6 md:p-8"
        variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
      >
        <div className="mb-6 max-w-3xl">
          <h3 className="mb-2 text-2xl font-bold text-[#EAD8B1] md:text-3xl">{t('contact.ctaTitle')}</h3>
          <p className="text-base leading-7 text-slate-100/95 md:text-lg">{t('contact.ctaDescription')}</p>
        </div>
        <motion.div
          className="space-y-3"
          variants={shouldReduceMotion ? reducedMotionVariant : listContainer}
          initial="hidden"
          whileInView="visible"
          viewport={listViewport}
        >
        {contactItems.map((item) => {
          const iconMap = {
            'phone': FaPhone,
            'teléfono': FaPhone,
            'email': FaEnvelope,
            'correo': FaEnvelope,
            'website': FaGlobe,
            'sitio web': FaGlobe
          };
          const Icon = iconMap[item.type] || FaGlobe;

          return (
          <motion.a
            key={item.href}
            href={item.href}
            className="surface-panel flex items-center justify-between gap-3 px-4 py-3 text-[#EAD8B1] transition-colors duration-300 hover:text-[#8eb3c5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A9AB0]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2540]"
            variants={shouldReduceMotion ? reducedMotionVariant : listItem}
            {...(shouldReduceMotion ? {} : buttonInteractions)}
            aria-label={`${item.type}: ${item.text}`}
          >
            <span className="flex items-center">
              <Icon className="mr-4 h-6 w-6 text-[#6A9AB0]" aria-hidden="true" />
              <span className="text-lg text-slate-100/95">{item.text}</span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#91b4c6]">{item.type}</span>
          </motion.a>
          );
        })}
        </motion.div>
        <motion.div
          className="mt-7 flex flex-wrap gap-3"
          variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
        >
          <a href="mailto:yoquelvisdev@gmail.com" className="btn-primary">
            {t('contact.primaryAction')}
          </a>
          <a href="#projects" className="btn-secondary">
            {t('contact.secondaryAction')}
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
