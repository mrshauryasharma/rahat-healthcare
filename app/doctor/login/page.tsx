// app/doctor/login/page.tsx — Doctor Portal Authentication
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/components/LanguageProvider';
import { DoctorAuthState } from '@/types/user';
import styles from './page.module.css';

export default function DoctorLoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [regNumber, setRegNumber] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('General Medicine');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNumber.trim() || !doctorName.trim()) {
      setError('Please provide your name and registration number.');
      return;
    }

    const doctorAuth: DoctorAuthState = {
      isLoggedIn: true,
      doctorId: `DOC-${Date.now().toString().slice(-6)}`,
      name: doctorName.trim().startsWith('Dr.') ? doctorName.trim() : `Dr. ${doctorName.trim()}`,
      specialty,
      regNumber: regNumber.trim().toUpperCase()
    };

    localStorage.setItem('rahat-doctor-auth', JSON.stringify(doctorAuth));
    router.push('/doctor/dashboard');
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link href="/" className={styles.backLink}>
          ← {t('common.back') || 'Back to Home'}
        </Link>
        <LanguageSelector />
      </div>

      <div className={styles.card}>
        <div className={styles.badge}>👨‍⚕️ Clinical Practitioner Portal</div>
        <h1 className={styles.title}>{t('doctor.loginTitle') || 'Doctor Portal Login'}</h1>
        <p className={styles.subtitle}>{t('doctor.loginSubtitle') || 'Access clinical consultations, patient health summaries, and digital prescriptions.'}</p>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <label>Doctor Full Name</label>
            <input
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              placeholder="Enter your full name"
              className={styles.input}
              required
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label>{t('doctor.regNumber') || 'Medical Registration Number'}</label>
            <input
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              placeholder="Enter State/National Medical Council Reg No."
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label>{t('doctor.specialty') || 'Specialty'}</label>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className={styles.input}
            >
              <option value="General Medicine">General Medicine</option>
              <option value="Internal Medicine">Internal Medicine</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Dermatology">Dermatology</option>
              <option value="ENT">ENT</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Gynecology">Gynecology</option>
              <option value="Other">Other Specialty</option>
            </select>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitBtn}>
            Enter Doctor Portal →
          </button>
        </form>

        <div className={styles.registerPrompt}>
          <span>New Doctor?</span>
          <Link href="/doctor/register" className={styles.registerLink}>
            👨‍⚕️ Create Doctor Account / Register Practice →
          </Link>
        </div>
      </div>
    </div>
  );
}
