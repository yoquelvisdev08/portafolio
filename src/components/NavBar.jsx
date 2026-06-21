import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollSpy } from '../hooks/useScrollSpy';
import ThemeToggle from './ThemeToggle';
import SiteBrand from './SiteBrand';
import { useTheme } from '../context/ThemeContext';

const NAV_ITEMS = [
  { id: 'about', key: 'about' },
  { id: 'experience', key: 'experience' },
  { id: 'skills', key: 'skills' },
  { id: 'projects', key: 'projects' },
  { id: 'education', key: 'education' },
];

function NavBar() {
  const { t } = useTranslation();
  const { introActive, themeToggleRef } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sectionIds = useMemo(() => ['header', ...NAV_ITEMS.map((item) => item.id)], []);
  const { activeSection, scrollToSection } = useScrollSpy(sectionIds, 120);

  const navItems = useMemo(
    () => NAV_ITEMS.map((item) => ({ ...item, label: t(`nav.${item.key}`) })),
    [t],
  );

  const handleNavClick = (sectionId) => {
    setMobileOpen(false);
    scrollToSection(sectionId, 100);
  };

  const navLinkClass = (id) =>
    `nav-link transition-colors duration-300 ${activeSection === id ? 'active text-primary-fixed' : 'text-on-surface-variant hover:text-primary-fixed'}`;

  const navContent = navItems.map((item) => (
    <button
      key={item.id}
      type="button"
      onClick={() => handleNavClick(item.id)}
      className={navLinkClass(item.id)}
    >
      {item.label}
    </button>
  ));

  return (
    <nav
      className="fixed left-1/2 top-[max(0.85rem,env(safe-area-inset-top))] z-50 w-[min(96vw,100%)] max-w-container-max -translate-x-1/2 transition-all duration-300 sm:top-6"
      aria-label={t('navigation.mainNav')}
    >
      <div className="glass-card flex items-center justify-between rounded-full border-white/10 bg-surface/90 px-3 py-2.5 shadow-2xl sm:px-6 sm:py-3">
        <a
          href="#header"
          className="group flex items-center gap-3 font-headline-md text-xl font-bold text-primary-fixed"
          aria-label={t('nav.brandAria')}
          onClick={(event) => {
            event.preventDefault();
            handleNavClick('header');
          }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-fixed/30 bg-primary-fixed/10 transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-primary-fixed">terminal</span>
          </div>
          <span className="hidden sm:block">
            <SiteBrand />
          </span>
        </a>

        <div className="hidden items-center justify-center gap-1 rounded-full border border-outline/40 bg-surface-container/40 px-2 py-1 font-label-caps text-label-caps uppercase tracking-widest lg:flex">
          {navContent}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle ref={themeToggleRef} visible={!introActive} />
          <a
            href="#contact"
            className="btn-primary hidden rounded-full px-5 py-2 font-bold lg:flex"
            onClick={(event) => {
              event.preventDefault();
              handleNavClick('contact');
            }}
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            {t('header.contactCta')}
          </a>
          <button
            type="button"
            className="rounded-full bg-surface-container/60 p-2 text-on-surface transition-colors hover:text-primary-fixed lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={t('navigation.toggleMenu')}
          >
            <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="glass-card mt-3 rounded-2xl border-outline p-4 lg:hidden">
          <div className="flex flex-col gap-1">{navContent}</div>
          <a
            href="#contact"
            className="btn-primary mt-4 w-full rounded-full"
            onClick={(event) => {
              event.preventDefault();
              handleNavClick('contact');
            }}
          >
            {t('header.contactCta')}
          </a>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
