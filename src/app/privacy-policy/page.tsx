import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container" style={{ padding: '5rem 1.5rem', maxWidth: '800px' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--font-size-3xl)', color: 'var(--primary)', marginBottom: '1.5rem' }}>
        Privacy Policy
      </h1>
      
      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <p><strong>Last Updated: July 03, 2026</strong></p>
        
        <p>
          The Hans Foundation (referred to as "THF", "we", "us", or "our") operates the website (https://thehansfoundation.org). We respect the privacy of our visitors, donors, volunteers, and partners. This Privacy Policy details how we collect, process, store, and safeguard personal information in compliance with the **Digital Personal Data Protection Act (DPDPA) 2023** of India and international data security standards.
        </p>

        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-md)', fontWeight: 800, color: 'var(--primary)', marginTop: '1rem', marginBottom: '0.25rem' }}>
          1. Information We Collect
        </h2>
        <p>
          We only collect personal information that is voluntarily provided or required under statutory Indian laws:
        </p>
        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Donor Personal Data:</strong> Name, email address, telephone number, mailing address, PAN card number (required for 80G tax deductions), and passport number (for foreign citizens under FCRA regulations).</li>
          <li><strong>Job and Volunteer Applicants:</strong> Name, resume files, educational backgrounds, and reference contacts.</li>
          <li><strong>Technical Data:</strong> Anonymized cookie parameters, IP addresses, browser specifications, and page loading speeds.</li>
        </ul>

        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-md)', fontWeight: 800, color: 'var(--primary)', marginTop: '1rem', marginBottom: '0.25rem' }}>
          2. Purpose of Data Processing
        </h2>
        <p>
          We process personal inputs solely for designated purposes with your explicit consent:
        </p>
        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>To securely process online donations via integrated Payment Gateways.</li>
          <li>To issue statutory tax-exemption receipts under Section 80G of the Income Tax Act.</li>
          <li>To process careers applications and volunteer matches.</li>
          <li>To distribute quarterly programmatic newsletter updates.</li>
        </ul>

        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-md)', fontWeight: 800, color: 'var(--primary)', marginTop: '1rem', marginBottom: '0.25rem' }}>
          3. Data Security & Storage
        </h2>
        <p>
          We deploy industry-standard secure socket layers (SSL), database access keys control, and network firewalls. We do not store donor financial card data on our servers; transactions are routed securely through PCI-DSS compliant payment gateways (Razorpay). 
        </p>

        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-md)', fontWeight: 800, color: 'var(--primary)', marginTop: '1rem', marginBottom: '0.25rem' }}>
          4. Your Rights under DPDPA 2023
        </h2>
        <p>
          You hold complete sovereignty over your personal data. You have the right to request:
        </p>
        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>Access to the summary of personal data we possess.</li>
          <li>Correction of obsolete or incorrect contact details.</li>
          <li>Withdrawal of consent and deletion of personal data from our databases (subject to tax auditing storage laws).</li>
        </ul>

        <p>
          For any data protection inquiries or grievance redressed under the DPDPA, please reach out to our designated Data Protection Officer at privacy@thehansfoundation.org.
        </p>
      </div>
    </div>
  );
}
