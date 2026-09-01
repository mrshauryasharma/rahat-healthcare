"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from './LanguageProvider';
import LanguageSelector from './LanguageSelector';
import styles from './Header.module.css';

export default function Header() {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const authStatus = localStorage.getItem('rahat-auth');
      if (authStatus) {
        const parsed = JSON.parse(authStatus);
        if (parsed && parsed.isLoggedIn) {
          setIsAuthenticated(true);
        }
      }
    } catch (e) {
      setIsAuthenticated(false);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    try {
      localStorage.removeItem('rahat-auth');
      setIsAuthenticated(false);
      setIsMenuOpen(false);
      router.push('/login');
    } catch (e) {
      router.push('/login');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <Link href="/" className={styles.logoLink} onClick={() => setIsMenuOpen(false)}>
            <img src="/logo.png" alt="RAHAT Logo" className={styles.logoImage} />
            <span className={styles.logoText}>RAHAT</span>
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

        {/* Navigation Menu */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <div className={styles.navLinks}>
            <Link 
              href="/" 
              className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`} 
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home') || 'Home'}
            </Link>
            <Link 
              href="/dashboard" 
              className={`${styles.navLink} ${pathname === '/dashboard' ? styles.active : ''}`} 
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.dashboard') || 'Dashboard'}
            </Link>
            <Link 
              href="/health-check" 
              className={`${styles.navLink} ${pathname?.startsWith('/health-check') ? styles.active : ''}`} 
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.healthCheck') || 'Health Check'}
            </Link>
            <Link 
              href="/chat" 
              className={`${styles.navLink} ${styles.aiChatLink} ${pathname === '/chat' ? styles.active : ''}`} 
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={styles.aiIcon}>🤖</span> {t('nav.aiChat') || 'AI Assistant'}
            </Link>
            <Link 
              href="/history" 
              className={`${styles.navLink} ${pathname === '/history' ? styles.active : ''}`} 
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.history') || 'History'}
            </Link>
            <Link 
              href="/appointments" 
              className={`${styles.navLink} ${pathname === '/appointments' ? styles.active : ''}`} 
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.appointments') || 'Appointments'}
            </Link>
          </div>

          {/* Right Actions: Doctor Portal, Language, Auth */}
          <div className={styles.actions}>
            <Link href="/doctor/login" className={styles.doctorPortalPill} onClick={() => setIsMenuOpen(false)}>
              <span className={styles.doctorIcon}>👨‍⚕️</span>
              <span className={styles.doctorText}>{t('nav.doctorPortal') || 'Doctor Portal'}</span>
            </Link>

            <LanguageSelector />

            {isAuthenticated ? (
              <button onClick={handleLogout} className={styles.logoutButton}>
                {t('nav.logout') || 'Logout'}
              </button>
            ) : (
              <Link href="/login" className={styles.authButton} onClick={() => setIsMenuOpen(false)}>
                {t('nav.login') || 'Login'}
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
