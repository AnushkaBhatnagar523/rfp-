'use client';

import React, { useState } from 'react';
import styles from './ProjectMap.module.css';
import { MapPin, Users, Heart, School, Briefcase, HelpCircle } from 'lucide-react';

interface ProjectLocation {
  state: string;
  lat: string;
  lng: string;
  villages: number;
  beneficiaries: string;
  mmuCount?: number;
  schoolsCount?: number;
  livelihoodCenters?: number;
  cochlearImplants?: number;
  highlightProjects: string[];
}

const activeLocations: ProjectLocation[] = [
  {
    state: 'Uttarakhand',
    lat: '25%',
    lng: '35%',
    villages: 850,
    beneficiaries: '350,000+',
    mmuCount: 22,
    schoolsCount: 45,
    livelihoodCenters: 12,
    highlightProjects: ['Mobile Medical Units', 'Integrated Village Development (Hans Jal Dhara)', 'Cochlear Implant Center'],
  },
  {
    state: 'Rajasthan',
    lat: '38%',
    lng: '18%',
    villages: 420,
    beneficiaries: '180,000+',
    mmuCount: 15,
    livelihoodCenters: 8,
    highlightProjects: ['Rainwater Harvesting', 'Women Entrepreneurship Training', 'Primary Education Support'],
  },
  {
    state: 'Uttar Pradesh',
    lat: '33%',
    lng: '42%',
    villages: 1200,
    beneficiaries: '850,000+',
    mmuCount: 48,
    schoolsCount: 92,
    livelihoodCenters: 30,
    highlightProjects: ['Renal Care Centers (Dialysis)', 'Hans Schools of Learning', 'Rural Vocational Centers'],
  },
  {
    state: 'Jharkhand',
    lat: '45%',
    lng: '58%',
    villages: 650,
    beneficiaries: '290,000+',
    mmuCount: 18,
    schoolsCount: 24,
    highlightProjects: ['Mobile Therapy Vans (Disability)', 'Adivasi Livelihood Program', 'Safe Drinking Water'],
  },
  {
    state: 'Odisha',
    lat: '52%',
    lng: '52%',
    villages: 510,
    beneficiaries: '220,000+',
    mmuCount: 12,
    livelihoodCenters: 6,
    highlightProjects: ['Nutrition & Pediatric Healthcare', 'Coastal Livelihoods Support', 'School Infrastructure Refurbishment'],
  },
  {
    state: 'Assam',
    lat: '32%',
    lng: '82%',
    villages: 320,
    beneficiaries: '140,000+',
    mmuCount: 8,
    schoolsCount: 15,
    highlightProjects: ['Disaster Relief & Flood Rehab', 'Tea Garden Worker Health Clinics', 'Non-Formal Learning Centers'],
  },
  {
    state: 'Madhya Pradesh',
    lat: '48%',
    lng: '32%',
    villages: 980,
    beneficiaries: '450,000+',
    mmuCount: 34,
    schoolsCount: 52,
    livelihoodCenters: 14,
    highlightProjects: ['Sickle Cell Anemia Detection', 'Soil & Water Conservation', 'Early Childhood Centers'],
  },
];

