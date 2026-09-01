"use client";

import React from 'react';
import { useLanguage } from './LanguageProvider';
import { Language } from '@/types/user';
import styles from './LanguageSelector.module.css';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <div className={styles.container}>
      <select 
        value={language} 
        onChange={handleSelect}
        className={styles.select}
        aria-label="Select Language"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="bn">বাংলা</option>
      </select>
    </div>
  );
}
