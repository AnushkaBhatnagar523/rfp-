'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGlobal } from '@/context/GlobalContext';
import styles from './Header.module.css';
import { 
  Search, ChevronDown, Menu, X, Heart, Info, 
  GraduationCap, Briefcase, CloudSun, Shield, FileText,
  Activity, HelpCircle, Phone, Calendar
} from 'lucide-react';

interface SubMenuItem {
  title: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}

interface MenuLink {
  label: string;
  href?: string;
  submenu?: SubMenuItem[];
}

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useGlobal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveSubmenu(null);
    setSearchOpen(false);
  }, [pathname]);

  const menuLinks: MenuLink[] = [
    {
      label: 'About Us',
      submenu: [
        { title: 'Vision & Mission', href: '/about/vision-mission', description: 'Our guiding compass towards an equitable society.', icon: <Info size={18} /> },
        { title: 'Leadership', href: '/about/leadership', description: 'Meet the visionaries leading our developmental goals.', icon: <Shield size={18} /> },
        { title: 'Board Members', href: '/about/board-members', description: 'Our distinguished trustees and advisors.', icon: <Shield size={18} /> },
        { title: 'Our Story', href: '/about/our-story', description: 'Journey of transforming lives across India since 2009.', icon: <FileText size={18} /> },
      ]
    },
    {
      label: 'Programs',
      submenu: [
        { title: 'Health', href: '/programs/health', description: 'Mobile health, renal care, and specialty programs.', icon: <Activity size={18} /> },
        { title: 'Education', href: '/programs/education', description: 'Quality & inclusive learning setups for children.', icon: <GraduationCap size={18} /> },
        { title: 'Livelihood', href: '/programs/livelihood', description: 'Vocational training and rural entrepreneurship.', icon: <Briefcase size={18} /> },
        { title: 'Climate Action', href: '/programs/climate-action', description: 'Sanitation, water security, and rural management.', icon: <CloudSun size={18} /> },
        { title: 'Disability Inclusion', href: '/programs/disability-inclusion', description: 'Rehabilitation, surgical interventions, and mobility aids.', icon: <HelpCircle size={18} /> },
        { title: 'Disaster Relief', href: '/programs/disaster-relief', description: 'Emergency response, food security, and reconstruction.', icon: <Shield size={18} /> },
      ]
    },
    {
      label: 'Resources',
      submenu: [
        { title: 'Annual Reports', href: '/resources/annual-reports', description: 'Transparency & impact metrics reported annually.', icon: <FileText size={18} /> },
        { title: 'Financial Statements', href: '/resources/financial-statements', description: 'Audited balance sheets, trust deeds, & 80G tax docs.', icon: <FileText size={18} /> },
        { title: 'Policies', href: '/resources/policies', description: 'Code of conduct, child protection, and whistleblowing policies.', icon: <Shield size={18} /> },
        { title: 'Downloads', href: '/resources/downloads', description: 'Media kits, brochures, and informational sheets.', icon: <FileText size={18} /> },
        { title: 'Publications', href: '/publications', description: 'Our research papers, newsletters, and policy booklets.', icon: <FileText size={18} /> },
        { title: 'Tenders', href: '/tenders', description: 'Active bidding notices, specifications, and packets.', icon: <FileText size={18} /> },
        { title: 'Procurement', href: '/procurement', description: 'Empanelment process, vendor registration, and guidelines.', icon: <Shield size={18} /> },
        { title: 'Events', href: '/events', description: 'Upcoming summits, webinars, and field camps.', icon: <Calendar size={18} /> },
      ]
    },
    { label: 'Volunteer', href: '/volunteer' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'News & Media', href: '/news-media' },
    { label: 'Partner', href: '/partner' },
    { label: 'Contact', href: '/contact' }
  ];

  const handleSubmenuToggle = (label: string) => {
    if (activeSubmenu === label) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(label);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} glass`}>
        <div className={`container ${styles.headerContainer}`}>
          {/* Logo */}
          <Link href="/" className={styles.logoLink} aria-label="The Hans Foundation Home">
            <span className={styles.logoTextMain}>THE HANS</span>
            <span className={styles.logoTextSub}>FOUNDATION</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {menuLinks.map((link) => (
                <li key={link.label} className={styles.navItem}>
                  {link.submenu ? (
                    <div className={styles.dropdownTriggerWrapper}>
                      <button
                        className={`${styles.navLink} ${styles.hasSubmenu}`}
                        onClick={() => handleSubmenuToggle(link.label)}
                        aria-expanded={activeSubmenu === link.label}
                      >
                        {link.label}
                        <ChevronDown size={14} className={styles.chevron} />
                      </button>

                      {/* Dropdown mega panel */}
                      <div className={`${styles.megaMenu} glass`}>
                        <div className={styles.megaMenuInner}>
                          <div className={styles.megaMenuSidebar}>
                            <h4>{link.label}</h4>
                            <p>Transforming lives and building sustainable communities across India.</p>
                            <Link href="/about/our-story" className={styles.sidebarLink}>
                              Learn about our impact &rarr;
                            </Link>
                          </div>
                          <div className={styles.megaMenuGrid}>
                            {link.submenu.map((sub) => (
                              <Link key={sub.title} href={sub.href} className={styles.subLinkCard}>
                                <div className={styles.subIconWrapper}>{sub.icon}</div>
                                <div className={styles.subContent}>
                                  <span className={styles.subTitle}>{sub.title}</span>
                                  <span className={styles.subDesc}>{sub.description}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href || '#'}
                      className={`${styles.navLink} ${pathname === link.href ? styles.activeLink : ''}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Utility Controls */}
          <div className={styles.utilities}>
            <button
              className={styles.utilityBtn}
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle search bar"
            >
              <Search size={18} />
            </button>

            {/* Donate CTA */}
            <Link href="/donate" className="btn btn-primary btn-sm">
              <Heart size={16} fill="white" />
              <span>Donate</span>
            </Link>

            {/* Mobile Hamburger toggle */}
            <button
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div className={`${styles.searchOverlay} glass`}>
            <div className={`container ${styles.searchContainer}`}>
              <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                <input
                  type="search"
                  placeholder="Search program, blogs, resources, success stories..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  required
                />
                <button type="submit" className={styles.searchSubmitBtn} aria-label="Submit search">
                  <Search size={22} />
                </button>
                <button
                  type="button"
                  className={styles.searchCloseBtn}
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X size={22} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer menu */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.drawerOpen : ''} glass`}>
        <div className={styles.drawerHeader}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logoTextMain}>THE HANS</span>
            <span className={styles.logoTextSub}>FOUNDATION</span>
          </Link>
          <button
            className={styles.drawerClose}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className={styles.drawerNav} aria-label="Mobile Navigation">
          <ul className={styles.drawerList}>
            {menuLinks.map((link) => (
              <li key={link.label} className={styles.drawerItem}>
                {link.submenu ? (
                  <>
                    <button
                      className={styles.drawerTrigger}
                      onClick={() => handleSubmenuToggle(link.label)}
                      aria-expanded={activeSubmenu === link.label}
                    >
                      {link.label}
                      <ChevronDown
                        size={18}
                        className={`${styles.drawerChevron} ${activeSubmenu === link.label ? styles.chevronRotated : ''}`}
                      />
                    </button>
                    <ul
                      className={`${styles.drawerSubList} ${activeSubmenu === link.label ? styles.subListOpen : ''}`}
                    >
                      {link.submenu.map((sub) => (
                        <li key={sub.title}>
                          <Link href={sub.href} className={styles.drawerSubLink}>
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link href={link.href || '#'} className={styles.drawerLink}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className={styles.drawerActions}>
            <Link href="/donate" className="btn btn-primary" style={{ width: '100%' }}>
              <Heart size={18} fill="white" />
              <span>Donate Now</span>
            </Link>
          </div>
        </nav>
      </div>
      {mobileMenuOpen && <div className={styles.drawerBackdrop} onClick={() => setMobileMenuOpen(false)} />}
    </>
  );
}
