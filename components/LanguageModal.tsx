// components/LanguageModal.tsx — First-visit trilingual language selection modal
'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Language } from '@/types/user';
import styles from './LanguageModal.module.css';

export default function LanguageModal() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const chosen = localStorage.getItem('rahat-language-chosen');
      if (!chosen) {
        setIsOpen(true);
      }
    } catch (e) {
      // Fallback
    }
  }, []);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('rahat-language-chosen', 'true');
    } catch (e) {}
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.logoBadge}>
          <img src="/logo.png" alt="RAHAT" className={styles.logoImg} />
        </div>

        <h2 className={styles.title}>Welcome to RAHAT</h2>
        <p className={styles.subtitle}>
          Please select your preferred language<br />
          <span className={styles.subNative}>अपनी पसंदीदा भाषा चुनें / আপনার পছন্দের ভাষা নির্বাচন করুন</span>
        </p>

        <div className={styles.langGrid}>
          <button 
            onClick={() => handleSelectLanguage('en')} 
            className={`${styles.langCard} ${language === 'en' ? styles.active : ''}`}
          >
            <span className={styles.langName}>English</span>
            <span className={styles.langDesc}>Standard Medical & Health Support</span>
          </button>

          <button 
            onClick={() => handleSelectLanguage('hi')} 
            className={`${styles.langCard} ${language === 'hi' ? styles.active : ''}`}
          >
            <span className={styles.langName}>हिन्दी</span>
            <span className={styles.langDesc}>सरल एवं स्पष्ट स्वास्थ्य सहायता</span>
          </button>

          <button 
            onClick={() => handleSelectLanguage('bn')} 
            className={`${styles.langCard} ${language === 'bn' ? styles.active : ''}`}
          >
            <span className={styles.langName}>বাংলা</span>
            <span className={styles.langDesc}>সহজ ও স্পষ্ট স্বাস্থ্য সেবা</span>
          </button>
        </div>

        <div className={styles.footnote}>
          You can change your language anytime from the top bar.
        </div>
      </div>
    </div>
  );
}
