import React, { useState } from 'react';
import { FaGraduationCap, FaFilePdf } from 'react-icons/fa';
import Modal from 'react-modal';
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

const nonInteractiveCard = {
  whileHover: undefined,
  whileTap: undefined,
  whileFocus: undefined,
  transition: undefined,
};

const education = [
  { 
    degree: 'SOFTWARE ENGINEERING', 
    institution: 'APEC UNIVERSITY', 
    year: '2023 - PRESENT',
    certificate: null,
    status: 'comingSoon'
  },
  { 
    degree: 'FUNDAMENTALS IN DEVOPS, APIS AND MICROSERVICES ARCHITECTURE', 
    institution: 'Udemy', 
    year: '2024',
    certificate: '/certificacion/Fundamentos en DevOps, APIs y Arquitectura de Microservicios.pdf'
  },
  { 
    degree: 'SOFTWARE TESTING', 
    institution: 'Udemy', 
    year: '2023',
    certificate: '/certificacion/TESTING CERTIFICADO.pdf'
  },
  { 
    degree: 'SOFTWARE DEVELOPMENT TECHNOLOGIST', 
    institution: 'Instituto Tecnológico de las Américas (ITLA)', 
    year: '2021 - 2023',
    certificate: '/certificacion/titulo-itla.pdf'
  },
  { 
    degree: 'ORACLE PL/SQL', 
    institution: 'Oracle', 
    year: '2023',
    certificate: '/certificacion/PL:SQL.pdf'
  },
  { 
    degree: 'SQL', 
    institution: 'Certificación', 
    year: '2023',
    certificate: '/certificacion/sql.pdf'
  },
  { 
    degree: 'ETHICAL HACKING', 
    institution: 'Instituto Tecnológico de las Américas (ITLA)', 
    year: '2022',
    certificate: '/certificacion/HACKER ETICO.pdf'
  },
  { 
    degree: 'BIG DATA', 
    institution: 'Pontificia Universidad Católica Madre y Maestra (PUCMM)', 
    year: '2021',
    certificate: '/certificacion/BIG DATA ANALYTIC.pdf'
  },
  { 
    degree: 'GIT MANAGEMENT', 
    institution: 'Máster Mind', 
    year: '2021',
    certificate: '/certificacion/MASTER LINUX.pdf'
  },
  { 
    degree: 'LINUX MANAGEMENT', 
    institution: 'Máster Mind', 
    year: '2021',
    certificate: '/certificacion/MASTER LINUX.pdf'
  }
];

function Education() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const openCertificateModal = (certificatePath) => {
    if (certificatePath) {
      setSelectedCertificate(certificatePath);
    }
  };

  const closeCertificateModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <motion.section
      className="my-24"
      variants={shouldReduceMotion ? reducedMotionVariant : revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      aria-label={t('education.title')}
    >
      <motion.h2
        className="section-title mb-8"
        variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
      >
        {t('education.title')}
      </motion.h2>
      
      <motion.div
        className="mb-7 mt-4 flex items-center justify-center text-slate-200"
        variants={shouldReduceMotion ? reducedMotionVariant : revealItem}
      >
        <p>{t('education.description')}</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-7 md:grid-cols-2"
        variants={shouldReduceMotion ? reducedMotionVariant : listContainer}
        initial="hidden"
        whileInView="visible"
        viewport={listViewport}
      >
        {education.map((edu, index) => (
          <motion.div
            key={index}
            className={`card p-6 
              ${edu.certificate 
                ? 'cursor-pointer' 
                : 'opacity-95'
              } 
              transition-all duration-300`}
            variants={shouldReduceMotion ? reducedMotionVariant : listItem}
            {...(edu.certificate && !shouldReduceMotion ? cardInteractions : nonInteractiveCard)}
            onClick={() => openCertificateModal(edu.certificate)}
            onKeyDown={(event) => {
              if (!edu.certificate) return;
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openCertificateModal(edu.certificate);
              }
            }}
            role={edu.certificate ? 'button' : undefined}
            tabIndex={edu.certificate ? 0 : -1}
            aria-label={
              edu.certificate
                ? `${edu.degree} - ${t('education.certificateAvailable')}`
                : `${edu.degree} - ${t(`education.${edu.status}`)}`
            }
          >
            <div className="flex items-start gap-4">
              <div className="min-w-[40px]">
                <FaGraduationCap className="text-4xl text-[#6A9AB0]" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#EAD8B1] leading-tight mb-3">
                  {edu.degree}
                </h3>
                <p className="text-white text-base mb-2">{edu.institution}</p>
                <p className="text-white/85 text-sm">{edu.year}</p>
                {edu.certificate ? (
                  <div className="flex items-center text-sm text-blue-300 mt-2">
                    <FaFilePdf className="mr-2" aria-hidden="true" />
                    <span>{t('education.certificateAvailable')}</span>
                  </div>
                ) : (
                  <div className="flex items-center text-sm text-yellow-300 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t(`education.${edu.status}`)}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Modal
        isOpen={!!selectedCertificate}
        onRequestClose={closeCertificateModal}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
        aria={{
          labelledby: 'education-certificate-modal-title',
        }}
        className={{
          base: 'modal-base',
          afterOpen: 'modal-base_after-open',
          beforeClose: 'modal-base_before-close'
        }}
        overlayClassName={{
          base: 'overlay-base',
          afterOpen: 'overlay-base_after-open',
          beforeClose: 'overlay-base_before-close'
        }}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          content: {
            position: 'relative',
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
            border: 'none',
            background: '#1a202c',
            borderRadius: '10px',
            padding: '0',
            width: '90%',
            maxWidth: '1200px',
            height: '90vh',
            maxHeight: '900px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }
        }}
        contentLabel="Certificate Modal"
        closeTimeoutMS={300}
        shouldFocusAfterRender={false}
        shouldReturnFocusAfterClose={false}
        portalClassName="custom-modal-portal"
      >
        <div className="relative w-full h-full flex flex-col">
          <h3 id="education-certificate-modal-title" className="sr-only">
            {t('education.certificateAvailable')}
          </h3>
          <div className="absolute top-4 right-4 z-50 flex items-center space-x-4">
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = selectedCertificate;
                link.download = selectedCertificate.split('/').pop();
                link.click();
              }}
              className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors flex items-center focus-visible:ring-2 focus-visible:ring-white"
              title="Download Certificate"
              aria-label="Download certificate"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button 
              onClick={() => window.open(selectedCertificate, '_blank')}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors flex items-center focus-visible:ring-2 focus-visible:ring-white"
              title="Open in New Tab"
              aria-label="Open certificate in a new tab"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <button 
              onClick={closeCertificateModal}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors flex items-center focus-visible:ring-2 focus-visible:ring-white"
              title="Close Modal"
              aria-label="Close certificate modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {selectedCertificate && (
            <iframe
              src={selectedCertificate}
              width="100%"
              height="100%"
              title="Certificate"
              className="border-none w-full h-full"
              allowFullScreen
            />
          )}
        </div>
      </Modal>

      {/* Añadir estilos globales para modal responsivo */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .ReactModal__Content {
            width: 95% !important;
            height: 95vh !important;
            margin: 0 auto;
          }
        }
      `}</style>
    </motion.section>
  );
}

export default Education;
