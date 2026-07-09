'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './programs.module.css';

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const programLinks = [
    { label: 'Healthcare', href: '/programs/health' },
    { label: 'Education', href: '/programs/education' },
    { label: 'Livelihoods', href: '/programs/livelihood' },
    { label: 'Disability Inclusion', href: '/programs/disability-inclusion' },
    { label: 'Climate Action', href: '/programs/climate-action' },
    { label: 'Disaster Relief', href: '/programs/disaster-relief' },
  ];

  return (
    <div className={styles.programsWrapper}>
      {/* Programs Hero Banner */}
      <section className={styles.banner} aria-label="Programs Header">
        <div className={styles.bannerBg} />
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.sub}>Our Core Focus Areas</span>
          <h1>Sustainable Solutions for Grassroots Development</h1>
          <p>We work systematically to build social infrastructure, empower families, and resolve rural-urban service gaps across India.</p>
        </div>
      </section>

      {/* Sub Navigation Tabs */}
      <nav className={styles.subnav} aria-label="Programs Sub Navigation">
        <div className={`container ${styles.subnavContainer}`}>
          {programLinks.map((link) => {
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
