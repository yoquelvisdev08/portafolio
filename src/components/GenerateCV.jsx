import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import { cvData } from '../data/cvData';

const escapeHtml = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const renderList = (items, tag = 'li') =>
  items.map((item) => `<${tag}>${escapeHtml(item)}</${tag}>`).join('');

const renderCVTemplate = (lang) => {
  const content = cvData[lang] || cvData.en;
  const { profile, summary, sections, competencies, experience, projects, skills, education, languages } = content;
  const contactLine = profile.contact.map((item) => `<span>${escapeHtml(item)}</span>`).join('<span class="sep">|</span>');

  const experienceHtml = experience
    .map(
      (job) => `
      <article class="job-item">
        <div class="job-head">
          <h3>${escapeHtml(job.role)} - ${escapeHtml(job.company)}</h3>
          <p>${escapeHtml(job.period)} | ${escapeHtml(job.location)}</p>
        </div>
        <ul>${renderList(job.highlights)}</ul>
      </article>
    `
    )
    .join('');

  const projectsHtml = projects
    .map(
      (project) => `
      <article class="project-item">
        <h3>${escapeHtml(project.name)}</h3>
        <p><strong>Stack:</strong> ${escapeHtml(project.stack)}</p>
        <p><strong>Impact:</strong> ${escapeHtml(project.impact)}</p>
      </article>
    `
    )
    .join('');

  const skillsHtml = skills
    .map(
      (group) => `
      <div class="skill-group">
        <h3>${escapeHtml(group.group)}</h3>
        <p>${escapeHtml(group.items)}</p>
      </div>
    `
    )
    .join('');

  return `
    <div class="cv-document" lang="${escapeHtml(lang)}">
      <style>
        @page { size: A4; margin: 0.48in; }
        * { box-sizing: border-box; }
        .cv-document {
          width: 100%;
          max-width: 7.27in;
          margin: 0 auto;
          color: #111827;
          font-family: 'Arial', 'Helvetica', sans-serif;
          font-size: 11.2pt;
          line-height: 1.38;
          background: #ffffff;
        }
        h1, h2, h3, p, ul { margin: 0; }
        ul { padding-left: 1.05rem; }
        .cv-header {
          border-bottom: 2px solid #d1d5db;
          padding-bottom: 0.28in;
          margin-bottom: 0.24in;
        }
        .cv-header h1 {
          font-size: 22pt;
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: 0.01em;
          color: #0f172a;
        }
        .cv-header .role {
          margin-top: 0.06in;
          font-size: 12pt;
          font-weight: 600;
          color: #1f2937;
        }
        .cv-header .meta {
          margin-top: 0.08in;
          font-size: 9.8pt;
          color: #374151;
          display: flex;
          flex-wrap: wrap;
          gap: 0.04in;
          align-items: center;
        }
        .cv-header .sep {
          color: #9ca3af;
          font-weight: 600;
          margin: 0 0.03in;
        }
        .section {
          margin-top: 0.19in;
          page-break-inside: avoid;
        }
        .section-title {
          font-size: 11.2pt;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          font-weight: 700;
          color: #0f172a;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.04in;
          margin-bottom: 0.1in;
        }
        .summary {
          color: #1f2937;
          font-size: 10.9pt;
        }
        .chip-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.08in 0.12in;
          list-style: none;
          padding-left: 0;
        }
        .chip-list li {
          border: 1px solid #d1d5db;
          border-radius: 999px;
          padding: 0.04in 0.11in;
          font-size: 9.4pt;
          color: #1f2937;
          background: #f9fafb;
        }
        .job-item,
        .project-item,
        .skill-group { margin-bottom: 0.14in; }
        .job-item:last-child,
        .project-item:last-child,
        .skill-group:last-child { margin-bottom: 0; }
        .job-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.12in;
          margin-bottom: 0.05in;
        }
        .job-head h3,
        .project-item h3,
        .skill-group h3 {
          font-size: 10.8pt;
          font-weight: 700;
          color: #111827;
        }
        .job-head p {
          font-size: 9.6pt;
          color: #4b5563;
          white-space: nowrap;
        }
        .project-item p,
        .skill-group p {
          margin-top: 0.03in;
          font-size: 10.3pt;
          color: #1f2937;
        }
        .compact-list li {
          margin-bottom: 0.04in;
          color: #1f2937;
          font-size: 10.3pt;
        }
        .compact-list li:last-child { margin-bottom: 0; }
        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.12in 0.18in;
        }
        @media print {
          .cv-document {
            max-width: none;
            margin: 0;
          }
          .section,
          .job-item,
          .project-item,
          .skill-group,
          .job-head { page-break-inside: avoid; }
          a { color: inherit; text-decoration: none; }
        }
      </style>

      <header class="cv-header">
        <h1>${escapeHtml(profile.name)}</h1>
        <p class="role">${escapeHtml(profile.title)} | ${escapeHtml(profile.location)}</p>
        <p class="meta">${contactLine}</p>
      </header>

      <section class="section">
        <h2 class="section-title">${escapeHtml(sections.summary)}</h2>
        <p class="summary">${escapeHtml(summary)}</p>
      </section>

      <section class="section">
        <h2 class="section-title">${escapeHtml(sections.competencies)}</h2>
        <ul class="chip-list">${renderList(competencies)}</ul>
      </section>

      <section class="section">
        <h2 class="section-title">${escapeHtml(sections.experience)}</h2>
        ${experienceHtml}
      </section>

      <section class="section">
        <h2 class="section-title">${escapeHtml(sections.projects)}</h2>
        ${projectsHtml}
      </section>

      <section class="section">
        <h2 class="section-title">${escapeHtml(sections.skills)}</h2>
        ${skillsHtml}
      </section>

      <section class="section two-col">
        <div>
          <h2 class="section-title">${escapeHtml(sections.education)}</h2>
          <ul class="compact-list">${renderList(education)}</ul>
        </div>
        <div>
          <h2 class="section-title">${escapeHtml(sections.languages)}</h2>
          <ul class="compact-list">${renderList(languages)}</ul>
        </div>
      </section>
    </div>
  `;
};

