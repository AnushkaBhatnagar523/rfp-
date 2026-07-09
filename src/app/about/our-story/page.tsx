'use client';

import React from 'react';
import Image from 'next/image';
import styles from '../about.module.css';

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

const milestones: Milestone[] = [
  {
    year: '2009',
    title: 'Establishment of THF',
    desc: 'The Hans Foundation was registered as a public charitable trust in India with a mandate to drive socio-economic development.',
  },
  {
    year: '2012',
    title: 'Launch of Mobile Medical Units',
    desc: 'Started our signature MMU program in the hill districts of Uttarakhand, delivering clinical care directly to isolated rural villages.',
  },
  {
    year: '2016',
    title: 'Disability Rehabilitation Expansion',
    desc: 'Launched comprehensive cochlear implant surgeries program and mobile physical therapy buses to support children with developmental delays.',
  },
  {
    year: '2020',
    title: 'Rural Water Security & Agriculture',
    desc: 'Introduced the Hans Jal Dhara clean drinking water initiative alongside local micro-entrepreneur farming programs (Hans Udhyamita Mission).',
  },
  {
    year: '2025',
    title: 'Swasthya Cities Project',
    desc: 'Expanded outreach to transform healthcare access in urban slums, targeting 13 crore urban residents across major metropolitan areas.',
  },
];

export default function OurStory() {
  return (
    <div className="container">
      <div className={styles.aboutGrid}>
        <div className={styles.textColumn}>
          <h2>Transforming India’s Developmental Landscape</h2>
          <p>
            Established in 2009, The Hans Foundation is an developmental organization that works to improve the quality of life of marginalized and impoverished communities across India. 
          </p>
          <p>
            We deploy direct implementation models (signature programs) as well as strategic grant-making partnerships to establish highly scalable, sustainable, and replicable development solutions.
          </p>
          <p>
            Over the past fifteen years, our efforts have reached more than 40 million lives across 23 states, prioritizing public healthcare access, primary education upgrades, disability aids, clean water security, and rural livelihoods.
          </p>
        </div>
        <div className={styles.imgColumn}>
          <Image 
            src="https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=800&q=80" 
            alt="THF field officers working with rural communities"
            fill
            className={styles.innerImg}
          />
        </div>
      </div>

      {/* Story Timeline */}
      <div style={{ marginTop: '5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--primary)' }}>
          Our Journey & Key Milestones
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          {milestones.map((m, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent)', fontFamily: 'var(--font-sans)', lineHeight: 1, minWidth: '80px' }}>
                {m.year}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>{m.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
