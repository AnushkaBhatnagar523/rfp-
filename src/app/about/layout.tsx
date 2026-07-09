'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './about.module.css';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const subLinks = [
    { label: 'Our Story', href: '/about/our-story' },
    { label: 'Vision & Mission', href: '/about/vision-mission' },
    { label: 'Leadership Team', href: '/about/leadership' },
    { label: 'Board of Trustees', href: '/about/board-members' },
  ];

  return (
    <div className={styles.aboutWrapper}>
      {/* Secondary Hero Banner */}
      <section className={styles.banner} aria-label="About Us Header">
        <div className={styles.bannerBg} />
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.sub}>Who We Are</span>
          <h1>Empowering Communities Since 2009</h1>
          <p>We work to create an equitable society where every individual has access to healthcare, inclusive learning, and sustainable livelihoods.</p>
        </div>
      </section>

      {/* Sub Navigation Tabs */}
      <nav className={styles.subnav} aria-label="About Us Sub Navigation">
        <div className={`container ${styles.subnavContainer}`}>
          {subLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`${styles.subnavLink} ${isActive ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className={styles.contentSection}>
        {children}
      </div>
    </div>
  );
}
