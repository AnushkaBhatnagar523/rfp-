'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import Counter from '@/components/shared/Counter';
import ProjectMap from '@/components/programs/ProjectMap';
import ImpactDashboard from '@/components/impact/ImpactDashboard';
import Modal from '@/components/shared/Modal';
import { impactStats, programs, testimonials, updateCards } from '@/lib/content';
import {
  Heart, ArrowRight, Play, Award, HelpCircle,
  ChevronLeft, ChevronRight, ShieldCheck, Mail, Download, Sparkles
} from 'lucide-react';

export default function Home() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [dynamicStats, setDynamicStats] = useState(impactStats);

  useEffect(() => {
    fetch('/api/admin/impact')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to fetch');
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item: any) => ({
            value: item.value,
            label: item.label
          }));
          setDynamicStats(formatted);
        }
      })
      .catch(err => console.error('Error fetching impact stats:', err));
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className={styles.homeContainer}>
      
      {/* 1. Hero Section */}
      <section className={styles.hero} aria-label="Welcome Banner">
        <div className={styles.heroBg}>
          <Image 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80"
            alt="Children smiling at school sponsored by THF" 
            fill 
            priority
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>
        
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroTag}>
            <Sparkles size={16} />
            <span>Over 15 Years of Social Impact</span>
          </div>
          <h1>Transforming Lives, Building Sustainable Communities</h1>
          <p>
            The Hans Foundation is one of India's largest developmental endowments. We provide access to quality healthcare, inclusive learning, livelihoods, and rehabilitation clinics across remote villages.
          </p>
          <div className={styles.heroActions}>
            <Link href="/donate" className="btn btn-primary btn-lg">
              <Heart size={18} fill="white" />
              <span>Donate Now</span>
            </Link>
            <Link href="#programs" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }}>
              <span>Explore Programs</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Impact Numbers Section */}
      <section className={styles.impactNumbers} aria-label="Key Impact Metrics">
        <div className="container">
          <div className={styles.impactGrid}>
            {dynamicStats.map((stat) => (
              <div className={styles.impactCard} key={stat.label}>
                <span className={styles.number}>
                  <Counter end={Number(stat.value.replace(/[^0-9]/g, ''))} duration={1500} suffix={stat.value.replace(/[0-9]/g, '')} />
                </span>
                <span className={styles.label}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our Programs Grid */}
      <section id="programs" className={styles.programsSection} aria-label="Our Core Programs">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>Areas of Action</span>
            <h2>Our Integrated Development Sectors</h2>
            <p>We work closely with communities to deploy targeted programs that break the cycle of poverty and exclusion.</p>
          </div>

          <div className={styles.programsGrid}>
            {programs.map((prog, index) => (
              <article key={index} className={`${styles.programCard} hover-lift glass`}>
                <div className={styles.progImageWrapper}>
                  <img src={prog.image} alt={prog.title} className={styles.progImage} />
                  <span className={styles.progIcon} role="img" aria-hidden="true">{prog.icon}</span>
                </div>
                <div className={styles.progContent}>
                  <h3>{prog.title}</h3>
                  <p>{prog.desc}</p>
                  <Link href={prog.link} className={styles.readMoreLink}>
                    <span>Learn More</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Map Section */}
      <section className={styles.mapSection} aria-label="Outreach Locations">
        <div className="container">
          <ProjectMap />
        </div>
      </section>

      {/* 5. Interactive Dashboard Section */}
      <section className={styles.dashboardSection} aria-label="Growth Metrics">
        <div className="container">
          <ImpactDashboard />
        </div>
      </section>

      {/* 6. Success Story Video Section */}
      <section className={styles.videoSection} aria-label="Success Video Feature">
        <div className={styles.videoBg}>
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80"
            alt="Mobile clinic operations in Uttarakhand"
            fill
            className={styles.videoBgImage}
          />
          <div className={styles.videoOverlay} />
        </div>

        <div className={`container ${styles.videoContent}`}>
          <button 
            className={styles.playButton} 
            onClick={() => setVideoModalOpen(true)}
            aria-label="Play Success Story Video"
          >
            <Play size={36} fill="var(--primary)" />
          </button>
          <h2>Watch: Healing Rural Communities, One Village at a Time</h2>
          <p>Go on the ground with our Mobile Medical Units as they navigate remote mountain terrains of Uttarakhand to deliver free life-saving healthcare.</p>
        </div>

        <Modal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} title="THF Mobile Medical Units on the Ground">
          <div className={styles.videoPlayerContainer}>
            {/* Embedded mockup player */}
            <iframe 
              width="100%" 
              height="315" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        </Modal>
      </section>

      {/* 7. Testimonials Section */}
      <section className={styles.testimonialsSection} aria-label="Voices of Hope">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>Voices of Hope</span>
            <h2>Testimonials from Our Communities</h2>
          </div>

          <div className={styles.testimonialWrapper}>
            <button className={styles.arrowBtn} onClick={prevTestimonial} aria-label="Previous Testimonial">
              <ChevronLeft size={24} />
            </button>

            <div className={`${styles.testimonialCard} glass`}>
              <div className={styles.quoteMark}>“</div>
              <p className={styles.quoteText}>{testimonials[activeTestimonial].quote}</p>
              <div className={styles.profile}>
                <img 
                  src={testimonials[activeTestimonial].image} 
                  alt={testimonials[activeTestimonial].name} 
                  className={styles.avatar} 
                />
                <div className={styles.profileInfo}>
                  <cite className={styles.name}>{testimonials[activeTestimonial].name}</cite>
                  <span className={styles.designation}>{testimonials[activeTestimonial].designation}</span>
                  <span className={styles.location}>{testimonials[activeTestimonial].location}</span>
                </div>
              </div>
            </div>

            <button className={styles.arrowBtn} onClick={nextTestimonial} aria-label="Next Testimonial">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* 8. CTA/Update Section */}
      <section className={styles.partnershipSection} aria-label="Updates and Partnerships">
        <div className="container">
          <div className={styles.splitGrid}>
            <div className={`${styles.splitCard} glass`}>
              <Award className={styles.splitIcon} size={40} />
              <h3>Corporate CSR Partnerships</h3>
              <p>Maximize your social return on investment. Partner with THF to co-design and scale programs across education, disability, and water conservation.</p>
              <Link href="/partner/csr" className="btn btn-primary">
                <span>Partner With Us</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className={`${styles.splitCard} glass`}>
              <Download className={styles.splitIcon} size={40} />
              <h3>Annual Impact Reports</h3>
              <p>Read about our programmatic progress, audited financial records, audit logs, and strategic reviews. Download our latest Annual Report (FY 2025-26).</p>
              <Link href="/resources/annual-reports" className="btn btn-outline">
                <span>View Reports</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className={styles.updateGrid}>
            {updateCards.map((card) => (
              <article key={card.title} className={`${styles.updateCard} glass`}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <Link href={card.link} className={styles.readMoreLink}>
                  <span>{card.cta}</span>
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
