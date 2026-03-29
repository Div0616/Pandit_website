import React from 'react';
import styles from './Footer.module.css';

/**
 * Footer — Shared footer rendered at the bottom of every section.
 * Accepts onNavigate callback to allow quick-link navigation.
 */

const quickLinks = [
  { id: 'puja', label: 'Puja Services', icon: '🕉️' },
  { id: 'mantras', label: 'Mantras', icon: '📿' },
  { id: 'reviews', label: 'Reviews', icon: '⭐' },
  { id: 'customers', label: 'Our Jajmaan', icon: '👥' },
  { id: 'booking', label: 'Book Now', icon: '📅' },
];

export default function Footer({ onNavigate }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <div className={styles.logoIcon}>ॐ</div>
            <span className={styles.brandName}>Pandit.com</span>
          </div>
          <p className={styles.brandDesc}>
            Your trusted platform for authentic puja services, sacred mantras,
            and spiritual guidance — bringing divine blessings to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.footerColumn}>
          <span className={styles.columnTitle}>Quick Links</span>
          {quickLinks.map((link) => (
            <button
              key={link.id}
              className={styles.footerLink}
              onClick={() => onNavigate(link.id)}
            >
              <span className={styles.linkIcon}>{link.icon}</span>
              {link.label}
            </button>
          ))}
        </div>

        {/* Contact */}
        <div className={styles.footerColumn}>
          <span className={styles.columnTitle}>Contact Us</span>
          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>📞</span>
            +91 9022717632
          </div>
          {/* <div className={styles.contactItem}>
            <span className={styles.contactIcon}>✉️</span>
            info@pandit.com
          </div> */}
          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>📍</span>
            Naigaon , Mumbai
          </div>
        </div>
      </div>

      <div className={styles.footerDivider} />

      <div className={styles.footerBottom}>
        <span className={styles.copyright}>
          © {new Date().getFullYear()} rising2X — All rights reserved
        </span>
        <div className={styles.socials}>
          <a href="#" className={styles.socialLink} aria-label="Facebook">f</a>
          <a href="https://www.instagram.com/anuj_pandey.2?igsh=NjF6YWV4MDR0dXV6" className={styles.socialLink} aria-label="Instagram">📸</a>
        </div>
      </div>
    </footer>
  );
}
