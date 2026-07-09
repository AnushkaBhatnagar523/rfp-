'use client';

import React from 'react';
import styles from '../resources.module.css';
import { FileText, Download } from 'lucide-react';

interface ReportDoc {
  title: string;
  year: string;
  size: string;
  desc: string;
}

const reports: ReportDoc[] = [
  {
    title: 'Annual Impact Report FY 2025-26',
    year: '2025-2026',
    size: '4.8 MB',
    desc: 'Detailed output statistics, field program reviews, case studies, and audit logs of the Swasthya Cities project launch.',
  },
  {
    title: 'Annual Impact Report FY 2024-25',
    year: '2024-2025',
    size: '3.6 MB',
    desc: 'Key milestones in cochlear implants program, school smart classroom setups, and agricultural livelihoods grants.',
  },
  {
    title: 'Annual Impact Report FY 2023-24',
    year: '2023-2024',
    size: '4.2 MB',
    desc: 'Outreach footprints across Uttarakhand, water harvesting grids results (Hans Jal Dhara), and vocational skills placements.',
  },
];

export default function AnnualReports() {
  const triggerDownload = (title: string) => {
    alert(`Downloading ${title} mock PDF document...`);
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '3rem' }}>
        <h2>Annual Programmatic Reports</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: '0.25rem' }}>
          Download our comprehensive annual reports to review detailed breakdowns of budgets, operations, and grassroots outreach results.
        </p>
      </div>

      <div className={styles.docGrid}>
        {reports.map((rep, idx) => (
          <div key={idx} className={`${styles.docCard} hover-lift glass`}>
            <div className={styles.docIconWrapper}>
              <FileText size={24} />
            </div>
            <h3>{rep.title}</h3>
            <p>{rep.desc}</p>
            <button 
              onClick={() => triggerDownload(rep.title)} 
              className={styles.downloadLink}
              aria-label={`Download ${rep.title} (${rep.size})`}
            >
              <Download size={16} />
              <span>Download PDF ({rep.size})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
