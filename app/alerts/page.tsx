'use client';
import React, { useState } from 'react';
import {
    AlertTriangle,
    Map as MapIcon,
    Bell,
    Radio,
    ShieldAlert,
    Info,
    ChevronRight,
    Flame,
    Wind,
    Droplets,
    Check,
    CheckCircle,
    AlertOctagon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/app/context/AppContext';

const initialAlerts = [
    { id: 1, severity: 'critical', title: 'Bird Flu Update', location: 'Near your North farm', time: '10 min ago', description: 'Be careful! Sickness detected nearby. Keep your animals inside.' },
    { id: 2, severity: 'warning', title: 'Bad Swine Food', location: 'Main Street', time: '1 hour ago', description: 'Some pig food might be bad. Check your bags before feeding.' },
    { id: 3, severity: 'info', title: 'Too Much Humidity', location: 'At your farm', time: '4 hours ago', description: 'It feels very damp. Open the windows for your animals.' },
];

export default function Alerts() {
    const { state, resolveAlert } = useApp();
    const [alerts, setAlerts] = useState(initialAlerts);
    const [actionedIds, setActionedIds] = useState<number[]>([]);

    const handleAction = (id: number) => {
        setActionedIds([...actionedIds, id]);
        resolveAlert();
        setTimeout(() => {
            setAlerts(alerts.filter(a => a.id !== id));
        }, 2000);
    };

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Farm Alerts 🚨</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--foreground-muted)' }}>Watch out for sickness or danger in your area.</p>
                </div>
                <button
                    onClick={() => alert('Report form would open here.')}
                    style={{
                        background: 'var(--error)',
                        color: 'white',
                        padding: '1.25rem 2.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        fontWeight: '800',
                        fontSize: '1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)'
                    }}
                >
                    <ShieldAlert size={28} />
                    REPORT A PROBLEM
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                {/* Left Side: Map & Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <div className="glass-card" style={{ padding: 0, overflow: 'hidden', border: '2px solid var(--border)' }}>
                        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <MapIcon size={24} color="var(--primary)" />
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Sickness Near Me</h2>
                            </div>
                        </div>
                        <div style={{ height: '400px', background: 'rgba(255,255,255,0.01)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            <MapIcon size={120} color="var(--border)" style={{ opacity: 0.1 }} />

                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--foreground-muted)' }}>Map of your area</p>
                                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--error)' }} />
                                        <span style={{ fontWeight: '700' }}>DANGER</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }} />
                                        <span style={{ fontWeight: '700' }}>SAFE</span>
                                    </div>
                                </div>
                            </div>

                            {/* Pulsing Danger Spot */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                    position: 'absolute',
                                    top: '30%',
                                    left: '40%',
                                    width: '40px',
                                    height: '40px',
                                    background: 'var(--error)',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 20px var(--error)'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { icon: Flame, label: 'Barn Heat', val: '28°C', note: 'Good', color: 'var(--primary)' },
                            { icon: Droplets, label: 'Wetness', val: '65%', note: 'Normal', color: 'var(--primary)' }
                        ].map((s, i) => (
                            <div key={i} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
                                <div style={{ color: s.color }}><s.icon size={32} /></div>
                                <div>
                                    <p style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--foreground-muted)' }}>{s.label.toUpperCase()}</p>
                                    <p style={{ fontSize: '1.25rem', fontWeight: '800' }}>{s.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Alerts */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Live Updates ({alerts.length})</h2>

                    <AnimatePresence mode="popLayout">
                        {alerts.map((alert) => (
                            <motion.div
                                key={alert.id}
                                layout
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass-card"
                                style={{
                                    padding: '2rem',
                                    borderLeft: `10px solid ${alert.severity === 'critical' ? 'var(--error)' : alert.severity === 'warning' ? 'var(--warning)' : 'var(--primary)'}`,
                                    position: 'relative'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <AlertOctagon size={24} color={alert.severity === 'critical' ? 'var(--error)' : 'var(--foreground-muted)'} />
                                        <span style={{ fontWeight: '900', fontSize: '1rem', color: alert.severity === 'critical' ? 'var(--error)' : 'inherit' }}>
                                            {alert.severity === 'critical' ? 'VERY DANGEROUS' : 'BE CAREFUL'}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--foreground-muted)' }}>{alert.time}</span>
                                </div>

                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{alert.title}</h3>
                                <p style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: '700' }}>📍 {alert.location}</p>
                                <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '2rem' }}>{alert.description}</p>

                                <button
                                    onClick={() => handleAction(alert.id)}
                                    disabled={actionedIds.includes(alert.id)}
                                    style={{
                                        width: '100%',
                                        padding: '1.25rem',
                                        background: actionedIds.includes(alert.id) ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                        border: '2px solid var(--border)',
                                        color: 'white',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: '800',
                                        fontSize: '1.1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.75rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {actionedIds.includes(alert.id) ? (
                                        <><Check size={24} /> I CHECKED THIS</>
                                    ) : (
                                        'TELL ME WHAT TO DO'
                                    )}
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {alerts.length === 0 && (
                        <div style={{ padding: '3rem', textAlign: 'center', border: '3px dashed var(--primary)', borderRadius: 'var(--radius-lg)', background: 'rgba(16, 185, 129, 0.05)' }}>
                            <CheckCircle size={64} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                            <h2 style={{ color: 'var(--primary)' }}>Everything is Fine</h2>
                            <p style={{ color: 'var(--foreground-muted)', fontSize: '1.1rem' }}>No problems found right now.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
