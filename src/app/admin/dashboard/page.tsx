'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, MessageSquare, Briefcase, Mail, FileSpreadsheet, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import styles from '../admin.module.css';

interface DashboardStats {
  blogs: number;
  comments: number;
  jobs: number;
  contacts: number;
  applications: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({ blogs: 0, comments: 0, jobs: 0, contacts: 0, applications: 0 });
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch current user role
        const meRes = await fetch('/api/auth/me');
        if (!meRes.ok) return;
        const meData = await meRes.json();
        setRole(meData.user.role);

        // Fetch counts
        const blogRes = await fetch('/api/blog?status=all');
        const blogs = blogRes.ok ? (await blogRes.json()).length : 0;

        const commentRes = await fetch('/api/admin/comments?status=pending');
        const comments = commentRes.ok ? (await commentRes.json()).length : 0;

        const jobRes = await fetch('/api/careers?status=all');
        const jobs = jobRes.ok ? (await jobRes.json()).length : 0;

        let contacts = 0;
        let applications = 0;

        if (meData.user.role === 'admin') {
          const contactRes = await fetch('/api/admin/contacts');
          contacts = contactRes.ok ? (await contactRes.json()).length : 0;

          const appRes = await fetch('/api/admin/applications');
          applications = appRes.ok ? (await appRes.json()).length : 0;
        }

        setStats({ blogs, comments, jobs, contacts, applications });
        setLoading(false);
      } catch (err) {
        console.error('Fetch dashboard stats error:', err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh', color: 'var(--text-secondary)', fontWeight: 600 }}>
        <div className={styles.spinner} style={{ marginRight: '0.75rem', borderColor: 'var(--primary)', borderTopColor: 'var(--accent)' }} />
        <span>Loading stats dashboard...</span>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h2>Control Center Overview</h2>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            System stats summary and quick action metrics dashboard.
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className={styles.dashboardGrid}>
        <div className={styles.metricCard}>
          <div className={`${styles.cardIcon} ${styles.blueIcon}`}>
            <FileText size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricNum}>{stats.blogs}</span>
            <span className={styles.metricLabel}>Total Blog Posts</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={`${styles.cardIcon} ${styles.saffronIcon}`}>
            <MessageSquare size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricNum}>{stats.comments}</span>
            <span className={styles.metricLabel}>Pending Comments</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={`${styles.cardIcon} ${styles.blueIcon}`}>
            <Briefcase size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricNum}>{stats.jobs}</span>
            <span className={styles.metricLabel}>Active Vacancies</span>
          </div>
        </div>

        {role === 'admin' && (
          <>
            <div className={styles.metricCard}>
              <div className={`${styles.cardIcon} ${styles.greenIcon}`}>
                <Mail size={24} />
              </div>
              <div className={styles.metricInfo}>
                <span className={styles.metricNum}>{stats.contacts}</span>
                <span className={styles.metricLabel}>General Inquiries</span>
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={`${styles.cardIcon} ${styles.greenIcon}`}>
                <FileSpreadsheet size={24} />
              </div>
              <div className={styles.metricInfo}>
                <span className={styles.metricNum}>{stats.applications}</span>
                <span className={styles.metricLabel}>CVs Submitted</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Quick Actions Panel */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>Quick Management Shortcuts</h3>
        </div>
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--primary)', fontWeight: 700 }}>Blog Story Editor</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Write dynamic operational successes & news updates.</p>
              </div>
              <button onClick={() => router.push('/admin/blogs')} className="btn btn-secondary btn-sm" style={{ display: 'flex', gap: '0.25rem' }}>
                <span>Write</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--primary)', fontWeight: 700 }}>Moderation Queue</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Review and approve user-submitted discussion items.</p>
              </div>
              <button onClick={() => router.push('/admin/comments')} className="btn btn-secondary btn-sm" style={{ display: 'flex', gap: '0.25rem' }}>
                <span>Review</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--primary)', fontWeight: 700 }}>Careers Announcements</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Deploy job vacancy announcements for rural programs.</p>
              </div>
              <button onClick={() => router.push('/admin/jobs')} className="btn btn-secondary btn-sm" style={{ display: 'flex', gap: '0.25rem' }}>
                <span>Publish</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
