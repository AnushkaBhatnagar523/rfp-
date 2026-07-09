'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../programs.module.css';
import Counter from '@/components/shared/Counter';
import { HelpCircle, AlertTriangle } from 'lucide-react';

export default function DisasterReliefProgram() {
  return (
    <div className="container">
      <div className={styles.progDetailsGrid}>
        
        {/* Left Column: Info */}
        <div className={styles.infoColumn}>
          <div className={styles.heroImageWrapper}>
            <Image 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80" 
              alt="THF field officers distributing emergency relief kits during flood"
              fill
              priority
              className={styles.heroImage}
            />
          </div>

          <div className={styles.mainText}>
            <h2>Rapid Response, Sustainable Post-Disaster Recovery</h2>
            <p>
              Natural disasters like landslides, flash floods, and earthquakes cause sudden devastation, destroying critical home structures and local water lines. The Hans Foundation coordinates rapid relief efforts and long-term community rehabilitation.
            </p>
            <p>
              During active emergencies, our local field teams deploy immediate nutrition kits, temporary shelters, blankets, and mobile health camps to ensure basic survival and clinical care.
            </p>
            <p>
              In the recovery phase, we work with municipal governments to reconstruct safe houses, restore damaged rural drinking water lines, and rebuild schools with earthquake-resilient standards.
            </p>
          </div>

          <div className={styles.keyProjects}>
            <h3>Key Disaster Relief Initiatives</h3>
            <div className={styles.projectCardList}>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>Emergency Relief Kits Distribution</h4>
                <p>Delivering high-nutrition food dry rations, clean drinking water cans, dignity kits, and blankets directly to affected camps.</p>
              </div>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>Post-Disaster Housing Reconstruction</h4>
                <p>Constructing disaster-resilient structural brick houses for families who lost homes during flash floods or landslides.</p>
              </div>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>Rural Infrastructure Restoration</h4>
                <p>Re-establishing gravity pipeline water supply and cleaning school premises to restart academic terms quickly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.statWidget}>
            <label>Emergency Beneficiaries</label>
            <span className={styles.statValue}>
              <Counter end={180} duration={1500} suffix="K+" />
            </span>
            <p>Disaster victims provided with immediate food kits, medical camps, and reconstruction aids.</p>
          </div>

          <div className={`${styles.ctaWidget} glass`}>
            <AlertTriangle size={28} style={{ color: 'var(--accent)' }} />
            <h3>Support Emergency Relief</h3>
            <p>Your donation directly funds emergency clinical kits, dry ration packs, and post-flood home rebuilding programs.</p>
            <Link href="/donate" className="btn btn-primary" style={{ width: '100%' }}>
              <span>Donate to Relief Fund</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
