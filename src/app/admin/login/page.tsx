'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ShieldAlert, KeyRound } from 'lucide-react';
import styles from './login.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
        setLoading(false);
        return;
      }

      // Redirect to admin panel dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Login submit error:', err);
      setError('A network error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBg} />
      <main className={styles.loginCard}>
        <div className={styles.header}>
          <span className={styles.logo} role="img" aria-label="admin logo">🔐</span>
          <h1>THF Control Center</h1>
          <p>Sign in to manage blogs, careers, impact metrics, and review form submissions.</p>
        </div>

        {error && (
          <div className={styles.errorBox} role="alert">
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Work Email</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={18} />
              <input
                id="email"
                type="email"
                required
                placeholder="name@thehansfoundation.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Security Password</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={18} />
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? (
              <div className={styles.spinner} />
            ) : (
              <>
                <KeyRound size={18} />
                <span>Access Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div className={styles.hints}>
          <div>
            <strong>Test credentials seeded on startup:</strong>
          </div>
          <div>
            🔑 <span><strong>Admin:</strong> admin@thehansfoundation.org / THFAdmin2026! (Full read/write)</span>
          </div>
          <div>
            🔑 <span><strong>Editor:</strong> editor@thehansfoundation.org / THFEditor2026! (Modify posts/jobs)</span>
          </div>
          <div>
            🔑 <span><strong>Viewer:</strong> viewer@thehansfoundation.org / THFViewer2026! (Read-only)</span>
          </div>
        </div>
      </main>
    </div>
  );
}
export const dynamic = 'force-dynamic';
