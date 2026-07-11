'use client';

import React, { useState, useEffect } from 'react';
import styles from './donate.module.css';
import { Heart, ShieldCheck, CheckCircle2, AlertTriangle, X } from 'lucide-react';

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

  // Simulation parameters
  const [showMockCheckout, setShowMockCheckout] = useState(false);
  const [mockOrderId, setMockOrderId] = useState('');
  const [donationValue, setDonationValue] = useState(0);

  const amounts = [1000, 2500, 5000, 10000];

  // Dynamic injection of Razorpay Standard Web Checkout SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    if (!finalAmount || finalAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    setIsProcessing(true);
    setDonationValue(finalAmount);

    try {
      const payload = {
        amount: finalAmount,
        currency: 'INR',
        donorName: donorData.name,
        donorEmail: donorData.email,
        donorPhone: donorData.phone,
        panOrPassport: citizenship === 'indian' ? donorData.pan : donorData.passport,
        project,
        citizenship
      };

      const res = await fetch('/api/donate/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || 'Failed to initialize donation order');
        setIsProcessing(false);
        return;
      }

      const orderData = await res.json();

      if (orderData.isMock) {
        // Launch Simulated Checkout UI Overlay
        setMockOrderId(orderData.orderId);
        setShowMockCheckout(true);
        setIsProcessing(false);
      } else {
        // Launch standard Razorpay SDK modal
        const options = {
          key: orderData.keyId,
          amount: Math.round(finalAmount * 100),
          currency: 'INR',
          name: 'The Hans Foundation',
          description: `Donation support for: ${project}`,
          order_id: orderData.orderId,
          handler: async function (response: any) {
            setIsProcessing(true);
            const verifyRes = await fetch('/api/donate/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            if (verifyRes.ok) {
              setPaymentSuccess(true);
            } else {
              alert('Payment verification failed.');
            }
            setIsProcessing(false);
          },
          prefill: {
            name: donorData.name,
            email: donorData.email,
            contact: donorData.phone
          },
          theme: {
            color: '#0a2540'
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        setIsProcessing(false);
      }
    } catch (err) {
      console.error('Donation error:', err);
      alert('A network error occurred.');
      setIsProcessing(false);
    }
  };

  const handleSimulatePayment = async (success: boolean) => {
    setShowMockCheckout(false);
    if (!success) {
      alert("Simulated transaction cancelled/failed.");
      return;
    }

    setIsProcessing(true);
    try {
      const mockPaymentId = `pay_sim_${Math.random().toString(36).substring(2, 11)}`;
      const mockSignature = `sig_sim_${Math.random().toString(36).substring(2, 11)}`;

      const verifyRes = await fetch('/api/donate/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          razorpay_order_id: mockOrderId,
          razorpay_payment_id: mockPaymentId,
          razorpay_signature: mockSignature
        })
      });

      if (verifyRes.ok) {
        setPaymentSuccess(true);
      } else {
        alert("Simulated receipt verification failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Verification error.");
    } finally {
      setIsProcessing(false);
    }
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
                  <p>Thank you for your generous support of ₹{donationValue.toLocaleString('en-IN')}. A tax-deductible receipt has been sent to your registered email address.</p>
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

      {/* Simulated Checkout Popup Modal */}
      {showMockCheckout && (
        <div className={styles.overlay}>
          <div className={styles.checkoutBox}>
            <div className={styles.checkoutHeader}>
              <button className={styles.checkoutClose} onClick={() => handleSimulatePayment(false)}>
                <X size={18} />
              </button>
              <h2>Razorpay Checkout (Simulated)</h2>
              <p>Order ID: {mockOrderId}</p>
            </div>
            
            <div className={styles.checkoutBody}>
              <div className={styles.summaryRow}>
                <span>Support Program:</span>
                <strong>{project.toUpperCase()}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>Amount to pay:</span>
                <strong>₹{donationValue.toLocaleString('en-IN')}</strong>
              </div>
              
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, textAlign: 'center', lineHeight: 1.4 }}>
                This is a secure local simulation of the Razorpay domestic payment gateway gateway checking Section 80G tax inputs.
              </p>
              
              <div className={styles.simOptions}>
                <button className={`${styles.simBtn} ${styles.simSuccess}`} onClick={() => handleSimulatePayment(true)}>
                  <span>Simulate Payment Success</span>
                </button>
                <button className={`${styles.simBtn} ${styles.simFailure}`} onClick={() => handleSimulatePayment(false)}>
                  <span>Cancel / Fail Payment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export const dynamic = 'force-dynamic';
