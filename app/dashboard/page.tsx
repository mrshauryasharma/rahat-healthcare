// app/dashboard/page.tsx — Patient Care Dashboard
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PatientHeader from '@/components/PatientHeader';
import Footer from '@/components/Footer';
import EmptyState from '@/components/EmptyState';
import { useLanguage } from '@/components/LanguageProvider';
import styles from './page.module.css';

export default function DashboardPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [profile, setProfile] = useState<any>(null);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);

  useEffect(() => {
    const authStr = localStorage.getItem('rahat-auth');
    if (!authStr) {
      router.push('/login');
      return;
    }
    const auth = JSON.parse(authStr);
    const phone = auth.phone;
    
    const profileStr = localStorage.getItem(`rahat-profile-${phone}`);
    let loadedProfile = null;
    if (profileStr) {
      loadedProfile = JSON.parse(profileStr);
      setProfile(loadedProfile);
    }

    const userHealthId = loadedProfile?.rahatHealthId || loadedProfile?.healthId || auth.userId;
    if (userHealthId) {
      const assessmentsStr = localStorage.getItem(`rahat-assessments-${userHealthId}`);
      if (assessmentsStr) {
        setAssessments(JSON.parse(assessmentsStr));
      }
      const rxStr = localStorage.getItem(`rahat-prescriptions-${userHealthId}`);
      if (rxStr) {
        setPrescriptions(JSON.parse(rxStr));
      }
    }

    const appStr = localStorage.getItem(`rahat-appointments-${phone}`);
    if (appStr) {
      setAppointments(JSON.parse(appStr));
    }
  }, [router]);

  const currentHealthId = profile?.rahatHealthId || profile?.healthId || 'RAHAT-2026-PENDING';

  const copyHealthId = () => {
    if (currentHealthId && currentHealthId !== '---') {
      navigator.clipboard.writeText(currentHealthId);
      alert(t('dashboard.copied') || 'Health ID copied to clipboard!');
    }
  };

  const calculateProfileCompletion = () => {
    if (!profile) return 0;
    const fields = ['name', 'age', 'gender', 'bloodGroup', 'height', 'weight'];
    const filled = fields.filter(f => !!profile[f]).length;
    return Math.round((filled / fields.length) * 100);
  };

  return (
    <div className={styles.container}>
      <PatientHeader />
      <main className={styles.main}>
        {/* Top Patient Welcome Header */}
        <div className={styles.welcomeBanner}>
          <div className={styles.patientAvatar}>👤</div>
          <div className={styles.welcomeText}>
            <h1>
              {t('dashboard.welcome') || 'Welcome back,'} {profile?.name || 'Patient'}
            </h1>
            <p className={styles.welcomeSubtitle}>
              {language === 'hi' ? 'आपका व्यक्तिगत स्वास्थ्य डैशबोर्ड' : language === 'bn' ? 'আপনার ব্যক্তিগত স্বাস্থ্য ড্যাশবোর্ড' : 'Your Personal Health Management Portal'}
            </p>
          </div>
          <div className={styles.topActions}>
            <Link href="/health-check" className={styles.newCheckBtn}>
              🩺 {t('hero.startCheck') || 'Start Health Check'}
            </Link>
          </div>
        </div>

        {/* Top Grid: Digital Health ID Card & Profile Completion */}
        <div className={styles.topGrid}>
          {/* Digital Health ID Card */}
          <div className={styles.healthCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardLogoArea}>
                <img src="/logo.png" alt="RAHAT" className={styles.cardLogo} />
                <span>{t('dashboard.healthCardTitle') || 'RAHAT Digital Health Card'}</span>
              </div>
              <span className={styles.qrBadge}>📱 ABDM Ready</span>
            </div>

            <div className={styles.idDisplay}>
              <span className={styles.idNumber}>{currentHealthId}</span>
              <button onClick={copyHealthId} className={styles.copyBtn} title="Copy Health ID">
                📋 {t('common.copy') || 'Copy'}
              </button>
            </div>

            <div className={styles.cardMetaGrid}>
              <div>
                <span className={styles.metaLabel}>Patient Name</span>
                <strong className={styles.metaVal}>{profile?.name || '—'}</strong>
              </div>
              <div>
                <span className={styles.metaLabel}>Blood Group</span>
                <strong className={styles.metaVal}>{profile?.bloodGroup || '—'}</strong>
              </div>
              <div>
                <span className={styles.metaLabel}>Emergency Contact</span>
                <strong className={styles.metaVal}>{profile?.emergencyContact?.phone || '—'}</strong>
              </div>
            </div>
          </div>

          {/* Quick Stats & Actions Card */}
          <div className={styles.profileStatusCard}>
            <h3>Profile & Safety Status</h3>
            <div className={styles.completionBarWrap}>
              <div className={styles.completionLabel}>
                <span>{t('dashboard.profileComplete') || 'Profile Completion'}</span>
                <strong>{calculateProfileCompletion()}%</strong>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${calculateProfileCompletion()}%` }}></div>
              </div>
            </div>

            <div className={styles.quickActionLinks}>
              <Link href="/profile" className={styles.quickActionItem}>
                <span>👤</span>
                <div>
                  <strong>{t('nav.profile') || 'View / Edit Health Profile'}</strong>
                  <small>Vitals, allergies & contact</small>
                </div>
              </Link>
              <Link href="/chat" className={styles.quickActionItem}>
                <span>🤖</span>
                <div>
                  <strong>{t('nav.aiChat') || 'AI Health Assistant'}</strong>
                  <small>Ask symptoms in 3 languages</small>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Middle Two Columns: Health Checks History & Doctor Prescriptions */}
        <div className={styles.twoColGrid}>
          {/* Recent Health Assessment Reports */}
          <section className={styles.sectionCard}>
            <div className={styles.sectionTitleRow}>
              <h2>📋 {t('dashboard.recentAssessments') || 'Recent Health Assessments'}</h2>
              {assessments.length > 0 && (
                <Link href="/history" className={styles.viewAllLink}>
                  {t('dashboard.viewAll') || 'View All'} →
                </Link>
              )}
            </div>

            {assessments.length === 0 ? (
              <EmptyState
                icon="🩺"
                title={t('history.noHistory') || 'No Health Checks Yet'}
                message={t('history.noHistoryDesc') || 'Take an assessment to generate your personalized 3-version health report.'}
                actionLabel={t('hero.startCheck') || 'Start Health Check'}
                onAction={() => router.push('/health-check')}
              />
            ) : (
              <div className={styles.reportList}>
                {assessments.slice(-3).reverse().map((assess: any, idx: number) => (
                  <div key={idx} className={styles.reportItem}>
                    <div>
                      <h4>{assess.concernName || 'Health Check'}</h4>
                      <p className={styles.reportDate}>{new Date(assess.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Link href="/history" className={styles.viewReportBtn}>
                      View 3-Version Report →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Digital Prescriptions Issued by Doctor */}
          <section className={styles.sectionCard}>
            <div className={styles.sectionTitleRow}>
              <h2>℞ Doctor Prescriptions</h2>
              <span className={styles.badgeCount}>{prescriptions.length} Active</span>
            </div>

            {prescriptions.length === 0 ? (
              <EmptyState
                icon="📝"
                title="No Digital Prescriptions"
                message="Prescriptions issued by verified doctors during your consultations will appear here."
              />
            ) : (
              <div className={styles.rxList}>
                {prescriptions.map((rx: any, idx: number) => (
                  <div key={idx} className={styles.rxItem}>
                    <div className={styles.rxTop}>
                      <strong>{rx.prescriptionNumber}</strong>
                      <span className={styles.docNameTag}>{rx.doctorName}</span>
                    </div>
                    <p className={styles.rxDiagnosis}>Diagnosis: {rx.diagnosis}</p>
                    <small className={styles.rxDate}>Issued on: {new Date(rx.issuedAt).toLocaleDateString()}</small>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Appointments Section */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionTitleRow}>
            <h2>📅 {t('dashboard.myAppointments') || 'My Doctor Consultations'}</h2>
            <Link href="/appointments" className={styles.bookAppBtn}>
              + Book New Appointment
            </Link>
          </div>

          {appointments.length === 0 ? (
            <EmptyState
              icon="📅"
              title="No Upcoming Consultations"
              message="Book a physical or teleconsultation with specialized doctors in your area."
              actionLabel="Book Consultation"
              onAction={() => router.push('/appointments')}
            />
          ) : (
            <div className={styles.appGrid}>
              {appointments.map((app: any, idx: number) => (
                <div key={idx} className={styles.appCard}>
                  <div className={styles.appHeader}>
                    <strong>{app.doctorName || 'Doctor Consultation'}</strong>
                    <span className={styles.appStatusPill}>{app.status || 'Scheduled'}</span>
                  </div>
                  <p className={styles.appSpecialty}>{app.specialty} • {app.hospitalName || 'Clinical Network'}</p>
                  <p className={styles.appTime}>🕒 {app.date} at {app.time}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
