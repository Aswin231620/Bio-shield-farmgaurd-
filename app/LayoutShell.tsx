'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useApp } from './context/AppContext';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const { state } = useApp();
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !state.isAuthenticated && pathname !== '/auth') {
            router.push('/auth');
        }
    }, [mounted, state.isAuthenticated, pathname, router]);

    if (!mounted) return null;

    if (pathname === '/auth') {
        return <>{children}</>;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <div style={{
                flex: 1,
                marginLeft: state.sidebarOpen ? '280px' : '90px',
                transition: 'margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
                <Header />
                <main style={{ marginTop: '80px', padding: '2rem', minHeight: 'calc(100vh - 80px)' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
