import Link from 'next/link';
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import styles from './projects.module.css';

const projects = [
  {
    title: 'Mobile Healthcare Networks',
    description: 'Expanding preventive care, dialysis support, and specialist outreach to remote districts.',
  },
  {
    title: 'Inclusive Learning Labs',
    description: 'Building safe, child-friendly classrooms and introducing digital learning resources.',
  },
  {
    title: 'Women-led Enterprise Hubs',
    description: 'Supporting women entrepreneurs with training, capital access, and market linkages.',
  },
  {
    title: 'Climate Resilience Systems',
    description: 'Creating water-secure and sanitation-ready communities through sustainable infrastructure.',
  },
];

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.eyebrow}>Projects</span>
          <h1>Field-ready programs that turn resources into measurable progress.</h1>
          <p>From mobile medical outreach to climate resilience and livelihoods, each initiative is designed for accountability and lasting social returns.</p>
          <Link href="/donate" className="btn btn-primary">
            <HeartHandshake size={16} />
            <span>Support a Project</span>
          </Link>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className="container">
          <div className={styles.grid}>
            {projects.map((project) => (
              <article key={project.title} className={`${styles.card} glass`}>
                <Sparkles size={22} className={styles.icon} />
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.meta}>
                  <ShieldCheck size={16} />
                  <span>Transparent delivery and impact reporting</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={`${styles.ctaCard} glass`}>
            <div>
              <h2>Need a tailored partnership approach?</h2>
              <p>We work with donors and corporations on co-designed implementation pathways that match local priorities and measurable outcomes.</p>
            </div>
            <Link href="/partner/csr" className="btn btn-primary">
              <span>Explore Partnerships</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
