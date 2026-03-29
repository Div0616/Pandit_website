import React from 'react';
import styles from './Card.module.css';

/**
 * Card — Reusable glassmorphism card with hover effects.
 */
export default function Card({ children, className = '', onClick, style }) {
    return (
        <div
            className={`${styles.card} ${onClick ? styles.clickable : ''} ${className}`}
            onClick={onClick}
            style={style}
        >
            {children}
        </div>
    );
}
