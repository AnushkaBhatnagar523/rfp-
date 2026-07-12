'use client';

import React from 'react';
import styles from './procurement.module.css';
import { ShieldCheck, Award, Eye, FileText, Download, UserPlus, Info, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ProcurementPage() {
  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <section className={styles.banner} aria-label="Procurement Banner">
        <div className={styles.bannerBg} />
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.sub}>Vendor Partnerships</span>
          <h1>Procurement & Supplier Integrity Guidelines</h1>
          <p>THF maintains a transparent, merit-based procurement framework that ensures equal opportunity for suppliers while maximizing developmental returns.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.mainContent} aria-label="Procurement Content">
        <div className={styles.container}>
          
          <div className={styles.grid}>
            
            {/* Left Column: Policies & Pillars */}
            <div className={styles.policySection}>
              <h2>Procurement Philosophy & Ethics</h2>
              <p className={styles.policyText}>
                As a charitable organization managing donor contributions and government grants, The Hans Foundation is committed to absolute fiscal responsibility. Every rupee saved in procurement is directly routed back to fund surgeries, smart boards, clinical camps, and water grids in underserved communities. 
              </p>
              <p className={styles.policyText}>
                Our procurement guidelines are designed to eliminate conflict of interest, minimize environmental impacts, and encourage fair bidding environments. We maintain a zero-tolerance policy towards bribery, collusion, and substandard deliverables.
              </p>

              <h2 style={{ marginTop: '3rem' }}>Core Evaluation Criteria</h2>
              
              {/* Pillars Grid */}
              <div className={styles.pillarsGrid}>
                <div className={`${styles.pillarCard} glass`}>
                  <ShieldCheck size={24} className={styles.pillarIcon} />
                  <h3>Quality Compliance</h3>
                  <p>All supplied goods and services must meet or exceed relevant IS/ISO specifications and technical requirements detailed in the RFP.</p>
                </div>
                <div className={`${styles.pillarCard} glass`}>
                  <Award size={24} className={styles.pillarIcon} style={{ color: 'var(--accent)' }} />
                  <h3>Cost Optimization</h3>
                  <p>Evaluation of overall value (including lifecycle costs, warranty terms, and support) rather than simply selecting the lowest sticker price.</p>
                </div>
                <div className={`${styles.pillarCard} glass`}>
                  <Eye size={24} className={styles.pillarIcon} style={{ color: 'var(--secondary)' }} />
                  <h3>Timely Execution</h3>
                  <p>Demonstrated capability to deliver materials, install technology, or complete construction works within critical program deadlines.</p>
                </div>
                <div className={`${styles.pillarCard} glass`}>
                  <CheckCircle2 size={24} className={styles.pillarIcon} style={{ color: 'var(--success)' }} />
                  <h3>Sustainability & Integrity</h3>
                  <p>Preference for vendors utilizing eco-friendly materials, local supply chains, and showing legal compliance with labor and environmental regulations.</p>
                </div>
              </div>

              <h2>Vendor Code of Conduct</h2>
              <p className={styles.policyText}>
                The Hans Foundation expects all registered suppliers to perform their services with absolute honesty and safety. This includes adhering to national child protection codes (for vendors working in smart classrooms or schools), environmental regulations, and providing safe working conditions for construction laborers at check-dam and water pipeline sites.
              </p>
            </div>

            {/* Right Column: Steps to Partner */}
            <div className={styles.sidebarCard} style={{ backgroundColor: 'var(--bg-primary)' }}>
              <h3>Steps to Become a Registered Supplier</h3>
              
              <div className={styles.stepsList}>
                <div className={styles.stepItem}>
                  <span className={styles.stepNum}>1</span>
                  <div className={styles.stepContent}>
                    <h4>Download Registration Documents</h4>
                    <p>Get the supplier registration package including policy and criteria forms.</p>
                  </div>
                </div>

                <div className={styles.stepItem}>
                  <span className={styles.stepNum}>2</span>
                  <div className={styles.stepContent}>
                    <h4>Submit Compliance Dossier</h4>
                    <p>Send company GST logs, PAN registration, ISO certificates, and list of references to our procurement team.</p>
                  </div>
                </div>

                <div className={styles.stepItem}>
                  <span className={styles.stepNum}>3</span>
                  <div className={styles.stepContent}>
                    <h4>Technical & Legal Audit</h4>
                    <p>Respective department leads review qualification profiles. Site audits may be conducted for fabrication/assembly facilities.</p>
                  </div>
                </div>

                <div className={styles.stepItem}>
                  <span className={styles.stepNum}>4</span>
                  <div className={styles.stepContent}>
                    <h4>Empanelment Approval</h4>
                    <p>Approved vendors are empaneled and invited to submit competitive bids for tenders corresponding to their category.</p>
                  </div>
                </div>
              </div>

              {/* Downloads & CTA */}
              <div className={styles.downloadBox}>
                <a href="/proposal format.pdf" download className="btn btn-primary" style={{ display: 'flex', justifyContent: 'center' }}>
                  <Download size={16} />
                  <span>Download Registration Package</span>
                </a>
                <Link href="/contact?subject=Procurement Query" className="btn btn-secondary" style={{ display: 'flex', justifyContent: 'center' }}>
                  <UserPlus size={16} />
                  <span>Inquire about Partnering</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
