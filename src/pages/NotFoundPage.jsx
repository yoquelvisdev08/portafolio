import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '../context/ThemeContext';
import SEOHead from '../components/SEOHead';
import PageBackground from '../components/PageBackground';
import SiteBrand from '../components/SiteBrand';

function NotFoundContent() {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  const copy = isSpanish
    ? {
        code: '404',
        title: 'Esta ruta no existe',
        description:
          'La URL que abriste no está en el portafolio. Volvé al inicio para ver proyectos, experiencia y contacto.',
        cta: 'Volver al inicio',
        pricing: 'Ver planes',
      }
    : {
        code: '404',
        title: 'This page does not exist',
        description:
          'The URL you opened is not part of this portfolio. Go back home to browse projects, experience, and contact.',
        cta: 'Back to home',
        pricing: 'View pricing',
      };

  return (
    <div className="relative min-h-screen text-on-surface">
      <SEOHead />
      <PageBackground />
      <main className="page-x relative z-10 mx-auto flex min-h-screen max-w-container-max flex-col items-center justify-center py-16 text-center">
        <Link to="/" className="mb-10 inline-flex items-center gap-2" aria-label={t('nav.brandAria')}>
          <span className="material-symbols-outlined text-primary-fixed">terminal</span>
          <SiteBrand />
        </Link>

        <p className="font-mono text-sm uppercase tracking-[0.35em] text-primary-fixed">{copy.code}</p>
        <h1 className="mt-4 max-w-xl font-display text-3xl font-bold sm:text-5xl">{copy.title}</h1>
        <p className="mt-4 max-w-lg text-on-surface-variant">{copy.description}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn-primary rounded-full px-6 py-3 font-bold">
            {copy.cta}
          </Link>
          <Link to="/precio" className="btn-secondary rounded-full px-6 py-3 font-bold">
            {copy.pricing}
          </Link>
        </div>
      </main>
    </div>
  );
}

function NotFoundPage() {
  return (
    <ThemeProvider>
      <NotFoundContent />
    </ThemeProvider>
  );
}

export default NotFoundPage;
