import React from 'react';

export default function TermsOfUse() {
  return (
    <div className="container" style={{ padding: '5rem 1.5rem', maxWidth: '800px' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--font-size-3xl)', color: 'var(--primary)', marginBottom: '1.5rem' }}>
        Terms of Use
      </h1>

      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <p><strong>Last Updated: July 03, 2026</strong></p>

        <p>
          Welcome to the website of The Hans Foundation (https://thehansfoundation.org). By accessing or using this website, you agree to comply with and be bound by the following terms and conditions of use.
        </p>

        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-md)', fontWeight: 800, color: 'var(--primary)', marginTop: '1rem', marginBottom: '0.25rem' }}>
          1. Intellectual Property
        </h2>
        <p>
          All content, including text, photographs, graphics, logos, videos, and downloadable resources on this website, is the property of The Hans Foundation unless stated otherwise. You may view and download materials for personal, non-commercial use only. Any unauthorized duplication or redistribution of media kits or reports is strictly prohibited.
        </p>

        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-md)', fontWeight: 800, color: 'var(--primary)', marginTop: '1rem', marginBottom: '0.25rem' }}>
          2. Donation Refund Policy
        </h2>
        <p>
          Donations made to The Hans Foundation support charitable field programs. We expect donors to exercise care when processing online donations. In the event of an accidental duplicate transaction or incorrect input, refund requests must be sent to donations@thehansfoundation.org within 7 days of payment. Refunds will be evaluated at the discretion of the management.
        </p>

        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-md)', fontWeight: 800, color: 'var(--primary)', marginTop: '1rem', marginBottom: '0.25rem' }}>
          3. Links to Third-Party Sites
        </h2>
        <p>
          Our website may contain links to partner NGO websites, government portals, or news outlets. THF is not responsible for the privacy practices, content reliability, or terms of use of third-party external networks.
        </p>

        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-md)', fontWeight: 800, color: 'var(--primary)', marginTop: '1rem', marginBottom: '0.25rem' }}>
          4. Governing Law & Jurisdiction
        </h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising in connection with website usage or transaction issues shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.
        </p>
      </div>
    </div>
  );
}
