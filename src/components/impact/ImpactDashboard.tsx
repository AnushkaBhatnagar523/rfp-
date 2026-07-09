'use client';

import React, { useState } from 'react';
import styles from './ImpactDashboard.module.css';
import Counter from '@/components/shared/Counter';
import { Heart, School, Briefcase, HelpCircle, TrendingUp, Award, Map, Calendar } from 'lucide-react';

interface ImpactMetric {
  id: string;
  label: string;
  icon: React.ReactNode;
  stat: number;
  suffix: string;
  chartData: { year: number; value: number }[];
  breakdown: { title: string; count: string }[];
}

const impactMetrics: ImpactMetric[] = [
  {
    id: 'healthcare',
    label: 'Healthcare',
    icon: <Heart size={20} />,
    stat: 12500000,
    suffix: '+',
    chartData: [
      { year: 2015, value: 2.1 },
      { year: 2017, value: 4.8 },
      { year: 2019, value: 7.5 },
      { year: 2021, value: 9.8 },
      { year: 2023, value: 11.2 },
      { year: 2025, value: 12.5 },
    ],
    breakdown: [
      { title: 'Mobile Medical Units Operational', count: '140+ Units' },
      { title: 'Free Dialysis Sessions Administered', count: '320,000+' },
      { title: 'Cochlear Implant Surgeries Completed', count: '1,500+' },
      { title: 'Pediatric Cardiac Surgeries Done', count: '2,800+' },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    icon: <School size={20} />,
    stat: 850000,
    suffix: '+',
    chartData: [
      { year: 2015, value: 1.2 },
      { year: 2017, value: 2.8 },
      { year: 2019, value: 4.5 },
      { year: 2021, value: 6.2 },
      { year: 2023, value: 7.6 },
      { year: 2025, value: 8.5 },
    ],
    breakdown: [
      { title: 'Model Schools Upgraded', count: '450+ Schools' },
      { title: 'Students Mainstreamed to Schools', count: '120,000+' },
      { title: 'Smart Classrooms Set Up', count: '1,200+' },
      { title: 'Girls Support Scholarships', count: '45,000+' },
    ],
  },
  {
    id: 'livelihood',
    label: 'Livelihoods',
    icon: <Briefcase size={20} />,
    stat: 240000,
    suffix: '+',
    chartData: [
      { year: 2015, value: 0.3 },
      { year: 2017, value: 0.8 },
      { year: 2019, value: 1.2 },
      { year: 2021, value: 1.7 },
      { year: 2023, value: 2.1 },
      { year: 2025, value: 2.4 },
    ],
    breakdown: [
      { title: 'Women micro-entrepreneurs trained', count: '65,000+' },
      { title: 'Youth placed in formal jobs', count: '42,000+' },
      { title: 'Farmers supported with Agri-inputs', count: '85,000+' },
      { title: 'Self-help groups established', count: '8,500+' },
    ],
  },
  {
    id: 'disability',
    label: 'Disability Support',
    icon: <HelpCircle size={20} />,
    stat: 320000,
    suffix: '+',
    chartData: [
      { year: 2015, value: 0.5 },
      { year: 2017, value: 1.1 },
      { year: 2019, value: 1.8 },
      { year: 2021, value: 2.3 },
      { year: 2023, value: 2.8 },
      { year: 2025, value: 3.2 },
    ],
    breakdown: [
      { title: 'Mobility & Assistive Aids Distributed', count: '180,000+' },
      { title: 'Cochlear implants support network', count: '23 States' },
      { title: 'Mobile therapy clinics operational', count: '14 Units' },
      { title: 'Rehabilitation clinics supported', count: '38 Centers' },
    ],
  },
];

export default function ImpactDashboard() {
  const [activeTab, setActiveTab] = useState<string>('healthcare');
  const activeMetric = impactMetrics.find((m) => m.id === activeTab) || impactMetrics[0];

  // Helper to map values for SVG coordinates
  const svgWidth = 400;
  const svgHeight = 150;
  const padding = 20;

  const points = activeMetric.chartData.map((data, index) => {
    const x = padding + (index / (activeMetric.chartData.length - 1)) * (svgWidth - padding * 2);
    // scale max values
    const maxVal = activeTab === 'healthcare' ? 14 : activeTab === 'education' ? 10 : 4;
    const y = svgHeight - padding - (data.value / maxVal) * (svgHeight - padding * 2);
    return { x, y, ...data };
  });

  const pathD = points.reduce((acc, point, index) => {
    return acc + `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - padding} L ${points[0].x} ${svgHeight - padding} Z`;

  return (
    <div className={`${styles.dashboardContainer} glass`}>
      <div className={styles.header}>
        <h2>THF Impact Metrics & Historical Growth</h2>
        <p>Dynamic live dashboard charting cumulative growth in livelihoods, healthcare access, and quality educational setups.</p>
      </div>

      <div className={styles.tabList} role="tablist" aria-label="Program Impact Tabs">
        {impactMetrics.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={activeTab === m.id}
            onClick={() => setActiveTab(m.id)}
            className={`${styles.tabBtn} ${activeTab === m.id ? styles.activeTab : ''}`}
          >
            {m.icon}
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.panelGrid}>
        {/* Stat Overview & Breakdown */}
        <div className={styles.infoCol}>
          <div className={styles.bigStatCard}>
            <span className={styles.statLabel}>Lives Impacted</span>
            <div className={styles.statValue}>
              <Counter end={activeMetric.stat} duration={1500} suffix={activeMetric.suffix} />
            </div>
            <p className={styles.statDesc}>
              Cumulative lives positively impacted across project regions through direct initiatives and partnerships.
            </p>
          </div>

          <div className={styles.breakdownCard}>
            <h3>Outreach Breakdown</h3>
            <ul className={styles.breakdownList}>
              {activeMetric.breakdown.map((item, idx) => (
                <li key={idx} className={styles.breakdownItem}>
                  <span className={styles.breakdownTitle}>{item.title}</span>
                  <span className={styles.breakdownCount}>{item.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dynamic Growth Chart */}
        <div className={styles.chartCol}>
          <div className={`${styles.chartCard} glass`}>
            <div className={styles.chartHeader}>
              <TrendingUp className={styles.chartIcon} />
              <div>
                <h3>Growth Trajectory</h3>
                <span>In Millions (2015 - 2026)</span>
              </div>
            </div>

            <div className={styles.chartContainer}>
              <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} className={styles.chartSvg}>
                {/* Grid Lines */}
                <line x1={padding} y1={padding} x2={svgWidth - padding} y2={padding} stroke="var(--border-light)" strokeWidth="0.5" />
                <line x1={padding} y1={svgHeight / 2} x2={svgWidth - padding} y2={svgHeight / 2} stroke="var(--border-light)" strokeWidth="0.5" />
                <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="var(--border-light)" strokeWidth="1" />

                {/* Shaded Area */}
                <path d={areaD} fill="url(#chartGradient)" opacity="0.15" />

                {/* Main Line */}
                <path d={pathD} fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Data Points */}
                {points.map((p, idx) => (
                  <g key={idx}>
                    <circle cx={p.x} cy={p.y} r="5" fill="var(--accent)" stroke="white" strokeWidth="2" />
                    <text x={p.x} y={svgHeight - 2} className={styles.axisLabel} textAnchor="middle">
                      {p.year}
                    </text>
                    <text x={p.x} y={p.y - 10} className={styles.valueLabel} textAnchor="middle">
                      {p.value}M
                    </text>
                  </g>
                ))}

                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className={styles.chartFooter}>
              <div className={styles.footerMetric}>
                <Award size={16} />
                <span>Audited annually by Ernst & Young (EY)</span>
              </div>
              <div className={styles.footerMetric}>
                <Calendar size={16} />
                <span>Last updated: July 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
