"use client";

import React from 'react';
import { HealthConcern } from '@/types/health';
import { useLanguage } from './LanguageProvider';
import styles from './HealthConcernCard.module.css';

interface Props {
  concern: HealthConcern;
  isSelected?: boolean;
  onClick: () => void;
}

export default function HealthConcernCard({ concern, isSelected = false, onClick }: Props) {
  const { language } = useLanguage();

  return (
    <button 
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      aria-label={`Select concern: ${concern.name.en}`}
      aria-pressed={isSelected}
    >
      <div className={styles.icon}>{concern.icon}</div>
      <div className={styles.content}>
        <h3 className={styles.name}>{concern.name[language] || concern.name.en}</h3>
        <p className={styles.description}>{concern.description[language] || concern.description.en}</p>
      </div>
    </button>
  );
}
