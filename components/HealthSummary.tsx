"use client";

import React from 'react';
import { ReportContent } from '@/types/health';
import { useLanguage } from './LanguageProvider';
import styles from './HealthSummary.module.css';

interface Props {
  report: ReportContent;
  isEditable?: boolean;
  onEdit?: (field: string, value: string) => void;
}

// Displays a structured health report with all sections
export default function HealthSummary({ report, isEditable = false, onEdit }: Props) {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{report.title}</h2>
      
      {/* Main Concern */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('report.mainConcern') || 'Main Concern'}</h3>
        <p className={styles.text}>{report.mainConcern}</p>
      </div>

      {/* Duration */}
      {report.duration && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{t('report.duration') || 'Duration'}</h3>
          <p className={styles.text}>{report.duration}</p>
        </div>
      )}

      {/* Reported Symptoms */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('report.symptoms') || 'Reported Symptoms'}</h3>
        {report.reportedSymptoms && report.reportedSymptoms.length > 0 ? (
          <ul className={styles.list}>
            {report.reportedSymptoms.map((sym: string, i: number) => <li key={i}>{sym}</li>)}
          </ul>
        ) : (
          <p className={styles.text}>No specific symptoms reported.</p>
        )}
      </div>

      {/* Relevant Answers */}
      {report.relevantAnswers && report.relevantAnswers.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{t('report.responses') || 'Relevant Responses'}</h3>
          {report.relevantAnswers.map((qa, i: number) => (
            <div key={i} className={styles.qaItem}>
              <strong>{qa.question}:</strong> {qa.answer}
            </div>
          ))}
        </div>
      )}

      {/* Medicines Mentioned */}
      {report.medicinesMentioned && report.medicinesMentioned.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{t('report.medicines') || 'Medicines Mentioned'}</h3>
          <ul className={styles.list}>
            {report.medicinesMentioned.map((med: string, i: number) => <li key={i}>{med}</li>)}
          </ul>
        </div>
      )}

      {/* Important Notes */}
      {report.importantNotes && report.importantNotes.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{t('report.notes') || 'Important Notes'}</h3>
          <ul className={styles.list}>
            {report.importantNotes.map((note: string, i: number) => (
              <li key={i} className={styles.warningNote}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Steps */}
      {report.nextSteps && report.nextSteps.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{t('report.nextSteps') || 'Next Steps'}</h3>
          <ul className={styles.list}>
            {report.nextSteps.map((step: string, i: number) => <li key={i}>{step}</li>)}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className={styles.disclaimer}>
        ⚠️ {t('report.disclaimer') || 'This is an AI-assisted health summary for informational purposes only. It does not replace professional medical advice.'}
      </div>
    </div>
  );
}
