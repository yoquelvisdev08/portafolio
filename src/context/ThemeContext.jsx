import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  THEME_STORAGE_KEY,
  applyThemeToDocument,
  detectSystemTheme,
  hasStoredThemePreference,
  resolveTheme,
  saveThemePreference,
} from '../lib/preferences';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => resolveTheme());

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    const handleSystemThemeChange = (event) => {
      if (!hasStoredThemePreference()) {
        setThemeState(event.matches ? 'light' : 'blue');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

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

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      resetThemeToSystem,
      isBlue: theme === 'blue',
      isLight: theme === 'light',
      followsSystemTheme: !hasStoredThemePreference(),
    }),
    [theme],
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
