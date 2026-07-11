'use client';

import React, { useEffect, useState } from 'react';
import { FileText, Plus, Edit2, Trash2, X, AlertTriangle, Eye } from 'lucide-react';
import styles from '../admin.module.css';

interface Blog {
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  content: string[];
  image: string;
  status: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Healthcare');
  const [author, setAuthor] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [contentText, setContentText] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('published');
  const [formError, setFormError] = useState('');

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blog?status=all');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Fetch blogs failed:', err);
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
      await fetchBlogs();
    };
    init();
  }, []);

  const openAddModal = () => {
    setEditingBlog(null);
    setTitle('');
    setCategory('Healthcare');
    setAuthor('');
    setExcerpt('');
    setContentText('');
    setImage('');
    setStatus('published');
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (blog: Blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setCategory(blog.category);
    setAuthor(blog.author);
    setExcerpt(blog.excerpt);
    setContentText(blog.content.join('\n\n'));
    setImage(blog.image);
    setStatus(blog.status);
    setFormError('');
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!title || !author || !excerpt || !contentText || !image) {
      setFormError('Please fill out all required fields.');
      return;
    }

    const contentArray = contentText
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const payload = {
      title,
      category,
      author,
      excerpt,
      content: contentArray,
      image,
      status
    };

    try {
      const url = editingBlog ? `/api/blog/${editingBlog.slug}` : '/api/blog';
      const method = editingBlog ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        setFormError(errData.error || 'Failed to submit form.');
        return;
      }

      setModalOpen(false);
      await fetchBlogs();
    } catch (err) {
      console.error('Submit form error:', err);
      setFormError('A system error occurred.');
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to permanently delete this blog post?')) return;

    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || 'Failed to delete blog.');
        return;
      }

      await fetchBlogs();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const isReadOnly = role === 'viewer';
  const isEditorOrAdmin = role === 'admin' || role === 'editor';
  const isAdmin = role === 'admin';

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
        <div className={styles.spinner} style={{ marginRight: '0.75rem', borderColor: 'var(--primary)', borderTopColor: 'var(--accent)' }} />
        <span>Loading blogs list...</span>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h2>Manage Blog Stories</h2>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            Publish success stories and operational field updates.
          </p>
        </div>
        {isEditorOrAdmin && (
          <button onClick={openAddModal} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Plus size={16} />
            <span>Add New Post</span>
          </button>
        )}
      </div>

      {isReadOnly && (
        <div className={styles.readOnlyAlert} role="alert">
          <AlertTriangle size={16} />
          <span>You have Read-Only permissions. Creating, modifying, or deleting items is restricted.</span>
        </div>
      )}

      {/* Blogs Table */}
      <div className={styles.card}>
        <div className={styles.tableResponsive}>
          {blogs.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog.slug}>
                    <td style={{ fontWeight: 700, maxWidth: '280px' }}>{blog.title}</td>
                    <td>{blog.category}</td>
                    <td>{blog.author}</td>
                    <td>{blog.date}</td>
                    <td>
                      <span className={`${styles.badge} ${blog.status === 'published' ? styles.badgeSuccess : styles.badgeWarning}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.btnActions}>
                        {isEditorOrAdmin ? (
                          <button onClick={() => openEditModal(blog)} className="btn btn-outline btn-xs" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Edit2 size={12} />
                            <span>Edit</span>
                          </button>
                        ) : (
                          <button onClick={() => openEditModal(blog)} className="btn btn-outline btn-xs" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Eye size={12} />
                            <span>View</span>
                          </button>
                        )}
                        {isAdmin && (
                          <button onClick={() => handleDelete(blog.slug)} className="btn btn-outline btn-xs" style={{ color: 'var(--danger)', borderColor: 'rgba(220, 38, 38, 0.2)' }}>
                            <Trash2 size={12} />
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
              <FileText size={48} className={styles.emptyStateIcon} />
              <h4>No blog posts yet</h4>
              <p>Add a blog post to publish updates for THF outreach stories.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{ maxWidth: '750px' }}>
            <div className={styles.modalHeader}>
              <h3>{editingBlog ? (isReadOnly ? 'View Blog Post' : 'Edit Blog Post') : 'Add New Blog Post'}</h3>
              <button onClick={() => setModalOpen(false)} className={styles.closeBtn} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className={styles.modalBody}>
                {formError && (
                  <div className={styles.readOnlyAlert} style={{ color: 'var(--danger)', borderColor: 'rgba(220,38,38,0.2)', background: 'rgba(220,38,38,0.05)' }}>
                    <span>{formError}</span>
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label htmlFor="blog-title">Post Title</label>
                  <input
                    id="blog-title"
                    type="text"
                    required
                    disabled={isReadOnly}
                    placeholder="e.g., Spring-Shed Recharging Secures Village Clean Water"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="blog-category">Category</label>
                    <select
                      id="blog-category"
                      disabled={isReadOnly}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={styles.select}
                    >
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Livelihoods">Livelihoods</option>
                      <option value="Disability Inclusion">Disability Inclusion</option>
                      <option value="Climate Action">Climate Action</option>
                      <option value="Disaster Relief">Disaster Relief</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="blog-author">Author</label>
                    <input
                      id="blog-author"
                      type="text"
                      required
                      disabled={isReadOnly}
                      placeholder="e.g., Rajesh Sen"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="blog-image">Image URL</label>
                  <input
                    id="blog-image"
                    type="url"
                    required
                    disabled={isReadOnly}
                    placeholder="https://images.unsplash.com/..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="blog-excerpt">Brief Excerpt</label>
                  <input
                    id="blog-excerpt"
                    type="text"
                    required
                    disabled={isReadOnly}
                    placeholder="A brief summary sentence to display on the blog listing grid."
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="blog-content">Full Body Content (Press Enter twice between paragraphs)</label>
                  <textarea
                    id="blog-content"
                    rows={8}
                    required
                    disabled={isReadOnly}
                    placeholder="Write the full body paragraphs of the article here. Separate blocks with a double newline."
                    value={contentText}
                    onChange={(e) => setContentText(e.target.value)}
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="blog-status">Publish Status</label>
                  <select
                    id="blog-status"
                    disabled={isReadOnly}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={styles.select}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline btn-sm">
                  Cancel
                </button>
                {!isReadOnly && (
                  <button type="submit" className="btn btn-primary btn-sm">
                    {editingBlog ? 'Save Changes' : 'Create Post'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export const dynamic = 'force-dynamic';
