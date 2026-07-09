import React from 'react';

export default function AccessibilityStatement() {
  return (
    <div className="container" style={{ padding: '5rem 1.5rem', maxWidth: '800px' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--font-size-3xl)', color: 'var(--primary)', marginBottom: '1.5rem' }}>
        Accessibility Statement
      </h1>

      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <p>
          The Hans Foundation is committed to ensuring digital accessibility for all visitors, including persons with physical, visual, or cognitive impairments. We continuously upgrade our web structure to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA parameters.
        </p>

        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-md)', fontWeight: 800, color: 'var(--primary)', marginTop: '1rem', marginBottom: '0.25rem' }}>
          Accessibility Toolbar & Features
        </h2>
        <p>
          Our custom toolbar, accessible on the right side of the page, provides several utilities for tailored browsing:
        </p>
        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Font Sizing Adjustments:</strong> Select A+ or A++ to magnify page font scales globally for improved readability.</li>
          <li><strong>High Contrast Mode:</strong> Switches color parameters to deep blacks and crisp whites to assist visually challenged readers.</li>
          <li><strong>Dyslexia Friendly Font:</strong> Adjusts typography configurations to utilize OpenDyslexic characters and spacing to assist reading flow.</li>
          <li><strong>Reading Guide Ruler:</strong> An interactive highlighted horizontal bar that aligns with your cursor pointer to focus reading lines.</li>
        </ul>

        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-md)', fontWeight: 800, color: 'var(--primary)', marginTop: '1rem', marginBottom: '0.25rem' }}>
          Keyboard Navigation Flow
        </h2>
        <p>
          We support standard keyboard shortcuts to navigate links and buttons:
        </p>
        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>Press <strong>Tab</strong> to cycle focus forward through header menus, buttons, and forms. Press <strong>Shift+Tab</strong> to cycle backwards.</li>
          <li>At the very top of the page, a hidden link <strong>"Skip to Main Content"</strong> becomes visible on focus. Pressing Enter bypasses navigation bars.</li>
          <li>Within tabbed lists or search sliders, use <strong>Arrow Left</strong> and <strong>Arrow Right</strong> keys to toggle panels.</li>
        </ul>

        <p>
          If you encounter any layout issues or accessibility barriers on our website, please notify our development desk immediately at webmaster@thehansfoundation.org.
        </p>
      </div>
    </div>
  );
}
