'use client';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendType?: 'positive' | 'negative' | 'neutral';
    color: string;
}

export default function StatCard({ label, value, icon: Icon, trend, trendType, color }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="glass-card"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                    padding: '0.75rem',
                    borderRadius: '12px',
                    background: `${color}20`,
                    color: color,
                }}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '20px',
                        background: trendType === 'positive' ? 'rgba(16, 185, 129, 0.1)' : trendType === 'negative' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                        color: trendType === 'positive' ? '#10b981' : trendType === 'negative' ? '#ef4444' : 'var(--foreground-muted)'
                    }}>
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <p style={{ color: 'var(--foreground-muted)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>{label}</p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: '700' }}>{value}</h3>
            </div>
        </motion.div>
    );
}
