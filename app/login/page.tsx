'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/components/LanguageProvider';
import { sendOtp } from '@/lib/supabase';
import styles from './page.module.css';

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE !== 'false';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 10-digit validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError(t('login.invalidPhone') || 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      sessionStorage.setItem('rahat-pending-phone', phone);
      const res = await sendOtp(phone);
      if (res.success) {
        router.push('/verify-otp');
      } else {
        setError(res.error || t('common.error') || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError(t('common.error') || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← {t('common.back') || 'Back'}
        </Link>
        <LanguageSelector />
      </div>
      
      <div className={styles.card}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="RAHAT Logo" className={styles.logoImg} />
        </div>
        
        <h1 className={styles.title}>{t('login.title') || 'Login to RAHAT'}</h1>
        <p className={styles.subtitle}>{t('login.subtitle') || 'Enter your mobile number to get started'}</p>

        {isDemo && (
          <div className={styles.demoNote}>
            ℹ️ {t('login.demoNote') || 'Demo Mode: Use OTP 123456 for testing.'}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>{t('login.phoneLabel') || 'Mobile Number'}</label>
          <div className={styles.inputGroup}>
            <div className={styles.prefix}>+91</div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder={t('login.phonePlaceholder') || 'Enter 10-digit mobile number'}
              className={styles.input}
              maxLength={10}
              autoFocus
            />
          </div>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <button type="submit" className={styles.button} disabled={loading || phone.length !== 10}>
            {loading ? (t('login.sending') || 'Sending...') : (t('login.sendOtp') || 'Send OTP')}
          </button>
        </form>
      </div>
    </div>
  );
}
