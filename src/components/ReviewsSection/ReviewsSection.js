import React, { useState, useEffect, useCallback } from 'react';
import styles from './ReviewsSection.module.css';

/**
 * ReviewsSection — Testimonial cards grid with circular avatars and star ratings.
 * Auto-scrolling carousel with manual navigation arrows.
 */

const reviews = [
    {
        id: 1,
        name: 'Yogini Butedes',
        location: 'Mumbai, India',
        initials: 'YB',
        rating: 5,
        service: 'Puja Ceremony',
        text: 'We are forever grateful for the beautiful puja ceremony. Pandit ji made our family event truly divine and memorable. An incredible spiritual experience.',
    },
    {
        id: 2,
        name: 'Arjun Sharma',
        location: 'Delhi, India',
        initials: 'AS',
        rating: 5,
        service: 'Mantra Session',
        text: 'The personalized mantra session was life-changing. I\'ve never felt such inner peace. The online consultation was seamless and deeply meaningful.',
    },
    {
        id: 3,
        name: 'Priya Kapoor',
        location: 'Bangalore, India',
        initials: 'PK',
        rating: 5,
        service: 'Vastu Consultation',
        text: 'Incredible Vastu consultation! Our home energy has completely shifted since following the guidance. Highly recommend to anyone seeking harmony.',
    },
    {
        id: 4,
        name: 'Rajesh Verma',
        location: 'Jaipur, India',
        initials: 'RV',
        rating: 4,
        service: 'Marriage Muhurat',
        text: 'The marriage muhurat consultation was very detailed and accurate. Pandit ji explained everything patiently and helped us choose the perfect date.',
    },
    {
        id: 5,
        name: 'Meera Patel',
        location: 'Ahmedabad, India',
        initials: 'MP',
        rating: 5,
        service: 'Daily Puja',
        text: 'Daily puja service has brought such positivity to our mornings. The sacred chants are authentic and the experience is truly immersive.',
    },
    {
        id: 6,
        name: 'Vikram Singh',
        location: 'Lucknow, India',
        initials: 'VS',
        rating: 5,
        service: 'Horoscope Reading',
        text: 'The horoscope reading was incredibly accurate. Every prediction and remedy suggested has been working wonders. A true spiritual guide.',
    },
];

export default function ReviewsSection() {
    const [currentPage, setCurrentPage] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(3);

    // Responsive cards per page
    useEffect(() => {
        const update = () => {
            if (window.innerWidth <= 600) setCardsPerPage(1);
            else if (window.innerWidth <= 900) setCardsPerPage(2);
            else setCardsPerPage(3);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const totalPages = Math.ceil(reviews.length / cardsPerPage);

    const nextPage = useCallback(() => {
        setCurrentPage(prev => (prev + 1) % totalPages);
    }, [totalPages]);

    const prevPage = () => {
        setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
    };

    // Auto-scroll every 5 seconds
    useEffect(() => {
        const timer = setInterval(nextPage, 5000);
        return () => clearInterval(timer);
    }, [nextPage]);

    // Get the cards for the current page
    const startIdx = currentPage * cardsPerPage;
    const visibleReviews = reviews.slice(startIdx, startIdx + cardsPerPage);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
                ★
            </span>
        ));
    };

    return (
        <section className={styles.reviewsSection}>
            {/* Section header */}
            <div className={styles.sectionHeader}>
                <div className={styles.headerTop}>
                    <span className={styles.badge}>✦ Testimonials</span>
                </div>
                <h2 className={styles.sectionTitle}>What Our Devotees Say</h2>
                <p className={styles.sectionSubtitle}>
                    Trusted by thousands of families for their spiritual needs
                </p>
            </div>

            {/* Trust indicators bar */}
            <div className={styles.trustBar}>
                <div className={styles.trustItem}>
                    <span className={styles.trustStars}>★★★★★</span>
                    <div className={styles.trustDetail}>
                        <span className={styles.trustValue}>4.9</span>
                        <span className={styles.trustLabel}>Avg Rating</span>
                    </div>
                </div>
                <div className={styles.trustDivider} />
                <div className={styles.trustItem}>
                    <div className={styles.trustDetail}>
                        <span className={styles.trustValue}>2,847</span>
                        <span className={styles.trustLabel}>Verified Reviews</span>
                    </div>
                </div>
                <div className={styles.trustDivider} />
                <div className={styles.trustItem}>
                    <div className={styles.trustDetail}>
                        <span className={styles.trustValue}>98%</span>
                        <span className={styles.trustLabel}>Satisfaction</span>
                    </div>
                </div>
            </div>

            {/* Cards grid */}
            <div className={styles.cardsGrid}>
                {visibleReviews.map((review, index) => (
                    <div
                        key={review.id}
                        className={styles.reviewCard}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {/* Quote icon */}
                        <div className={styles.quoteIcon}>"</div>

                        {/* Review text */}
                        <p className={styles.reviewText}>{review.text}</p>

                        {/* Star rating */}
                        <div className={styles.starsRow}>
                            {renderStars(review.rating)}
                            <span className={styles.ratingNumber}>{review.rating}.0</span>
                        </div>

                        {/* Divider */}
                        <div className={styles.cardDivider} />

                        {/* User info with circular avatar */}
                        <div className={styles.userInfo}>
                            <div className={styles.avatarCircle}>
                                <span className={styles.avatarInitials}>{review.initials}</span>
                            </div>
                            <div className={styles.userDetails}>
                                <span className={styles.userName}>{review.name}</span>
                                <span className={styles.userMeta}>
                                    {review.service} • {review.location}
                                </span>
                            </div>
                            <div className={styles.verifiedBadge} title="Verified Customer">
                                ✓
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation */}
            <div className={styles.navigation}>
                <button
                    className={styles.navArrow}
                    onClick={prevPage}
                    aria-label="Previous reviews"
                >
                    ←
                </button>
                <div className={styles.navDots}>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={`${styles.navDot} ${currentPage === i ? styles.activeDot : ''}`}
                            onClick={() => setCurrentPage(i)}
                            aria-label={`Page ${i + 1}`}
                        />
                    ))}
                </div>
                <button
                    className={styles.navArrow}
                    onClick={nextPage}
                    aria-label="Next reviews"
                >
                    →
                </button>
            </div>
        </section>
    );
}
