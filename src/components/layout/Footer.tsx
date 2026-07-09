'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import {
  Heart, Globe2, MessageCircle, Send, Mail, Phone, MapPin, CheckCircle2
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        {/* Top: Newsletter block */}
        <div className={styles.newsletterSection}>
          <div className={styles.newsletterInfo}>
            <h3>Stay Updated on Our Impact</h3>
            <p>Subscribe to receive news, success stories, and updates on our development programs.</p>
          </div>
          <div className={styles.newsletterFormWrapper}>
            {subscribed ? (
              <div className={styles.subscribedMessage}>
                <CheckCircle2 size={20} className={styles.checkIcon} />
                <span>Thank you for subscribing to our newsletter!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className={styles.newsletterInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Newsletter email address"
                />
                <button type="submit" className={styles.newsletterBtn} aria-label="Subscribe">
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle: Grid */}
        <div className={styles.grid}>
          {/* Column 1: Contacts & Logo */}
          <div className={`${styles.column} ${styles.brandCol}`}>
            <Link href="/" className={styles.logoLink} aria-label="The Hans Foundation Home">
              <span className={styles.logoTextMain}>THE HANS</span>
              <span className={styles.logoTextSub}>FOUNDATION</span>
            </Link>
            <p className={styles.brandDesc}>
              A charitable trust established in 2009 to drive social development and poverty alleviation across India's marginalized communities.
            </p>
            <ul className={styles.contactList}>
              <li>
                <MapPin size={18} className={styles.contactIcon} />
                <span>Building 8, 4th Floor, Local Shopping Centre, Madangir, New Delhi - 110062</span>
              </li>
              <li>
                <Phone size={18} className={styles.contactIcon} />
                <a href="tel:+911146524444">+91 11 4652 4444</a>
              </li>
              <li>
                <Mail size={18} className={styles.contactIcon} />
                <a href="mailto:info@thehansfoundation.org">info@thehansfoundation.org</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Programs */}
          <div className={styles.column}>
            <h4>Our Programs</h4>
            <ul className={styles.links}>
              <li><Link href="/programs/health">Healthcare Initiatives</Link></li>
              <li><Link href="/programs/education">Inclusive Education</Link></li>
              <li><Link href="/programs/livelihood">Livelihood & Skills</Link></li>
              <li><Link href="/programs/climate-action">Climate & Clean Water</Link></li>
              <li><Link href="/programs/disability-inclusion">Disability Inclusion</Link></li>
              <li><Link href="/programs/disaster-relief">Disaster Relief</Link></li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div className={styles.column}>
            <h4>About THF</h4>
            <ul className={styles.links}>
              <li><Link href="/about/vision-mission">Vision & Mission</Link></li>
              <li><Link href="/about/leadership">Our Leadership</Link></li>
              <li><Link href="/about/board-members">Board of Trustees</Link></li>
              <li><Link href="/about/our-story">Our Story</Link></li>
              <li><Link href="/careers">Careers at THF</Link></li>
              <li><Link href="/faq">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className={styles.column}>
            <h4>Resources</h4>
            <ul className={styles.links}>
              <li><Link href="/resources/annual-reports">Annual Reports</Link></li>
              <li><Link href="/resources/financial-statements">Financial Statements</Link></li>
              <li><Link href="/resources/policies">Governance & Policies</Link></li>
              <li><Link href="/resources/downloads">Brochures & Downloads</Link></li>
              <li><Link href="/blog">Success Stories Blog</Link></li>
              <li><Link href="/news-media/photo-gallery">Media Kits</Link></li>
            </ul>
          </div>

          {/* Column 5: Join Us */}
          <div className={styles.column}>
            <h4>Take Action</h4>
            <ul className={styles.links}>
              <li><Link href="/donate" className={styles.highlightLink}><Heart size={14} fill="currentColor" /> Donate Online</Link></li>
              <li><Link href="/volunteer">Volunteer Program</Link></li>
              <li><Link href="/partner/csr">CSR Partnerships</Link></li>
              <li><Link href="/partner">General Partnership</Link></li>
              <li><Link href="/contact">Get in Touch</Link></li>
            </ul>
            <div className={styles.socials}>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Globe2 size={18} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><MessageCircle size={18} /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Send size={18} /></a>
              <a href="mailto:info@thehansfoundation.org" aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>
        </div>

        {/* Bottom: Legal metadata & disclosures */}
        <div className={styles.bottomBar}>
          <div className={styles.copy}>
            <p>&copy; {new Date().getFullYear()} The Hans Foundation. All Rights Reserved.</p>
            <p className={styles.disclosure}>
              THF is a registered public charitable trust in India. Donations are eligible for tax deduction under Section 80G of the Income Tax Act, 1961.
            </p>
          </div>
          <div className={styles.legalLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span aria-hidden="true">|</span>
            <Link href="/terms">Terms of Use</Link>
            <span aria-hidden="true">|</span>
            <Link href="/accessibility">Accessibility Statement</Link>
            <span aria-hidden="true">|</span>
            <Link href="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
