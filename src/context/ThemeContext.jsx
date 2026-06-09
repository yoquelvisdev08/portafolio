import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);
const STORAGE_KEY = 'portfolio-theme';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'blue' ? stored : 'blue';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'blue' ? 'light' : 'blue'));
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isBlue: theme === 'blue',
      isLight: theme === 'light',
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
