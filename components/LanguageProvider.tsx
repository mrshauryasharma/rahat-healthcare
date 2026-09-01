"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/types/user';
import { getTranslation } from '@/data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const storedLang = localStorage.getItem('rahat-language') as Language;
      if (storedLang && ['en', 'hi', 'bn'].includes(storedLang)) {
        setLanguageState(storedLang);
      }
    } catch (e) {
      // Safe fallback for restricted storage environments
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('rahat-language', lang);
    } catch (e) {
      // Safe fallback
    }
  };

  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
