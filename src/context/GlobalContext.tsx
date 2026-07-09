'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type Contrast = 'normal' | 'high';
type FontSize = 'normal' | 'large' | 'extra-large';

interface GlobalContextProps {
  theme: Theme;
  toggleTheme: () => void;
  contrast: Contrast;
  toggleContrast: () => void;
  fontSize: FontSize;
  changeFontSize: (size: FontSize) => void;
  dyslexicFont: boolean;
  toggleDyslexicFont: () => void;
  cookieConsent: boolean | null;
  saveCookieConsent: (consent: boolean) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [contrast, setContrast] = useState<Contrast>('normal');
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [dyslexicFont, setDyslexicFont] = useState<boolean>(false);
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('thf-theme') as Theme || 'light';
    const savedContrast = localStorage.getItem('thf-contrast') as Contrast || 'normal';
    const savedFontSize = localStorage.getItem('thf-font-size') as FontSize || 'normal';
    const savedDyslexic = localStorage.getItem('thf-dyslexic') === 'true';
    const savedConsent = localStorage.getItem('thf-cookie-consent');

    setTheme(savedTheme);
    setContrast(savedContrast);
    setFontSize(savedFontSize);
    setDyslexicFont(savedDyslexic);
    if (savedConsent !== null) {
      setCookieConsent(savedConsent === 'true');
    }
  }, []);

  // Sync state to HTML attributes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('thf-theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-contrast', contrast);
    localStorage.setItem('thf-contrast', contrast);
  }, [contrast]);

  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === 'large') {
      root.style.fontSize = '18px';
    } else if (fontSize === 'extra-large') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }
    localStorage.setItem('thf-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    const root = document.documentElement;
    if (dyslexicFont) {
      root.setAttribute('data-font', 'dyslexic');
    } else {
      root.removeAttribute('data-font');
    }
    localStorage.setItem('thf-dyslexic', String(dyslexicFont));
  }, [dyslexicFont]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleContrast = () => {
    setContrast((prev) => (prev === 'normal' ? 'high' : 'normal'));
  };

  const changeFontSize = (size: FontSize) => {
    setFontSize(size);
  };

  const toggleDyslexicFont = () => {
    setDyslexicFont((prev) => !prev);
  };

  const saveCookieConsent = (consent: boolean) => {
    setCookieConsent(consent);
    localStorage.setItem('thf-cookie-consent', String(consent));
  };

  return (
    <GlobalContext.Provider
      value={{
        theme,
        toggleTheme,
        contrast,
        toggleContrast,
        fontSize,
        changeFontSize,
        dyslexicFont,
        toggleDyslexicFont,
        cookieConsent,
        saveCookieConsent,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
}
