'use client';

import React from 'react';
import Image from 'next/image';
import styles from '../about.module.css';

export default function VisionMission() {
  return (
    <div className="container">
      <div className={styles.aboutGrid}>
        <div className={styles.textColumn}>
          <h2>Our Guiding Light</h2>
          <p>
            The Hans Foundation is guided by a profound commitment to create an inclusive and equitable society in India.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>
            <div style={{ borderLeft: '4px solid var(--accent)', paddingLeft: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Our Vision</h3>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                An India where every individual has equal opportunities for healthcare, quality learning, physical safety, and socio-economic empowerment.
              </p>
            </div>

            <div style={{ borderLeft: '4px solid var(--secondary)', paddingLeft: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Our Mission</h3>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                To empower marginalized individuals by designing, scaling, and implementing impactful programs in public health, inclusive learning, livelihoods, and assistive rehabilitation.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.imgColumn}>
          <Image 
            src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80" 
            alt="Children at THF primary school classroom reading books"
            fill
            className={styles.innerImg}
          />
        </div>
      </div>

      {/* Values Grid */}
      <div style={{ marginTop: '5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--primary)' }}>
          Our Founding Values
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤝</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Empowerment</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              We build capabilities and self-reliance within communities rather than creating perpetual dependence.
            </p>
          </div>

          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔎</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Transparency</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              We adhere to the highest standards of governance, financial disclosures, and third-party audit verification.
            </p>
          </div>

          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌱</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Inclusion</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              We prioritize the needs of children, women, disabled persons, and Scheduled Tribes who reside in remote regions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
