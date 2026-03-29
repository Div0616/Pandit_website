import React from 'react';
import styles from './Hero.module.css';

/**
 * Hero — Large landing visual with Pandit figure, glowing halo, gradient, and CTA.
 * The pandit image is passed as a prop for easy replacement.
 */

// Sanskrit/spiritual symbols for floating background
const floatingSymbols = ['ॐ', '☸', '🔱', '卐', '☪', '✡', '🪷', '☯'];

export default function Hero({ panditImage, onBookNow }) {
    return (
        <section className={styles.hero}>
            {/* Floating Sanskrit icons */}
            <div className={styles.floatingIcons}>
                {floatingSymbols.map((symbol, i) => (
                    <span key={i} className={styles.floatingIcon}>
                        {symbol}
                    </span>
                ))}
            </div>

            {/* Hero text content */}
            <div className={styles.heroContent}>
                <h1 className={styles.headline}>Pandit</h1>
                <p className={styles.subtext}>Sacred Wisdom,<br />Modern Access.</p>
                <p className={styles.tagline}>Personalized spiritual consultations</p>
                <button className={styles.ctaButton} onClick={onBookNow}>
                    Book Your Divine Session
                </button>
            </div>

            {/* Pandit figure with halo */}
            <div className={styles.panditContainer}>
                <div className={styles.haloGlow} />
                <img
                    src={panditImage}
                    alt="Pandit - Spiritual Guide"
                    className={styles.panditImage}
                />
            </div>

            {/* Bottom gradient fade */}
            <div className={styles.bottomGradient} />
        </section>
    );
}
