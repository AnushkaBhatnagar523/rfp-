'use client';

import React, { useState } from 'react';
import { useGlobal } from '@/context/GlobalContext';
import styles from './AccessibilityToolbar.module.css';
import { Eye, Type, HelpCircle, X, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function AccessibilityToolbar() {
  const {
    theme,
    toggleTheme,
    contrast,
    toggleContrast,
    fontSize,
    changeFontSize,
    dyslexicFont,
    toggleDyslexicFont,
  } = useGlobal();

  const [isOpen, setIsOpen] = useState(false);
  const [readingGuide, setReadingGuide] = useState(false);
  const [guideTop, setGuideTop] = useState(200);

  // Handle mouse move for reading guide
  React.useEffect(() => {
    if (!readingGuide) return;

    const handleMouseMove = (e: MouseEvent) => {
      setGuideTop(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [readingGuide]);

  return (
    <>
      {readingGuide && (
        <div 
          className={styles.readingGuideLine} 
          style={{ top: `${guideTop}px` }}
          aria-hidden="true"
        />
      )}

      <div className={`${styles.toolbarWrapper} ${isOpen ? styles.open : ''}`}>
        <button
          className={styles.toggleBtn}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Accessibility Toolbar"
          title="Accessibility Toolbar"
        >
          <Eye size={20} />
          <span className={styles.toggleText}>Accessibility</span>
        </button>

        {isOpen && (
          <div className={`${styles.panel} glass`} role="region" aria-label="Accessibility Controls">
            <div className={styles.header}>
              <h3>Accessibility Controls</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className={styles.closeBtn}
                aria-label="Close panel"
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.optionGroup}>
              <span className={styles.optionLabel}>Text Size</span>
              <div className={styles.btnGrid}>
                <button
                  className={`${styles.actionBtn} ${fontSize === 'normal' ? styles.active : ''}`}
                  onClick={() => changeFontSize('normal')}
                  aria-label="Reset Font Size"
                >
                  A
                </button>
                <button
                  className={`${styles.actionBtn} ${fontSize === 'large' ? styles.active : ''}`}
                  onClick={() => changeFontSize('large')}
                  aria-label="Increase Font Size"
                  style={{ fontSize: '1.1rem' }}
                >
                  A+
                </button>
                <button
                  className={`${styles.actionBtn} ${fontSize === 'extra-large' ? styles.active : ''}`}
                  onClick={() => changeFontSize('extra-large')}
                  aria-label="Extra Large Font Size"
                  style={{ fontSize: '1.25rem' }}
                >
                  A++
                </button>
              </div>
            </div>

            <div className={styles.optionGroup}>
              <span className={styles.optionLabel}>Contrast & Font</span>
              <div className={styles.btnGrid}>
                <button
                  className={`${styles.actionBtn} ${contrast === 'high' ? styles.active : ''}`}
                  onClick={toggleContrast}
                  title="Toggle High Contrast"
                  aria-label="Toggle High Contrast"
                >
                  High Contrast
                </button>
                <button
                  className={`${styles.actionBtn} ${dyslexicFont ? styles.active : ''}`}
                  onClick={toggleDyslexicFont}
                  title="Toggle Dyslexic Font"
                  aria-label="Toggle Dyslexic Font"
                >
                  Dyslexia Font
                </button>
              </div>
            </div>

            <div className={styles.optionGroup}>
              <span className={styles.optionLabel}>Reading Aids</span>
              <div className={styles.btnGrid}>
                <button
                  className={`${styles.actionBtn} ${readingGuide ? styles.active : ''}`}
                  onClick={() => setReadingGuide(!readingGuide)}
                  aria-label="Toggle Reading Ruler"
                >
                  Reading Guide
                </button>
                <button
                  className={`${styles.actionBtn} ${theme === 'dark' ? styles.active : ''}`}
                  onClick={toggleTheme}
                  aria-label="Toggle Dark Mode"
                >
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </div>

            <div className={styles.footerLink}>
              <Link href="/accessibility" onClick={() => setIsOpen(false)}>
                <ShieldAlert size={14} />
                <span>Accessibility Statement</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
