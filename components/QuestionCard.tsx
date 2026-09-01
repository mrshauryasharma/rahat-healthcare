"use client";

import React from 'react';
import styles from './QuestionCard.module.css';

interface Option {
  id: string;
  text: string;
  isWarning?: boolean;
}

interface Props {
  questionText: string;
  options: Option[];
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
}

export default function QuestionCard({ questionText, options, selectedOptionId, onSelect }: Props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.question}>{questionText}</h2>
      <div className={styles.optionsList}>
        {options.map(option => (
          <button
            key={option.id}
            className={`${styles.optionBtn} ${selectedOptionId === option.id ? styles.selected : ''} ${option.isWarning ? styles.warning : ''}`}
            onClick={() => onSelect(option.id)}
            aria-pressed={selectedOptionId === option.id}
          >
            {option.isWarning && <span className={styles.warningIcon}>⚠️</span>}
            <span className={styles.optionText}>{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
