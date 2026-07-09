'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../programs.module.css';
import Counter from '@/components/shared/Counter';
import { Briefcase, Coins } from 'lucide-react';

export default function LivelihoodProgram() {
  return (
    <div className="container">
      <div className={styles.progDetailsGrid}>
        
        {/* Left Column: Info */}
        <div className={styles.infoColumn}>
          <div className={styles.heroImageWrapper}>
            <Image 
              src="https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=1000&q=80" 
              alt="Rural woman working on vocational tailoring machine"
              fill
              priority
              className={styles.heroImage}
            />
          </div>

          <div className={styles.mainText}>
            <h2>Enabling Self-Reliance, Empowering Rural Livelihoods</h2>
            <p>
              Economic independence is essential to sustainable social welfare. The Hans Foundation implements skills development, agricultural support, and financial resources that enable families to build regular, secure incomes.
            </p>
            <p>
              Under our *Hans Udhyamita Mission*, we assist women in forming self-help groups (SHGs) and provide seed capital to start micro-businesses in sewing, food processing, animal husbandry, and local crafts.
            </p>
            <p>
              We also support smallholder farmers in dryland regions by training them in high-yield organic farming, setting up drip irrigation grids, and establishing market linkage centers to secure fair crop prices.
            </p>
          </div>

          <div className={styles.keyProjects}>
            <h3>Key Livelihood Initiatives</h3>
            <div className={styles.projectCardList}>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>Hans Udhyamita Mission</h4>
                <p>A comprehensive program establishing rural women self-help groups and providing small business coaching and grants.</p>
              </div>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>Sustainable Agriculture Support</h4>
                <p>Training farmers in soil conservation, water management, high-yield organic seeds, and vegetable cultivation.</p>
              </div>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>Youth Skill Training</h4>
                <p>Running vocational training institutes (sewing, computer typing, hospitality) with placement cells for rural youth.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.statWidget}>
            <label>Families Supported</label>
            <span className={styles.statValue}>
              <Counter end={240} duration={1500} suffix="K+" />
            </span>
            <p>Rural households secured with steady incomes through agricultural and self-help group programs.</p>
          </div>

          <div className={`${styles.ctaWidget} glass`}>
            <Coins size={28} style={{ color: 'var(--accent)' }} />
            <h3>Support Sustainable Incomes</h3>
            <p>Your donations buy vocational sewing machines, set up drip irrigation kits, and fund micro-grants for rural women.</p>
            <Link href="/donate" className="btn btn-primary" style={{ width: '100%' }}>
              <span>Support Livelihoods</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
