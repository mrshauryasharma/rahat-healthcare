"use client";

import React from 'react';
import { useLanguage } from './LanguageProvider';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logoSection}>
            <img src="/logo.png" alt="RAHAT Logo" className={styles.logoImage} />
            <span className={styles.logoText}>RAHAT</span>
          </div>
          <p className={styles.disclaimer}>{t('footer.disclaimer') || 'Information is for guidance only, not medical advice.'}</p>
        </div>
        
        <div className={styles.links}>
          <a href="#about" className={styles.link}>{t('footer.about') || 'About'}</a>
          <a href="#privacy" className={styles.link}>{t('footer.privacy') || 'Privacy'}</a>
          <a href="#terms" className={styles.link}>{t('footer.terms') || 'Terms'}</a>
          <a href="#help" className={styles.link}>{t('footer.help') || 'Help'}</a>
          <a href="#contact" className={styles.link}>{t('footer.contact') || 'Contact'}</a>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© 2026 RAHAT Healthcare. {t('footer.allRightsReserved') || 'All rights reserved.'}</p>
      </div>
    </footer>
  );
}
