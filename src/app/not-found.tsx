'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Search, ArrowRight } from 'lucide-react';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Big 404 Number */}
        <div className={styles.errorCode} aria-hidden="true">404</div>

        {/* Icon */}
        <div className={styles.iconRing}>
          <Search size={40} />
        </div>

        {/* Text */}
        <h1 className={styles.heading}>Page Not Found</h1>
        <p className={styles.subtext}>
          Sorry, the page you are looking for may have moved, been renamed, or no longer exists. Let us help you find your way back.
        </p>

        {/* Quick Nav Cards */}
        <div className={styles.suggestionsGrid}>
          <Link href="/" className={`${styles.suggestion} glass hover-lift`}>
            <span className={styles.suggestionIcon}>🏠</span>
            <div>
              <h3>Homepage</h3>
              <p>Start from the THF home</p>
            </div>
            <ArrowRight size={16} className={styles.suggestionArrow} />
          </Link>
          <Link href="/programs/health" className={`${styles.suggestion} glass hover-lift`}>
            <span className={styles.suggestionIcon}>❤️</span>
            <div>
              <h3>Healthcare Programs</h3>
              <p>Mobile clinics & dialysis</p>
            </div>
            <ArrowRight size={16} className={styles.suggestionArrow} />
          </Link>
          <Link href="/donate" className={`${styles.suggestion} glass hover-lift`}>
            <span className={styles.suggestionIcon}>💝</span>
            <div>
              <h3>Donate Online</h3>
              <p>Support our programs (80G)</p>
            </div>
            <ArrowRight size={16} className={styles.suggestionArrow} />
          </Link>
          <Link href="/contact" className={`${styles.suggestion} glass hover-lift`}>
            <span className={styles.suggestionIcon}>📬</span>
            <div>
              <h3>Contact Us</h3>
              <p>Reach our support desk</p>
            </div>
            <ArrowRight size={16} className={styles.suggestionArrow} />
          </Link>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
          <Link href="/" className="btn btn-primary">
            <Home size={16} />
            <span>Return to Homepage</span>
          </Link>
          <Link href="/search" className="btn btn-secondary">
            <Search size={16} />
            <span>Search Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
