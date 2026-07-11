'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import styles from '../careers.module.css';
import { ArrowLeft, MapPin, Briefcase, Calendar, Upload, CheckCircle2 } from 'lucide-react';

interface JobDetailsData {
  title: string;
  department: string;
  location: string;
  experience: string;
  type: string;
  responsibilities: string[];
  requirements: string[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function JobDetails({ params }: PageProps) {
  const { slug } = use(params);
  
  const [job, setJob] = useState<JobDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [resumeName, setResumeName] = useState('');
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consent: false
  });

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await fetch(`/api/careers/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setJob(data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Fetch job details failed:', err);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [slug]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
      setFileInput(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent || !fileInput) {
      alert('Please agree to data storage and upload a CV file.');
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('jobSlug', slug);
      data.append('consent', formData.consent ? 'true' : 'false');
      data.append('resume', fileInput);

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        setFormSubmitted(true);
      } else {
        const errData = await res.json();
        alert(errData.error || 'Failed to submit application.');
      }
    } catch (err) {
      console.error('Application submit error:', err);
      alert('A network error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--text-secondary)' }}>
        <span>Loading vacancy details...</span>
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '1rem' }}>
        <h3>Job vacancy not found</h3>
        <Link href="/careers" className="btn btn-secondary">
          <span>Back to Open Positions</span>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.detailsWrapper}>
      <div className="container" style={{ maxWidth: '900px', padding: '4rem 1.5rem' }}>
        
        {/* Back Link */}
        <Link href="/careers" className={styles.backBtn}>
          <ArrowLeft size={16} />
          <span>Back to Open Positions</span>
        </Link>

        {/* Job Title Header */}
        <span className={styles.detailsCat}>{job.department}</span>
        <h1 className={styles.detailsTitle}>{job.title}</h1>

        <div className={styles.detailsMeta}>
          <span className={styles.metaItem}>
            <MapPin size={16} />
            {job.location}
          </span>
          <span className={styles.metaItem}>
            <Briefcase size={16} />
            {job.experience}
          </span>
          <span className={styles.metaItem}>
            <Calendar size={16} />
            {job.type}
          </span>
        </div>

        {/* Content Details */}
        <div className={styles.detailsGrid}>
          {/* Left Column: Job Info */}
          <div className={styles.jobSpecColumn}>
            <div className={styles.specSection}>
              <h3>Key Responsibilities</h3>
              <ul>
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>

            <div className={styles.specSection} style={{ marginTop: '2rem' }}>
              <h3>Eligibility & Requirements</h3>
              <ul>
                {job.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className={styles.formColumn}>
            <div className={`${styles.applicationCard} glass`}>
              {formSubmitted ? (
                <div className={styles.successWrapper}>
                  <CheckCircle2 size={48} className={styles.successIcon} />
                  <h3>Application Submitted</h3>
                  <p>Thank you for applying. Our HR manager will review your resume and contact you shortly regarding the next interview stages.</p>
                  <Link href="/careers" className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>
                    View Other Jobs
                  </Link>
                </div>
              ) : (
                <>
                  <h3>Apply Online</h3>
                  <form onSubmit={handleSubmit} className={styles.appForm}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        required 
                        disabled={submitting}
                        className={styles.formInput} 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        required 
                        disabled={submitting}
                        className={styles.formInput}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        required 
                        disabled={submitting}
                        className={styles.formInput}
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Upload Resume (PDF/DOCX)</label>
                      <div className={styles.uploadBox}>
                        <input 
                          type="file" 
                          id="resume-file" 
                          accept=".pdf,.docx,.doc" 
                          required 
                          disabled={submitting}
                          className={styles.fileInput}
                          onChange={handleFileChange}
                        />
                        <label htmlFor="resume-file" className={styles.uploadLabel}>
                          <Upload size={20} className={styles.uploadIcon} />
                          <span>{resumeName ? resumeName : 'Choose CV File'}</span>
                        </label>
                      </div>
                    </div>

                    <div className={styles.consentGroup}>
                      <input 
                        type="checkbox" 
                        id="consent" 
                        required
                        disabled={submitting}
                        className={styles.consentCheck}
                        checked={formData.consent}
                        onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                      />
                      <label htmlFor="consent" className={styles.consentText}>
                        I agree to THF storing my contact information for job recruitment processing.
                      </label>
                    </div>

                    <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                      <span>{submitting ? 'Submitting CV...' : 'Submit Application'}</span>
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
export const dynamic = 'force-dynamic';
