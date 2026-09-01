// app/health-check/results/page.tsx — Health check results with 3-version report
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PatientHeader from '@/components/PatientHeader';
import Footer from '@/components/Footer';
import ReportTabs from '@/components/ReportTabs';
import { useLanguage } from '@/components/LanguageProvider';
import { generateReport, downloadReport } from '@/lib/reportGenerator';
import { HealthReport } from '@/types/health';
import { UserProfile } from '@/types/user';
import styles from './page.module.css';

export default function HealthCheckResults() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [assessment, setAssessment] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [report, setReport] = useState<HealthReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const authStr = localStorage.getItem('rahat-auth');
      if (!authStr) {
        router.push('/login');
        return;
      }
      const auth = JSON.parse(authStr);
      
      const profStr = localStorage.getItem(`rahat-profile-${auth.phone}`);
      let prof: UserProfile | null = null;
      if (profStr) {
        prof = JSON.parse(profStr);
        setProfile(prof);
      }

      const currentId = sessionStorage.getItem('rahat-current-assessment') || new URLSearchParams(window.location.search).get('id');
      
      if (prof && currentId) {
        const assessStr = localStorage.getItem(`rahat-assessments-${prof.rahatHealthId}`);
        if (assessStr) {
          const assessments = JSON.parse(assessStr);
          const curr = assessments.find((a: any) => a.id === currentId);
          if (curr) {
            setAssessment(curr);
            // Generate the 3-version report
            const generated = await generateReport(curr, prof);
            setReport(generated);
          }
        }
      }
      setLoading(false);
    };

    loadData();
  }, [router, language]);

  const handleDownload = (version: string) => {
    if (report && profile) {
      downloadReport(report, version as 'user' | 'doctor' | 'english', profile);
    }
  };

  const handleCopy = (version: string) => {
    if (!report) return;
    const content = version === 'user' ? report.userVersion : version === 'doctor' ? report.doctorVersion : report.englishVersion;
    const text = `${content.title}\n\nMain Concern: ${content.mainConcern}\nSymptoms: ${content.reportedSymptoms.join(', ')}\nNext Steps: ${content.nextSteps.join(', ')}\n\n${report.disclaimer}`;
    navigator.clipboard.writeText(text);
    alert(t('dashboard.copied') || 'Copied!');
  };

  const handlePrint = (version: string) => {
    handleDownload(version); // Opens print dialog
  };

  if (loading) return null;

  if (!assessment || !report) {
    return (
      <div className={styles.container}>
        <PatientHeader />
        <main className={styles.main}>
          <div className={styles.error}>
            <h2>{t('common.error') || 'Report not found'}</h2>
            <button onClick={() => router.push('/dashboard')} className={styles.btnPrimary}>
              {t('common.back') || 'Back to Dashboard'}
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <PatientHeader />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('report.title')}</h1>
        </div>

        <ReportTabs
          userReport={report.userVersion}
          doctorReport={report.doctorVersion}
          englishReport={report.englishVersion}
          onDownload={handleDownload}
          onCopy={handleCopy}
          onPrint={handlePrint}
        />

        <div className={styles.disclaimer}>
          <p><strong>⚠️</strong> {report.disclaimer}</p>
        </div>

        <div className={styles.bottomNav}>
          <button onClick={() => router.push('/dashboard')} className={styles.btnSecondary}>
            {t('nav.dashboard')}
          </button>
          <button onClick={() => router.push('/history')} className={styles.btnSecondary}>
            {t('nav.history')}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
