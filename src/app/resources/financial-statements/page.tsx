'use client';

import React from 'react';
import styles from '../resources.module.css';
import { FileText, Download } from 'lucide-react';

interface StatementDoc {
  title: string;
  type: string;
  size: string;
  desc: string;
}

const statements: StatementDoc[] = [
  {
    title: 'Audited Financial Statement FY 2025-26',
    type: 'Audited Balance Sheet',
    size: '1.8 MB',
    desc: 'Audited financial balance sheet, profit and loss statements, and cash flows audited by Ernst & Young (EY).',
  },
  {
    title: 'Audited Financial Statement FY 2024-25',
    type: 'Audited Balance Sheet',
    size: '1.4 MB',
    desc: 'Audited accounts summary detailing donor allocations and program implementation expenses.',
  },
  {
    title: '80G Income Tax Exemption Certificate',
    type: 'Tax Certificate',
    size: '640 KB',
    desc: 'Tax exemption certificate under Section 80G of the Indian Income Tax Act, 1961 for donation deductions.',
  },
  {
    title: 'THF Trust Registration Deed',
    type: 'Trust Certificate',
    size: '2.4 MB',
    desc: 'Official trust registration deed established in 2009 for public charitable purposes in India.',
  },
];

export default function FinancialStatements() {
  const triggerDownload = (title: string) => {
    alert(`Downloading ${title} mock document...`);
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '3rem' }}>
        <h2>Audited Accounts & Statutory Certificates</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: '0.25rem' }}>
          We hold ourselves to strict standards of financial discipline. Review our audited statements and registration documents below.
        </p>
      </div>

      <div className={styles.docGrid}>
        {statements.map((stmt, idx) => (
          <div key={idx} className={`${styles.docCard} hover-lift glass`}>
            <div className={styles.docIconWrapper}>
              <FileText size={24} />
            </div>
            <h3>{stmt.title}</h3>
            <p>{stmt.desc}</p>
            <button 
              onClick={() => triggerDownload(stmt.title)} 
              className={styles.downloadLink}
              aria-label={`Download ${stmt.title} (${stmt.size})`}
            >
              <Download size={16} />
              <span>Download PDF ({stmt.size})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
