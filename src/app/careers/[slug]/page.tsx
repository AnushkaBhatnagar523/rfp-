'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import styles from '../careers.module.css';
import { ArrowLeft, MapPin, Briefcase, Calendar, Upload, CheckCircle2, ShieldAlert } from 'lucide-react';

interface JobDetailsData {
  title: string;
  department: string;
  location: string;
  experience: string;
  type: string;
  responsibilities: string[];
  requirements: string[];
}

const jobsDetailsData: { [key: string]: JobDetailsData } = {
  'program-manager-healthcare': {
    title: 'Program Manager — Healthcare Services',
    department: 'Healthcare',
    location: 'Dehradun, Uttarakhand',
    experience: '5+ Years',
    type: 'Full-Time',
    responsibilities: [
      'Manage day-to-day operational schedules, fuel inventories, and clinical staffing logs of 15+ Mobile Medical Units (MMUs).',
      'Coordinate regional partnerships with state health ministries, private specialized hospitals, and community stakeholders.',
      'Prepare weekly and monthly output metrics sheets (beneficiaries treated, critical referrals, drug stock balances).',
      'Perform frequent monitoring site visits to ensure adherence to clinical safety and sanitation parameters.',
    ],
    requirements: [
      'Master of Public Health (MPH), MBA in Healthcare, or Master of Social Work (MSW) from a recognized university.',
      'Minimum 5 years of active field operations experience in rural primary healthcare projects or NGO clinical management.',
      'Excellent verbal and written communication skills in both Hindi and English.',
      'Willingness to travel extensively across remote mountainous regions of Uttarakhand.',
    ],
  },
  'field-coordinator-education': {
    title: 'Field Coordinator — Primary Education',
    department: 'Education',
    location: 'Ranchi, Jharkhand',
    experience: '2+ Years',
    type: 'Full-Time',
    responsibilities: [
      'Coordinate school renovation projects, science laboratory setups, and classroom painting contracts locally.',
      'Liaise with government school headmasters, local panchayats, and block education officers to implement smart classroom setups.',
      'Supervise smart-board software training sessions for rural teachers and track students attendance records.',
      'Assist local field audits and supply school bags, library books, and learning kits distributions.',
    ],
    requirements: [
      'Bachelor\'s degree in Social Work (BSW), Education, or a related developmental studies discipline.',
      'At least 2 years of on-ground experience running primary learning support or rural community coordination campaigns.',
      'Conversant with local languages and regional development challenges in tribal areas of Jharkhand.',
      'Candidate must possess a valid driver\'s license and a personal two-wheeler for field travel.',
    ],
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function JobDetails({ params }: PageProps) {
  const { slug } = use(params);
  
  const job = jobsDetailsData[slug] || jobsDetailsData['program-manager-healthcare'];

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consent: false
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.consent && resumeName) {
      setFormSubmitted(true);
    }
  };

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
                        className={styles.consentCheck}
                        checked={formData.consent}
                        onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                      />
                      <label htmlFor="consent" className={styles.consentText}>
                        I agree to THF storing my contact information for job recruitment processing.
                      </label>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                      <span>Submit Application</span>
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
