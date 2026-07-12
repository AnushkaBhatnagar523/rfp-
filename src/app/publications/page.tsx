'use client';

import React, { useState } from 'react';
import styles from './publications.module.css';
import { BookOpen, Download, FileText, Newspaper, Info, Calendar } from 'lucide-react';

interface PublicationItem {
  id: string;
  title: string;
  description: string;
  category: 'research' | 'newsletter' | 'brochure' | 'manual';
  publishDate: string;
  fileSize: string;
  pageCount: number;
  filePath: string;
}

const mockPublications: PublicationItem[] = [
  {
    id: 'pub-1',
    title: 'Auditory-Verbal Rehabilitation & Inclusion: A Cochlear Implant Impact Study',
    description: 'An empirical analysis of standard speech therapy milestones and mainstream schooling integrations for children under 6 in Uttarakhand.',
    category: 'research',
    publishDate: 'June 2025',
    fileSize: '2.8 MB',
    pageCount: 34,
    filePath: '/proposal format.pdf'
  },
  {
    id: 'pub-2',
    title: 'Hans Sandesh Quarterly Newsletter - Q1 2026',
    description: 'Our quarterly bulletin showcasing MMU healthcare statistics, smart classroom launches, and self-help group success stories.',
    category: 'newsletter',
    publishDate: 'April 2026',
    fileSize: '4.1 MB',
    pageCount: 16,
    filePath: '/proposal format.pdf'
  },
  {
    id: 'pub-3',
    title: 'Mobile Medical Units Operational Manual & Protocols',
    description: 'Standard operating procedures (SOPs) for MMU clinical staff, covering drug dispensing guidelines, sanitation codes, and referrals.',
    category: 'manual',
    publishDate: 'January 2026',
    fileSize: '3.5 MB',
    pageCount: 52,
    filePath: '/proposal format.pdf'
  },
  {
    id: 'pub-4',
    title: 'The Hans Foundation General Program Brochure',
    description: 'An informative summary of our programmatic presence across 23 states, including program scopes, partners, and donation channels.',
    category: 'brochure',
    publishDate: 'March 2026',
    fileSize: '1.9 MB',
    pageCount: 8,
    filePath: '/proposal format.pdf'
  },
  {
    id: 'pub-5',
    title: 'Spring-Shed Hydrological Recharge Implementation Guide',
    description: 'A detailed manual for field coordinators detailing geological assessment, trench structures, and community sanitation rules.',
    category: 'manual',
    publishDate: 'November 2025',
    fileSize: '5.2 MB',
    pageCount: 42,
    filePath: '/proposal format.pdf'
  },
  {
    id: 'pub-6',
    title: 'Rural Women Micro-Entrepreneurs Market Survey Report',
    description: 'A research paper surveying consumer preferences and supply chain hurdles for self-help group organic foods in Jharkhand.',
    category: 'research',
    publishDate: 'September 2025',
    fileSize: '3.1 MB',
    pageCount: 28,
    filePath: '/proposal format.pdf'
  }
];

export default function PublicationsPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'research' | 'newsletter' | 'brochure' | 'manual'>('all');

  const filteredPublications = mockPublications.filter(pub => {
    if (activeCategory === 'all') return true;
    return pub.category === activeCategory;
  });

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <section className={styles.banner} aria-label="Publications Banner">
        <div className={styles.bannerBg} />
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.sub}>Knowledge Library</span>
          <h1>Publications, Manuals & Field Insights</h1>
          <p>Read our research papers, operating manuals, and project progress newsletters to understand our development methodologies on the ground.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.mainContent} aria-label="Publications Content">
        <div className={styles.container}>
          
          {/* Controls Row */}
          <div className={styles.controlsRow}>
            <div className={styles.tabs}>
              <button 
                onClick={() => setActiveCategory('all')}
                className={`${styles.tabBtn} ${activeCategory === 'all' ? styles.activeTab : ''}`}
              >
                All Documents
              </button>
              <button 
                onClick={() => setActiveCategory('research')}
                className={`${styles.tabBtn} ${activeCategory === 'research' ? styles.activeTab : ''}`}
              >
                Research
              </button>
              <button 
                onClick={() => setActiveCategory('newsletter')}
                className={`${styles.tabBtn} ${activeCategory === 'newsletter' ? styles.activeTab : ''}`}
              >
                Newsletters
              </button>
              <button 
                onClick={() => setActiveCategory('manual')}
                className={`${styles.tabBtn} ${activeCategory === 'manual' ? styles.activeTab : ''}`}
              >
                Manuals
              </button>
              <button 
                onClick={() => setActiveCategory('brochure')}
                className={`${styles.tabBtn} ${activeCategory === 'brochure' ? styles.activeTab : ''}`}
              >
                Brochures
              </button>
            </div>
          </div>

          {/* Publications Grid */}
          <div className={styles.grid}>
            {filteredPublications.map(pub => (
              <article key={pub.id} className={`${styles.card} glass`}>
                <div className={styles.coverPlaceholder}>
                  <span className={styles.docBadge}>{pub.category}</span>
                  {pub.category === 'research' && <BookOpen size={48} />}
                  {pub.category === 'newsletter' && <Newspaper size={48} />}
                  {pub.category === 'manual' && <FileText size={48} />}
                  {pub.category === 'brochure' && <FileText size={48} style={{ color: 'var(--accent)' }} />}
                </div>

                <div className={styles.cardContent}>
                  <h3>{pub.title}</h3>
                  <p>{pub.description}</p>
                  
                  <div className={styles.metaRow}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={13} /> {pub.publishDate}
                    </span>
                    <span>{pub.pageCount} Pages ({pub.fileSize})</span>
                  </div>

                  <a href={pub.filePath} download className="btn btn-secondary btn-sm styles.downloadLink">
                    <Download size={14} />
                    <span>Download PDF</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
