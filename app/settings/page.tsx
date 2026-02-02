'use client';
import React, { useState } from 'react';
import {
    Globe,
    User,
    Bell,
    Lock,
    LogOut,
    Check,
    Cloud,
    Database,
    Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/app/context/AppContext';

export default function Settings() {
    const { state, updateProfile, logout } = useApp();
    const [notifications, setNotifications] = useState([
        { id: 1, label: 'Send SMS on Phone', enabled: true },
        { id: 2, label: 'Send WhatsApp Messages', enabled: true },
        { id: 3, label: 'Send Email Reports', enabled: false },
    ]);

    const [showSaved, setShowSaved] = useState(false);

    const triggerSave = () => {
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    const toggleNotification = (id: number) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, enabled: !n.enabled } : n
        ));
        triggerSave();
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '900px', paddingBottom: '4rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>My Profile & Settings ⚙️</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--foreground-muted)' }}>Change your name, language, and how we talk to you.</p>
                </div>
                <AnimatePresence>
                    {showSaved && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            style={{ background: 'var(--primary)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700' }}
                        >
                            <Check size={20} /> SAVED!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* 1. My Information */}
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                        <div style={{ padding: '1rem', borderRadius: '15px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)' }}>
                            <User size={32} />
                        </div>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>My Information</h2>
                    </div>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--foreground-muted)' }}>MY FULL NAME</label>
                            <input
                                type="text"
                                value={state.userProfile.name}
                                onChange={(e) => { updateProfile({ name: e.target.value }); triggerSave(); }}
                                style={{
                                    width: '100%',
                                    padding: '1.25rem',
                                    background: 'var(--surface)',
                                    border: '2px solid var(--border)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'white',
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--foreground-muted)' }}>MY ROLE (E.G. FARM OWNER)</label>
                            <input
                                type="text"
                                value={state.userProfile.role}
                                onChange={(e) => { updateProfile({ role: e.target.value }); triggerSave(); }}
                                style={{
                                    width: '100%',
                                    padding: '1.25rem',
                                    background: 'var(--surface)',
                                    border: '2px solid var(--border)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'white',
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* 2. My Language */}
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                        <div style={{ padding: '1rem', borderRadius: '15px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--secondary)' }}>
                            <Languages size={32} />
                        </div>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>My Language</h2>
                    </div>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--foreground-muted)' }}>CHOOSE LANGUAGE</label>
                            <select
                                style={{
                                    width: '100%',
                                    padding: '1.25rem',
                                    background: 'var(--surface)',
                                    border: '2px solid var(--border)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'white',
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    outline: 'none'
                                }}
                                onChange={triggerSave}
                            >
                                <option>English</option>
                                <option>Tamil (தமிழ்)</option>
                                <option>Hindi (हिन्दी)</option>
                                <option>Telugu (తెలుగు)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 3. Notifications */}
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                        <div style={{ padding: '1rem', borderRadius: '15px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                            <Bell size={32} />
                        </div>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>How to Tell Me Things</h2>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {notifications.map((n) => (
                            <div
                                key={n.id}
                                onClick={() => toggleNotification(n.id)}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1.5rem 2rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer',
                                    border: `2px solid ${n.enabled ? 'var(--primary)' : 'transparent'}`,
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>{n.label}</span>
                                <div style={{
                                    width: '60px',
                                    height: '32px',
                                    borderRadius: '16px',
                                    background: n.enabled ? 'var(--primary)' : 'var(--border)',
                                    position: 'relative',
                                    padding: '4px'
                                }}>
                                    <motion.div
                                        animate={{ x: n.enabled ? 28 : 0 }}
                                        style={{ width: '24px', height: '24px', background: 'white', borderRadius: '50%' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Log Out Button */}
                <button
                    onClick={() => logout()}
                    style={{
                        marginTop: '2rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: 'var(--error)',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: '3px solid rgba(239, 68, 68, 0.2)',
                        fontWeight: '900',
                        fontSize: '1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    <LogOut size={28} />
                    LEAVE THE PORTAL (LOG OUT)
                </button>
            </div>
        </div>
    );
}