const GenerateCV = ({ variant = 'default' }) => {
  const { t } = useTranslation();
  const [showLangModal, setShowLangModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!showLangModal) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowLangModal(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showLangModal]);

  const handleDownload = async (lang) => {
    setIsGenerating(true);
    setShowLangModal(false);

    try {
      const element = document.createElement('div');
      const locale = lang === 'es' ? 'es' : 'en';
      element.innerHTML = renderCVTemplate(locale);

      const opt = {
        margin: [0.05, 0.05],
        filename: `YoquelvisJorgeAbreu_CV_${cvData[locale].filenameSuffix}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollY: 0
        },
        jsPDF: {
          unit: 'in',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: {
          mode: ['css', 'legacy'],
          avoid: ['.job-item', '.project-item', '.skill-group', '.section-title']
        }
      };

      await html2pdf().set(opt).from(element).save();
    } finally {
      setIsGenerating(false);
    }
  };

  const buttonClass =
    variant === 'hero'
      ? 'btn-secondary w-full sm:w-auto'
      : variant === 'nav'
        ? 'inline-flex items-center gap-2 rounded-control border border-primary-fixed bg-transparent px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest text-primary-fixed transition-all hover:bg-primary-fixed/10'
        : 'btn-primary w-full text-base sm:w-auto';

  return (
    <>
      <button
        type="button"
        onClick={() => setShowLangModal(true)}
        className={buttonClass}
        disabled={isGenerating}
      >
        {variant === 'nav' ? (
          <>
            <span className="material-symbols-outlined text-[18px]">download</span>
            {t('downloadCV')}
          </>
        ) : (
          <>
            <span>{t('downloadCV')}</span>
            <span className="material-symbols-outlined text-[18px]">download</span>
          </>
        )}
      </button>

      {showLangModal &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            onClick={() => setShowLangModal(false)}
            role="presentation"
          >
            <dialog
              open
              className="w-full max-w-md rounded-lg border border-outline bg-surface p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
              aria-labelledby="cv-language-dialog-title"
            >
              <h3 id="cv-language-dialog-title" className="mb-5 text-center text-xl font-bold text-on-surface">
                {t('cv.selectLanguage')}
              </h3>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleDownload('es')}
                  disabled={isGenerating}
                  aria-label="Descargar CV en Espanol"
                >
                  {t('cv.spanish')}
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload('en')}
                  disabled={isGenerating}
                  aria-label="Download CV in English"
                >
                  {t('cv.english')}
                </button>
              </div>
            </dialog>
          </div>,
          document.body
        )}
    </>
  );
};

export default GenerateCV;
