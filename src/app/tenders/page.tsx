'use client';

import React from 'react';
import styles from './tenders.module.css';
import { FileText, Download, Calendar, Users, AlertCircle, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

interface TenderItem {
  id: string;
  title: string;
  publishDate: string;
  closingDate: string;
  category: string;
  status: 'active' | 'closed';
  eligibility: string;
  documentPath: string;
}

const mockTenders: TenderItem[] = [
  {
    id: 'THF/MMU/2026/04',
    title: 'Procurement of 5 Custom-Fabricated Mobile Medical Vans with Diagnostic Laboratories',
    publishDate: 'July 10, 2026',
    closingDate: 'August 10, 2026',
    category: 'Healthcare Equipment & Vehicles',
    status: 'active',
    eligibility: 'Authorized Automotive Fabricators & Medical Equipment Suppliers',
    documentPath: '/proposal format.pdf'
  },
  {
    id: 'THF/EDU/2026/09',
    title: 'Supply, Installation, and Support of Interactive Smart Boards in 45 Ranchi Public Schools',
    publishDate: 'July 05, 2026',
    closingDate: 'July 30, 2026',
    category: 'Education Technology (EdTech)',
    status: 'active',
    eligibility: 'OEMs or Certified Systems Integrators with presence in Jharkhand',
    documentPath: '/proposal format.pdf'
  },
  {
    id: 'THF/WAT/2026/02',
    title: 'Civil Construction of Geo-Hydrological Check Dams & Spring-Shed Recharges in Pithoragarh',
    publishDate: 'May 10, 2026',
    closingDate: 'June 05, 2026',
    category: 'Civil Works & Watershed Management',
    status: 'closed',
    eligibility: 'Class A Registered Civil Contractors with experience in mountainous terrains',
    documentPath: '/proposal format.pdf'
  },
  {
    id: 'THF/AUD/2026/01',
    title: 'Empanelment of External Auditing Agency for Annual Program Performance Verification',
    publishDate: 'April 15, 2026',
    closingDate: 'May 15, 2026',
    category: 'Professional Auditing Services',
    status: 'closed',
    eligibility: 'Chartered Accountant firms with minimum 10 years of audit experience in developmental trusts',
    documentPath: '/proposal format.pdf'
  }
];

export default function TendersPage() {
  const activeTenders = mockTenders.filter(t => t.status === 'active');
  const closedTenders = mockTenders.filter(t => t.status === 'closed');

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <section className={styles.banner} aria-label="Tenders Banner">
        <div className={styles.bannerBg} />
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.sub}>Bidding & RFPs</span>
          <h1>Empaneling Partners for Accountable Project Delivery</h1>
          <p>We invite competitive bids from certified vendors, contractors, and agencies who share our commitment to speed, quality, and fiscal integrity.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.mainContent} aria-label="Tenders Content">
        <div className={styles.container}>

          {/* Guidelines info notice */}
          <div className="card glass" style={{ padding: '1.5rem', marginBottom: '3rem', borderLeft: '4px solid var(--accent)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <AlertCircle size={24} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Important Instructions for Bidders</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Bids must be submitted in sealed envelopes (containing separate technical and financial envelopes) to our New Delhi office or uploaded via the procurement portal before the closing date. Late submissions will be automatically rejected. For queries, contact <a href="mailto:procurement@thehansfoundation.org" style={{ fontWeight: 700, color: 'var(--secondary)' }}>procurement@thehansfoundation.org</a>.
              </p>
            </div>
          </div>

          {/* Active Tenders */}
          <div className={styles.sectionHeader}>
            <h2>Active Procurement Notices</h2>
            <span className={styles.activeCount}>{activeTenders.length} Open Bids</span>
          </div>

          <div className={styles.tenderList}>
            {activeTenders.map(tender => (
              <article key={tender.id} className={`${styles.card} glass`}>
                <div className={styles.tenderMeta}>
                  <span className={styles.idTag}>{tender.id}</span>
                  <h3>{tender.title}</h3>
                  <div className={styles.tenderDetailsGrid}>
                    <div className={styles.detailItem}>
                      <Calendar size={15} />
                      <span><span className={styles.detailLabel}>Published:</span> {tender.publishDate}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <Calendar size={15} style={{ color: 'var(--accent)' }} />
                      <span><span className={styles.detailLabel}>Deadline:</span> {tender.closingDate}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <Users size={15} />
                      <span><span className={styles.detailLabel}>Eligibility:</span> {tender.eligibility}</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.cardActions}>
                  <span className={`${styles.statusBadge} ${styles.statusActive}`}>Open</span>
                  <a href={tender.documentPath} download className="btn btn-secondary btn-sm styles.downloadBtn">
                    <Download size={15} />
                    <span>Download RFP</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Closed Tenders */}
          <div className={styles.sectionHeader}>
            <h2>Completed & Closed Tenders</h2>
          </div>

          <div className={styles.tenderList}>
            {closedTenders.map(tender => (
              <article key={tender.id} className={`${styles.card} glass`} style={{ opacity: 0.8 }}>
                <div className={styles.tenderMeta}>
                  <span className={styles.idTag}>{tender.id}</span>
                  <h3 style={{ color: 'var(--text-secondary)' }}>{tender.title}</h3>
                  <div className={styles.tenderDetailsGrid}>
                    <div className={styles.detailItem}>
                      <Calendar size={15} />
                      <span><span className={styles.detailLabel}>Published:</span> {tender.publishDate}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <Calendar size={15} />
                      <span><span className={styles.detailLabel}>Closed:</span> {tender.closingDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.cardActions}>
                  <span className={`${styles.statusBadge} ${styles.statusClosed}`}>Closed</span>
                  <button disabled className="btn btn-secondary btn-sm" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                    <FileText size={15} />
                    <span>RFP Archive</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
