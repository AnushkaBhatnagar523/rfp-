'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './blog.module.css';
import { Search, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
}

export default function BlogListing() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Healthcare', 'Education', 'Livelihoods', 'Disability Inclusion', 'Climate Action'];

  useEffect(() => {
    setLoading(true);
    const q = searchQuery ? `&query=${encodeURIComponent(searchQuery)}` : '';
    fetch(`/api/blog?category=${encodeURIComponent(selectedCat)}${q}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch blogs failed:', err);
        setLoading(false);
      });
  }, [selectedCat, searchQuery]);

  return (
    <div className={styles.blogWrapper}>
      {/* Blog Hero */}
      <section className={styles.blogHero} aria-label="Stories Header">
        <div className={styles.blogHeroBg} />
        <div className={`container ${styles.blogHeroContent}`}>
          <span className={styles.sub}>THF Stories & Media</span>
          <h1>Success Stories & Operational Insights</h1>
          <p>Read about on-the-ground impacts, policy commentaries, and case studies from our program implementations.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        
        {/* Search & Categories bar */}
        <div className={styles.toolbar}>
          <div className={styles.categories}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`${styles.catBtn} ${selectedCat === cat ? styles.activeCat : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.searchBar}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search articles"
            />
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px', color: 'var(--text-secondary)' }}>
            <span>Loading stories...</span>
          </div>
        ) : posts.length > 0 ? (
          <div className={styles.blogGrid}>
            {posts.map(post => (
              <article key={post.slug} className={`${styles.blogCard} hover-lift glass`}>
                <div className={styles.cardImageWrapper}>
                  <img src={post.image} alt={post.title} className={styles.cardImage} />
                  <span className={styles.categoryBadge}>{post.category}</span>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span className={styles.metaItem}>
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    <span className={styles.metaItem}>
                      <User size={14} />
                      {post.author}
                    </span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                    <span>Read Article</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <BookOpen size={48} className={styles.noResultsIcon} />
            <h3>No articles found</h3>
            <p>Try refining your search terms or choosing a different category filter.</p>
          </div>
        )}

      </div>
    </div>
  );
}
