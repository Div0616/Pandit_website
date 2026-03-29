import React, { useState, useCallback } from 'react';
import styles from './App.module.css';
import Sidebar from './components/Sidebar/Sidebar';
import Hero from './components/Hero/Hero';
import PujaSection from './components/PujaSection/PujaSection';
import MantraSection from './components/MantraSection/MantraSection';
import ReviewsSection from './components/ReviewsSection/ReviewsSection';
import BookingSection from './components/BookingSection/BookingSection';
import CustomersSection from './components/CustomersSection/CustomersSection';
import Footer from './components/Footer/Footer';

// Import Pandit image
import panditImage from './assets/1000129607.png';

/**
 * App — Root component managing section switching via state.
 * No routing used — all navigation is through sidebar buttons and state.
 */
function App() {
  const [activeSection, setActiveSection] = useState('puja');
  const [bookingType, setBookingType] = useState('');

  /**
   * Navigate to Booking section with a pre-selected type
   * (called from Puja cards or Hero CTA)
   */
  const handleBookWithType = useCallback((type) => {
    setBookingType(type || '');
    setActiveSection('booking');
  }, []);

  /**
   * Handle direct section navigation from sidebar
   */
  const handleNavigate = useCallback((section) => {
    setActiveSection(section);
    // Clear booking type when navigating directly
    if (section !== 'booking') {
      setBookingType('');
    }
  }, []);

  /**
   * Render the active section based on state
   */
  const renderSection = () => {
    switch (activeSection) {
      case 'puja':
        return (
          <div className={styles.sectionWrapper} key="puja">
            <Hero panditImage={panditImage} onBookNow={() => handleBookWithType('')} />
            <PujaSection onBookWithType={handleBookWithType} />
            <Footer onNavigate={handleNavigate} />
          </div>
        );
      case 'mantras':
        return (
          <div className={styles.sectionWrapper} key="mantras">
            <MantraSection />
            <Footer onNavigate={handleNavigate} />
          </div>
        );
      case 'reviews':
        return (
          <div className={styles.sectionWrapper} key="reviews">
            <ReviewsSection />
            <Footer onNavigate={handleNavigate} />
          </div>
        );
      case 'customers':
        return (
          <div className={styles.sectionWrapper} key="customers">
            <CustomersSection />
            <Footer onNavigate={handleNavigate} />
          </div>
        );
      case 'booking':
        return (
          <div className={styles.sectionWrapper} key="booking">
            <BookingSection preSelectedType={bookingType} />
            <Footer onNavigate={handleNavigate} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.app}>
      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
      <main className={styles.mainContent}>
        {renderSection()}
      </main>

    </div>
  );
}

export default App;
