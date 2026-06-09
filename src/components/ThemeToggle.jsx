import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-outline bg-surface-container text-on-surface-variant transition-colors hover:border-primary-fixed hover:text-primary-fixed ${className}`}
      aria-label={theme === 'blue' ? t('theme.switchToLight') : t('theme.switchToBlue')}
      title={theme === 'blue' ? t('theme.switchToLight') : t('theme.switchToBlue')}
    >
      <span className="material-symbols-outlined text-[20px]">
        {theme === 'blue' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}

export default ThemeToggle;
