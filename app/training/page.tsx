'use client';
import React, { useState } from 'react';
import {
    Play,
    BookOpen,
    Award,
    CheckCircle,
    Lock,
    Search,
    X,
    Video,
    FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialModules = [
    {
        id: 1,
        title: 'Keeping Your Animals Safe',
        description: 'Learn the basic steps to stop sickness on your farm.',
        duration: '15 mins',
        type: 'Video',
        level: 'Easy',
        progress: 100,
        locked: false,
        thumbnail: 'rgba(16, 185, 129, 0.1)'
    },
    {
        id: 2,
        title: 'How to Clean Properly',
        description: 'A simple guide on how to wash and keep things clean.',
        duration: '25 mins',
        type: 'Interactive',
        level: 'Easy',
        progress: 45,
        locked: false,
        thumbnail: 'rgba(99, 102, 241, 0.1)'
    },
    {
        id: 3,
        title: 'Spotting Sickness Early',
        description: 'What to look for if your animals seem ill.',
        duration: '40 mins',
        type: 'Video',
        level: 'Important',
        progress: 0,
        locked: false,
        thumbnail: 'rgba(239, 68, 68, 0.1)'
    },
    {
        id: 4,
        title: 'Dealing with Waste',
        description: 'How to safely throw away farm waste.',
        duration: '20 mins',
        type: 'Article',
        level: 'Important',
        progress: 0,
        locked: true,
        thumbnail: 'rgba(245, 158, 11, 0.1)'
    }
];

export default function Training() {
    const [search, setSearch] = useState('');

    const filteredModules = initialModules.filter(m =>
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Farmer's School 🏫</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--foreground-muted)' }}>Watch videos and learn how to run a better, safer farm.</p>
            </div>

            {/* Progress Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--primary)' }}>
                    <div style={{ color: 'var(--primary)' }}><Award size={32} /></div>
                    <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--foreground-muted)' }}>MY SCORE</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: '800' }}>1,250 Points</p>
                    </div>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--secondary)' }}>
                    <div style={{ color: 'var(--secondary)' }}><CheckCircle size={32} /></div>
                    <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--foreground-muted)' }}>LESSONS DONE</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: '800' }}>4 Finished</p>
                    </div>
                </div>
            </div>

            {/* Simple Search */}
            <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
                <Search size={24} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--foreground-muted)' }} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a topic (e.g., 'cleaning')..."
                    style={{
                        width: '100%',
                        padding: '1.25rem 1rem 1.25rem 3.5rem',
                        background: 'var(--surface)',
                        border: '2px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        color: 'white',
                        fontSize: '1.1rem',
                        outline: 'none'
                    }}
                />
            </div>

            {/* Lessons List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                {filteredModules.map((m) => (
                    <motion.div
                        key={m.id}
                        whileHover={{ scale: 1.02 }}
                        className="glass-card"
                        style={{ padding: 0, overflow: 'hidden', cursor: m.locked ? 'not-allowed' : 'pointer', border: m.locked ? '1px solid var(--border)' : '2px solid var(--border)' }}
                    >
                        <div style={{ height: '200px', background: m.thumbnail, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            {m.locked ? <Lock size={48} color="var(--foreground-muted)" /> : (
                                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px var(--primary-glow)' }}>
                                    <Play size={32} color="white" fill="white" />
                                </div>
                            )}
                            <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.7)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: '700', backdropFilter: 'blur(4px)' }}>
                                {m.level}
                            </div>
                            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.7)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {m.type === 'Video' ? <Video size={14} /> : <FileText size={14} />}
                                {m.duration}
                            </div>
                        </div>

                        <div style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.75rem' }}>{m.title}</h3>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.5' }}>{m.description}</p>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                                    <span>PROGRESS</span>
                                    <span>{m.progress}%</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${m.progress}%`, height: '100%', background: 'var(--primary)', borderRadius: '4px' }} />
                                </div>
                            </div>

                            <button
                                disabled={m.locked}
                                style={{
                                    width: '100%',
                                    padding: '1.25rem',
                                    background: m.locked ? 'rgba(255,255,255,0.03)' : 'var(--primary)',
                                    color: m.locked ? 'var(--foreground-muted)' : 'white',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: '800',
                                    fontSize: '1.1rem',
                                    cursor: m.locked ? 'default' : 'pointer'
                                }}
                            >
                                {m.progress === 100 ? 'WATCH AGAIN' : m.progress > 0 ? 'CONTINUE LESSON' : m.locked ? 'LOCKED' : 'START LESSON'}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
