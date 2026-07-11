'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import styles from '../blog.module.css';
import { Calendar, User, ArrowLeft, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface BlogPostData {
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  content: string[];
}

interface Comment {
  id: number;
  author: string;
  content: string;
  created_at: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetails({ params }: PageProps) {
  const { slug } = use(params);
  
  const [article, setArticle] = useState<BlogPostData | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Comment Form State
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchBlogDetails = async () => {
    try {
      const res = await fetch(`/api/blog/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setArticle(data.blog);
        setComments(data.comments);
      }
      setLoading(false);
    } catch (err) {
      console.error('Fetch blog details failed:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [slug]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !commentText) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/blog/${slug}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author: authorName, content: commentText }),
      });

      if (res.ok) {
        setCommentSuccess(true);
        setAuthorName('');
        setCommentText('');
        // Hide success message after 5 seconds
        setTimeout(() => setCommentSuccess(false), 5000);
      } else {
        alert('Failed to submit comment. Please try again.');
      }
      setSubmitting(false);
    } catch (err) {
      console.error('Comment submit error:', err);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--text-secondary)' }}>
        <span>Loading story details...</span>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '1rem' }}>
        <h3>Article not found</h3>
        <Link href="/blog" className="btn btn-secondary">
          <span>Back to Articles</span>
        </Link>
      </div>
    );
  }

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

        {/* Moderated Comments Box */}
        <div className={`${styles.commentsSection} glass`}>
          <h3>
            <MessageSquare size={20} className={styles.commentsIcon} />
            <span>Discussion (Moderated)</span>
          </h3>
          
          {commentSuccess ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(5, 150, 105, 0.1)', border: '1px solid rgba(5, 150, 105, 0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', color: 'var(--success)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <CheckCircle2 size={18} />
              <span>Thank you! Your comment has been submitted and is pending review by THF moderators.</span>
            </div>
          ) : (
            <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
              <textarea 
                placeholder="Join the discussion... (Comments are reviewed by THF managers before appearing online)"
                className={styles.commentTextarea}
                rows={4}
                required
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={submitting}
                aria-label="Write a comment"
              />
              <div className={styles.formRow}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className={styles.commentInput} 
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  disabled={submitting}
                  aria-label="Your Name"
                />
                <button type="submit" disabled={submitting} className="btn btn-primary btn-sm">
                  <Send size={14} />
                  <span>{submitting ? 'Submitting...' : 'Submit Comment'}</span>
                </button>
              </div>
            </form>
          )}

          <div className={styles.commentsList}>
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className={styles.comment}>
                  <div className={styles.commentHeader}>
                    <strong>{comment.author}</strong>
                    <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))
            ) : (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textAlign: 'center', padding: '1.5rem 0' }}>
                No approved comments yet. Be the first to start the discussion!
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
