import React from 'react';
import styles from './PujaSection.module.css';
import Card from '../shared/Card';
import GlowButton from '../shared/GlowButton';

/**
 * PujaSection — Cards for featured puja services.
 * Each card's "Book Now" navigates to Booking with pre-selected type.
 */

const pujaServices = [
    {
        id: 'ganesh-puja',
        icon: '🙏',
        title: 'Ganesh Puja',
        description: 'Invoke Lord Ganesha\'s blessings to remove obstacles and ensure success in all your endeavors.',
        bookingType: 'Ganesh Puja',
    },
    {
        id: 'lakshmi-puja',
        icon: '🪷',
        title: 'Lakshmi Puja',
        description: 'Invite Goddess Lakshmi\'s divine blessings for wealth, abundance, and prosperity into your life.',
        bookingType: 'Lakshmi Puja',
    },
    {
        id: 'rudra-abhishek',
        icon: '🔱',
        title: 'Rudra Abhishek',
        description: 'Powerful Rudra Abhishek with sacred offerings to Lord Shiva for health and spiritual upliftment.',
        bookingType: 'Rudra Abhishek',
    },
];

export default function PujaSection({ onBookWithType }) {
    return (
        <section className={styles.pujaSection}>
            <div className={styles.cardsGrid}>
                {pujaServices.map((service) => (
                    <Card key={service.id} className={styles.pujaCard}>
                        <div className={styles.cardIcon}>{service.icon}</div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDescription}>{service.description}</p>
                            <GlowButton
                                text="Book Now"
                                variant="secondary"
                                small
                                className={styles.bookButton}
                                onClick={() => onBookWithType(service.bookingType)}
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
