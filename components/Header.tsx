'use client';
import React from 'react';
import { Bell, Search, Globe, User } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';

export default function Header() {
    const { state } = useApp();
    return (
        <header className="glass" style={{
            height: '80px',
            width: state.sidebarOpen ? 'calc(100% - 280px)' : 'calc(100% - 90px)',
            position: 'fixed',
            top: 0,
            right: 0,
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2.5rem',
            borderRadius: '0 0 0 20px',
            borderTop: 'none',
            borderRight: 'none',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
                <div style={{ position: 'relative', width: '300px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--foreground-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search records, guidelines..."
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem 0.75rem 2.5rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-md)',
                            color: 'white',
                            outline: 'none',
                        }}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button className="flex-center" style={{ background: 'transparent', border: 'none', color: 'var(--foreground-muted)', gap: '0.5rem' }}>
                    <Globe size={20} />
                    <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>English</span>
                </button>

                <div style={{ position: 'relative' }}>
                    <button className="flex-center" style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border)',
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--foreground-muted)'
                    }}>
                        <Bell size={20} />
                    </button>
                    {state.activeAlerts > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-2px',
                            right: '-2px',
                            width: '10px',
                            height: '10px',
                            background: 'var(--error)',
                            borderRadius: '50%',
                            border: '2px solid var(--background)',
                            animation: 'pulse 1.5s infinite'
                        }} />
                    )}
                </div>

                <button className="flex-center" style={{
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '0.75rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    fontWeight: '600',
                    gap: '0.5rem',
                    boxShadow: '0 4px 15px var(--primary-glow)'
                }}>
                    <User size={18} />
                    Connect Vets
                </button>
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          header {
            width: 100% !important;
            padding: 0 1rem !important;
          }
          input {
            width: 150px !important;
          }
        }
      `}</style>
        </header>
    );
}
