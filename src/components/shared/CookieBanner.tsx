'use client';

import React, { useState, useEffect } from 'react';
import { useGlobal } from '@/context/GlobalContext';
import styles from './CookieBanner.module.css';
import { ShieldCheck, X } from 'lucide-react';
import Link from 'next/link';

export default function CookieBanner() {
  const { cookieConsent, saveCookieConsent } = useGlobal();
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    if (cookieConsent === null) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500); // Small delay for better UX
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [cookieConsent]);

  const handleAcceptAll = () => {
    saveCookieConsent(true);
    setVisible(false);
  };

  const handleDecline = () => {
    saveCookieConsent(false);
    setVisible(false);
  };

  const handleSavePreferences = () => {
    // In a production application, you would initialize cookies based on preferences
    saveCookieConsent(prefs.analytics || prefs.marketing);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={`${styles.banner} glass`} role="alert" aria-live="polite">
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <ShieldCheck size={28} className={styles.icon} />
        </div>
        
        <div className={styles.content}>
          {!showPreferences ? (
            <>
              <p className={styles.text}>
                We use cookies to improve your browsing experience, analyze site traffic, and personalize content. In compliance with the **Digital Personal Data Protection Act (DPDPA) 2023**, we require your consent to process non-essential tracking technologies.{' '}
                <Link href="/privacy-policy" className={styles.policyLink}>
                  Privacy Policy
                </Link>
              </p>
              <div className={styles.actions}>
                <button onClick={handleAcceptAll} className="btn btn-primary btn-sm">
                  Accept All
                </button>
                <button onClick={() => setShowPreferences(true)} className="btn btn-outline btn-sm">
                  Cookie Settings
                </button>
                <button onClick={handleDecline} className="btn btn-ghost btn-sm">
                  Decline
                </button>
              </div>
            </>
          ) : (
            <div className={styles.prefPanel}>
              <h4>Cookie Preferences</h4>
              <div className={styles.prefItem}>
                <div className={styles.prefInfo}>
                  <label htmlFor="essential" className={styles.prefLabel}>Necessary Cookies</label>
                  <p className={styles.prefDesc}>Required for secure site operation, session management, and donations.</p>
                </div>
                <input
                  type="checkbox"
                  id="essential"
                  checked={prefs.essential}
                  disabled
                  className={styles.prefCheck}
                />
              </div>

              <div className={styles.prefItem}>
                <div className={styles.prefInfo}>
                  <label htmlFor="analytics" className={styles.prefLabel}>Analytics Cookies</label>
                  <p className={styles.prefDesc}>Help us measure visitor counts, map outreach success, and evaluate site loading speeds.</p>
                </div>
                <input
                  type="checkbox"
                  id="analytics"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                  className={styles.prefCheck}
                />
              </div>

              <div className={styles.prefItem}>
                <div className={styles.prefInfo}>
                  <label htmlFor="marketing" className={styles.prefLabel}>Marketing & Outreach</label>
                  <p className={styles.prefDesc}>Allow us to share relevant impact updates on social media networks.</p>
                </div>
                <input
                  type="checkbox"
                  id="marketing"
                  checked={prefs.marketing}
                  onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                  className={styles.prefCheck}
                />
              </div>

              <div className={styles.prefActions}>
                <button onClick={handleSavePreferences} className="btn btn-primary btn-sm">
                  Save My Preferences
                </button>
                <button onClick={() => setShowPreferences(false)} className="btn btn-outline btn-sm">
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
