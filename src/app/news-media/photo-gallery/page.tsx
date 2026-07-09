import styles from './photo-gallery.module.css';

const galleryItems = [
  {
    title: 'Mobile Medical Unit',
    caption: 'A community care visit in a remote district supporting preventive healthcare access.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Learning Spaces',
    caption: 'Children and teachers in a bright, inclusive classroom environment built for better learning.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Women-led Livelihoods',
    caption: 'Training and micro-enterprise support that strengthen household resilience.',
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=900&q=80',
  },
];

export default function PhotoGalleryPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.eyebrow}>Photo Gallery</span>
          <h1>Visual stories from communities we serve.</h1>
          <p>Explore a curated collection of images that capture health, education, livelihoods, and resilience in action.</p>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.grid}>
            {galleryItems.map((item) => (
              <article key={item.title} className={`${styles.card} glass`}>
                <img src={item.image} alt={item.title} className={styles.image} />
                <div className={styles.content}>
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
