'use client';

import React, { useState } from 'react';
import styles from './csr.module.css';
import { Award, ShieldCheck, CheckCircle2, TrendingUp, Send } from 'lucide-react';

export default function CSRPartnerships() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    budget: '10L-50L',
    interest: 'health',
    proposal: '',
    captcha: '',
    consent: false,
  });

  const mathQuestion = "What is 4 + 5?";
  const mathAnswer = "9";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, consent: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.captcha.trim() !== mathAnswer) {
      alert("Spam check failed. Please answer the security math question correctly.");
      return;
    }
    if (!formData.consent) {
      alert("Please agree to our privacy policy.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className={styles.csrWrapper}>
      {/* Hero Banner */}
      <section className={styles.banner} aria-label="CSR Banner">
        <div className={styles.bannerBg} />
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.sub}>Corporate Social Responsibility</span>
          <h1>CSR Partnerships for Scale & Impact</h1>
          <p>Partner with THF to deliver high-accountability, co-designed developmental projects across marginalized districts of India.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '5rem 1.5rem' }}>
        <div className={styles.grid}>
          {/* Left Column: CSR Pitch */}
          <div className={styles.infoCol}>
            <h2>Why Partner with The Hans Foundation?</h2>
            <p>We work as strategic implementation partners for India\'s leading corporations, helping them design and run socio-economic developments that align with Schedule VII CSR mandates.</p>

            <div className={styles.benefitItem}>
              <TrendingUp className={styles.benefitIcon} size={22} />
              <div>
                <h3>Proven Execution Scale</h3>
                <p>We manage projects across 23 states with established government clearances and local grassroots worker networks.</p>
              </div>
            </div>

            <div className={styles.benefitItem}>
              <ShieldCheck className={styles.benefitIcon} size={22} />
              <div>
                <h3>100% Compliance & Reporting</h3>
                <p>Detailed CSR-1 filings, project milestones audits, impact assessments records, and audited financial statements support.</p>
              </div>
            </div>

            <div className={styles.benefitItem}>
              <Award className={styles.benefitIcon} size={22} />
              <div>
                <h3>Co-Branding Opportunities</h3>
                <p>Receive print, video, and digital media co-branding updates showcasing your corporate citizenship and social footprint.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className={styles.formCol}>
            <div className={`${styles.formCard} glass`}>
              {submitted ? (
                <div className={styles.successWrapper}>
                  <CheckCircle2 size={48} className={styles.successIcon} />
                  <h3>Proposal Logged Securely</h3>
                  <p>Thank you for submitting your partnership inquiry. A member of our CSR partnerships development desk will review your details and connect with you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>
                    Send Another Proposal
                  </button>
                </div>
              ) : (
                <>
                  <h3>CSR Collaboration Inquiry</h3>
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="companyName">Company Name</label>
                        <input
                          type="text"
                          id="companyName"
                          required
                          className={styles.input}
                          value={formData.companyName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="contactName">Contact Person Name</label>
                        <input
                          type="text"
                          id="contactName"
                          required
                          className={styles.input}
                          value={formData.contactName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          required
                          className={styles.input}
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          required
                          className={styles.input}
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="interest">Area of Collaboration Interest</label>
                        <select
                          id="interest"
                          className={styles.select}
                          value={formData.interest}
                          onChange={handleInputChange}
                        >
                          <option value="health">Mobile Healthcare Clinics (MMUs)</option>
                          <option value="dialysis">Renal Dialysis Center Setup</option>
                          <option value="education">Model Smart Classrooms</option>
                          <option value="disability">Prosthetic Limbs & Physical Therapy</option>
                          <option value="water">Hans Jal Dhara Drinking Water Grid</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="budget">Proposed Annual Budget</label>
                        <select
                          id="budget"
                          className={styles.select}
                          value={formData.budget}
                          onChange={handleInputChange}
                        >
                          <option value="10L-50L">₹10 Lakhs — ₹50 Lakhs</option>
                          <option value="50L-2Cr">₹50 Lakhs — ₹2 Crores</option>
                          <option value="2Cr+">₹2 Crores +</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="proposal">Briefly describe your CSR goals / query</label>
                      <textarea
                        id="proposal"
                        rows={4}
                        required
                        className={styles.textarea}
                        value={formData.proposal}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Spam Check */}
                    <div className={styles.formGroup} style={{ maxWidth: '200px' }}>
                      <label htmlFor="captcha">Security Check: {mathQuestion}</label>
                      <input
                        type="text"
                        id="captcha"
                        required
                        placeholder="Answer"
                        className={styles.input}
                        value={formData.captcha}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className={styles.consentGroup}>
                      <input
                        type="checkbox"
                        id="consent"
                        required
                        className={styles.consentCheck}
                        checked={formData.consent}
                        onChange={handleConsentChange}
                      />
                      <label htmlFor="consent" className={styles.consentLabel}>
                        I agree to THF storing this data for partnership evaluations in compliance with the DPDP Act 2023.
                      </label>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                      <Send size={16} />
                      <span>Submit Collaboration Request</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
