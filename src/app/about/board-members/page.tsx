'use client';

import React from 'react';
import styles from '../about.module.css';

interface BoardMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const trustees: BoardMember[] = [
  {
    name: 'Manoj Rawat',
    role: 'Co-Founder & Trustee',
    bio: 'Established The Hans Foundation along with Shweta Rawat, dedicating resources to fund large-scale social welfare plans in India.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Dr. R.V. Singh',
    role: 'Medical Advisory Board Head',
    bio: 'Guides our healthcare initiatives, specialized hospitals, mobile medical fleets, and rural dialysis clinics planning.',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Professor Meenakshi Sen',
    role: 'Education Consultant Trustee',
    bio: 'Oversees smart-school transformation plans, inclusive curriculum setups, and educational grant compliance.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
  },
];

export default function BoardMembers() {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
        <h2>Board of Trustees & Advisors</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: '0.5rem' }}>
          Our distinguished trustees bring together expertise from public health, developmental economics, and corporate governance.
        </p>
      </div>

      <div className={styles.teamGrid}>
        {trustees.map((trustee, index) => (
          <div key={index} className={`${styles.memberCard} hover-lift glass`}>
            <img src={trustee.image} alt={trustee.name} className={styles.memberAvatar} />
            <h3>{trustee.name}</h3>
            <span className={styles.role}>{trustee.role}</span>
            <p className={styles.bio}>{trustee.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
