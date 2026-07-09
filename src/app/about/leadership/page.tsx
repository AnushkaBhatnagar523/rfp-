'use client';

import React from 'react';
import styles from '../about.module.css';

interface Leader {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const leaders: Leader[] = [
  {
    name: 'Lt. Gen. SM Mehta (Retd)',
    role: 'Chief Executive Officer',
    bio: 'He leads the strategic planning, program operations, and administrative functions of the foundation, bringing decades of operational governance experience.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Shweta Rawat',
    role: 'Chairperson',
    bio: 'The co-founder and driving force behind THF\'s integrated village development strategy, focusing heavily on maternal health and disabled children.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Sanjeev Kumar',
    role: 'Chief Financial Officer',
    bio: 'Manages THF\'s financial planning, audit compliance, and accounting systems, maintaining strict standards of transparency.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
  },
];

export default function Leadership() {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
        <h2>Our Executive Leadership</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: '0.5rem' }}>
          Meet the dedicated professionals steering The Hans Foundation's operational frameworks and grant management models.
        </p>
      </div>

      <div className={styles.teamGrid}>
        {leaders.map((leader, index) => (
          <div key={index} className={`${styles.memberCard} hover-lift glass`}>
            <img src={leader.image} alt={leader.name} className={styles.memberAvatar} />
            <h3>{leader.name}</h3>
            <span className={styles.role}>{leader.role}</span>
            <p className={styles.bio}>{leader.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
