import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LanguageSelector from './LanguageSelector';
import { AdminAuthState } from '@/types/user';
import styles from './AdminHeader.module.css';

export default function AdminHeader() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminAuthState | null>(null);

  useEffect(() => {
    try {
      const authStr = localStorage.getItem('rahat-admin-auth');
      if (authStr) {
        setAdmin(JSON.parse(authStr));
      }
    } catch (e) {}
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('rahat-admin-auth');
      router.push('/admin-secure-panel-2026/login');
    } catch (e) {
      router.push('/admin-secure-panel-2026/login');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.brand}>
            <span className={styles.shieldIcon}>🛡️</span>
            <div>
              <span className={styles.brandTitle}>RAHAT CORE</span>
              <span className={styles.secretTag}>CONFIDENTIAL ADMIN PANEL</span>
            </div>
          </div>
        </div>

        <nav className={styles.nav}>
          <Link href="/admin-secure-panel-2026/dashboard" className={styles.navLink}>
            📊 System Telemetry
          </Link>
          <Link href="/" className={styles.navLink}>
            🌐 View Public Site
          </Link>
        </nav>

        <div className={styles.rightSection}>
          <LanguageSelector />

          {admin && (
            <div className={styles.adminMeta}>
              <span className={styles.adminRole}>SUPERADMIN</span>
              <span className={styles.adminEmail}>{admin.email}</span>
            </div>
          )}

          <button onClick={handleLogout} className={styles.logoutBtn}>
            🔒 End Session (Logout)
          </button>
        </div>
      </div>
    </header>
  );
}
