'use client';
import React, { useState } from 'react';
import {
    ClipboardCheck,
    Download,
    Calendar,
    CheckCircle,
    AlertTriangle,
    ExternalLink,
    Plus,
    X,
    FileText,
    ShieldCheck,
    Clock,
    ChevronRight,
    Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialComplianceList = [
    { id: 1, title: 'Vaccination Records', status: 'Safe', lastUpdated: 'Today', category: 'Animal Health' },
    { id: 2, title: 'Visitor Log', status: 'Warning', lastUpdated: '3 days ago', category: 'Entry & Exit' },
    { id: 3, title: 'Waste Disposal', status: 'Safe', lastUpdated: '1 week ago', category: 'Environment' },
    { id: 4, title: 'Feed Purchase Slips', status: 'Safe', lastUpdated: 'Yesterday', category: 'Farming' },
    { id: 5, title: 'Movement Permits', status: 'Late', lastUpdated: '2 weeks ago', category: 'Rules' },
    { id: 6, title: 'Cleaning Log', status: 'Safe', lastUpdated: '8 hours ago', category: 'Cleaning' },
];

export default function Compliance() {
    const [filter, setFilter] = useState('All Records');

    const filteredList = initialComplianceList.filter(item =>
        filter === 'All Records' || item.category === filter
    );

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>My Farm Records 📂</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--foreground-muted)' }}>Check all your farm documents and keep them safe.</p>
                </div>
                <button
                    style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '1.25rem 2.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        fontWeight: '800',
                        fontSize: '1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        boxShadow: '0 10px 25px var(--primary-glow)',
                        cursor: 'pointer'
                    }}
                >
                    <Plus size={24} />
                    ADD NEW RECORD
                </button>
            </div>

            {/* Quick Status Bar */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                {['All Records', 'Animal Health', 'Entry & Exit', 'Cleaning', 'Rules', 'Farming'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        style={{
                            whiteSpace: 'nowrap',
                            padding: '1rem 2rem',
                            borderRadius: 'var(--radius-full)',
                            background: filter === cat ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                            color: filter === cat ? 'white' : 'var(--foreground-muted)',
                            border: `2px solid ${filter === cat ? 'var(--primary)' : 'var(--border)'}`,
                            fontWeight: '700',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Records List (Cards instead of Table) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <AnimatePresence mode="popLayout">
                    {filteredList.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="glass-card"
                            style={{
                                padding: '1.5rem 2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '2rem',
                                borderLeft: `8px solid ${item.status === 'Safe' ? 'var(--primary)' : item.status === 'Warning' ? 'var(--warning)' : 'var(--error)'}`,
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: item.status === 'Safe' ? 'var(--primary)' : 'var(--foreground-muted)'
                                }}>
                                    <FileText size={32} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.25rem' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--foreground-muted)', fontWeight: '600', fontSize: '0.9rem' }}>{item.category.toUpperCase()}</p>
                                </div>
                            </div>

                            <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '3rem' }}>
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', fontWeight: '700', marginBottom: '0.25rem' }}>LAST UPDATED</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700' }}>
                                        <Clock size={16} />
                                        {item.lastUpdated}
                                    </div>
                                </div>

                                <div style={{ minWidth: '150px' }}>
                                    <span style={{
                                        display: 'block',
                                        padding: '0.75rem 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        textAlign: 'center',
                                        fontWeight: '900',
                                        fontSize: '1rem',
                                        background: item.status === 'Safe' ? 'rgba(16, 185, 129, 0.15)' : item.status === 'Warning' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                        color: item.status === 'Safe' ? 'var(--primary)' : item.status === 'Warning' ? 'var(--warning)' : 'var(--error)',
                                        border: `2px solid ${item.status === 'Safe' ? 'var(--primary)' : item.status === 'Warning' ? 'var(--warning)' : 'var(--error)'}`
                                    }}>
                                        {item.status.toUpperCase()} {item.status === 'Safe' ? '✅' : item.status === 'Warning' ? '⚠️' : '❌'}
                                    </span>
                                </div>

                                <div style={{ color: 'var(--foreground-muted)' }}>
                                    <ChevronRight size={24} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredList.length === 0 && (
                <div style={{ textAlign: 'center', padding: '5rem' }}>
                    <Search size={64} color="var(--border)" style={{ marginBottom: '1.5rem', opacity: 0.3 }} />
                    <h2 style={{ color: 'var(--foreground-muted)' }}>No records found here.</h2>
                    <p style={{ color: 'var(--foreground-muted)', fontSize: '1.1rem' }}>Try looking in another folder or add a new record.</p>
                </div>
            )}
        </div>
    );
}
