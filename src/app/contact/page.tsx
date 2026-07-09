'use client';

import React, { useState } from 'react';
import styles from './contact.module.css';
import { Mail, Phone, MapPin, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ContactPage() {
  const [activeForm, setActiveForm] = useState<'general' | 'volunteer' | 'csr'>('general');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    company: '',
    skills: '',
    captcha: '',
    consent: false,
  });

  // Spam protection math puzzle
  const mathQuestion = "What is 7 + 4?";
  const mathAnswer = "11";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      alert("Please agree to our privacy data storage policy.");
      return;
    }
    setSubmitted(true);
    // Reset fields
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      company: '',
      skills: '',
      captcha: '',
      consent: false,
    });
  };

  return (
    <div className={styles.contactWrapper}>
      {/* Hero Banner */}
      <section className={styles.banner} aria-label="Contact Banner">
        <div className={styles.bannerBg} />
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.sub}>Get In Touch</span>
          <h1>Connect With The Hans Foundation</h1>
          <p>Whether you want to partner on a CSR initiative, volunteer in rural camps, or make an inquiry, we are here to assist you.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '5rem 1.5rem' }}>
        <div className={styles.grid}>
          {/* Left Column: Office Contacts */}
          <div className={styles.infoCol}>
            <h2>Our Offices</h2>
            <div className={styles.officeCard}>
              <h3>New Delhi Headquarters (HQ)</h3>
              <ul className={styles.contactList}>
                <li>
                  <MapPin size={20} className={styles.icon} />
                  <span>Building 8, 4th Floor, Local Shopping Centre, Madangir, New Delhi - 110062</span>
                </li>
                <li>
                  <Phone size={20} className={styles.icon} />
                  <a href="tel:+911146524444">+91 11 4652 4444</a>
                </li>
                <li>
                  <Mail size={20} className={styles.icon} />
                  <a href="mailto:info@thehansfoundation.org">info@thehansfoundation.org</a>
                </li>
              </ul>
            </div>

            <div className={styles.officeCard}>
              <h3>Regional Office (Uttarakhand)</h3>
              <ul className={styles.contactList}>
                <li>
                  <MapPin size={20} className={styles.icon} />
                  <span>14, Pritam Road, Dalanwala, Dehradun, Uttarakhand - 248001</span>
                </li>
                <li>
                  <Phone size={20} className={styles.icon} />
                  <a href="tel:+911352712222">+91 135 271 2222</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className={styles.formCol}>
            <div className={`${styles.formContainer} glass`}>
              
              {/* Form selection tabs */}
              <div className={styles.tabs}>
                <button
                  onClick={() => { setActiveForm('general'); setSubmitted(false); }}
                  className={`${styles.tabBtn} ${activeForm === 'general' ? styles.activeTab : ''}`}
                >
                  General
                </button>
                <button
                  onClick={() => { setActiveForm('volunteer'); setSubmitted(false); }}
                  className={`${styles.tabBtn} ${activeForm === 'volunteer' ? styles.activeTab : ''}`}
                >
                  Volunteer
                </button>
                <button
                  onClick={() => { setActiveForm('csr'); setSubmitted(false); }}
                  className={`${styles.tabBtn} ${activeForm === 'csr' ? styles.activeTab : ''}`}
                >
                  CSR Partner
                </button>
              </div>

              {submitted ? (
                <div className={styles.successWrapper}>
                  <CheckCircle2 size={48} className={styles.successIcon} />
                  <h3>Message Sent Successfully</h3>
                  <p>Thank you for reaching out. We have logged your request securely. A program manager from our respective department will review it and reply within 48 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        className={styles.input}
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
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
                  </div>

                  <div className={styles.formRow}>
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
                    {activeForm === 'csr' ? (
                      <div className={styles.formGroup}>
                        <label htmlFor="company">Company / Organization Name</label>
                        <input
                          type="text"
                          id="company"
                          required
                          className={styles.input}
                          value={formData.company}
                          onChange={handleInputChange}
                        />
                      </div>
                    ) : activeForm === 'volunteer' ? (
                      <div className={styles.formGroup}>
                        <label htmlFor="skills">Areas of Expertise</label>
                        <input
                          type="text"
                          id="skills"
                          placeholder="e.g. Medicine, Teaching, Social Work"
                          required
                          className={styles.input}
                          value={formData.skills}
                          onChange={handleInputChange}
                        />
                      </div>
                    ) : (
                      <div className={styles.formGroup}>
                        <label htmlFor="subject">Subject</label>
                        <input
                          type="text"
                          id="subject"
                          required
                          className={styles.input}
                          value={formData.subject}
                          onChange={handleInputChange}
                        />
                      </div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">
                      {activeForm === 'csr' ? 'CSR Partnership Proposal Details' : activeForm === 'volunteer' ? 'Why do you want to volunteer with THF?' : 'Your Message'}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      className={styles.textarea}
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Spam Protection Quiz */}
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

                  {/* Consent Checkbox */}
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
                      I consent to THF storing my contact inputs in compliance with the DPDP Act 2023.
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                    <span>Send Message</span>
                  </button>
                </form>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
