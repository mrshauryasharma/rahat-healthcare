// components/DoctorHeader.tsx — Dedicated Clinical Navigation for Doctors
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from './LanguageProvider';
import LanguageSelector from './LanguageSelector';
import { DoctorAuthState } from '@/types/user';
import styles from './DoctorHeader.module.css';

export default function DoctorHeader() {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [doctor, setDoctor] = useState<DoctorAuthState | null>(null);

  useEffect(() => {
    try {
      const authStr = localStorage.getItem('rahat-doctor-auth');
      if (authStr) {
        setDoctor(JSON.parse(authStr));
      }
    } catch (e) {}
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('rahat-doctor-auth');
      router.push('/doctor/login');
    } catch (e) {
      router.push('/doctor/login');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link href="/doctor/dashboard" className={styles.logoLink}>
            <img src="/logo.png" alt="RAHAT" className={styles.logoImg} />
            <div>
              <span className={styles.brandTitle}>RAHAT</span>
              <span className={styles.portalTag}>Doctor Portal</span>
            </div>
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link 
            href="/doctor/dashboard" 
            className={`${styles.navLink} ${pathname === '/doctor/dashboard' ? styles.active : ''}`}
          >
            📋 Clinical Dashboard
          </Link>
          <Link 
            href="/doctor/prescriptions" 
            className={`${styles.navLink} ${pathname === '/doctor/prescriptions' ? styles.active : ''}`}
          >
            ✍️ Issue Digital Rx
          </Link>
          <Link 
            href="/" 
            className={styles.navLink}
          >
            🌐 Public Site
          </Link>
        </nav>

        <div className={styles.rightSection}>
          <LanguageSelector />

          {doctor && (
            <div className={styles.docProfileBadge}>
              <span className={styles.docName}>{doctor.name}</span>
              <span className={styles.docReg}>Reg: {doctor.regNumber}</span>
            </div>
          )}

          <button onClick={handleLogout} className={styles.logoutBtn} title="Logout of Doctor Portal">
            🚪 Logout
          </button>
        </div>
      </div>
    </header>
  );
}
