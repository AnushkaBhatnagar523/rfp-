'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ShieldCheck, LogOut, LayoutDashboard, FileText, MessageSquare, PlusCircle, Briefcase, Mail, FileSpreadsheet, History, Award } from 'lucide-react';
import styles from './admin.module.css';

interface User {
  email: string;
  role: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const isLoginPage = pathname === '/admin/login';
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(!isLoginPage);

  useEffect(() => {
    if (isLoginPage) return;

    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.push('/admin/login');
          return;
        }
        const data = await res.json();
        setUser(data.user);
        setLoading(false);
      } catch (err) {
        console.error('Auth verification failed:', err);
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)', color: 'white', flexDirection: 'column', gap: '1rem' }}>
        <div className={styles.spinner} style={{ width: '40px', height: '40px', borderWidth: '3px' }} />
        <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Securing control panel access...</span>
      </div>
    );
  }

  // Active navigation tab highlight helper
  const isActive = (path: string) => {
    return pathname === path ? styles.activeNavLink : '';
  };

  return (
    <div className={styles.adminWrapper}>
      {/* Top Navbar */}
      <header className={styles.topBar}>
        <div className={styles.logoArea}>
          <span className={styles.logoIcon}>🛡️</span>
          <h1>THF Control Panel</h1>
        </div>
        
        {user && (
          <div className={styles.userArea}>
            <div className={styles.userInfo}>
              <span className={styles.userEmail}>{user.email}</span>
              <span className={styles.userRole}>{user.role}</span>
            </div>
            <button onClick={handleLogout} className={styles.logoutBtn} aria-label="Sign out">
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Container */}
      <div className={styles.mainContainer}>
        {/* Sidebar Nav */}
        <nav className={styles.sideBar} aria-label="Control Panel Navigation">
          <button onClick={() => router.push('/admin/dashboard')} className={`${styles.navLink} ${isActive('/admin/dashboard')}`}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          
          <button onClick={() => router.push('/admin/blogs')} className={`${styles.navLink} ${isActive('/admin/blogs')}`}>
            <FileText size={18} />
            <span>Manage Blogs</span>
          </button>

          <button onClick={() => router.push('/admin/comments')} className={`${styles.navLink} ${isActive('/admin/comments')}`}>
            <MessageSquare size={18} />
            <span>Blog Comments</span>
          </button>

          <button onClick={() => router.push('/admin/impact')} className={`${styles.navLink} ${isActive('/admin/impact')}`}>
            <Award size={18} />
            <span>Impact Metrics</span>
          </button>

          <button onClick={() => router.push('/admin/jobs')} className={`${styles.navLink} ${isActive('/admin/jobs')}`}>
            <Briefcase size={18} />
            <span>Job Positions</span>
          </button>

          {user?.role === 'admin' && (
            <>
              <button onClick={() => router.push('/admin/contacts')} className={`${styles.navLink} ${isActive('/admin/contacts')}`}>
                <Mail size={18} />
                <span>Inquiries Inbox</span>
              </button>

              <button onClick={() => router.push('/admin/applications')} className={`${styles.navLink} ${isActive('/admin/applications')}`}>
                <FileSpreadsheet size={18} />
                <span>Job Applicants</span>
              </button>

              <button onClick={() => router.push('/admin/logs')} className={`${styles.navLink} ${isActive('/admin/logs')}`}>
                <History size={18} />
                <span>Activity Logs</span>
              </button>
            </>
          )}
        </nav>

        {/* Content Panel Area */}
        <main className={styles.contentArea}>
          {children}
        </main>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