export default function ProjectMap() {
  const [selectedState, setSelectedState] = useState<ProjectLocation>(activeLocations[0]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'health' | 'education' | 'livelihood'>('all');

  const filteredLocations = activeLocations.filter(loc => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'health') return (loc.mmuCount && loc.mmuCount > 0);
    if (activeFilter === 'education') return (loc.schoolsCount && loc.schoolsCount > 0);
    if (activeFilter === 'livelihood') return (loc.livelihoodCenters && loc.livelihoodCenters > 0);
    return true;
  });

  return (
    <div className={`${styles.sectionContainer} glass`}>
      <div className={styles.header}>
        <h2>Interactive Project Outreach Map</h2>
        <p>THF operates signature and grant-based programs across 23 states of India. Explore our state-wise active footprints below.</p>
      </div>

      <div className={styles.filters}>
        <button 
          className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Programs
        </button>
        <button 
          className={`${styles.filterBtn} ${activeFilter === 'health' ? styles.active : ''}`}
          onClick={() => setActiveFilter('health')}
        >
          <Heart size={14} /> Healthcare
        </button>
        <button 
          className={`${styles.filterBtn} ${activeFilter === 'education' ? styles.active : ''}`}
          onClick={() => setActiveFilter('education')}
        >
          <School size={14} /> Education
        </button>
        <button 
          className={`${styles.filterBtn} ${activeFilter === 'livelihood' ? styles.active : ''}`}
          onClick={() => setActiveFilter('livelihood')}
        >
          <Briefcase size={14} /> Livelihood
        </button>
      </div>

      <div className={styles.grid}>
        {/* Left: Map Visualization */}
        <div className={styles.mapColumn}>
          <div className={styles.mapContainer}>
            {/* Visual Abstract Map Overlay of India */}
            <div className={styles.indiaMapBg}>
              {/* Dot Grid Map Representation for modern aesthetics */}
              <svg width="100%" height="100%" viewBox="0 0 400 450" className={styles.indiaMapSvg}>
                {/* SVG Outline for Visual Layout Representation of India */}
                <path 
                  d="M180,30 L195,20 L210,32 L225,25 L230,42 L245,65 L260,80 L290,90 L320,80 L350,92 L360,110 L330,120 L300,122 L275,130 L255,145 L240,165 L255,178 L285,180 L310,185 L325,200 L295,210 L280,195 L260,195 L250,210 L242,230 L252,248 L275,255 L250,265 L232,280 L218,310 L210,335 L200,360 L188,385 L180,410 L188,430 L180,440 L172,430 L170,400 L162,370 L158,340 L160,310 L152,285 L145,260 L128,245 L108,242 L95,248 L75,242 L68,228 L80,218 L92,205 L82,192 L62,190 L52,175 L38,172 L45,152 L62,145 L85,140 L110,142 L132,125 L125,108 L112,98 L122,88 L142,88 L155,75 L168,62 Z" 
                  fill="rgba(10, 37, 64, 0.05)" 
                  stroke="var(--border-medium)" 
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* Plotted Interactive Pins */}
              {filteredLocations.map((loc) => (
                <button
                  key={loc.state}
                  className={`${styles.mapPin} ${selectedState.state === loc.state ? styles.activePin : ''}`}
                  style={{ top: loc.lat, left: loc.lng }}
                  onClick={() => setSelectedState(loc)}
                  aria-label={`View ${loc.state} metrics`}
                >
                  <MapPin size={22} fill={selectedState.state === loc.state ? 'var(--accent)' : 'white'} />
                  <span className={styles.pinLabel}>{loc.state}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: State Metrics Panel */}
        <div className={styles.infoColumn}>
          <div className={`${styles.infoCard} glass`}>
            <div className={styles.infoCardHeader}>
              <h3>{selectedState.state} Outreach</h3>
              <span className={styles.beneficiaryBadge}>{selectedState.beneficiaries} Beneficiaries</span>
            </div>

            <div className={styles.metricsGrid}>
              <div className={styles.metricItem}>
                <Users className={styles.metricIcon} />
                <div className={styles.metricText}>
                  <span className={styles.metricValue}>{selectedState.villages}</span>
                  <span className={styles.metricLabel}>Villages Impacted</span>
                </div>
              </div>

              {selectedState.mmuCount && (
                <div className={styles.metricItem}>
                  <Heart className={styles.metricIcon} />
                  <div className={styles.metricText}>
                    <span className={styles.metricValue}>{selectedState.mmuCount}</span>
                    <span className={styles.metricLabel}>Mobile Clinics (MMUs)</span>
                  </div>
                </div>
              )}

              {selectedState.schoolsCount && (
                <div className={styles.metricItem}>
                  <School className={styles.metricIcon} />
                  <div className={styles.metricText}>
                    <span className={styles.metricValue}>{selectedState.schoolsCount}</span>
                    <span className={styles.metricLabel}>Schools Supported</span>
                  </div>
                </div>
              )}

              {selectedState.livelihoodCenters && (
                <div className={styles.metricItem}>
                  <Briefcase className={styles.metricIcon} />
                  <div className={styles.metricText}>
                    <span className={styles.metricValue}>{selectedState.livelihoodCenters}</span>
                    <span className={styles.metricLabel}>Vocational Centers</span>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.projectsSection}>
              <h4>Signature Programs Active</h4>
              <ul className={styles.projectList}>
                {selectedState.highlightProjects.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
