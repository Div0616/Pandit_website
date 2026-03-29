import React, { useState } from 'react';
import styles from './BookingSection.module.css';
import Card from '../shared/Card';
import GlowButton from '../shared/GlowButton';

/**
 * BookingSection — Full booking flow with type selection, form, and WhatsApp submission.
 * Pre-selects booking type when navigated from Puja section.
 */

const bookingTypes = [
    {
        id: 'ganesh-puja',
        name: 'Ganesh Puja',
        icon: '🙏',
        description: 'Sacred Ganesh Puja to invoke Lord Ganesha\'s blessings for removing obstacles and ensuring success.',

    },
    {
        id: 'katha',
        name: 'Katha',
        icon: '📖',
        description: 'Traditional Satyanarayan or other sacred Katha narration for divine blessings and prosperity.',


    },
    {
        id: 'rudra-abhishek',
        name: 'Rudra Abhishek',
        icon: '🔱',
        description: 'Powerful Rudra Abhishek performed with sacred offerings to Lord Shiva for health and spiritual upliftment.',


    },
    {
        id: 'lakshmi-puja',
        name: 'Lakshmi Puja',
        icon: '🪷',
        description: 'Devoted Lakshmi Puja to invite Goddess Lakshmi\'s blessings of wealth, abundance, and prosperity.',


    },
    {
        id: 'samast-puja',
        name: 'Samast Puja',
        icon: '🕉️',
        description: 'Complete comprehensive puja combining multiple rituals for all-round well-being and divine grace.',


    },
    {
        id: 'navagraha-shanti',
        name: 'Navagraha Shanti Puja',
        icon: '🌟',
        description: 'Powerful Navagraha Shanti Puja to pacify the nine planets and remove negative planetary influences.',


    },
    {
        id: 'nava-chandi',
        name: 'Nava Chandi',
        icon: '🔥',
        description: 'Grand Nava Chandi Yagna — nine rounds of Chandi Path with sacred fire ritual for divine protection.',


    },
    {
        id: 'laksha-chandi',
        name: 'Laksha Chandi',
        icon: '✨',
        description: 'Extremely powerful Laksha Chandi Yagna for fulfilling deep spiritual aspirations and divine grace.'

    },
    {
        id: 'sahastra-chandi',
        name: 'Sahastra Chandi',
        icon: '🪔',
        description: 'Auspicious Sahastra Chandi Yagna — a thousand-fold chanting for ultimate blessings and cosmic harmony.',

    },
    {
        id: 'vastu-shastra',
        name: 'Vastu Shastra Vishesh',
        icon: '🏠',
        description: 'Expert Vastu Shastra consultation and puja to harmonize energy flow in your home or workplace.',

    },
];

// WhatsApp number (replace with actual number)
const WHATSAPP_NUMBER = '919022717632';

export default function BookingSection({ preSelectedType }) {
    const [selectedType, setSelectedType] = useState(preSelectedType || '');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        notes: '',
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
        if (!selectedType) newErrors.type = 'Please select a booking type';
        if (!formData.date) newErrors.date = 'Please select a date';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Build WhatsApp message
        const message = [
            `🙏 *New Booking Request*`,
            ``,
            `*Service:* ${selectedType}`,
            `*Name:* ${formData.name}`,
            `*Phone:* ${formData.phone}`,
            formData.email ? `*Email:* ${formData.email}` : '',
            `*Preferred Date:* ${formData.date}`,
            formData.notes ? `*Notes:* ${formData.notes}` : '',
            ``,
            `Please confirm this booking. 🙏`,
        ].filter(Boolean).join('\n');

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        setSubmitted(true);
    };

    const resetForm = () => {
        setSubmitted(false);
        setSelectedType('');
        setFormData({ name: '', email: '', phone: '', date: '', notes: '' });
        setErrors({});
    };

    // Success state
    if (submitted) {
        return (
            <section className={styles.bookingSection}>
                <div className={styles.formContainer}>
                    <div className={styles.successMessage}>
                        <span className={styles.successIcon}>🎉</span>
                        <h2 className={styles.successTitle}>Booking Sent via WhatsApp!</h2>
                        <p className={styles.successText}>
                            Thank you, {formData.name}! Your {selectedType} booking request has been sent via WhatsApp.<br />
                            We will confirm your booking shortly.
                        </p>
                        <GlowButton text="Book Another Session" onClick={resetForm} />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.bookingSection}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Book Your Session</h2>
                <p className={styles.sectionSubtitle}>Select a service and send your booking directly via WhatsApp</p>
            </div>

            {/* Booking type selection */}
            <div className={styles.typesGrid}>
                {bookingTypes.map((type) => (
                    <Card
                        key={type.id}
                        className={`${styles.typeCard} ${selectedType === type.name ? styles.selected : ''}`}
                        onClick={() => {
                            setSelectedType(type.name);
                            if (errors.type) setErrors(prev => ({ ...prev, type: '' }));
                        }}
                    >
                        <div className={styles.typeIcon}>{type.icon}</div>
                        <div className={styles.typeName}>{type.name}</div>
                        <p className={styles.typeDescription}>{type.description}</p>
                        <div className={styles.typeMeta}>
                            <span className={styles.typePrice}>{type.price}</span>
                            <span className={styles.typeDuration}>{type.duration}</span>
                        </div>
                    </Card>
                ))}
            </div>
            {errors.type && <p className={styles.formError}>{errors.type}</p>}

            {/* Booking form */}
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <h3 className={styles.formTitle}>Your Details</h3>
                <div className={styles.formGrid}>
                    {/* Name */}
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Full Name</label>
                        <input
                            className={styles.formInput}
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        {errors.name && <span className={styles.formError}>{errors.name}</span>}
                    </div>

                    {/* Phone */}
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Phone Number</label>
                        <input
                            className={styles.formInput}
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                        {errors.phone && <span className={styles.formError}>{errors.phone}</span>}
                    </div>

                    {/* Email (optional) */}
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Email Address (Optional)</label>
                        <input
                            className={styles.formInput}
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                    </div>

                    {/* Booking Type (auto-filled) */}
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Booking Type</label>
                        <select
                            className={styles.formSelect}
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="">Select a type</option>
                            {bookingTypes.map(t => (
                                <option key={t.id} value={t.name}>{t.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Date */}
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Preferred Date</label>
                        <input
                            className={styles.formInput}
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                        />
                        {errors.date && <span className={styles.formError}>{errors.date}</span>}
                    </div>

                    {/* Notes */}
                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label className={styles.formLabel}>Additional Notes</label>
                        <textarea
                            className={styles.formTextarea}
                            placeholder="Any special requests or details about your ritual needs..."
                            value={formData.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                        />
                    </div>

                    {/* Submit */}
                    <div className={styles.submitArea}>
                        <span className={styles.submitNote}>📱 Booking will be sent directly via WhatsApp</span>
                        <GlowButton text="Send Booking via WhatsApp 📱" type="submit" />
                    </div>
                </div>
            </form>
        </section>
    );
}
