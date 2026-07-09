import styles from './video-gallery.module.css';

const videos = [
  {
    title: 'Rural Health Outreach',
    description: 'A short documentary on our mobile medical unit work across remote communities.',
    embed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    title: 'Classrooms in Action',
    description: 'How inclusive education spaces help children stay engaged and supported.',
    embed: 'https://www.youtube.com/embed/ScMzIvxBSi4',
  },
];

export default function VideoGalleryPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.eyebrow}>Video Gallery</span>
          <h1>Impact stories captured on film.</h1>
          <p>Watch documentaries and short stories that highlight the people, places, and progress behind our programs.</p>
        </div>
      </section>

      <section className={styles.videoSection}>
        <div className="container">
          <div className={styles.grid}>
            {videos.map((video) => (
              <article key={video.title} className={`${styles.card} glass`}>
                <div className={styles.videoFrame}>
                  <iframe
                    src={video.embed}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className={styles.content}>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
