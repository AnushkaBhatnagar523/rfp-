'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './FloatingDonate.module.css';
import { Heart, MessageSquare, ChevronUp } from 'lucide-react';

export default function FloatingDonate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Desktop Floating Actions */}
      <div className={`${styles.container} ${visible ? styles.visible : ''}`}>
        <button
          onClick={scrollToTop}
          className={`${styles.floatBtn} ${styles.topBtn}`}
          aria-label="Back to Top"
          title="Back to Top"
        >
          <ChevronUp size={20} />
        </button>

        <Link
          href="/contact"
          className={`${styles.floatBtn} ${styles.contactBtn}`}
          aria-label="Contact Us"
          title="Contact Us"
        >
          <MessageSquare size={20} />
          <span className={styles.tooltip}>Contact Us</span>
        </Link>

        <Link
          href="/donate"
          className={`${styles.floatBtn} ${styles.donateBtn}`}
          aria-label="Donate Now"
          title="Donate Now"
        >
          <Heart size={20} fill="white" />
          <span className={styles.tooltip}>Donate Now</span>
        </Link>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className={styles.mobileBottomBar}>
        <Link href="/contact" className={styles.mobileContactLink}>
          <MessageSquare size={18} />
          <span>Inquire</span>
        </Link>
        <Link href="/donate" className={styles.mobileDonateLink}>
          <Heart size={18} fill="white" />
          <span>Donate Now</span>
        </Link>
      </div>
    </>
  );
}
