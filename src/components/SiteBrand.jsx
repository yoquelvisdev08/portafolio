import React from 'react';
import { useTranslation } from 'react-i18next';

function SiteBrand({ className = '', size = 'nav' }) {
  const { t } = useTranslation();

  const sizeClasses =
    size === 'footer'
      ? 'text-xs tracking-[0.24em]'
      : 'text-[11px] tracking-[0.16em] sm:text-sm sm:tracking-[0.22em]';

  return (
    <span
      className={`inline-flex items-baseline gap-1 font-mono font-bold uppercase ${sizeClasses} ${className}`}
      aria-hidden="true"
    >
      <span className="text-on-surface-variant">{t('nav.brandPrimary')}</span>
      <span className="text-primary-fixed">·</span>
      <span className="bg-gradient-to-r from-primary-fixed to-secondary bg-clip-text text-transparent">
        {t('nav.brandAccent')}
      </span>
    </span>
  );
}

export default SiteBrand;
