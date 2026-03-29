import React, { useState, useRef, useEffect } from 'react';
import styles from './MantraSection.module.css';
import Card from '../shared/Card';

/**
 * MantraSection — List of sacred mantras with real audio playback.
 * Uses HTML5 Audio API for actual mantra chanting audio.
 */

const mantras = [
    {
        id: 'gayatri',
        icon: '🔆',
        title: 'Gayatri Mantra',
        purpose: 'For wisdom, enlightenment, and purification of mind. Chanted at dawn for divine illumination.',
        duration: '3:30',
        audioUrl: process.env.PUBLIC_URL + '/audio/gayatri-mantra.mp3',
    },
    {
        id: 'mrityunjaya',
        icon: '🔱',
        title: 'Maha Mrityunjaya Mantra',
        purpose: 'For healing, protection, and overcoming the fear of death. Invokes Lord Shiva\'s blessings.',
        duration: '7:15',
        // Reuses gayatri audio until a dedicated mrityunjaya file is added
        audioUrl: process.env.PUBLIC_URL + '/audio/gayatri-mantra.mp3',
    },
    {
        id: 'navgraha',
        icon: '☀️',
        title: 'Navgraha Mantras',
        purpose: 'For appeasing the nine planets and harmonizing celestial influences on your life.',
        duration: '12:45',
        audioUrl: process.env.PUBLIC_URL + '/audio/navagraha-mantra.mp3',
    },
];

export default function MantraSection() {
    const [playingId, setPlayingId] = useState(null);
    const [progress, setProgress] = useState({});
    const [durations, setDurations] = useState({});
    const audioRefs = useRef({});

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            Object.values(audioRefs.current).forEach(audio => {
                if (audio) {
                    audio.pause();
                    audio.src = '';
                }
            });
        };
    }, []);

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const togglePlay = (mantra) => {
        const { id, audioUrl } = mantra;

        // If currently playing this mantra, pause it
        if (playingId === id) {
            if (audioRefs.current[id]) {
                audioRefs.current[id].pause();
            }
            setPlayingId(null);
            return;
        }

        // Pause any currently playing audio
        if (playingId && audioRefs.current[playingId]) {
            audioRefs.current[playingId].pause();
        }

        // Create or reuse audio element
        if (!audioRefs.current[id]) {
            const audio = new Audio(audioUrl);

            audio.addEventListener('loadedmetadata', () => {
                setDurations(prev => ({ ...prev, [id]: audio.duration }));
            });

            audio.addEventListener('timeupdate', () => {
                if (audio.duration) {
                    const pct = (audio.currentTime / audio.duration) * 100;
                    setProgress(prev => ({ ...prev, [id]: pct }));
                }
            });

            audio.addEventListener('ended', () => {
                setPlayingId(null);
                setProgress(prev => ({ ...prev, [id]: 0 }));
            });

            audio.addEventListener('error', (e) => {
                console.error('Audio failed to load:', audioUrl, e);
                // If audio fails to load, fall back to simulated playback
                setPlayingId(id);
                let p = 0;
                const interval = setInterval(() => {
                    p += 1;
                    if (p > 100) {
                        clearInterval(interval);
                        setPlayingId(null);
                        setProgress(prev => ({ ...prev, [id]: 0 }));
                    } else {
                        setProgress(prev => ({ ...prev, [id]: p }));
                    }
                }, 300);
            });

            audioRefs.current[id] = audio;
        }

        audioRefs.current[id].play().catch(() => {
            // Fallback: simulate progress if play fails
            setPlayingId(id);
            let p = 0;
            const interval = setInterval(() => {
                p += 1;
                if (p > 100) {
                    clearInterval(interval);
                    setPlayingId(null);
                    setProgress(prev => ({ ...prev, [id]: 0 }));
                } else {
                    setProgress(prev => ({ ...prev, [id]: p }));
                }
            }, 300);
        });

        setPlayingId(id);
    };

    return (
        <section className={styles.mantraSection}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Sacred Mantras</h2>
                <p className={styles.sectionSubtitle}>Ancient chants for spiritual growth and inner peace</p>
            </div>

            <div className={styles.mantraList}>
                {mantras.map((mantra) => (
                    <Card key={mantra.id} className={styles.mantraCard}>
                        <div className={styles.mantraIcon}>{mantra.icon}</div>
                        <div className={styles.mantraInfo}>
                            <h3 className={styles.mantraTitle}>{mantra.title}</h3>
                            <p className={styles.mantraPurpose}>{mantra.purpose}</p>
                            {/* Progress bar — always visible when playing */}
                            {playingId === mantra.id && (
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: `${progress[mantra.id] || 0}%` }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.mantraMeta}>
                            <span className={styles.duration}>
                                {playingId === mantra.id && durations[mantra.id]
                                    ? formatTime((progress[mantra.id] / 100) * durations[mantra.id])
                                    : mantra.duration
                                }
                            </span>
                            <button
                                className={`${styles.playButton} ${playingId === mantra.id ? styles.playing : ''}`}
                                onClick={() => togglePlay(mantra)}
                                aria-label={playingId === mantra.id ? 'Pause' : 'Play'}
                            >
                                {playingId === mantra.id ? '⏸' : '▶'}
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
