'use client';

import React, { useState } from 'react';
import styles from './events.module.css';
import { Calendar, MapPin, Clock, ArrowRight, Video, Users } from 'lucide-react';
import Link from 'next/link';

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'virtual' | 'physical';
  status: 'upcoming' | 'past';
  image: string;
}

const mockEvents: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Uttarakhand Mobile Medical Outreach Camp',
    description: 'A free healthcare diagnostic and medicine distribution camp serving remote communities in the Chamoli district.',
    date: 'August 14, 2026',
    time: '09:00 AM - 04:00 PM IST',
    location: 'Chamoli, Uttarakhand',
    type: 'physical',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'evt-2',
    title: 'National Inclusive Education & Accessibility Summit',
    description: 'Bringing together educators, policymakers, and technologists to discuss digital classrooms and accessibility parameters in rural schools.',
    date: 'September 08, 2026',
    time: '10:00 AM - 05:00 PM IST',
    location: 'New Delhi (HQ Auditorium)',
    type: 'physical',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'evt-3',
    title: 'Webinar: Women Micro-Entrepreneurs in the Digital Economy',
    description: 'Learn how self-help groups (SHGs) are using mobile finance applications and e-market setups to double rural incomes.',
    date: 'August 28, 2026',
    time: '03:00 PM - 04:30 PM IST',
    location: 'Zoom / YouTube Live',
    type: 'virtual',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'evt-4',
    title: 'Jharkhand Udhyamita Livelihood Exhibition',
    description: 'A celebration and bazaar displaying handmade products, organic agricultural spices, and textiles made by THF-backed SHGs.',
    date: 'June 18, 2026',
    time: '10:00 AM - 08:00 PM IST',
    location: 'Ranchi, Jharkhand',
    type: 'physical',
    status: 'past',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344559be6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'evt-5',
    title: 'Spring-Shed Hydrological Recharge Planning Workshop',
    description: 'Training community water sanitation committees on geo-hydrological mapping, trenching, and water quality testing.',
    date: 'May 12, 2026',
    time: '10:30 AM - 03:30 PM IST',
    location: 'Pithoragarh, Uttarakhand',
    type: 'physical',
    status: 'past',
    image: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'evt-6',
    title: 'Cochlear Implant Rehabilitation & Speech Therapy Seminar',
    description: 'A specialized virtual session for parents and educators on post-surgery speech training and standard auditory-verbal benchmarks.',
    date: 'April 05, 2026',
    time: '04:00 PM - 05:30 PM IST',
    location: 'Microsoft Teams',
    type: 'virtual',
    status: 'past',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80',
  }
];

export default function EventsPage() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const filteredEvents = mockEvents.filter(event => {
    if (filter === 'all') return true;
    return event.status === filter;
  });

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <section className={styles.banner} aria-label="Events Banner">
        <div className={styles.bannerBg} />
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.sub}>THF Events & Workshops</span>
          <h1>Empowering Communities Through Knowledge & Collaboration</h1>
          <p>Join our upcoming summits, webinars, and field campaigns, or browse past sessions where we exchange best developmental practices.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.mainContent} aria-label="Events Content">
        <div className={styles.container}>
          
          {/* Controls Row */}
          <div className={styles.controlsRow}>
            <div className={styles.tabs}>
              <button 
                onClick={() => setFilter('all')}
                className={`${styles.tabBtn} ${filter === 'all' ? styles.activeTab : ''}`}
                aria-current={filter === 'all' ? 'page' : undefined}
              >
                All Events ({mockEvents.length})
              </button>
              <button 
                onClick={() => setFilter('upcoming')}
                className={`${styles.tabBtn} ${filter === 'upcoming' ? styles.activeTab : ''}`}
                aria-current={filter === 'upcoming' ? 'page' : undefined}
              >
                Upcoming ({mockEvents.filter(e => e.status === 'upcoming').length})
              </button>
              <button 
                onClick={() => setFilter('past')}
                className={`${styles.tabBtn} ${filter === 'past' ? styles.activeTab : ''}`}
                aria-current={filter === 'past' ? 'page' : undefined}
              >
                Past ({mockEvents.filter(e => e.status === 'past').length})
              </button>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className={styles.grid}>
              {filteredEvents.map(event => (
                <article key={event.id} className={`${styles.card} hover-lift glass`}>
                  <div className={styles.cardImageWrapper}>
                    <img src={event.image} alt={event.title} className={styles.cardImage} />
                    <span className={`${styles.statusBadge} ${event.status === 'upcoming' ? styles.statusUpcoming : styles.statusPast}`}>
                      {event.status}
                    </span>
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.dateBlock}>
                      <Calendar size={16} />
                      <span>{event.date}</span>
                    </div>

                    <h3>{event.title}</h3>
                    <p>{event.description}</p>

                    <div className={styles.metaRow}>
                      <div className={styles.metaItem} title="Location">
                        <MapPin size={14} />
                        <span>{event.location}</span>
                      </div>
                      <div className={styles.metaItem} title="Time">
                        <Clock size={14} />
                        <span>{event.time}</span>
                      </div>
                    </div>

                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className={styles.metaItem} style={{ fontWeight: 600, color: 'var(--text-tertiary)' }}>
                        {event.type === 'virtual' ? (
                          <>
                            <Video size={14} style={{ marginRight: '0.25rem', color: 'var(--secondary)' }} /> Virtual
                          </>
                        ) : (
                          <>
                            <Users size={14} style={{ marginRight: '0.25rem', color: 'var(--success)' }} /> In-Person
                          </>
                        )}
                      </span>

                      {event.status === 'upcoming' ? (
                        <Link href="/contact?subject=Event Registration" className={styles.registerLink}>
                          <span>Register Interest</span>
                          <ArrowRight size={14} />
                        </Link>
                      ) : (
                        <span className={styles.metaItem} style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-secondary)' }}>
              <h3>No events found in this category.</h3>
              <p>Please check back later or subscribe to our newsletter for updates.</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
