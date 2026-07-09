'use client';

import React from 'react';
import Accordion from '@/components/shared/Accordion';
import Link from 'next/link';
import Script from 'next/script';
import { faqPageSchema } from '@/lib/jsonld';

export default function FAQPage() {
  const faqItems = [
    {
      title: 'Are donations to The Hans Foundation eligible for tax benefits?',
      content: (
        <div>
          <p>Yes, all donations made by Indian citizens/taxpayers to The Hans Foundation are eligible for a 50% tax deduction under Section 80G of the Income Tax Act, 1961.</p>
          <p>An automated tax receipt containing our 80G trust registration registration is generated and sent to your email instantly after a donation checkout finishes successfully. Please make sure to supply a valid PAN card number during checkout to ensure automated linking with your tax return filings.</p>
        </div>
      ),
    },
    {
      title: 'Can foreign nationals make online donations to THF?',
      content: (
        <div>
          <p>Yes. The Hans Foundation possesses active FCRA (Foreign Contribution Regulation Act) registration, allowing us to receive foreign funding contributions securely.</p>
          <p>Foreign nationals must select "Foreign National" on our donation portal and supply their Passport Number during checkout for compliance records. We process foreign transactions via international payment networks.</p>
        </div>
      ),
    },
    {
      title: 'Where can I access THF\'s audited financial statements?',
      content: (
        <div>
          <p>THF is committed to absolute governance transparency. All our audited balance sheets, trust deeds, tax exemption documents, and annual impact reports are accessible for public inspection.</p>
          <p>You can view and download these records directly from our <Link href="/resources/financial-statements" style={{ color: 'var(--accent)', fontWeight: 700 }}>Financial Statements Hub</Link>.</p>
        </div>
      ),
    },
    {
      title: 'How can corporate entities initiate a CSR collaboration?',
      content: (
        <div>
          <p>Corporate entities can co-design and scale targeted primary developments (Schedule VII compliant) in healthcare, education, water security, or disability inclusion with THF.</p>
          <p>Please navigate to our <Link href="/partner/csr" style={{ color: 'var(--accent)', fontWeight: 700 }}>CSR Inquiry Desk</Link> to fill out our collaboration form or email us details directly at csr@thehansfoundation.org.</p>
        </div>
      ),
    },
    {
      title: 'How do I volunteer for THF\'s medical or educational camps?',
      content: (
        <div>
          <p>We welcome volunteers with expertise in primary healthcare, pedagogy, vocational training, and digital systems management.</p>
          <p>You can fill out a volunteer inquiry via our <Link href="/contact" style={{ color: 'var(--accent)', fontWeight: 700 }}>Inquiry Form</Link> (selecting the Volunteer tab). Our regional field coordinators will match you with active camp projects in Uttarakhand, Rajasthan, or Jharkhand.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="container" style={{ padding: '5rem 1.5rem', maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--font-size-3xl)', color: 'var(--primary)', marginBottom: '0.75rem' }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
          Find fast answers regarding online donations, Section 80G tax claims, corporate CSR projects, and governance checks.
        </p>
      </div>

      <Accordion items={faqItems} />

      <div className="glass" style={{ marginTop: '4rem', padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>
          Still have questions?
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Our communications and donor relations support teams are happy to assist you directly.
        </p>
        <Link href="/contact" className="btn btn-secondary btn-sm">
          Contact Support Desk
        </Link>
      </div>
    </div>
  );
}
