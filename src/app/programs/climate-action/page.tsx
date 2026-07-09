'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../programs.module.css';
import Counter from '@/components/shared/Counter';
import { Droplet, Wind } from 'lucide-react';

export default function ClimateActionProgram() {
  return (
    <div className="container">
      <div className={styles.progDetailsGrid}>
        
        {/* Left Column: Info */}
        <div className={styles.infoColumn}>
          <div className={styles.heroImageWrapper}>
            <Image 
              src="https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&w=1000&q=80" 
              alt="Rural clean drinking water system"
              fill
              priority
              className={styles.heroImage}
            />
          </div>

          <div className={styles.mainText}>
            <h2>Securing Clean Water, Adapting to Climate Shifts</h2>
            <p>
              Climate change directly impacts rural livelihood and drinking water safety. The Hans Foundation works to establish community resilience through water resource harvesting, forest protection, and village sanitation blocks.
            </p>
            <p>
              Under our signature *Hans Jal Dhara* program, we construct village piped drinking water networks, gravity-fed water supplies, and spring-shed recharge zones to secure year-round clean tap water for hill hamlets.
            </p>
            <p>
              We also work with local forest departments and villagers in Uttarakhand to manage forest fire prevention, implement soil moisture conservation grids, and distribute clean solar energy cookers to households.
            </p>
          </div>

          <div className={styles.keyProjects}>
            <h3>Key Climate & Water Projects</h3>
            <div className={styles.projectCardList}>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>Hans Jal Dhara (Drinking Water)</h4>
                <p>Constructing gravity piped drinking water grids, storage tanks, and household tap connections in mountain villages.</p>
              </div>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>Spring-shed Recharge & Harvesting</h4>
                <p>Recharging critical natural mountain springs through contour trenches, check dams, and local tree plantations.</p>
              </div>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>Forest Fire Prevention & Bio-Energy</h4>
                <p>Engaging communities in pine needle collection, briquetting, and creating local fire-alert lines to protect ecosystems.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.statWidget}>
            <label>Villages Secured</label>
            <span className={styles.statValue}>
              <Counter end={680} duration={1500} suffix="+" />
            </span>
            <p>Remote villages secured with safe drinking water taps and gravity piped supplies.</p>
          </div>

          <div className={`${styles.ctaWidget} glass`}>
            <Droplet size={28} style={{ color: 'var(--accent)' }} />
            <h3>Bring Clean Water to a Village</h3>
            <p>Your support builds community water storage tanks, funds spring recharge projects, and protects local ecology.</p>
            <Link href="/donate" className="btn btn-primary" style={{ width: '100%' }}>
              <span>Donate for Water</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
