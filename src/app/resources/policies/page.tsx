'use client';

import React from 'react';
import styles from '../resources.module.css';
import { FileText, Download } from 'lucide-react';

interface PolicyDoc {
  title: string;
  size: string;
  desc: string;
}

const policies: PolicyDoc[] = [
  {
    title: 'THF Code of Conduct & Ethics',
    size: '420 KB',
    desc: 'Guiding principles of honesty, community respect, and professional ethics for all field staff and partners.',
  },
  {
    title: 'Child Protection & Safeguarding Policy',
    size: '560 KB',
    desc: 'Operational guidelines to protect children from abuse, exploitation, and safety hazards during program setups.',
  },
  {
    title: 'Whistleblower Protection Policy',
    size: '320 KB',
    desc: 'Confidential reporting channels to report financial fraud, ethical concerns, or rule violations without retaliation.',
  },
  {
    title: 'Gender Equality & Prevention of Sexual Harassment (POSH)',
    size: '480 KB',
    desc: 'Maintaining a safe, equal work environment free of harassment in compliance with Indian statutory POSH mandates.',
  },
];

export default function GovernancePolicies() {
  const triggerDownload = (title: string) => {
    alert(`Downloading ${title} mock policy PDF...`);
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '3rem' }}>
        <h2>Governance & Compliance Policies</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: '0.25rem' }}>
          Our governance frameworks ensure ethical field operations, strict safety standards, and transparent reporting codes.
        </p>
      </div>

      <div className={styles.docGrid}>
        {policies.map((pol, idx) => (
          <div key={idx} className={`${styles.docCard} hover-lift glass`}>
            <div className={styles.docIconWrapper}>
              <FileText size={24} />
            </div>
            <h3>{pol.title}</h3>
            <p>{pol.desc}</p>
            <button 
              onClick={() => triggerDownload(pol.title)} 
              className={styles.downloadLink}
              aria-label={`Download ${pol.title} (${pol.size})`}
            >
              <Download size={16} />
              <span>Download PDF ({pol.size})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
