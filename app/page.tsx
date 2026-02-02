'use client';
import React from 'react';
import Image from 'next/image';
import {
  ShieldAlert,
  Activity,
  CheckCircle,
  AlertOctagon,
  PlusCircle,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '@/components/StatCard';
import { useRouter } from 'next/navigation';
import { useApp } from '@/app/context/AppContext';

export default function Home() {
  const router = useRouter();
  const { state } = useApp();

  const isSafe = state.riskScore < 50;

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* 1. Main Status - "The Big Indicator" */}
      <section style={{ marginBottom: '3rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: isSafe ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
            border: `3px solid ${isSafe ? 'var(--primary)' : 'var(--error)'}`,
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: isSafe ? '0 20px 50px rgba(16, 185, 129, 0.15)' : '0 20px 50px rgba(239, 68, 68, 0.15)'
          }}
        >
          {/* Pulsing light */}
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '400px',
              background: isSafe ? 'var(--primary)' : 'var(--error)',
              filter: 'blur(100px)',
              borderRadius: '50%',
              zIndex: 0
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: isSafe ? 'var(--primary)' : 'var(--error)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem',
                color: 'white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}
            >
              {isSafe ? <ShieldCheck size={60} /> : <AlertOctagon size={60} />}
            </motion.div>

            <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: 'white' }}>
              {isSafe ? 'Everything is OK' : 'Check Your Farm Now'}
            </h1>
            <p style={{ fontSize: '1.5rem', color: '#cbd5e1', marginBottom: '3rem' }}>
              {isSafe
                ? `Your farm in ${state.userProfile.region} is safe and healthy.`
                : 'There are some problems. Please check right away.'}
            </p>

            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => router.push('/risk-assessment')}
                style={{
                  padding: '1.5rem 3rem',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1.25rem',
                  fontWeight: '900',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: '0 10px 25px var(--primary-glow)',
                  cursor: 'pointer'
                }}
              >
                <Activity size={28} />
                CHECK FARM HEALTH
              </button>
              <button
                onClick={() => router.push('/community')}
                style={{
                  padding: '1.5rem 3rem',
                  background: 'var(--secondary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1.25rem',
                  fontWeight: '900',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: '0 10px 25px var(--secondary-glow)',
                  cursor: 'pointer'
                }}
              >
                <MessageSquare size={28} />
                ASK FOR HELP
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. Simple Stats Boxes */}
      <h2 style={{ marginBottom: '2rem', fontSize: '1.75rem', fontWeight: '700' }}>Quick Farm Info</h2>
      <div className="grid-auto" style={{ marginBottom: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: `8px solid ${isSafe ? 'var(--primary)' : 'var(--error)'}`, background: isSafe ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)' }}>
          <div style={{ padding: '1rem', background: isSafe ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)', borderRadius: '12px', color: isSafe ? 'var(--primary)' : 'var(--error)', boxShadow: `0 0 20px ${isSafe ? 'var(--primary-glow)' : 'rgba(239, 68, 68, 0.3)'}` }}>
            <ShieldCheck size={32} />
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.05em' }}>FARM SAFETY</p>
            <p style={{ fontSize: '1.85rem', fontWeight: '900', color: 'white' }}>{isSafe ? 'EXCELLENT' : 'NEEDS CHECK'}</p>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '8px solid var(--secondary)', background: 'rgba(99, 102, 241, 0.05)' }}>
          <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '12px', color: 'var(--secondary)', boxShadow: '0 0 20px var(--secondary-glow)' }}>
            <Bell size={32} />
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.05em' }}>NOTIFICATIONS</p>
            <p style={{ fontSize: '1.85rem', fontWeight: '900', color: 'white' }}>{state.activeAlerts === 0 ? 'NO PROBLEMS' : `${state.activeAlerts} NEW MESSAGES`}</p>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '8px solid #f59e0b', background: 'rgba(245, 158, 11, 0.05)' }}>
          <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '12px', color: '#f59e0b', boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)' }}>
            <PlusCircle size={32} />
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.05em' }}>NEXT TASK</p>
            <p style={{ fontSize: '1.85rem', fontWeight: '900', color: 'white' }}>DAILY SCAN</p>
          </div>
        </div>
      </div>

      {/* 3. Easy Menu (Big Buttons) */}
      <h2 style={{ marginBottom: '2rem', fontSize: '1.75rem', fontWeight: '700' }}>Choose What to Do</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {[
          { label: 'Learn Safe Farming', desc: 'Watch videos on how to keep animals healthy', path: '/training', color: 'var(--primary)', icon: <PlusCircle /> },
          { label: 'Check My Records', desc: 'See your farm history and documents', path: '/compliance', color: 'var(--secondary)', icon: <ChevronRight /> },
          { label: 'View All Problems', desc: 'Check for sickness or danger in your area', path: '/alerts', color: 'var(--error)', icon: <AlertOctagon /> },
          { label: 'Account Settings', desc: 'Change your name, language or phone', path: '/settings', color: 'var(--foreground-muted)', icon: <PlusCircle /> }
        ].map((btn, i) => (
          <button
            key={i}
            onClick={() => router.push(btn.path)}
            className="glass-card"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '2rem',
              textAlign: 'left',
              cursor: 'pointer',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(255,255,255,0.08)',
              color: 'white',
              gap: '1.5rem'
            }}
          >
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white', display: 'block', marginBottom: '0.5rem' }}>{btn.label}</span>
              <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', fontWeight: '500' }}>{btn.desc}</span>
            </div>
            <div style={{
              color: btn.color,
              background: 'rgba(255,255,255,0.15)',
              padding: '1rem',
              borderRadius: '15px',
              display: 'flex',
              boxShadow: '0 0 15px rgba(255,255,255,0.05)'
            }}>{btn.icon}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
