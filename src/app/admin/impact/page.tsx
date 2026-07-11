'use client';

import React, { useEffect, useState } from 'react';
import { Award, Save, AlertTriangle } from 'lucide-react';
import styles from '../admin.module.css';

interface ImpactStat {
  key: string;
  value: string;
  label: string;
}

export default function AdminImpactPage() {
  const [stats, setStats] = useState<ImpactStat[]>([]);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  // Buffer fields for edits
  const [editValues, setEditValues] = useState<{ [key: string]: { value: string; label: string } }>({});

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/impact');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
        // Initialize edit buffers
        const buffer: typeof editValues = {};
        data.forEach((stat: ImpactStat) => {
          buffer[stat.key] = { value: stat.value, label: stat.label };
        });
        setEditValues(buffer);
      }
      setLoading(false);
    } catch (err) {
      console.error('Fetch stats failed:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const meRes = await fetch('/api/auth/me');
      if (meRes.ok) {
        const meData = await meRes.json();
        setRole(meData.user.role);
      }
      await fetchStats();
    };
    init();
  }, []);

  const handleSave = async (key: string) => {
    const editData = editValues[key];
    if (!editData || !editData.value || !editData.label) {
      alert('Values cannot be empty.');
      return;
    }

    setSavingKey(key);

    try {
      const res = await fetch('/api/admin/impact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value: editData.value, label: editData.label }),
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || 'Failed to update metric.');
      } else {
        await fetchStats();
      }
      setSavingKey(null);
    } catch (err) {
      console.error('Save stats error:', err);
      setSavingKey(null);
    }
  };

  const handleInputChange = (key: string, field: 'value' | 'label', text: string) => {
    setEditValues(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: text
      }
    }));
  };

  const isReadOnly = role === 'viewer';
  const isEditorOrAdmin = role === 'admin' || role === 'editor';

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
        <div className={styles.spinner} style={{ marginRight: '0.75rem', borderColor: 'var(--primary)', borderTopColor: 'var(--accent)' }} />
        <span>Loading metrics data...</span>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h2>Manage Impact Statistics</h2>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            Modify the 4 primary programmatic output metrics displayed on the home page.
          </p>
        </div>
      </div>

      {isReadOnly && (
        <div className={styles.readOnlyAlert} role="alert">
          <AlertTriangle size={16} />
          <span>You have Read-Only permissions. Changing stats metrics is restricted.</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem' }}>
        {stats.map(stat => {
          const buffer = editValues[stat.key] || { value: stat.value, label: stat.label };
          const isSaving = savingKey === stat.key;

          return (
            <div key={stat.key} className={styles.card}>
              <div className={styles.cardHeader} style={{ background: 'var(--bg-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={18} className={styles.saffronIcon} />
                  <span style={{ fontWeight: 800, textTransform: 'capitalize', color: 'var(--primary)', fontSize: '0.9rem' }}>
                    {stat.key.replace('_', ' ')}
                  </span>
                </div>
                {!isReadOnly && (
                  <button
                    onClick={() => handleSave(stat.key)}
                    disabled={isSaving}
                    className="btn btn-primary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                  >
                    <Save size={12} />
                    <span>{isSaving ? 'Saving...' : 'Save'}</span>
                  </button>
                )}
              </div>

              <div style={{ padding: '1.5rem' }}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor={`value-${stat.key}`}>Counter Value</label>
                    <input
                      id={`value-${stat.key}`}
                      type="text"
                      disabled={isReadOnly || isSaving}
                      value={buffer.value}
                      onChange={(e) => handleInputChange(stat.key, 'value', e.target.value)}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor={`label-${stat.key}`}>Metric Description Label</label>
                    <input
                      id={`label-${stat.key}`}
                      type="text"
                      disabled={isReadOnly || isSaving}
                      value={buffer.label}
                      onChange={(e) => handleInputChange(stat.key, 'label', e.target.value)}
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
