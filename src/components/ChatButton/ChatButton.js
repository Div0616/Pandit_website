import React, { useState } from 'react';
import styles from './ChatButton.module.css';

/**
 * ChatButton — Floating "Chat with Guru" button with dummy chat popup.
 */
export default function ChatButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.chatWrapper}>
            {/* Chat popup */}
            {isOpen && (
                <div className={styles.chatPopup}>
                    <div className={styles.chatHeader}>
                        <span className={styles.chatHeaderTitle}>🙏 Chat with Guru</span>
                        <button className={styles.chatClose} onClick={() => setIsOpen(false)}>
                            ✕
                        </button>
                    </div>
                    <div className={styles.chatBody}>
                        <div className={styles.chatMessage}>
                            Namaste! 🙏 Welcome to Pandit Connect. How may I guide you on your spiritual journey today?
                        </div>
                        <div className={styles.chatMessage}>
                            You can ask about pujas, mantras, horoscope readings, or any spiritual guidance you need.
                        </div>
                    </div>
                    <div className={styles.chatInputArea}>
                        <input
                            className={styles.chatInput}
                            placeholder="Type your question..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') e.target.value = '';
                            }}
                        />
                        <button className={styles.chatSend} aria-label="Send">
                            ➤
                        </button>
                    </div>
                </div>
            )}

            {/* Floating button */}
            <button className={styles.chatButton} onClick={() => setIsOpen(!isOpen)}>
                <span className={styles.chatIcon}>💬</span>
                Chat with Guru
            </button>
        </div>
    );
}
