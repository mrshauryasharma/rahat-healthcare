// components/PatientHeader.tsx — Dedicated Navigation Bar for Logged-In Patients
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from './LanguageProvider';
import LanguageSelector from './LanguageSelector';
import styles from './PatientHeader.module.css';

export default function PatientHeader() {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [healthId, setHealthId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const authStr = localStorage.getItem('rahat-auth');
      if (authStr) {
        const auth = JSON.parse(authStr);
        const profileStr = localStorage.getItem(`rahat-profile-${auth.phone}`);
        if (profileStr) {
          const profile = JSON.parse(profileStr);
          setHealthId(profile.rahatHealthId || auth.userId || '');
          setPatientName(profile.name || 'Patient');
        } else {
          setHealthId(auth.userId || '');
        }
      }
    } catch (e) {}
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('rahat-auth');
      router.push('/login');
    } catch (e) {
      router.push('/login');
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Brand Logo with Patient Badge */}
        <div className={styles.logoSection}>
          <Link href="/dashboard" className={styles.logoLink} onClick={() => setIsMenuOpen(false)}>
            <img src="/logo.png" alt="RAHAT Logo" className={styles.logoImage} />
            <div>
              <span className={styles.logoText}>RAHAT</span>
              <span className={styles.roleTag}>Patient Care</span>
            </div>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className={styles.hamburger} 
          onClick={toggleMenu} 
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Patient-Only Navigation Links */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <div className={styles.navLinks}>
            <Link 
              href="/dashboard" 
              className={`${styles.navLink} ${pathname === '/dashboard' ? styles.active : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              📊 {t('nav.dashboard') || 'Dashboard'}
            </Link>
            <Link 
              href="/health-check" 
              className={`${styles.navLink} ${pathname?.startsWith('/health-check') ? styles.active : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              🩺 {t('nav.healthCheck') || 'Health Check'}
            </Link>
            <Link 
              href="/chat" 
              className={`${styles.navLink} ${styles.aiChatLink} ${pathname === '/chat' ? styles.active : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              🤖 {t('nav.aiChat') || 'AI Assistant'}
            </Link>
            <Link 
              href="/history" 
              className={`${styles.navLink} ${pathname === '/history' ? styles.active : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              📋 {t('nav.history') || 'My Reports'}
            </Link>
            <Link 
              href="/appointments" 
              className={`${styles.navLink} ${pathname === '/appointments' ? styles.active : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              📅 {t('nav.appointments') || 'Appointments'}
            </Link>
            <Link 
              href="/profile" 
              className={`${styles.navLink} ${pathname === '/profile' ? styles.active : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              👤 {t('nav.profile') || 'Profile'}
            </Link>
          </div>

          {/* Right Actions: Health ID, Language Switcher, and Logout */}
          <div className={styles.actions}>
            {healthId && (
              <div className={styles.healthIdBadge} title="Your RAHAT Health ID">
                <span className={styles.idLabel}>ID</span>
                <span className={styles.idCode}>{healthId}</span>
              </div>
            )}

            <LanguageSelector />

            <button onClick={handleLogout} className={styles.logoutButton} title="Logout of Patient Account">
              🚪 {t('nav.logout') || 'Logout'}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
