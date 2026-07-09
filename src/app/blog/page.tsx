'use client';

import React, { useState } from 'react';
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

const allPosts: BlogPost[] = [
  {
    slug: 'hearing-loss-to-classroom-stars',
    title: 'From Severe Hearing Loss to Classroom Stars: Shreya\'s Story',
    category: 'Disability Inclusion',
    author: 'Aarti Negi',
    date: 'June 24, 2026',
    excerpt: 'How our cochlear implants program helped a six-year-old girl gain her hearing back and join regular primary schooling.',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'mobile-medical-clinics-redefining-healthcare',
    title: 'Mobile Medical Units: Redefining Primary Healthcare Access in Hills',
    category: 'Healthcare',
    author: 'Dr. Vivek Rawat',
    date: 'May 12, 2026',
    excerpt: 'An inside look at how our clinical fleets navigate tough weather to deliver free diagnostic checkups weekly.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'women-micro-entrepreneurs-lead-the-way',
    title: 'How Women Micro-Entrepreneurs are Redefining Livelihoods in Jharkhand',
    category: 'Livelihoods',
    author: 'Meera Soren',
    date: 'April 05, 2026',
    excerpt: 'Meet the self-help groups starting processing businesses and driving rural village financial self-reliance.',
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'smart-classrooms-bridge-digital-divide',
    title: 'Smart Classrooms: Bridging the Digital Divide in Public Schools',
    category: 'Education',
    author: 'Rajesh Sen',
    date: 'March 18, 2026',
    excerpt: 'Upgrading village public schools with modern digital learning screens, solar backups, and local software packages.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'spring-recharge-secures-clean-water',
    title: 'Spring-Shed Recharge: Securing year-round Clean Water in Villages',
    category: 'Climate Action',
    author: 'Amit Bisht',
    date: 'February 10, 2026',
    excerpt: 'Recharging natural spring supplies to restore piped tap connections for dry dryland mountain habitations.',
    image: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&w=600&q=80',
  },
];

export default function BlogListing() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Healthcare', 'Education', 'Livelihoods', 'Disability Inclusion', 'Climate Action'];

  const filteredPosts = allPosts.filter(post => {
    const matchesCat = selectedCat === 'All' || post.category === selectedCat;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
        {filteredPosts.length > 0 ? (
          <div className={styles.blogGrid}>
            {filteredPosts.map(post => (
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
