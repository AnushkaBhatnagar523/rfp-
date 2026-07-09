'use client';

import React from 'react';
import styles from '../resources.module.css';
import { FileText, Download } from 'lucide-react';

interface AssetDoc {
  title: string;
  size: string;
  desc: string;
}

const assets: AssetDoc[] = [
  {
    title: 'THF Brand Brochure & Media Kit 2026',
    size: '6.4 MB',
    desc: 'Official organization overview booklet, high-resolution logos, brand guidelines, and leadership profiles for press use.',
  },
  {
    title: 'Mobile Medical Units (MMUs) Operational Guide',
    size: '2.1 MB',
    desc: 'Technical brochure explaining MMUs design, diagnostic capabilities, staffing models, and state outreach data.',
  },
  {
    title: 'THF Logo Assets Package (SVG/PNG)',
    size: '1.2 MB',
    desc: 'Zipped file containing primary and secondary brand logos in vector formats, optimized for web and print media.',
  },
];

export default function ResourceDownloads() {
  const triggerDownload = (title: string) => {
    alert(`Downloading ${title} mock assets zip file...`);
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '3rem' }}>
        <h2>Brochures & Press Downloads</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: '0.25rem' }}>
          Access THF brochures, informational flyers, and official logo packages optimized for media, press, or researcher outreach.
        </p>
      </div>

      <div className={styles.docGrid}>
        {assets.map((asset, idx) => (
          <div key={idx} className={`${styles.docCard} hover-lift glass`}>
            <div className={styles.docIconWrapper}>
              <FileText size={24} />
            </div>
            <h3>{asset.title}</h3>
            <p>{asset.desc}</p>
            <button 
              onClick={() => triggerDownload(asset.title)} 
              className={styles.downloadLink}
              aria-label={`Download ${asset.title} (${asset.size})`}
            >
              <Download size={16} />
              <span>Download File ({asset.size})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
