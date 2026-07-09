import Link from 'next/link';
import { ArrowRight, FileText, Image as ImageIcon, PlayCircle, Sparkles } from 'lucide-react';
import styles from './news-media.module.css';

const resources = [
  {
    title: 'Photo Gallery',
    description: 'A visual archive of field stories, community-led programs, and flagship initiatives.',
    href: '/news-media/photo-gallery',
    icon: <ImageIcon size={20} />,
  },
  {
    title: 'Video Gallery',
    description: 'Watch impact stories, interviews, and behind-the-scenes program highlights.',
    href: '/news-media/video-gallery',
    icon: <PlayCircle size={20} />,
  },
  {
    title: 'Media Resources',
    description: 'Download press kits, fact sheets, and program communications materials.',
    href: '/resources/downloads',
    icon: <FileText size={20} />,
  },
];

export default function NewsMediaPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-label="News and Media Banner">
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.eyebrow}>News & Media</span>
          <h1>Stories, visuals, and updates that reflect our impact.</h1>
          <p>Explore the latest public-facing content, media resources, and campaign storytelling from The Hans Foundation.</p>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Media Library</span>
            <h2>Access stories, footage, and communication assets in one place.</h2>
          </div>
          <div className={styles.cardsGrid}>
            {resources.map((item) => (
              <article key={item.title} className={`${styles.card} glass`}>
                <div className={styles.iconWrapper}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href={item.href} className={styles.link}>
                  <span>Explore</span>
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.highlightSection}>
        <div className="container">
          <div className={`${styles.highlightCard} glass`}>
            <Sparkles size={24} />
            <div>
              <h3>Press and partnership inquiries</h3>
              <p>Journalists, filmmakers, and institutional partners can connect with THF through our contact desk for interviews, requests, or collaboration opportunities.</p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              <span>Contact Our Team</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
