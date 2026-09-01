'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PatientHeader from '@/components/PatientHeader';
import Footer from '@/components/Footer';
import EmptyState from '@/components/EmptyState';
import { useLanguage } from '@/components/LanguageProvider';
import styles from './page.module.css';
import Link from 'next/link';

export default function History() {
  const router = useRouter();
  const { t } = useLanguage();
  const [assessments, setAssessments] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authStr = localStorage.getItem('rahat-auth');
    if (!authStr) {
      router.push('/login');
      return;
    }
    const auth = JSON.parse(authStr);
    
    const profStr = localStorage.getItem(`rahat-profile-${auth.phone}`);
    if (profStr) {
      const prof = JSON.parse(profStr);
      setProfile(prof);
      const healthId = prof.rahatHealthId || prof.healthId;
      if (healthId) {
        const assessStr = localStorage.getItem(`rahat-assessments-${healthId}`);
        if (assessStr) {
          setAssessments(JSON.parse(assessStr).reverse());
        }
      }
    }
    setLoading(false);
  }, [router]);

  const handleDelete = (id: string) => {
    if (window.confirm(t('history.confirmDelete') || 'Are you sure you want to delete this record?')) {
      const updated = assessments.filter(a => a.id !== id);
      setAssessments(updated);
      const healthId = profile?.rahatHealthId || profile?.healthId;
      if (healthId) {
        localStorage.setItem(`rahat-assessments-${healthId}`, JSON.stringify(updated.slice().reverse()));
      }
    }
  };

  if (loading) return null;

  return (
    <div className={styles.container}>
      <PatientHeader />
      <main className={styles.main}>
        <h1 className={styles.title}>{t('history.title') || 'Health History'}</h1>
        
        {assessments.length === 0 ? (
          <EmptyState 
            icon="📂"
            title={t('history.title') || 'Health History'}
            message={t('history.empty') || 'You have not completed any health checks yet.'} 
            actionLabel={t('history.startFirst') || 'Start Health Check'} 
            onAction={() => router.push('/health-check')} 
          />
        ) : (
          <div className={styles.list}>
            {assessments.map(assessment => (
              <div key={assessment.id} className={styles.card}>
                <div className={styles.cardInfo}>
                  <p className={styles.date}>{new Date(assessment.createdAt || assessment.date).toLocaleDateString()}</p>
                  <h3 className={styles.concern}>{assessment.concernName}</h3>
                  <p className={styles.summary}>{assessment.answers?.[0]?.selectedOptionText || assessment.answers?.[0]?.answerText || 'Assessment completed'}</p>
                </div>
                <div className={styles.cardActions}>
                  <span className={styles.badge}>{assessment.reportGenerated ? 'Report Ready' : 'Completed'}</span>
                  <div className={styles.buttons}>
                    <Link href={`/health-check/results?id=${assessment.id}`} className={styles.btnView}>
                      {t('history.view') || 'View'}
                    </Link>
                    <button onClick={() => handleDelete(assessment.id)} className={styles.btnDelete}>
                      {t('history.delete') || 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
