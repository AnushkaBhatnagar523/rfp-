'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Heart, Mail, MapPin, Phone, Send, ShieldCheck, Users } from 'lucide-react';
import styles from './volunteer.module.css';

const opportunities = [
  'Community outreach and beneficiary support',
  'Program coordination and field logistics',
  'Digital storytelling and communications',
  'Fundraising and donor engagement',
];

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    skills: '',
    availability: 'weekends',
    consent: false,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.consent) {
      alert('Please confirm your consent to participate in volunteer communications.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-label="Volunteer With THF">
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.eyebrow}>Volunteer With Us</span>
          <h1>Bring compassion, capability, and community energy to rural India.</h1>
          <p>THF volunteers help strengthen outreach, deepen trust, and amplify impact in the places where it matters most.</p>
          <div className={styles.heroActions}>
            <Link href="#volunteer-form" className="btn btn-primary">
              <Heart size={16} fill="white" />
              <span>Join the Volunteer Network</span>
            </Link>
            <Link href="/contact" className="btn btn-outline">
              <span>Speak to Our Team</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className="container">
          <div className={styles.infoGrid}>
            <div>
              <span className={styles.sectionLabel}>Why volunteer</span>
              <h2>Give your time to meaningful, measurable social change.</h2>
              <p>
                Whether you can contribute a few hours a month or support a long-term initiative, your participation helps build capacity in communities across India.
              </p>
              <ul className={styles.list}>
                {opportunities.map((item) => (
                  <li key={item}>
                    <ShieldCheck size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${styles.panel} glass`}>
              <Users size={24} />
              <h3>Volunteer opportunities currently open</h3>
              <p>Field support, digital communications, event coordination, donor appreciation, and rural outreach programs.</p>
              <div className={styles.contactList}>
                <span><Mail size={16} /> volunteer@thehansfoundation.org</span>
                <span><Phone size={16} /> +91 11 4652 4444</span>
                <span><MapPin size={16} /> Delhi NCR and remote community partnerships</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="volunteer-form" className={styles.formSection}>
        <div className="container">
          <div className={`${styles.formCard} glass`}>
            {submitted ? (
              <div className={styles.successState}>
                <CheckCircle2 size={48} className={styles.successIcon} />
                <h3>Thank you for volunteering.</h3>
                <p>Your expression of interest has been recorded. Our volunteer coordination team will contact you shortly with next steps.</p>
                <button type="button" className="btn btn-primary" onClick={() => setSubmitted(false)}>
                  <span>Submit another interest</span>
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formHeader}>
                  <span className={styles.sectionLabel}>Volunteer Interest Form</span>
                  <h2>Share a little about yourself</h2>
                </div>
                <div className={styles.formRow}>
                  <label>
                    <span>Name</span>
                    <input required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
                  </label>
                  <label>
                    <span>Email</span>
                    <input type="email" required value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
                  </label>
                </div>
                <div className={styles.formRow}>
                  <label>
                    <span>Phone</span>
                    <input type="tel" required value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} />
                  </label>
                  <label>
                    <span>City</span>
                    <input value={formData.city} onChange={(event) => setFormData({ ...formData, city: event.target.value })} />
                  </label>
                </div>
                <label>
                  <span>Skills or experience</span>
                  <textarea rows={4} value={formData.skills} onChange={(event) => setFormData({ ...formData, skills: event.target.value })} />
                </label>
                <label>
                  <span>Preferred availability</span>
                  <select value={formData.availability} onChange={(event) => setFormData({ ...formData, availability: event.target.value })}>
                    <option value="weekends">Weekends</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="occasional">Occasional</option>
                  </select>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" checked={formData.consent} onChange={(event) => setFormData({ ...formData, consent: event.target.checked })} />
                  <span>I consent to THF contacting me about volunteer opportunities and relevant updates.</span>
                </label>
                <button type="submit" className="btn btn-primary">
                  <Send size={16} />
                  <span>Submit Interest</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
