// app/admin-secure-panel-2026/login/page.tsx — Secret Administrator Portal Login
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import { AdminAuthState } from '@/types/user';
import styles from './page.module.css';

export default function SecretAdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.length >= 6) {
      const adminAuth: AdminAuthState = {
        isLoggedIn: true,
        adminId: `ADM-${Date.now().toString().slice(-4)}`,
        email: email.trim(),
        role: 'superadmin'
      };
      localStorage.setItem('rahat-admin-auth', JSON.stringify(adminAuth));
      router.push('/admin-secure-panel-2026/dashboard');
    } else {
      setError('Please enter a valid administrator email and password (minimum 6 characters).');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link href="/" className={styles.backLink}>
          ← Back to Public Website
        </Link>
        <LanguageSelector />
      </div>

      <div className={styles.card}>
        <div className={styles.badge}>🔒 Confidential Administration Console</div>
        <h1 className={styles.title}>RAHAT Core Control Panel</h1>
        <p className={styles.subtitle}>
          Restricted platform security access. Authorized administrator credentials required.
        </p>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <label>Admin Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@rahat.internal"
              className={styles.input}
              required
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label>Security Key / Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className={styles.input}
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitBtn}>
            Authenticate & Access Console →
          </button>
        </form>

        <div className={styles.footerNote}>
          This URL is confidential. Do not share platform credentials.
        </div>
      </div>
    </div>
  );
}
