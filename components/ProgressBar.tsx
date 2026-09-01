"use client";

import React from 'react';
import styles from './ProgressBar.module.css';

interface Props {
  current: number;
  total: number;
  label?: string;
}

export default function ProgressBar({ current, total, label }: Props) {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.label}>{label || `Question ${current} of ${total}`}</span>
        <span className={styles.percentage}>{Math.round(percentage)}%</span>
      </div>
      <div className={styles.track}>
        <div 
          className={styles.fill} 
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
