import React from 'react';
import Link from 'next/link';

interface SitemapSection {
  title: string;
  links: { label: string; href: string }[];
}

const sitemapData: SitemapSection[] = [
  {
    title: 'Who We Are',
    links: [
      { label: 'Homepage', href: '/' },
      { label: 'About Us — Our Story', href: '/about/our-story' },
      { label: 'Vision, Mission & Values', href: '/about/vision-mission' },
      { label: 'Executive Leadership', href: '/about/leadership' },
      { label: 'Board of Trustees', href: '/about/board-members' },
    ],
  },
  {
    title: 'Development Sectors',
    links: [
      { label: 'Healthcare Programs', href: '/programs/health' },
      { label: 'Inclusive Learning & Education', href: '/programs/education' },
      { label: 'Livelihoods & Vocational Training', href: '/programs/livelihood' },
      { label: 'Disability Rehabilitation Services', href: '/programs/disability-inclusion' },
      { label: 'Climate Action & spring Recharges', href: '/programs/climate-action' },
      { label: 'Emergency Disaster Relief', href: '/programs/disaster-relief' },
    ],
  },
  {
    title: 'Transparency Hub & Resources',
    links: [
      { label: 'Annual Impact Reports', href: '/resources/annual-reports' },
      { label: 'Audited Financial Statements', href: '/resources/financial-statements' },
      { label: 'Governance & Safety Policies', href: '/resources/policies' },
      { label: 'Press Kits & Downloadable Assets', href: '/resources/downloads' },
    ],
  },
  {
    title: 'Take Action & Support Us',
    links: [
      { label: 'Make an Online Donation', href: '/donate' },
      { label: 'CSR Partnerships proposal desk', href: '/partner/csr' },
      { label: 'Inquiries, Careers & Volunteer Forms', href: '/contact' },
      { label: 'Careers Open Vacancies Board', href: '/careers' },
      { label: 'Success Stories & Updates Blog', href: '/blog' },
      { label: 'Frequently Asked Questions (FAQ)', href: '/faq' },
    ],
  },
  {
    title: 'Legal compliance',
    links: [
      { label: 'Privacy Policy (DPDPA compliant)', href: '/privacy-policy' },
      { label: 'Terms of Use & Regulations', href: '/terms' },
      { label: 'Accessibility Statements guidelines', href: '/accessibility' },
    ],
  },
];

export default function Sitemap() {
  return (
    <div className="container" style={{ padding: '5rem 1.5rem', maxWidth: '900px' }}>
      <div style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--font-size-3xl)', color: 'var(--primary)', marginBottom: '0.75rem' }}>
          Website Sitemap
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
          Quick directory index mapping all primary public pages, reports, and contact desks of The Hans Foundation.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
        {sitemapData.map((section, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-sm)', fontWeight: 800, color: 'var(--primary)', borderBottom: '2px solid var(--border-light)', paddingBottom: '0.5rem' }}>
              {section.title}
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {section.links.map((link, linkIdx) => (
                <li key={linkIdx} style={{ fontSize: 'var(--font-size-xs)' }}>
                  <Link href={link.href} style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
