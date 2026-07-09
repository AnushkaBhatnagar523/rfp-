import React from 'react';
import Link from 'next/link';
import styles from '../blog.module.css';
import { Calendar, User, ArrowLeft, MessageSquare, Send } from 'lucide-react';

interface BlogPostData {
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  content: string[];
}

const articlesData: { [key: string]: BlogPostData } = {
  'hearing-loss-to-classroom-stars': {
    title: 'From Severe Hearing Loss to Classroom Stars: Shreya\'s Story',
    category: 'Disability Inclusion',
    author: 'Aarti Negi',
    date: 'June 24, 2026',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80',
    content: [
      'Shreya was diagnosed with profound bilateral sensorineural hearing loss at the age of three. In the remote village of Uttarakhand where her family lives, specialized diagnostic support and therapies were nonexistent. Her parents had given up hope of her ever going to school or speaking.',
      'Through a local health screening camp organized by The Hans Foundation in 2023, Shreya was identified for our Cochlear Implant Program. The foundation funded the entire clinical surgery and provided support for her post-operative recovery.',
      'Following a successful surgery, Shreya underwent 18 months of rigorous auditory-verbal therapy sessions at our specialized rehabilitation center. The results have been remarkable.',
      'Today, six-year-old Shreya can speak fluently and hear clearly. She was recently enrolled in a local model school, where she is already topping her class quizzes. Her story stands as a testament to how specialized early detection programs can transform lives completely.',
    ],
  },
  'mobile-medical-clinics-redefining-healthcare': {
    title: 'Mobile Medical Units: Redefining Primary Healthcare Access in Hills',
    category: 'Healthcare',
    author: 'Dr. Vivek Rawat',
    date: 'May 12, 2026',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    content: [
      'For communities residing in the rugged terrains of the Himalayas, reaching a primary health center often requires hours of trekking. Dilapidated paths and expensive transportation prevent elderly or pregnant patients from seeking clinical care.',
      'The Hans Foundation bridged this gap by launching our specialized Mobile Medical Unit (MMU) fleet. Each MMU is a custom clinical van staffed with a doctor, a nurse, a lab technician, and a pharmacist.',
      'The vans visit designated village points on a fixed weekly schedule. Patients receive free clinical consultations, blood testing services, and generic medicines without leaving their habitations.',
      'By offering preventive care and early chronic disease management (for diabetes and hypertension), our MMUs have significantly reduced emergency hospitalizations and saved rural families from crippling health debts.',
    ],
  },
  'women-micro-entrepreneurs-lead-the-way': {
    title: 'How Women Micro-Entrepreneurs are Redefining Livelihoods in Jharkhand',
    category: 'Livelihoods',
    author: 'Meera Soren',
    date: 'April 05, 2026',
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=1200&q=80',
    content: [
      'Rural women in Jharkhand often rely on seasonal agricultural labor, leaving them financially vulnerable during dry months. To solve this, THF introduced local vocational skill setups and entrepreneurial coaching.',
      'Under the Hans Udhyamita Mission, we mobilized women into self-help groups (SHGs) and provided structural training in bookkeeping, business management, and trade.',
      'We then backed them with seed grants to set up local micro-enterprises, including community spice-grinding mills, tailoring blocks, and sustainable poultry farming.',
      'The results are visible: over 65,000 women have established stable incomes, helping them fund their children\'s education, purchase assets, and actively participate in household decision-making.',
    ],
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetails({ params }: PageProps) {
  const { slug } = await params;
  const article = articlesData[slug] || articlesData['hearing-loss-to-classroom-stars'];

  return (
    <div className={styles.detailsWrapper}>
      <div className="container" style={{ maxWidth: '800px', padding: '4rem 1.5rem' }}>
        
        {/* Back Link */}
        <Link href="/blog" className={styles.backBtn}>
          <ArrowLeft size={16} />
          <span>Back to Articles</span>
        </Link>

        {/* Title & Metadata */}
        <span className={styles.detailsCat}>{article.category}</span>
        <h1 className={styles.detailsTitle}>{article.title}</h1>
        
        <div className={styles.detailsMeta}>
          <span className={styles.metaItem}>
            <Calendar size={16} />
            {article.date}
          </span>
          <span className={styles.metaItem}>
            <User size={16} />
            By {article.author}
          </span>
        </div>

        {/* Hero Image */}
        <div className={styles.detailsImageWrapper}>
          <img src={article.image} alt={article.title} className={styles.detailsImage} />
        </div>

        {/* Article Content */}
        <div className={styles.articleBody}>
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Moderated Comments Box (Mocked Interface) */}
        <div className={`${styles.commentsSection} glass`}>
          <h3>
            <MessageSquare size={20} className={styles.commentsIcon} />
            <span>Discussion (Moderated)</span>
          </h3>
          
          <form className={styles.commentForm}>
            <textarea 
              placeholder="Join the discussion... (Comments are reviewed by THF managers before appearing online)"
              className={styles.commentTextarea}
              rows={4}
              required
              aria-label="Write a comment"
            />
            <div className={styles.formRow}>
              <input 
                type="text" 
                placeholder="Your Name" 
                className={styles.commentInput} 
                required
                aria-label="Your Name"
              />
              <button type="submit" className="btn btn-primary btn-sm">
                <Send size={14} />
                <span>Submit Comment</span>
              </button>
            </div>
          </form>

          <div className={styles.commentsList}>
            <div className={styles.comment}>
              <div className={styles.commentHeader}>
                <strong>Rajesh Pathak</strong>
                <span>2 days ago</span>
              </div>
              <p>Incredible work by the THF team. Early childhood screening is truly critical for disability inclusion.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
