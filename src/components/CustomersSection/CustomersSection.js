import React, { useState, useCallback } from 'react';
import styles from './CustomersSection.module.css';

// Customer images — replace these files in src/assets/customers/ with your own
import customer1 from '../../assets/customers/customer1.png';
import customer2 from '../../assets/customers/customer2.png';
import customer3 from '../../assets/customers/customer3.png';
import customer4 from '../../assets/customers/customer4.png';
import customer5 from '../../assets/customers/customer5.png';
import customer6 from '../../assets/customers/customer6.png';
import customer7 from '../../assets/customers/customer7.png';

/**
 * CustomersSection — Responsive image card gallery.
 * Hover (desktop) or tap (mobile) reveals a short description overlay.
 */

const customers = [
    {
        id: 1,
        name: 'Ananya Deshmukh',
        location: 'Pune, India',
        description:
            'Our Griha Pravesh puja was absolutely divine. Pandit ji guided every ritual with such devotion and patience. A truly blessed experience for our family.',
        image: customer1,
    },
    {
        id: 2,
        name: 'Rajendra Mishra',
        location: 'Varanasi, India',
        description:
            'The Satyanarayan Katha organized for our son\'s birthday was beautifully conducted. The mantras and the positive energy filled our home with peace.',
        image: customer2,
    },
    {
        id: 3,
        name: 'Kamala Iyer',
        location: 'Chennai, India',
        description:
            'We have been attending the online mantra sessions for over a year now. Our mornings feel incomplete without the sacred chants. Highly recommend!',
        image: customer3,
    },
    {
        id: 4,
        name: 'Vikram Choudhary',
        location: 'Jaipur, India',
        description:
            'Booked a Vastu consultation for our new office space. The suggestions were practical and spiritually grounded. Business has been thriving ever since!',
        image: customer4,
    },
    {
        id: 5,
        name: 'Sunita Agarwal',
        location: 'Kolkata, India',
        description:
            'The Navratri special puja ceremony was mesmerizing. Every family member felt a deep spiritual connection. We can\'t wait for the next one.',
        image: customer5,
    },
    {
        id: 6,
        name: 'Harish Nair',
        location: 'Kochi, India',
        description:
            'The horoscope matching service helped us find the perfect date for our daughter\'s wedding. Everything went smoothly and auspiciously.',
        image: customer6,
    },
    {
        id: 7,
        name: 'Pradeep Sharma',
        location: 'Nagpur, India',
        description:
            'An unforgettable Ganesh Chaturthi celebration organized by Pandit ji. The devotion and expertise made the entire event feel truly sacred and joyful.',
        image: customer7,
    },
];

export default function CustomersSection() {
    // Track which card is tapped (for mobile touch toggle)
    const [activeId, setActiveId] = useState(null);

    const handleCardClick = useCallback((id) => {
        setActiveId((prev) => (prev === id ? null : id));
    }, []);

    return (
        <section className={styles.customersSection}>
            {/* Section header */}
            <div className={styles.sectionHeader}>
                <div className={styles.headerTop}>
                    <span className={styles.badge}>✦ Our Devotees</span>
                </div>
                <h2 className={styles.sectionTitle}>Blessed Customers</h2>
                <p className={styles.sectionSubtitle}>
                    Meet the families who have experienced divine blessings through our sacred services
                </p>
            </div>

            {/* Cards grid */}
            <div className={styles.cardsGrid}>
                {customers.map((customer, index) => (
                    <div
                        key={customer.id}
                        className={`${styles.customerCard} ${activeId === customer.id ? styles.active : ''}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => handleCardClick(customer.id)}
                        role="button"
                        tabIndex={0}
                        aria-label={`View details for ${customer.name}`}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleCardClick(customer.id);
                            }
                        }}
                    >
                        <img
                            className={styles.customerImage}
                            src={customer.image}
                            alt={customer.name}
                            loading="lazy"
                        />

                        {/* Overlay — slides up on hover / tap */}
                        <div className={styles.overlay}>
                            <div className={styles.customerName}>
                                <span className={styles.nameGlow} />
                                {customer.name}
                            </div>
                            <p className={styles.customerDesc}>{customer.description}</p>
                            <span className={styles.customerLocation}>
                                📍 {customer.location}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
