// app/verify-otp/page.tsx — OTP verification page
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import { verifyOtp, sendOtp } from '@/lib/supabase';
import { generateHealthId } from '@/lib/healthId';
import { createEmptyProfile } from '@/types/user';
import styles from './page.module.css';

export default function VerifyOtpPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const storedPhone = sessionStorage.getItem('rahat-pending-phone');
    if (storedPhone) {
      setPhone(storedPhone);
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError(t('otp.invalidOtp') || 'Please enter a 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const result = await verifyOtp(phone, otp);
      if (result.success) {
        const profileKey = `rahat-profile-${phone}`;
        const existingProfile = localStorage.getItem(profileKey);
        let healthId = '';

        if (!existingProfile) {
          // New user — create empty profile
          healthId = generateHealthId();
          const newProfile = createEmptyProfile(phone, healthId);
          localStorage.setItem(profileKey, JSON.stringify(newProfile));
        } else {
          // Existing user — load their health ID
          healthId = JSON.parse(existingProfile).rahatHealthId || generateHealthId();
        }

        // Store auth state
        const authState = { isLoggedIn: true, phone, userId: healthId };
        localStorage.setItem('rahat-auth', JSON.stringify(authState));

        // Navigate to onboarding if new, dashboard if existing
        if (!existingProfile || !JSON.parse(existingProfile || '{}').profileCompleted) {
          router.push('/onboarding');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(result.error || t('otp.invalidOtp') || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(t('common.error') || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    try {
      await sendOtp(phone);
      alert(t('otp.resend') || 'OTP resent successfully');
    } catch (err) {
      setError(t('common.error') || 'Failed to resend OTP.');
    }
  };

  const maskedPhone = phone ? `******${phone.slice(-4)}` : '';

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{t('otp.title')}</h1>
        <p className={styles.subtitle}>
          {t('otp.subtitle')} +91 {maskedPhone}
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className={styles.input}
            placeholder="000000"
            maxLength={6}
          />
          
          {error && <div className={styles.error}>{error}</div>}
          
          <button type="submit" className={styles.button} disabled={loading || otp.length !== 6}>
            {loading ? t('otp.verifying') : t('otp.verify')}
          </button>
        </form>

        <button onClick={handleResend} className={styles.resendBtn} type="button">
          {t('otp.resend')}
        </button>
      </div>
    </div>
  );
}
