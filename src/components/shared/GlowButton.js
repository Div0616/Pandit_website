import React from 'react';
import styles from './GlowButton.module.css';

/**
 * GlowButton — Reusable gradient button with hover glow.
 * Variants: primary (default), secondary, ghost
 */
export default function GlowButton({ text, onClick, variant = 'primary', small = false, children, className = '', type = 'button' }) {
    const classNames = [
        styles.glowButton,
        styles[variant],
        small ? styles.small : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button className={classNames} onClick={onClick} type={type}>
            {children || text}
        </button>
    );
}
