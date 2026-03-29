import React, { useState } from 'react';
import styles from './Sidebar.module.css';

/**
 * Sidebar — Fixed left navigation with 4 section buttons.
 * Collapsible on mobile via hamburger toggle.
 */

const navItems = [
  { id: 'puja', label: 'About', icon: '🕉️' },
  { id: 'mantras', label: 'Mantras', icon: '📿' },
  { id: 'reviews', label: 'Ratings', icon: '🎓' },
  { id: 'customers', label: 'Jajmaan', icon: '👥' },
  { id: 'booking', label: 'Book now', icon: '🌐' },
];

export default function Sidebar({ activeSection, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (sectionId) => {
    onNavigate(sectionId);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile hamburger toggle */}
      <button
        className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile overlay */}
      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.visible : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <nav className={`${styles.sidebar} ${mobileOpen ? styles.open : ''}`}>
        {/* Logo */}
        <div className={styles.logo}>
          ॐ
        </div>

        {/* Navigation items */}
        <div className={styles.navItems}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.navButton} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => handleClick(item.id)}
              aria-label={item.label}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Notification bell */}
        <button className={styles.notificationBell} aria-label="Notifications">
          🔔
          <span className={styles.notificationDot} />
        </button>
      </nav>
    </>
  );
}
