export const LANGUAGE_STORAGE_KEY = 'language';
export const THEME_STORAGE_KEY = 'portfolio-theme';
export const THEME_INTRO_SESSION_KEY = 'portfolio-theme-intro-seen';

const SUPPORTED_LANGUAGES = ['en', 'es'];
const SUPPORTED_THEMES = ['blue', 'light'];

export const THEME_COLORS = {
  blue: '#0b1326',
  light: '#f7f9fb',
};

export function detectBrowserLanguage() {
  if (typeof navigator === 'undefined') {
    return 'en';
  }

  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language || 'en'];

  for (const language of browserLanguages) {
    const code = language.toLowerCase().split('-')[0];
    if (code === 'es') return 'es';
    if (code === 'en') return 'en';
  }

  return 'en';
}

export function resolveLanguage() {
  if (typeof localStorage === 'undefined') {
    return detectBrowserLanguage();
  }

  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (SUPPORTED_LANGUAGES.includes(stored)) {
    return stored;
  }

  return detectBrowserLanguage();
}

export function saveLanguagePreference(language) {
  if (typeof localStorage !== 'undefined' && SUPPORTED_LANGUAGES.includes(language)) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }
}

export function detectSystemTheme() {
  if (typeof window === 'undefined') {
    return 'blue';
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'blue';
}

export function resolveTheme() {
  if (typeof localStorage === 'undefined') {
    return detectSystemTheme();
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (SUPPORTED_THEMES.includes(stored)) {
    return stored;
  }

  return detectSystemTheme();
}

export function hasStoredThemePreference() {
  if (typeof localStorage === 'undefined') {
    return false;
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return SUPPORTED_THEMES.includes(stored);
}

export function saveThemePreference(theme) {
  if (typeof localStorage !== 'undefined' && SUPPORTED_THEMES.includes(theme)) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
}

export function shouldPlayThemeIntro() {
  if (typeof window === 'undefined') {
    return false;
  }

  const path = window.location.pathname;
  if (path !== '/' && path !== '') {
    return false;
  }

  try {
    return !sessionStorage.getItem(THEME_INTRO_SESSION_KEY);
  } catch {
    return false;
  }
}

export function markThemeIntroSeen() {
  if (typeof sessionStorage === 'undefined') {
    return;
  }

  try {
    sessionStorage.setItem(THEME_INTRO_SESSION_KEY, '1');
  } catch {
    // sessionStorage puede estar bloqueado
  }
}

export function applyThemeToDocument(theme) {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.setAttribute('data-theme', theme);

  const themeColor = THEME_COLORS[theme] || THEME_COLORS.blue;
  let meta = document.querySelector('meta[name="theme-color"]');

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', themeColor);
}
