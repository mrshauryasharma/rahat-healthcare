// components/QuestionCard.tsx — Ultra-Clean Interactive Option Card
'use client';

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
      <div className={styles.questionHeader}>
        <span className={styles.qTag}>Assessment Question</span>
        <h2 className={styles.question}>{questionText}</h2>
      </div>

      <div className={styles.optionsList}>
        {options.map(option => {
          const isSelected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              className={`${styles.optionBtn} ${isSelected ? styles.selected : ''} ${option.isWarning ? styles.warning : ''}`}
              onClick={() => onSelect(option.id)}
              aria-pressed={isSelected}
            >
              <div className={`${styles.radioCircle} ${isSelected ? styles.radioSelected : ''}`}>
                {isSelected && <span className={styles.radioDot}></span>}
              </div>
              
              <div className={styles.optionContent}>
                {option.isWarning && <span className={styles.warningIcon}>⚠️ Potential Flag: </span>}
                <span className={styles.optionText}>{option.text}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
