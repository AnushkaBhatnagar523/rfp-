'use client';

import React, { useEffect, useState } from 'react';
import { Briefcase, Plus, Edit2, Trash2, X, AlertTriangle, Eye } from 'lucide-react';
import styles from '../admin.module.css';

interface Job {
  slug: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  status: string;
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Healthcare');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [type, setType] = useState('Full-Time');
  const [description, setDescription] = useState('');
  const [respText, setRespText] = useState('');
  const [reqText, setReqText] = useState('');
  const [status, setStatus] = useState('active');
  const [formError, setFormError] = useState('');

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/careers?status=all');
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Fetch jobs failed:', err);
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
      await fetchJobs();
    };
    init();
  }, []);

  const openAddModal = () => {
    setEditingJob(null);
    setTitle('');
    setDepartment('Healthcare');
    setLocation('');
    setExperience('');
    setType('Full-Time');
    setDescription('');
    setRespText('');
    setReqText('');
    setStatus('active');
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setTitle(job.title);
    setDepartment(job.department);
    setLocation(job.location);
    setExperience(job.experience);
    setType(job.type);
    setDescription(job.description);
    setRespText(job.responsibilities.join('\n\n'));
    setReqText(job.requirements.join('\n\n'));
    setStatus(job.status);
    setFormError('');
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!title || !location || !experience || !description || !respText || !reqText) {
      setFormError('Please fill out all required fields.');
      return;
    }

    const respArray = respText
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const reqArray = reqText
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const payload = {
      title,
      department,
      location,
      experience,
      type,
      description,
      responsibilities: respArray,
      requirements: reqArray,
      status
    };

    try {
      const url = editingJob ? `/api/careers/${editingJob.slug}` : '/api/careers';
      const method = editingJob ? 'PUT' : 'POST';

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
      await fetchJobs();
    } catch (err) {
      console.error('Submit form error:', err);
      setFormError('A system error occurred.');
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to permanently delete this job listing?')) return;

    try {
      const res = await fetch(`/api/careers/${slug}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || 'Failed to delete job.');
        return;
      }

      await fetchJobs();
    } catch (err) {
      console.error('Delete job error:', err);
    }
  };

  const isReadOnly = role === 'viewer';
  const isEditorOrAdmin = role === 'admin' || role === 'editor';
  const isAdmin = role === 'admin';

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
        <div className={styles.spinner} style={{ marginRight: '0.75rem', borderColor: 'var(--primary)', borderTopColor: 'var(--accent)' }} />
        <span>Loading jobs openings...</span>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h2>Manage Careers Listings</h2>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            Publish and manage open staff/volunteer vacancies at THF.
          </p>
        </div>
        {isEditorOrAdmin && (
          <button onClick={openAddModal} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Plus size={16} />
            <span>Add New Opening</span>
          </button>
        )}
      </div>

      {isReadOnly && (
        <div className={styles.readOnlyAlert} role="alert">
          <AlertTriangle size={16} />
          <span>You have Read-Only permissions. Creating, modifying, or deleting job vacancies is restricted.</span>
        </div>
      )}

      {/* Jobs Table */}
      <div className={styles.card}>
        <div className={styles.tableResponsive}>
          {jobs.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Experience</th>
                  <th>Job Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.slug}>
                    <td style={{ fontWeight: 700 }}>{job.title}</td>
                    <td>{job.department}</td>
                    <td>{job.location}</td>
                    <td>{job.experience}</td>
                    <td>{job.type}</td>
                    <td>
                      <span className={`${styles.badge} ${job.status === 'active' ? styles.badgeSuccess : styles.badgeWarning}`}>
                        {job.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.btnActions}>
                        {isEditorOrAdmin ? (
                          <button onClick={() => openEditModal(job)} className="btn btn-outline btn-xs" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Edit2 size={12} />
                            <span>Edit</span>
                          </button>
                        ) : (
                          <button onClick={() => openEditModal(job)} className="btn btn-outline btn-xs" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Eye size={12} />
                            <span>View</span>
                          </button>
                        )}
                        {isAdmin && (
                          <button onClick={() => handleDelete(job.slug)} className="btn btn-outline btn-xs" style={{ color: 'var(--danger)', borderColor: 'rgba(220, 38, 38, 0.2)' }}>
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
              <Briefcase size={48} className={styles.emptyStateIcon} />
              <h4>No job listings yet</h4>
              <p>Add a vacancy to display career positions on the Careers page.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{ maxWidth: '750px' }}>
            <div className={styles.modalHeader}>
              <h3>{editingJob ? (isReadOnly ? 'View Job Vacancy' : 'Edit Job Vacancy') : 'Add New Job Opening'}</h3>
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
                  <label htmlFor="job-title">Job Title</label>
                  <input
                    id="job-title"
                    type="text"
                    required
                    disabled={isReadOnly}
                    placeholder="e.g., Senior Program Coordinator"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="job-department">Department</label>
                    <select
                      id="job-department"
                      disabled={isReadOnly}
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className={styles.select}
                    >
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Livelihoods">Livelihoods</option>
                      <option value="Finance & Operations">Finance & Operations</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="job-type">Job Type</label>
                    <select
                      id="job-type"
                      disabled={isReadOnly}
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className={styles.select}
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Volunteer">Volunteer</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="job-location">Location</label>
                    <input
                      id="job-location"
                      type="text"
                      required
                      disabled={isReadOnly}
                      placeholder="e.g., Dehradun, Uttarakhand"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="job-experience">Required Experience</label>
                    <input
                      id="job-experience"
                      type="text"
                      required
                      disabled={isReadOnly}
                      placeholder="e.g., 3+ Years"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="job-description">Brief Description Summary</label>
                  <textarea
                    id="job-description"
                    rows={3}
                    required
                    disabled={isReadOnly}
                    placeholder="Provide a short single-paragraph synopsis of this vacancy."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="job-responsibilities">Key Responsibilities (Double newline between bullet points)</label>
                  <textarea
                    id="job-responsibilities"
                    rows={6}
                    required
                    disabled={isReadOnly}
                    placeholder="Specify daily tasks. Separate distinct points with a blank line."
                    value={respText}
                    onChange={(e) => setRespText(e.target.value)}
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="job-requirements">Eligibility & Requirements (Double newline between bullet points)</label>
                  <textarea
                    id="job-requirements"
                    rows={6}
                    required
                    disabled={isReadOnly}
                    placeholder="Specify educational background, licenses or skill requirements. Separate with a blank line."
                    value={reqText}
                    onChange={(e) => setReqText(e.target.value)}
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="job-status">Listing Status</label>
                  <select
                    id="job-status"
                    disabled={isReadOnly}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={styles.select}
                  >
                    <option value="active">Active (Open)</option>
                    <option value="inactive">Inactive (Closed)</option>
                  </select>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline btn-sm">
                  Cancel
                </button>
                {!isReadOnly && (
                  <button type="submit" className="btn btn-primary btn-sm">
                    {editingJob ? 'Save Changes' : 'Publish Job'}
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
