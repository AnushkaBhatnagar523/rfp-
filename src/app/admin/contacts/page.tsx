'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Clock, ShieldAlert } from 'lucide-react';
import styles from '../admin.module.css';

interface ContactSubmission {
  id: number;
  form_type: string;
  name: string;
  email: string;
  phone: string;
  company_or_skills_or_subject: string;
  message: string;
  created_at: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('/api/admin/contacts');
        if (res.status === 401 || res.status === 403) {
          setUnauthorized(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setContacts(data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Fetch contacts error:', err);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (unauthorized) {
    return (
      <div className={styles.readOnlyAlert} role="alert" style={{ color: 'var(--danger)', borderColor: 'rgba(220, 38, 38, 0.2)', background: 'rgba(220, 38, 38, 0.05)', marginTop: '2rem' }}>
        <ShieldAlert size={20} />
        <span>Access Denied: Only users with Admin role are permitted to view inquiry submissions.</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
        <div className={styles.spinner} style={{ marginRight: '0.75rem', borderColor: 'var(--primary)', borderTopColor: 'var(--accent)' }} />
        <span>Loading inquiries inbox...</span>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h2>General & Partnership Inquiries</h2>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            Inbound queries submitted via the Contact Us form, segmented by CSR/Volunteer scopes.
          </p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.tableResponsive}>
          {contacts.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Form Scope</th>
                  <th>Name</th>
                  <th>Contact info</th>
                  <th>Subject / Context</th>
                  <th>Message details</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(item => (
                  <tr key={item.id}>
                    <td>
                      <span className={`${styles.badge} ${
                        item.form_type === 'csr' ? styles.badgeInfo : 
                        item.form_type === 'volunteer' ? styles.badgeSuccess : 
                        styles.badgeWarning
                      }`}>
                        {item.form_type}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{item.name}</td>
                    <td>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.email}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.15rem' }}>{item.phone}</div>
                    </td>
                    <td style={{ maxWidth: '150px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>
                      {item.company_or_skills_or_subject}
                    </td>
                    <td style={{ maxWidth: '300px', lineHeight: 1.4, fontSize: '0.8rem' }}>
                      {item.message}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        <Clock size={12} />
                        <span>{new Date(item.created_at).toLocaleString()}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.emptyState}>
              <Mail size={48} className={styles.emptyStateIcon} />
              <h4>Inbox is empty</h4>
              <p>No customer or partnership inquiry forms have been submitted yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
