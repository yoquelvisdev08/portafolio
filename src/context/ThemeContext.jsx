import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  THEME_STORAGE_KEY,
  applyThemeToDocument,
  detectSystemTheme,
  hasStoredThemePreference,
  markThemeIntroSeen,
  resolveTheme,
  saveThemePreference,
  shouldPlayThemeIntro,
} from '../lib/preferences';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const playIntroOnMount = shouldPlayThemeIntro();
  const [theme, setThemeState] = useState(() => (playIntroOnMount ? 'light' : resolveTheme()));
  const [introActive, setIntroActive] = useState(playIntroOnMount);
  const [introPhase, setIntroPhase] = useState(playIntroOnMount ? 'boot' : 'complete');
  const themeToggleRef = useRef(null);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  useEffect(() => {
    if (!playIntroOnMount) {
      return undefined;
    }

    applyThemeToDocument('light');
    document.documentElement.classList.add('theme-intro-active');

    return () => {
      document.documentElement.classList.remove('theme-intro-active');
    };
  }, [playIntroOnMount]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    const handleSystemThemeChange = (event) => {
      if (introActive) {
        return;
      }

      if (!hasStoredThemePreference()) {
        setThemeState(event.matches ? 'light' : 'blue');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [introActive]);

  const setTheme = (nextTheme) => {
    setThemeState(nextTheme);
    saveThemePreference(nextTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'blue' ? 'light' : 'blue');
  };

  const resetThemeToSystem = () => {
    setThemeState(detectSystemTheme());
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(THEME_STORAGE_KEY);
    }
  };

  const applyThemeVisual = useCallback((nextTheme) => {
    setThemeState(nextTheme);
    applyThemeToDocument(nextTheme);
  }, []);

  const finishIntro = useCallback((options = {}) => {
    const { saveBlueTheme = true } = options;

    markThemeIntroSeen();
    document.documentElement.classList.remove('theme-intro-active');
    setIntroActive(false);
    setIntroPhase('complete');
    setThemeState('blue');
    applyThemeToDocument('blue');

    if (saveBlueTheme) {
      saveThemePreference('blue');
    }
  }, []);

  const skipIntro = useCallback(() => {
    finishIntro({ saveBlueTheme: !hasStoredThemePreference() });
  }, [finishIntro]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      resetThemeToSystem,
      isBlue: theme === 'blue',
      isLight: theme === 'light',
      followsSystemTheme: !hasStoredThemePreference(),
      introActive,
      introPhase,
      setIntroPhase,
      applyThemeVisual,
      finishIntro,
      skipIntro,
      themeToggleRef,
    }),
    [
      theme,
      introActive,
      introPhase,
      applyThemeVisual,
      finishIntro,
      skipIntro,
    ],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
}
