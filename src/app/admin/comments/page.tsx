'use client';

import React, { useEffect, useState } from 'react';
import { MessageSquare, Check, Trash2, AlertTriangle } from 'lucide-react';
import styles from '../admin.module.css';

interface Comment {
  id: number;
  blog_slug: string;
  blog_title: string;
  author: string;
  content: string;
  status: string;
  created_at: string;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await fetch('/api/admin/comments?status=all');
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Fetch comments failed:', err);
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
      await fetchComments();
    };
    init();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      const res = await fetch('/api/admin/comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: 'approved' }),
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || 'Failed to approve comment.');
        return;
      }

      await fetchComments();
    } catch (err) {
      console.error('Approve comment error:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to reject and permanently delete this comment?')) return;

    try {
      const res = await fetch(`/api/admin/comments?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || 'Failed to delete comment.');
        return;
      }

      await fetchComments();
    } catch (err) {
      console.error('Delete comment error:', err);
    }
  };

  const isReadOnly = role === 'viewer';
  const isEditorOrAdmin = role === 'admin' || role === 'editor';
  const isAdmin = role === 'admin';

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
        <div className={styles.spinner} style={{ marginRight: '0.75rem', borderColor: 'var(--primary)', borderTopColor: 'var(--accent)' }} />
        <span>Loading comments queue...</span>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h2>Moderation Queue — Comments</h2>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            Review and approve user comments before they are published to stories pages.
          </p>
        </div>
      </div>

      {isReadOnly && (
        <div className={styles.readOnlyAlert} role="alert">
          <AlertTriangle size={16} />
          <span>You have Read-Only permissions. Approving, rejecting, or deleting comments is restricted.</span>
        </div>
      )}

      <div className={styles.card}>
        <div className={styles.tableResponsive}>
          {comments.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Blog Post</th>
                  <th>Comment Description</th>
                  <th>Submitted At</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {comments.map(comment => (
                  <tr key={comment.id}>
                    <td style={{ fontWeight: 700 }}>{comment.author}</td>
                    <td style={{ maxWidth: '150px', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                      {comment.blog_title}
                    </td>
                    <td style={{ maxWidth: '300px', lineHeight: 1.4 }}>{comment.content}</td>
                    <td>{new Date(comment.created_at).toLocaleDateString()}</td>
                    <td>
                      <span className={`${styles.badge} ${comment.status === 'approved' ? styles.badgeSuccess : styles.badgeWarning}`}>
                        {comment.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.btnActions}>
                        {comment.status === 'pending' && isEditorOrAdmin && (
                          <button onClick={() => handleApprove(comment.id)} className="btn btn-primary btn-xs" style={{ background: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Check size={12} />
                            <span>Approve</span>
                          </button>
                        )}
                        {isAdmin && (
                          <button onClick={() => handleDelete(comment.id)} className="btn btn-outline btn-xs" style={{ color: 'var(--danger)', borderColor: 'rgba(220, 38, 38, 0.2)' }}>
                            <Trash2 size={12} />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.emptyState}>
              <MessageSquare size={48} className={styles.emptyStateIcon} />
              <h4>Comments queue is empty</h4>
              <p>Any comments submitted on success story articles will show up here for review.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
