'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import styles from './search.module.css';
import { Search, Sparkles, BookOpen, Heart, ArrowRight } from 'lucide-react';

interface SearchResult {
  title: string;
  category: string;
  url: string;
  description: string;
}

const searchableContent: SearchResult[] = [
  { title: 'Mobile Medical Units (MMUs)', category: 'Healthcare Program', url: '/programs/health', description: 'Weekly diagnostic checkups, free consultations, and medicines delivered to doorsteps in rural mountain villages.' },
  { title: 'Free Dialysis Renal Clinics', category: 'Healthcare Program', url: '/programs/health', description: 'Operating specialized clinical centers in partnership with state governments, offering free dialysis services.' },
  { title: 'Smart Classrooms Setup', category: 'Education Program', url: '/programs/education', description: 'Equipping rural primary schools with interactive digital screens, curated regional educational software, and solar backup systems.' },
  { title: 'Hans Udhyamita Mission', category: 'Livelihoods Program', url: '/programs/livelihood', description: 'Empowering rural women through vocational tailoring skills, micro-grants, agricultural input support, and market links.' },
  { title: 'Prosthetics & Assistive Aids Camp', category: 'Disability Inclusion', url: '/programs/disability-inclusion', description: 'Manufacturing and distributing custom high-grade prosthetic limbs, wheelchairs, and tricycles in remote camps.' },
  { title: 'Cochlear Implant Surgery Assistance', category: 'Disability Inclusion', url: '/programs/disability-inclusion', description: 'Funding critical ear surgeries and speech-therapy sessions for children under 5 to mainstream them into regular schools.' },
  { title: 'Hans Jal Dhara Clean Water Grid', category: 'Climate Action', url: '/programs/climate-action', description: 'Constructing village piped drinking water networks, gravity-fed water supplies, and spring-shed recharge zones.' },
  { title: 'Disaster Emergency Ration Relief', category: 'Disaster Relief', url: '/programs/disaster-relief', description: 'Delivering urgent food supplies, medical kits, and post-disaster house reconstruction packages.' },
  { title: 'Shreya Hearing Recovery Case Study', category: 'Blog Story', url: '/blog/hearing-loss-to-classroom-stars', description: 'How our cochlear implants program helped a six-year-old girl gain her hearing back and join regular primary schooling.' },
  { title: 'Careers Program Manager Healthcare vacancy', category: 'Careers Listing', url: '/careers/program-manager-healthcare', description: 'Lead the operations of 15+ Mobile Medical Units and coordinate clinical dialysis centers partnerships in Uttarakhand.' },
];

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = use(searchParams);
  const initialQuery = (resolvedSearchParams.q as string) || '';

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'programs' | 'stories'>('all');

  const filteredResults = searchableContent.filter(item => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) || 
                         item.description.toLowerCase().includes(query.toLowerCase()) ||
                         item.category.toLowerCase().includes(query.toLowerCase());
    
    if (!matchesQuery) return false;
    
    if (activeTab === 'programs') return item.category.includes('Program') || item.category.includes('Inclusion') || item.category.includes('Action') || item.category.includes('Relief');
    if (activeTab === 'stories') return item.category.includes('Blog');
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
              All Results ({filteredResults.length})
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
        {filteredResults.length > 0 ? (
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
