import Link from 'next/link';
import { ArrowRight, BadgeCheck, Globe2, Handshake, ShieldCheck, Sparkles } from 'lucide-react';
import styles from './partner.module.css';

const focusAreas = [
  {
    title: 'Health & Nutrition',
    description: 'Co-fund mobile clinics, dialysis support, and maternal health outreach in underserved districts.',
  },
  {
    title: 'Education & Digital Access',
    description: 'Support smart classrooms, teacher training, and inclusive learning environments for children.',
  },
  {
    title: 'Livelihood & Climate',
    description: 'Partner on water security, women-led enterprise, and climate resilience programs that scale locally.',
  },
];

const partnershipModels = [
  'Strategic CSR implementation with transparent reporting',
  'Program co-design aligned to your social impact goals',
  'Community-first execution with field-level accountability',
];

export default function PartnerPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-label="Partner With Us Banner">
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.eyebrow}>Partner With Us</span>
          <h1>Build lasting social impact with a trusted implementation partner.</h1>
          <p>
            We work with leading corporates, foundations, and civic institutions to design high-accountability programs that create measurable change across India.
          </p>
          <div className={styles.heroActions}>
            <Link href="/partner/csr" className="btn btn-primary">
              <span>Start a CSR Partnership</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              <span>Book a Consultation</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.statsSection} aria-label="Partnership Highlights">
        <div className="container">
          <div className={styles.statsGrid}>
            <article className={`${styles.statCard} glass`}>
              <BadgeCheck size={24} />
              <strong>23 States</strong>
              <span>Operational reach with local implementation teams</span>
            </article>
            <article className={`${styles.statCard} glass`}>
              <Handshake size={24} />
              <strong>100% Reporting</strong>
              <span>Milestone tracking, audits, and impact dashboards</span>
            </article>
            <article className={`${styles.statCard} glass`}>
              <Globe2 size={24} />
              <strong>Global Standards</strong>
              <span>Aligned with donor trust, governance, and compliance norms</span>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentGrid}>
            <div>
              <span className={styles.sectionLabel}>Why organizations choose THF</span>
              <h2>Partnerships shaped by credibility, transparency, and field execution.</h2>
              <p>
                From grantmaking to nationwide program delivery, THF brings together grassroots expertise, qualitative storytelling, and rigorous governance to help partners fulfill their public purpose.
              </p>
              <ul className={styles.list}>
                {partnershipModels.map((item) => (
                  <li key={item}>
                    <ShieldCheck size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${styles.panel} glass`}>
              <Sparkles size={24} />
              <h3>Ideal for</h3>
              <p>Corporate CSR teams, family foundations, bilateral donors, and civic institutions shaping long-term community impact.</p>
              <Link href="/partner/csr" className="btn btn-primary">
                <span>Explore CSR Opportunities</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.focusSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Focus Areas</span>
            <h2>Programs that align with your social strategy.</h2>
          </div>
          <div className={styles.focusGrid}>
            {focusAreas.map((area) => (
              <article key={area.title} className={`${styles.focusCard} glass`}>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
