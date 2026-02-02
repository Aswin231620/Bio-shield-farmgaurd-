'use client';
import React from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  ClipboardCheck,
  BookOpen,
  AlertTriangle,
  Settings,
  Users,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useApp } from '@/app/context/AppContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Front Page', href: '/' },
  { icon: ShieldCheck, label: 'Health Check', href: '/risk-assessment' },
  { icon: BookOpen, label: 'Learning', href: '/training' },
  { icon: ClipboardCheck, label: 'My Records', href: '/compliance' },
  { icon: AlertTriangle, label: 'Alerts', href: '/alerts' },
  { icon: Users, label: 'Ask Helper', href: '/community' },
  { icon: Settings, label: 'My Profile', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { state, toggleSidebar } = useApp();
  const isOpen = state.sidebarOpen;

  return (
    <>
      <button
        className="mobile-toggle"
        onClick={() => toggleSidebar()}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 100,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          padding: '0.5rem',
          borderRadius: 'var(--radius-sm)',
          display: 'none'
        }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`glass sidebar ${isOpen ? 'open' : 'closed'}`}
        style={{
          width: isOpen ? '280px' : '90px',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
        }}
      >
        <div style={{ padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            position: 'relative',
            filter: 'drop-shadow(0 0 5px var(--primary-glow))'
          }}>
            <Image src="/logo.png" alt="BioShield" fill style={{ objectFit: 'contain' }} />
          </div>
          {isOpen && <h1 style={{ fontSize: '1.5rem', fontWeight: '800', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>BioShield</h1>}
        </div>

        <nav style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                flexDirection: isOpen ? 'row' : 'column',
                alignItems: 'center',
                gap: isOpen ? '1rem' : '0.4rem',
                padding: isOpen ? '1.25rem' : '1rem 0.5rem',
                borderRadius: 'var(--radius-md)',
                color: pathname === item.href ? 'white' : 'rgba(255, 255, 255, 0.6)',
                background: pathname === item.href ? 'var(--primary)' : 'transparent',
                transition: 'all 0.2s ease',
                boxShadow: pathname === item.href ? '0 8px 20px var(--primary-glow)' : 'none',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                if (pathname !== item.href) {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== item.href) {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <item.icon size={isOpen ? 24 : 28} color={pathname === item.href ? 'white' : 'rgba(255, 255, 255, 0.6)'} />
              <span style={{
                fontWeight: '800',
                fontSize: isOpen ? '1.1rem' : '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: isOpen ? 'normal' : '0.02em'
              }}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
          <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#475569' }} />
            {isOpen && (
              <div style={{ overflow: 'hidden' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', whiteSpace: 'nowrap' }}>{state.userProfile.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', whiteSpace: 'nowrap' }}>{state.userProfile.role}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      <style jsx>{`
        @media (max-width: 768px) {
          .sidebar {
            width: ${isOpen ? '280px' : '0'} !important;
            overflow: hidden;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
