'use client';

import React, { useEffect, useState } from 'react';
import { History, Clock, ShieldAlert } from 'lucide-react';
import styles from '../admin.module.css';

interface AuditLog {
  id: number;
  user_email: string;
  action: string;
  created_at: string;
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('/api/admin/logs');
        if (res.status === 401 || res.status === 403) {
          setUnauthorized(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setLogs(data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Fetch logs error:', err);
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (unauthorized) {
    return (
      <div className={styles.readOnlyAlert} role="alert" style={{ color: 'var(--danger)', borderColor: 'rgba(220, 38, 38, 0.2)', background: 'rgba(220, 38, 38, 0.05)', marginTop: '2rem' }}>
        <ShieldAlert size={20} />
        <span>Access Denied: Only users with Admin role are permitted to view audit activity logs.</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
        <div className={styles.spinner} style={{ marginRight: '0.75rem', borderColor: 'var(--primary)', borderTopColor: 'var(--accent)' }} />
        <span>Loading activity logs...</span>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h2>System Audit Trail logs</h2>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            A historical audit log tracking database updates, logouts, and content updates.
          </p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.tableResponsive}>
          {logs.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Log ID</th>
                  <th>Action Triggered By</th>
                  <th>Action Content description</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log.id}>
                    <td>#{log.id}</td>
                    <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{log.user_email}</td>
                    <td style={{ lineHeight: 1.4 }}>{log.action}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        <Clock size={12} />
                        <span>{new Date(log.created_at).toLocaleString()}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.emptyState}>
              <History size={48} className={styles.emptyStateIcon} />
              <h4>Activity log is empty</h4>
              <p>Operations triggered inside the dashboard will show up in this audit log.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
