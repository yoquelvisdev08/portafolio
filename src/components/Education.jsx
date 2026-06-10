import React, { useMemo, useState } from 'react';
import Modal from 'react-modal';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';
import { educationMeta } from '../data/portfolioData';
import {
  revealContainer,
  reducedMotionVariant,
  sectionViewport,
  listViewport,
  listContainer,
  listItem,
  cardInteractions,
} from '../lib/motion';

const nonInteractiveCard = {
  whileHover: undefined,
  whileTap: undefined,
  whileFocus: undefined,
  transition: undefined,
};

const borderAccents = [
  'border-l-primary-fixed',
  'border-l-secondary',
  'border-l-purple-400',
  'border-l-yellow-400',
  'border-l-blue-400',
  'border-l-green-400',
];

function Education() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const studies = useMemo(() => {
    const items = t('education.studies', { returnObjects: true });
    return Array.isArray(items)
      ? items.map((item) => ({
          ...item,
          ...educationMeta.studies.find((meta) => meta.id === item.id),
        }))
      : [];
  }, [t]);

  const courses = useMemo(() => {
    const items = t('education.courses', { returnObjects: true });
    return Array.isArray(items)
      ? items.map((item) => ({
          ...item,
          ...educationMeta.courses.find((meta) => meta.id === item.id),
        }))
      : [];
  }, [t]);

  const openCertificateModal = (certificatePath) => {
    if (certificatePath) {
      setSelectedCertificate(certificatePath);
    }
  };

  const closeCertificateModal = () => {
    setSelectedCertificate(null);
  };

  const statusLabel = (status) => {
    if (status === 'graduated') return t('education.graduated');
    if (status === 'inProgress') return t('education.inProgress');
    return t('education.completed');
  };

  return (
    <motion.section
      id="education"
      className="section-block scroll-mt-28"
      variants={shouldReduceMotion ? reducedMotionVariant : revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      aria-label={t('education.title')}
    >
      <div className="mx-auto max-w-container-max">
        <SectionHeader title={t('education.studiesTitle')} />

        <motion.div
          className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2"
          variants={shouldReduceMotion ? reducedMotionVariant : listContainer}
          initial="hidden"
          whileInView="visible"
          viewport={listViewport}
        >
          {studies.map((study) => (
            <motion.article
              key={study.id}
              className={`glass-card group flex h-full flex-col justify-between rounded-card p-5 sm:p-6 lg:p-8 ${
                study.certificate ? 'cursor-pointer' : 'opacity-90'
              }`}
              variants={shouldReduceMotion ? reducedMotionVariant : listItem}
              {...(study.certificate && !shouldReduceMotion ? cardInteractions : nonInteractiveCard)}
              onClick={() => openCertificateModal(study.certificate)}
              onKeyDown={(event) => {
                if (!study.certificate) return;
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openCertificateModal(study.certificate);
                }
              }}
              role={study.certificate ? 'button' : undefined}
              tabIndex={study.certificate ? 0 : -1}
            >
              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary-fixed/10 text-primary-fixed transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-2xl">{study.icon}</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-on-surface">{study.degree}</h3>
                <p className="mb-4 font-mono text-sm text-secondary">{study.institution}</p>
                <p className="text-on-surface-variant">{study.description}</p>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-outline pt-6">
                <span className="rounded bg-surface-container px-3 py-1 font-mono text-xs uppercase tracking-widest text-on-surface-variant">
                  {study.year}
                </span>
                <span className="font-mono text-sm text-primary-fixed">{statusLabel(study.status)}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <SectionHeader
          title={t('education.coursesTitle')}
          subtitle={t('education.description')}
          stacked
        />

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={shouldReduceMotion ? reducedMotionVariant : listContainer}
          initial="hidden"
          whileInView="visible"
          viewport={listViewport}
        >
          {courses.map((course, index) => (
            <motion.article
              key={course.id}
              className={`glass-card cursor-pointer rounded-card border-l-4 p-6 transition-transform hover:-translate-y-1 ${
                borderAccents[index % borderAccents.length]
              }`}
              variants={shouldReduceMotion ? reducedMotionVariant : listItem}
              {...(shouldReduceMotion ? {} : cardInteractions)}
              onClick={() => openCertificateModal(course.certificate)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openCertificateModal(course.certificate);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${course.degree} - ${t('education.certificateAvailable')}`}
            >
              <h3 className="mb-2 text-lg font-semibold text-on-surface">{course.degree}</h3>
              <p className="mb-1 text-sm text-on-surface-variant">{course.institution}</p>
              <p className="mb-4 font-mono text-xs text-on-surface-variant">{course.year}</p>
              <div className="flex items-center gap-2 font-mono text-xs text-primary-fixed">
                <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
                <span>{t('education.certificateAvailable')}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <Modal
        isOpen={!!selectedCertificate}
        onRequestClose={closeCertificateModal}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        ariaHideApp={false}
        aria={{ labelledby: 'education-certificate-modal-title' }}
        style={{
          overlay: {
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            position: 'relative',
            border: 'none',
            background: 'var(--color-surface-container)',
            borderRadius: '0.75rem',
            padding: 0,
            width: '90%',
            maxWidth: '1200px',
            height: '90vh',
            overflow: 'hidden',
          },
        }}
        contentLabel="Certificate Modal"
      >
        <div className="relative flex h-full w-full flex-col">
          <h3 id="education-certificate-modal-title" className="sr-only">
            {t('education.certificateAvailable')}
          </h3>
          {selectedCertificate && (
            <iframe
              src={selectedCertificate}
              title="Certificate"
              className="h-full w-full border-none"
              allowFullScreen
            />
          )}
        </div>
      </Modal>
    </motion.section>
  );
}

export default Education;
