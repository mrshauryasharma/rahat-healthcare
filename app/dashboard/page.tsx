// app/dashboard/page.tsx — Patient Care Dashboard with Vitals Radar & Medicine Scanner
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PatientHeader from '@/components/PatientHeader';
import Footer from '@/components/Footer';
import EmptyState from '@/components/EmptyState';
import VitalsRadar from '@/components/VitalsRadar';
import MedicineScanner from '@/components/MedicineScanner';
import { useLanguage } from '@/components/LanguageProvider';
import styles from './page.module.css';

export default function DashboardPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [profile, setProfile] = useState<any>(null);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
        {/* Welcome Patient Hero Header */}
        <div className={styles.welcomeBanner}>
          <div className={styles.bannerLeft}>
            <div className={styles.patientAvatar}>
              <span>{profile?.name ? profile.name.charAt(0).toUpperCase() : '👤'}</span>
            </div>
            <div className={styles.welcomeText}>
              <div className={styles.patientBadgeRow}>
                <span className={styles.patientStatusBadge}>✓ Verified Patient</span>
                {profile?.bloodGroup && (
                  <span className={styles.bloodPill}>{profile.bloodGroup}</span>
                )}
              </div>
              <h1>
                {t('dashboard.welcome') || 'Welcome back,'} {profile?.name || 'Patient'}
              </h1>
              <p className={styles.welcomeSubtitle}>
                {language === 'hi' ? 'आपका व्यक्तिगत स्वास्थ्य डैशबोर्ड एवं डिजिटल रिकॉर्ड्स' : language === 'bn' ? 'আপনার ব্যক্তিগত স্বাস্থ্য ড্যাশবোর্ড ও ডিজিটাল রেকর্ড' : 'Your Personal Health Management Portal & Lifetime Records'}
              </p>
            </div>
          </div>

          <div className={styles.bannerRight}>
            <Link href="/health-check" className={styles.newCheckBtn}>
              🩺 {t('hero.startCheck') || 'Start Health Check'}
            </Link>
            <Link href="/chat" className={styles.chatBotQuickBtn}>
              🤖 AI Chatbot
            </Link>
          </div>
        </div>

        {/* Top Grid: Smart Holographic Health ID Card & Profile Status */}
        <div className={styles.topGrid}>
          {/* Holographic Smart Health ID Card */}
          <div className={styles.healthCard}>
            <div className={styles.cardGlowOverlay}></div>
            
            <div className={styles.cardHeader}>
              <div className={styles.cardLogoArea}>
                <img src="/logo.png" alt="RAHAT" className={styles.cardLogo} />
                <div>
                  <span className={styles.cardBrand}>RAHAT HEALTH ID</span>
                  <span className={styles.cardSub}>National ABDM-Ready Passport</span>
                </div>
              </div>
              <div className={styles.chipArea}>
                <span className={styles.smartChip}>💳</span>
              </div>
            </div>

            <div className={styles.idDisplay}>
              <div>
                <span className={styles.idLabel}>HEALTH IDENTIFIER</span>
                <span className={styles.idNumber}>{currentHealthId}</span>
              </div>
              <button onClick={copyHealthId} className={styles.copyBtn} title="Copy Health ID">
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>

            <div className={styles.cardMetaGrid}>
              <div>
                <span className={styles.metaLabel}>PATIENT NAME</span>
                <strong className={styles.metaVal}>{profile?.name || 'Registered Patient'}</strong>
              </div>
              <div>
                <span className={styles.metaLabel}>BLOOD GROUP</span>
                <strong className={styles.metaVal}>{profile?.bloodGroup || '—'}</strong>
              </div>
              <div>
                <span className={styles.metaLabel}>EMERGENCY CONTACT</span>
                <strong className={styles.metaVal}>{profile?.emergencyContact?.phone || '—'}</strong>
              </div>
            </div>
          </div>

          {/* Profile & Safety Status */}
          <div className={styles.profileStatusCard}>
            <div className={styles.profileStatusHeader}>
              <div>
                <h3>Profile & Safety Status</h3>
                <p>Complete your health profile for better AI accuracy</p>
              </div>
              <span className={styles.percentBadge}>{calculateProfileCompletion()}%</span>
            </div>

            <div className={styles.completionBarWrap}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${calculateProfileCompletion()}%` }}></div>
              </div>
            </div>

            <div className={styles.quickActionLinks}>
              <Link href="/profile" className={styles.quickActionItem}>
                <div className={styles.qaIcon}>👤</div>
                <div>
                  <strong>{t('nav.profile') || 'View / Edit Health Profile'}</strong>
                  <small>Vitals, chronic ailments & emergency contact</small>
                </div>
                <span className={styles.qaArrow}>→</span>
              </Link>
              <Link href="/appointments" className={styles.quickActionItem}>
                <div className={styles.qaIcon}>📅</div>
                <div>
                  <strong>Doctor Consultations</strong>
                  <small>Book physical or online appointment</small>
                </div>
                <span className={styles.qaArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Quick Action Cards */}
        <div className={styles.actionCardsGrid}>
          <Link href="/health-check" className={styles.actionCard}>
            <div className={styles.actionCardIcon} style={{ background: '#e0f2fe', color: '#0284c7' }}>🩺</div>
            <h4>AI Health Assessment</h4>
            <p>Answer guided symptom questions and generate doctor-ready summaries.</p>
            <span className={styles.actionCardBtn}>Start Now →</span>
          </Link>

          <Link href="/chat" className={styles.actionCard}>
            <div className={styles.actionCardIcon} style={{ background: '#f0fdf4', color: '#16a34a' }}>🤖</div>
            <h4>24/7 AI Health Chatbot</h4>
            <p>Ask health questions in English, Hindi, or Bengali anytime.</p>
            <span className={styles.actionCardBtn}>Chat Now →</span>
          </Link>

          <Link href="/history" className={styles.actionCard}>
            <div className={styles.actionCardIcon} style={{ background: '#fef3c7', color: '#d97706' }}>📋</div>
            <h4>My Health Reports</h4>
            <p>View, print, or download your past 3-version triage reports.</p>
            <span className={styles.actionCardBtn}>View Records →</span>
          </Link>

          <Link href="/appointments" className={styles.actionCard}>
            <div className={styles.actionCardIcon} style={{ background: '#ede9fe', color: '#7c3aed' }}>🏥</div>
            <h4>Clinical Consultations</h4>
            <p>Schedule visits with specialized verified physicians in your area.</p>
            <span className={styles.actionCardBtn}>Book Visit →</span>
          </Link>
        </div>

        {/* STANDOUT FEATURE 1: Interactive Vitals Radar & BMI Calculator */}
        <VitalsRadar />

        {/* STANDOUT FEATURE 2: AI Medicine Scanner */}
        <MedicineScanner />

        {/* Two Columns: Recent Health Reports & Prescriptions */}
        <div className={styles.twoColGrid}>
          {/* Recent Health Assessment Reports */}
          <section className={styles.sectionCard}>
            <div className={styles.sectionTitleRow}>
              <div>
                <h2>📋 {t('dashboard.recentAssessments') || 'Recent Health Assessments'}</h2>
                <p>Latest AI-assisted triage logs and summaries</p>
              </div>
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
                    <div className={styles.reportLeft}>
                      <div className={styles.reportIconCircle}>📋</div>
                      <div>
                        <h4>{assess.concernName || 'Health Check'}</h4>
                        <p className={styles.reportDate}>Checked on {new Date(assess.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Link href="/history" className={styles.viewReportBtn}>
                      View Report →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Digital Prescriptions Issued by Doctor */}
          <section className={styles.sectionCard}>
            <div className={styles.sectionTitleRow}>
              <div>
                <h2>℞ Doctor Prescriptions</h2>
                <p>Official digital prescriptions signed by medical practitioners</p>
              </div>
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
      </main>

      <Footer />
    </div>
  );
}
