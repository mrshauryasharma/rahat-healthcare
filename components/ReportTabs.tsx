"use client";

import React, { useState } from 'react';
import { ReportContent } from '@/types/health';
import HealthSummary from './HealthSummary';
import { useLanguage } from './LanguageProvider';
import styles from './ReportTabs.module.css';

interface Props {
  userReport: ReportContent;
  doctorReport: ReportContent;
  englishReport: ReportContent;
  onDownload: (version: string) => void;
  onCopy: (version: string) => void;
  onPrint: (version: string) => void;
}

export default function ReportTabs({ userReport, doctorReport, englishReport, onDownload, onCopy, onPrint }: Props) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'user' | 'doctor' | 'english'>('user');

  const getReport = () => {
    switch (activeTab) {
      case 'doctor': return doctorReport;
      case 'english': return englishReport;
      default: return userReport;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabsList}>
        <button 
          className={`${styles.tab} ${activeTab === 'user' ? styles.active : ''}`}
          onClick={() => setActiveTab('user')}
        >
          👤 {t('report.userVersion') || 'Your Report'}
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'doctor' ? styles.active : ''}`}
          onClick={() => setActiveTab('doctor')}
        >
          👨‍⚕️ {t('report.doctorVersion') || 'Doctor Summary'}
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'english' ? styles.active : ''}`}
          onClick={() => setActiveTab('english')}
        >
          🌐 {t('report.englishVersion') || 'English Report'}
        </button>
      </div>
      
      <div className={styles.content}>
        <HealthSummary report={getReport()} />
      </div>

      <div className={styles.actions}>
        <button className={styles.actionBtn} onClick={() => onDownload(activeTab)}>
          ⬇️ {t('report.download') || 'Download'}
        </button>
        <button className={styles.actionBtn} onClick={() => onCopy(activeTab)}>
          📋 {t('report.copy') || 'Copy Summary'}
        </button>
        <button className={styles.actionBtn} onClick={() => onPrint(activeTab)}>
          🖨️ {t('report.print') || 'Print'}
        </button>
      </div>
    </div>
  );
}
