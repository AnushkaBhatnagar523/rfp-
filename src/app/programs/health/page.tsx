'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../programs.module.css';
import Counter from '@/components/shared/Counter';
import { Heart, ShieldCheck } from 'lucide-react';

export default function HealthProgram() {
  return (
    <div className="container">
      <div className={styles.progDetailsGrid}>
        
        {/* Left Column: Info */}
        <div className={styles.infoColumn}>
          <div className={styles.heroImageWrapper}>
            <Image 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80" 
              alt="Healthcare treatment in THF clinic"
              fill
              priority
              className={styles.heroImage}
            />
          </div>

          <div className={styles.mainText}>
            <h2>Restoring Health, Saving Lives in Remote Corners</h2>
            <p>
              Access to quality and affordable healthcare remains one of the greatest developmental challenges in rural and mountain regions of India. The Hans Foundation works to bridge this service gap through directly implemented signature services and grant supports.
            </p>
            <p>
              Our flagship Mobile Medical Units (MMUs) visit isolated villages on a weekly basis, bringing primary diagnosis, testing labs, and essential medicines directly to the doorsteps of marginalized households.
            </p>
            <p>
              In urban and semi-urban hubs, we run dedicated Renal Care Centers that administer completely free, state-of-the-art dialysis sessions to patients from low-income groups, helping them avoid debilitating clinical debt.
            </p>
          </div>

          <div className={styles.keyProjects}>
            <h3>Key Healthcare Initiatives</h3>
            <div className={styles.projectCardList}>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>Mobile Medical Units (MMUs)</h4>
                <p>A fleet of 140+ active clinical vans providing free consultations, diagnostic screening, and generic medicines to rural habitations across 8 states.</p>
              </div>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>Renal Care Centers (Dialysis)</h4>
                <p>Operating specialized clinical centers in partnership with state governments, offering free dialysis services to ensure life-saving access.</p>
              </div>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>Little Hearts Program</h4>
                <p>Providing financial grant support for critical congenital heart disease surgeries to underprivileged children across specialized partner hospitals.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.statWidget}>
            <label>Healthcare Outreach</label>
            <span className={styles.statValue}>
              <Counter end={12} duration={1500} suffix="M+" />
            </span>
            <p>Underprivileged individuals treated through mobile vans and specialized dialysis centers.</p>
          </div>

          <div className={`${styles.ctaWidget} glass`}>
            <Heart size={28} className="color-accent" style={{ color: 'var(--accent)' }} />
            <h3>Support Our Healthcare Mission</h3>
            <p>Your donations help purchase clinical supplies, resource medical clinics, and keep our mobile medical units moving.</p>
            <Link href="/donate" className="btn btn-primary" style={{ width: '100%' }}>
              <span>Donate Now</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
