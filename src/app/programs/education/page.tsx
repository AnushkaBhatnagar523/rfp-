'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../programs.module.css';
import Counter from '@/components/shared/Counter';
import { School, BookOpen } from 'lucide-react';

export default function EducationProgram() {
  return (
    <div className="container">
      <div className={styles.progDetailsGrid}>
        
        {/* Left Column: Info */}
        <div className={styles.infoColumn}>
          <div className={styles.heroImageWrapper}>
            <Image 
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80" 
              alt="Underprivileged children studying in modern smart classroom"
              fill
              priority
              className={styles.heroImage}
            />
          </div>

          <div className={styles.mainText}>
            <h2>Igniting Minds, Enhancing Classroom Environments</h2>
            <p>
              Education is the most powerful tool for breaking multi-generational poverty. The Hans Foundation works to upgrade primary schools in rural villages into centers of modern, inclusive learning.
            </p>
            <p>
              We focus on building safe school infrastructure—installing running clean water systems, constructing separate toilets for girls, providing desktop labs, and setting up smart audio-visual boards.
            </p>
            <p>
              In marginalized hamlets, we run non-formal bridge learning centers. These centers prepare out-of-school or first-generation children to transition successfully into formal government schools.
            </p>
          </div>

          <div className={styles.keyProjects}>
            <h3>Key Educational Upgrades</h3>
            <div className={styles.projectCardList}>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>Hans Smart Classrooms</h4>
                <p>Equipping rural schools with interactive digital screens, curated regional educational software, and solar power back-ups.</p>
              </div>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>School Sanitation & Infrastructure</h4>
                <p>Providing functional drinking water taps, science labs, library books, and separate sanitary facilities to improve girls' retention.</p>
              </div>
              <div className={`${styles.projectSubCard} glass`}>
                <h4>Bridge Learning Centers</h4>
                <p>Specialized non-formal learning spaces in slum clusters that assist drop-out children in mainstreaming back to academic pathways.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.statWidget}>
            <label>Students Empowered</label>
            <span className={styles.statValue}>
              <Counter end={850} duration={1500} suffix="K+" />
            </span>
            <p>Underprivileged students provided with access to smart schooling and learning material sets.</p>
          </div>

          <div className={`${styles.ctaWidget} glass`}>
            <BookOpen size={28} style={{ color: 'var(--accent)' }} />
            <h3>Empower a Child's Future</h3>
            <p>Your support builds smart classes, renovates dilapidated rural schools, and funds bridge education materials.</p>
            <Link href="/donate" className="btn btn-primary" style={{ width: '100%' }}>
              <span>Support Education</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
