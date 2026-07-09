'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './resources.module.css';

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const resourceLinks = [
    { label: 'Annual Reports', href: '/resources/annual-reports' },
    { label: 'Financial Statements', href: '/resources/financial-statements' },
    { label: 'Governance & Policies', href: '/resources/policies' },
    { label: 'Downloads', href: '/resources/downloads' },
  ];

  return (
    <div className={styles.resourcesWrapper}>
      {/* Resources Hero Banner */}
      <section className={styles.banner} aria-label="Resources Header">
        <div className={styles.bannerBg} />
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.sub}>THF Transparency Hub</span>
          <h1>Governance, Audits & Annual Reports</h1>
          <p>THF is committed to compliance, audit integrity, and full transparency. Explore our financial disclosures and programmatic records.</p>
        </div>
      </section>

      {/* Sub Navigation Tabs */}
      <nav className={styles.subnav} aria-label="Resources Sub Navigation">
        <div className={`container ${styles.subnavContainer}`}>
          {resourceLinks.map((link) => {
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
