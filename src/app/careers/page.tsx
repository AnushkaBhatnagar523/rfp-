'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './careers.module.css';
import { Briefcase, MapPin, Calendar, Search, ArrowRight, ShieldCheck } from 'lucide-react';

interface JobListing {
  slug: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  type: string;
  description: string;
}

export default function CareersListing() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);

  const departments = ['All', 'Healthcare', 'Education', 'Livelihoods', 'Finance & Operations'];

  useEffect(() => {
    setLoading(true);
    const q = searchQuery ? `&query=${encodeURIComponent(searchQuery)}` : '';
    fetch(`/api/careers?department=${encodeURIComponent(selectedDept)}${q}`)
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch jobs failed:', err);
        setLoading(false);
      });
  }, [selectedDept, searchQuery]);

  return (
    <div className={styles.careersWrapper}>
      {/* Careers Hero */}
      <section className={styles.careersHero} aria-label="Careers Header">
        <div className={styles.careersHeroBg} />
        <div className={`container ${styles.careersHeroContent}`}>
          <span className={styles.sub}>Careers at THF</span>
          <h1>Join Our Mission to Transform Lives</h1>
          <p>Work with one of India\'s largest charitable endowments and drive direct sustainable changes at the grassroots level.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        
        {/* Value Pitch */}
        <div className={styles.valueGrid}>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🌟</div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Work that Matters</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              Directly impact marginalized communities, rural families, and school children with transparent governance models.
            </p>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📈</div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Professional Growth</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              Gain experience in managing multi-crore development projects, third-party audit systems, and large field operations.
            </p>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🩺</div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Excellent Benefits</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              Comprehensive health insurance, provident funds coverage, paid parental leaves, and structured performance bonuses.
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.departments}>
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`${styles.deptBtn} ${selectedDept === dept ? styles.activeDept : ''}`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className={styles.searchBar}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search positions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search positions"
            />
          </div>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px', color: 'var(--text-secondary)' }}>
            <span>Loading vacancies...</span>
          </div>
        ) : jobs.length > 0 ? (
          <div className={styles.jobsList}>
            {jobs.map(job => (
              <div key={job.slug} className={`${styles.jobCard} hover-lift glass`}>
                <div className={styles.jobInfo}>
                  <span className={styles.deptBadge}>{job.department}</span>
                  <h3>{job.title}</h3>
                  <p>{job.description}</p>
                  <div className={styles.jobMeta}>
                    <span className={styles.metaItem}>
                      <MapPin size={14} />
                      {job.location}
                    </span>
                    <span className={styles.metaItem}>
                      <Briefcase size={14} />
                      {job.experience}
                    </span>
                    <span className={styles.metaItem}>
                      <Calendar size={14} />
                      {job.type}
                    </span>
                  </div>
                </div>
                <Link href={`/careers/${job.slug}`} className="btn btn-secondary">
                  <span>View Details</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <Briefcase size={48} className={styles.noResultsIcon} />
            <h3>No positions found</h3>
            <p>Try refining your search terms or choosing a different department filter.</p>
          </div>
        )}

      </div>
    </div>
  );
}
