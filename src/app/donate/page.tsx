'use client';

import React, { useState } from 'react';
import styles from './donate.module.css';
import { Heart, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function DonatePage() {
  const [amount, setAmount] = useState<number>(2500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [project, setProject] = useState<string>('general');
  const [citizenship, setCitizenship] = useState<'indian' | 'foreign'>('indian');
  
  const [donorData, setDonorData] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
    passport: '',
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const amounts = [1000, 2500, 5000, 10000];

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const donationValue = customAmount ? parseFloat(customAmount) : amount;
    if (!donationValue || donationValue <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    setIsProcessing(true);
    // Simulate Razorpay checkout loading
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  return (
    <div className={styles.donateWrapper}>
      {/* Hero Banner */}
      <section className={styles.banner} aria-label="Donate Banner">
        <div className={styles.bannerBg} />
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.sub}>Make a Difference</span>
          <h1>Support Sustainable Grassroots Action</h1>
          <p>Donations to The Hans Foundation are eligible for 50% Tax Deduction under Section 80G of the Income Tax Act.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '5rem 1.5rem', maxWidth: '1000px' }}>
        <div className={styles.grid}>
          
          {/* Left Column: Trust signals & disclosures */}
          <div className={styles.infoCol}>
            <h2>Why Your Gift Matters</h2>
            <p>THF allocates 92% of all resources directly to programmatic field implementation, maintaining a highly lean management structure.</p>
            
            <div className={styles.trustPoint}>
              <ShieldCheck className={styles.trustIcon} size={20} />
              <div>
                <h3>Audited & Compliant</h3>
                <p>Audited annually by Ernst & Young (EY) with active FCRA compliance registrations for foreign assets.</p>
              </div>
            </div>

            <div className={styles.trustPoint}>
              <ShieldCheck className={styles.trustIcon} size={20} />
              <div>
                <h3>80G Tax Deductions</h3>
                <p>An automated 80G donation receipt is generated and emailed instantly for tax relief filing.</p>
              </div>
            </div>

            <div className={styles.trustPoint}>
              <ShieldCheck className={styles.trustIcon} size={20} />
              <div>
                <h3>Impact Tracking</h3>
                <p>Receive programmatic quarterly reports showcasing how your funds supported Mobile clinics and smart classes.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Donation Form */}
          <div className={styles.formCol}>
            <div className={`${styles.donationCard} glass`}>
              
              {paymentSuccess ? (
                <div className={styles.successWrapper}>
                  <CheckCircle2 size={56} className={styles.successIcon} />
                  <h3>Donation Successful!</h3>
                  <p>Thank you for your generous support of ₹{(customAmount ? parseFloat(customAmount) : amount).toLocaleString('en-IN')}. A tax-deductible receipt has been sent to your registered email address.</p>
                  <button 
                    onClick={() => { setPaymentSuccess(false); setCustomAmount(''); }} 
                    className="btn btn-primary btn-sm"
                    style={{ marginTop: '1rem' }}
                  >
                    Make Another Donation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDonateSubmit} className={styles.form}>
                  
                  {/* Category Selection */}
                  <div className={styles.sectionTitle}>1. Support Area</div>
                  <div className={styles.projectSelect}>
                    <select 
                      id="project" 
                      className={styles.select}
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                    >
                      <option value="general">General Operations Fund</option>
                      <option value="health">Mobile Medical Units Clinic</option>
                      <option value="education">Schools Upgrades & Science Labs</option>
                      <option value="disability">Prosthetics & Assistive Rehabilitation</option>
                      <option value="water">Hans Jal Dhara Safe Water Grid</option>
                    </select>
                  </div>

                  {/* Amount Select Grid */}
                  <div className={styles.sectionTitle}>2. Donation Amount (INR)</div>
                  <div className={styles.amountGrid}>
                    {amounts.map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => { setAmount(amt); setCustomAmount(''); }}
                        className={`${styles.amountBtn} ${amount === amt && !customAmount ? styles.activeAmount : ''}`}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="customAmount">Or Enter Custom Amount (₹)</label>
                    <input
                      type="number"
                      id="customAmount"
                      placeholder="e.g. 15000"
                      className={styles.input}
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setAmount(0); }}
                    />
                  </div>

                  {/* Citizenship Select */}
                  <div className={styles.sectionTitle}>3. Tax Compliance & Citizenship</div>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="citizenship"
                        checked={citizenship === 'indian'}
                        onChange={() => setCitizenship('indian')}
                      />
                      <span>Indian Citizen</span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="citizenship"
                        checked={citizenship === 'foreign'}
                        onChange={() => setCitizenship('foreign')}
                      />
                      <span>Foreign National</span>
                    </label>
                  </div>

                  {/* Personal details */}
                  <div className={styles.formGroup}>
                    <label htmlFor="donor-name">Donor Name</label>
                    <input
                      type="text"
                      id="donor-name"
                      required
                      className={styles.input}
                      value={donorData.name}
                      onChange={(e) => setDonorData({...donorData, name: e.target.value})}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="donor-email">Email Address</label>
                      <input
                        type="email"
                        id="donor-email"
                        required
                        className={styles.input}
                        value={donorData.email}
                        onChange={(e) => setDonorData({...donorData, email: e.target.value})}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="donor-phone">Phone Number</label>
                      <input
                        type="tel"
                        id="donor-phone"
                        required
                        className={styles.input}
                        value={donorData.phone}
                        onChange={(e) => setDonorData({...donorData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  {citizenship === 'indian' ? (
                    <div className={styles.formGroup}>
                      <label htmlFor="pan">PAN Card Number (Required for 80G tax receipt)</label>
                      <input
                        type="text"
                        id="pan"
                        required
                        placeholder="ABCDE1234F"
                        className={styles.input}
                        value={donorData.pan}
                        onChange={(e) => setDonorData({...donorData, pan: e.target.value})}
                      />
                    </div>
                  ) : (
                    <div className={styles.formGroup}>
                      <label htmlFor="passport">Passport Number (Required under FCRA regulations)</label>
                      <input
                        type="text"
                        id="passport"
                        required
                        className={styles.input}
                        value={donorData.passport}
                        onChange={(e) => setDonorData({...donorData, passport: e.target.value})}
                      />
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%', marginTop: '1rem' }}
                    disabled={isProcessing}
                  >
                    <Heart size={16} fill="white" />
                    <span>{isProcessing ? 'Processing Payment Gateway...' : `Donate ₹${(customAmount ? parseFloat(customAmount) : amount).toLocaleString('en-IN')}`}</span>
                  </button>

                  <div className={styles.complianceNote}>
                    <AlertTriangle size={14} className={styles.alertIcon} />
                    <span>Razorpay gateway connects securely via SSL. We do not store PAN or card inputs on our servers.</span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
