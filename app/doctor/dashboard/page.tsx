// app/doctor/dashboard/page.tsx — Clinical Doctor Practitioner Suite
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DoctorHeader from '@/components/DoctorHeader';
import Footer from '@/components/Footer';
import HealthSummary from '@/components/HealthSummary';
import EmptyState from '@/components/EmptyState';
import { useLanguage } from '@/components/LanguageProvider';
import { DoctorAuthState } from '@/types/user';
import { HealthReport } from '@/types/health';
import styles from './page.module.css';

export default function DoctorDashboardPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [doctor, setDoctor] = useState<DoctorAuthState | null>(null);
  const [searchHealthId, setSearchHealthId] = useState('');
  const [patientReport, setPatientReport] = useState<HealthReport | null>(null);
  const [searchError, setSearchError] = useState('');
  const [queue, setQueue] = useState<any[]>([]);

  useEffect(() => {
    const authStr = localStorage.getItem('rahat-doctor-auth');
    if (!authStr) {
      router.push('/doctor/login');
      return;
    }
    const docData: DoctorAuthState = JSON.parse(authStr);
    setDoctor(docData);

    // Read real appointments scheduled in system
    try {
      const allAppointmentsStr = localStorage.getItem('rahat-all-appointments');
      if (allAppointmentsStr) {
        setQueue(JSON.parse(allAppointmentsStr));
      } else {
        setQueue([]);
      }
    } catch (e) {
      setQueue([]);
    }
  }, [router]);

  const handlePatientLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    setPatientReport(null);

    const query = searchHealthId.trim().toUpperCase();
    if (!query) return;

    // Search actual assessments stored locally under this Health ID
    const assessStr = localStorage.getItem(`rahat-assessments-${query}`);
    if (assessStr) {
      try {
        const assessments = JSON.parse(assessStr);
        if (Array.isArray(assessments) && assessments.length > 0) {
          const latest = assessments[assessments.length - 1];
          setPatientReport({
            assessmentId: latest.id,
            userVersion: {
              title: `Assessment: ${latest.concernName}`,
              language: 'en',
              mainConcern: latest.concernName,
              reportedSymptoms: latest.answers?.map((a: any) => `${a.questionText}: ${a.selectedOptionText}`) || [],
              duration: latest.duration || 'Not specified',
              relevantAnswers: latest.answers?.map((a: any) => ({ question: a.questionText, answer: a.selectedOptionText })) || [],
              medicinesMentioned: latest.images?.map((i: any) => i.userNotes).filter(Boolean) || [],
              imageNotes: latest.images?.map((i: any) => i.userNotes).filter(Boolean) || [],
              importantNotes: latest.additionalNotes ? [latest.additionalNotes] : [],
              nextSteps: ['Clinical assessment recommended']
            },
            doctorVersion: {
              title: `Clinical Patient Summary — ${latest.concernName}`,
              language: 'clinical',
              mainConcern: latest.concernName,
              reportedSymptoms: latest.answers?.map((a: any) => `${a.questionText} (${a.selectedOptionText})`) || [],
              duration: latest.duration || 'Reported recent onset',
              relevantAnswers: latest.answers?.map((a: any) => ({ question: a.questionText, answer: a.selectedOptionText })) || [],
              medicinesMentioned: latest.images?.map((i: any) => i.userNotes).filter(Boolean) || [],
              imageNotes: latest.images?.map((i: any) => i.userNotes).filter(Boolean) || [],
              importantNotes: latest.additionalNotes ? [`Patient Notes: ${latest.additionalNotes}`] : [],
              nextSteps: ['Conduct physical evaluation', 'Formulate diagnosis & Rx']
            },
            englishVersion: {
              title: `Standard Summary: ${latest.concernName}`,
              language: 'en',
              mainConcern: latest.concernName,
              reportedSymptoms: latest.answers?.map((a: any) => `${a.questionText}: ${a.selectedOptionText}`) || [],
              duration: latest.duration || 'Not specified',
              relevantAnswers: latest.answers?.map((a: any) => ({ question: a.questionText, answer: a.selectedOptionText })) || [],
              medicinesMentioned: [],
              imageNotes: [],
              importantNotes: [],
              nextSteps: []
            },
            generatedAt: latest.createdAt || new Date().toISOString(),
            rahatHealthId: query,
            disclaimer: 'AI-assisted clinical summary — Verify with patient during clinical consultation.'
          });
          return;
        }
      } catch (err) {}
    }

    setSearchError(`No health records found for ID "${query}". Patient must complete an AI assessment first.`);
  };

  if (!doctor) return null;

  return (
    <div className={styles.container}>
      <DoctorHeader />
      <main className={styles.main}>
        {/* Doctor Clinical Profile Banner */}
        <div className={styles.doctorBanner}>
          <div className={styles.doctorInfoArea}>
            <div className={styles.docAvatar}>🩺</div>
            <div>
              <span className={styles.verifiedTag}>✓ VERIFIED PRACTITIONER</span>
              <h1 className={styles.docName}>{doctor.name}</h1>
              <p className={styles.docDetails}>
                {doctor.specialty} &bull; Medical Council Reg: <strong>{doctor.regNumber}</strong>
              </p>
            </div>
          </div>
          <div className={styles.bannerActions}>
            <Link href="/doctor/prescriptions" className={styles.issueRxBtn}>
              ✍️ {t('doctor.issueNewRx') || 'Issue Digital Rx'}
            </Link>
          </div>
        </div>

        {/* Patient Lookup Card */}
        <section className={styles.lookupSection}>
          <div className={styles.lookupHeader}>
            <span className={styles.lookupIcon}>🔍</span>
            <div>
              <h2>{t('doctor.lookupHeading') || 'Patient Health ID Triage Lookup'}</h2>
              <p>{t('doctor.lookupHelper') || 'Enter a RAHAT Health ID to inspect patient symptom history, duration, and AI assessment summaries.'}</p>
            </div>
          </div>

          <form onSubmit={handlePatientLookup} className={styles.lookupForm}>
            <input
              type="text"
              value={searchHealthId}
              onChange={(e) => setSearchHealthId(e.target.value)}
              placeholder="e.g. RAHAT-2026-AV8912"
              className={styles.lookupInput}
              required
            />
            <button type="submit" className={styles.lookupSubmitBtn}>
              {language === 'hi' ? 'रिकॉर्ड खोजें' : language === 'bn' ? 'রেকর্ড খুঁজুন' : 'Access Clinical Records'} →
            </button>
          </form>

          {searchError && <div className={styles.searchError}>{searchError}</div>}
        </section>

        {/* Loaded Patient Report */}
        {patientReport && (
          <section className={styles.patientRecordBox}>
            <div className={styles.recordBoxHeader}>
              <div>
                <span className={styles.activeRecordBadge}>Active Patient File</span>
                <h3>{patientReport.rahatHealthId} &mdash; Verified Triage Summary</h3>
              </div>
              <button 
                onClick={() => router.push(`/doctor/prescriptions?healthId=${patientReport.rahatHealthId}`)}
                className={styles.writeRxForLoadedBtn}
              >
                📝 Issue Rx for this Patient
              </button>
            </div>

            <div className={styles.clinicalSummaryWrap}>
              <HealthSummary report={patientReport.doctorVersion} />
            </div>
          </section>
        )}

        {/* Consultation Queue */}
        <section className={styles.queueCard}>
          <div className={styles.queueHeader}>
            <h2>📋 {t('doctor.queueHeading') || 'Today’s Patient Queue & Consultations'}</h2>
            <span className={styles.queueBadge}>{queue.length} Scheduled</span>
          </div>

          {queue.length === 0 ? (
            <EmptyState
              icon="📅"
              title="No Patient Appointments in Queue"
              message="No patient appointments are scheduled for today yet. Use the Lookup above to view any patient's records directly."
            />
          ) : (
            <div className={styles.queueTable}>
              {queue.map((item, idx) => (
                <div key={idx} className={styles.queueRow}>
                  <div className={styles.queueTime}>{item.time}</div>
                  <div className={styles.queueDetails}>
                    <h4>{item.patientName || 'Patient'}</h4>
                    <p>{item.rahatHealthId || item.healthId} &bull; <span>{item.concern || item.reason}</span></p>
                  </div>
                  <div className={styles.queueActions}>
                    <button 
                      onClick={() => { setSearchHealthId(item.rahatHealthId || item.healthId); }}
                      className={styles.openReportBtn}
                    >
                      View Report
                    </button>
                    <Link 
                      href={`/doctor/prescriptions?healthId=${item.rahatHealthId || item.healthId}`}
                      className={styles.rxQuickBtn}
                    >
                      Write Rx
                    </Link>
                  </div>
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
