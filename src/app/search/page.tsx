'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import styles from './search.module.css';
import { Search, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

interface SearchResult {
  title: string;
  category: string;
  url: string;
  description: string;
}

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = use(searchParams);
  const initialQuery = (resolvedSearchParams.q as string) || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'programs' | 'stories'>('all');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error('Search API error:', err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const filteredResults = results.filter(item => {
    if (activeTab === 'programs') {
      return item.category.includes('Program') || 
             item.category.includes('Inclusion') || 
             item.category.includes('Action') || 
             item.category.includes('Relief') || 
             item.category.includes('Vacancy');
    }
    if (activeTab === 'stories') {
      return item.category.includes('Story') || item.category.includes('Blog');
    }
    return true;
  });

  return (
    <div className={styles.searchWrapper}>
      {/* Search Header Banner */}
      <section className={styles.banner} aria-label="Search Header">
        <div className={styles.bannerBg} />
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.sub}>Site Search</span>
          <h1>Outreach & Story Search Results</h1>
          <p>Find programs, blog posts, careers, annual reports, and success stories across The Hans Foundation.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        
        {/* Search Input block */}
        <div className={`${styles.searchBoxContainer} glass`}>
          <Search className={styles.boxSearchIcon} size={24} />
          <input
            type="text"
            placeholder="Search programs, blogs, resources, career vacancies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.boxSearchInput}
            aria-label="Search input field"
          />
        </div>

        {/* AI search recommendation widget */}
        <div className={styles.aiWidget}>
          <Sparkles className={styles.aiIcon} size={18} />
          <span>AI Search Suggestion: Try typing <strong>"cochlear implants"</strong> or <strong>"mobile medical clinics"</strong></span>
        </div>

        {/* Result filters */}
        <div className={styles.filtersRow}>
          <div className={styles.tabs}>
            <button
              onClick={() => setActiveTab('all')}
              className={`${styles.tabBtn} ${activeTab === 'all' ? styles.activeTab : ''}`}
            >
              All Results ({loading ? '...' : filteredResults.length})
            </button>
            <button
              onClick={() => setActiveTab('programs')}
              className={`${styles.tabBtn} ${activeTab === 'programs' ? styles.activeTab : ''}`}
            >
              Development Programs
            </button>
            <button
              onClick={() => setActiveTab('stories')}
              className={`${styles.tabBtn} ${activeTab === 'stories' ? styles.activeTab : ''}`}
            >
              Success Stories
            </button>
          </div>
        </div>

        {/* Search Results list */}
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px', color: 'var(--text-secondary)' }}>
            <span>Searching SQLite database...</span>
          </div>
        ) : filteredResults.length > 0 ? (
          <div className={styles.resultsList}>
            {filteredResults.map((result, idx) => (
              <div key={idx} className={`${styles.resultCard} glass`}>
                <span className={styles.resultCat}>{result.category}</span>
                <h3>{result.title}</h3>
                <p>{result.description}</p>
                <Link href={result.url} className={styles.resultLink}>
                  <span>Explore content</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <BookOpen size={48} className={styles.noResultsIcon} />
            <h3>No results matched your query</h3>
            <p>Try checking spelling, broadening search phrases, or exploring our primary programs overview page.</p>
          </div>
        )}

      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
