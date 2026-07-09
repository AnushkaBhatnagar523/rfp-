'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../programs.module.css';
import Counter from '@/components/shared/Counter';
import { Sparkles, HelpingHand } from 'lucide-react';

export default function DisabilityInclusionProgram() {
  return (
    <div className="container">
      <div className={styles.progDetailsGrid}>
        
        {/* Left Column: Info */}
        <div className={styles.infoColumn}>
          <div className={styles.heroImageWrapper}>
            <Image 
              src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=80" 
              alt="Physiotherapy treatment in disabled rehabilitation clinic"
              fill
              priority
              className={styles.heroImage}
            />
          </div>

          <div className={styles.mainText}>
            <h2>Restoring Mobility, Enabling Equal Participation</h2>
            <p>
              People with disabilities in rural India face high levels of social exclusion and lack access to basic clinical rehabilitation. The Hans Foundation works to ensure accessibility, clinical support, and assistive mobility for all.
            </p>
            <p>
              We run nationwide signature programs for Cochlear Implants—funding advanced surgeries for children with severe hearing impairments and providing them with post-surgical speech therapy.
            </p>
            <p>
              Our mobile physical therapy buses and clinical centers reach remote hamlets to distribute custom-fitted prosthetics, crutches, wheelchairs, and tactile aids to persons with locomotor and visual challenges.
            </p>
          </div>

          <div className={styles.keyProjects}>
            <h3>Key Disability Inclusion Projects</h3>
            <div className={styles.projectCardList}>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>National Cochlear Implant Program</h4>
                <p>Funding critical ear surgeries and speech-therapy sessions for children under 5 to mainstream them into regular schools.</p>
              </div>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>Prosthetics & Assistive Devices Distribution</h4>
                <p>Manufacturing and distributing custom high-grade prosthetic limbs, wheelchairs, and tricycles in rural camps.</p>
              </div>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>Mobile Therapy Clinics</h4>
                <p>Fitted clinical buses traversing mountain terrains to provide physical therapy, speech therapy, and early diagnosis to children.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.statWidget}>
            <label>Aids Distributed</label>
            <span className={styles.statValue}>
              <Counter end={320} duration={1500} suffix="K+" />
            </span>
            <p>Disabled individuals supported with custom prosthetics, assistive aids, and speech therapy.</p>
          </div>

          <div className={`${styles.ctaWidget} glass`}>
            <HelpingHand size={28} style={{ color: 'var(--accent)' }} />
            <h3>Help Restore Mobility</h3>
            <p>Your donation directly funds cochlear implant surgeries, prosthetic limbs fabrication, and mobile therapy services.</p>
            <Link href="/donate" className="btn btn-primary" style={{ width: '100%' }}>
              <span>Donate for Disability</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
