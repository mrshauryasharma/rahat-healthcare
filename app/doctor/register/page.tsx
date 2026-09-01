// app/doctor/register/page.tsx — Doctor Registration & Medical Verification Application
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/components/LanguageProvider';
import { DoctorAuthState } from '@/types/user';
import styles from './page.module.css';

export default function DoctorRegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    regNumber: '',
    medicalCouncil: 'National Medical Commission (NMC / MCI)',
    qualification: 'MBBS, MD',
    specialty: 'General Medicine',
    experienceYears: '5',
    hospitalAffiliation: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const newDoctor: DoctorAuthState = {
      isLoggedIn: true,
      doctorId: `DOC-${Date.now().toString().slice(-6)}`,
      name: formData.fullName.trim().startsWith('Dr.') ? formData.fullName.trim() : `Dr. ${formData.fullName.trim()}`,
      specialty: formData.specialty,
      regNumber: formData.regNumber.trim().toUpperCase()
    };

    // Store in registered doctors database
    try {
      const existingStr = localStorage.getItem('rahat-registered-doctors');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('rahat-registered-doctors', JSON.stringify([...existing, {
        ...newDoctor,
        email: formData.email,
        phone: formData.phone,
        qualification: formData.qualification,
        council: formData.medicalCouncil,
        hospital: formData.hospitalAffiliation,
        registeredAt: new Date().toISOString(),
        status: 'verified'
      }]));

      // Also set active session
      localStorage.setItem('rahat-doctor-auth', JSON.stringify(newDoctor));
    } catch (e) {}

    setIsSuccess(true);
    setTimeout(() => {
      router.push('/doctor/dashboard');
    }, 1200);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link href="/doctor/login" className={styles.backLink}>
          ← Back to Doctor Login
        </Link>
        <LanguageSelector />
      </div>

      <div className={styles.card}>
        <div className={styles.badge}>👨‍⚕️ Medical Practitioner Registration</div>
        <h1 className={styles.title}>Register as a Doctor on RAHAT</h1>
        <p className={styles.subtitle}>
          Join the RAHAT clinical network to review verified AI triage summaries, manage patient appointments, and issue digital prescriptions.
        </p>

        {isSuccess ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <h3>Account Successfully Registered!</h3>
            <p>Welcome to RAHAT, {formData.fullName}. Redirecting to your Clinical Dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.errorBox}>{error}</div>}

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Doctor Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Rajesh Sharma"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Medical Council Reg. Number *</label>
                <input
                  type="text"
                  name="regNumber"
                  value={formData.regNumber}
                  onChange={handleChange}
                  placeholder="e.g. MCI-2018-84729"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>State / National Medical Council *</label>
                <select
                  name="medicalCouncil"
                  value={formData.medicalCouncil}
                  onChange={handleChange}
                  className={styles.input}
                >
                  <option value="National Medical Commission (NMC / MCI)">National Medical Commission (NMC / MCI)</option>
                  <option value="Delhi Medical Council (DMC)">Delhi Medical Council (DMC)</option>
                  <option value="Maharashtra Medical Council (MMC)">Maharashtra Medical Council (MMC)</option>
                  <option value="West Bengal Medical Council (WBMC)">West Bengal Medical Council (WBMC)</option>
                  <option value="Karnataka Medical Council (KMC)">Karnataka Medical Council (KMC)</option>
                  <option value="Tamil Nadu Medical Council">Tamil Nadu Medical Council</option>
                  <option value="Other State Council">Other State Council</option>
                </select>
              </div>

              <div className={styles.field}>
                <label>Primary Specialty *</label>
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className={styles.input}
                >
                  <option value="General Medicine">General Medicine</option>
                  <option value="Internal Medicine">Internal Medicine</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="ENT">ENT</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Gynecology">Gynecology</option>
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Qualifications *</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="e.g. MBBS, MD (General Medicine)"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Years of Clinical Experience</label>
                <input
                  type="number"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  min="0"
                  max="60"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>Hospital / Clinic Affiliation</label>
              <input
                type="text"
                name="hospitalAffiliation"
                value={formData.hospitalAffiliation}
                onChange={handleChange}
                placeholder="e.g. Apollo Hospital / Private Clinic"
                className={styles.input}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="doctor@example.com"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Create Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Complete Registration & Access Dashboard →
            </button>
          </form>
        )}

        <div className={styles.footerLink}>
          Already registered as a Doctor? <Link href="/doctor/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
}
