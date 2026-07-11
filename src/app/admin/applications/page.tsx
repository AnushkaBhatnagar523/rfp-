'use client';

import React, { useEffect, useState } from 'react';
import { FileSpreadsheet, Download, ShieldAlert, Clock, ExternalLink } from 'lucide-react';
import styles from '../admin.module.css';

interface Applicant {
  id: number;
  job_slug: string;
  job_title: string;
  name: string;
  email: string;
  phone: string;
  resume_name: string;
  resume_path: string;
  status: string;
  created_at: string;
}

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('/api/admin/applications');
        if (res.status === 401 || res.status === 403) {
          setUnauthorized(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setApps(data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Fetch applications error:', err);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (unauthorized) {
    return (
      <div className={styles.readOnlyAlert} role="alert" style={{ color: 'var(--danger)', borderColor: 'rgba(220, 38, 38, 0.2)', background: 'rgba(220, 38, 38, 0.05)', marginTop: '2rem' }}>
        <ShieldAlert size={20} />
        <span>Access Denied: Only users with Admin role are permitted to view applicant submissions.</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
        <div className={styles.spinner} style={{ marginRight: '0.75rem', borderColor: 'var(--primary)', borderTopColor: 'var(--accent)' }} />
        <span>Loading applicant details...</span>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h2>Job Applications & Resumes</h2>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            List of CV submissions parsed from the dynamic careers application portals.
          </p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.tableResponsive}>
          {apps.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Job Opening</th>
                  <th>Applicant Name</th>
                  <th>Contact Info</th>
                  <th>Uploaded CV Resume</th>
                  <th>Application Date</th>
                </tr>
              </thead>
              <tbody>
                {apps.map(item => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 700 }}>{item.job_title}</td>
                    <td style={{ fontWeight: 700, color: 'var(--secondary)' }}>{item.name}</td>
                    <td>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.email}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.15rem' }}>{item.phone}</div>
                    </td>
                    <td>
                      <a 
                        href={item.resume_path} 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn btn-outline btn-xs"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}
                      >
                        <ExternalLink size={12} />
                        <span style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.resume_name}
                        </span>
                      </a>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        <Clock size={12} />
                        <span>{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.emptyState}>
              <FileSpreadsheet size={48} className={styles.emptyStateIcon} />
              <h4>No applications received</h4>
              <p>When candidates apply to active jobs, their CVs will appear in this spreadsheet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
