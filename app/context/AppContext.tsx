'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppState {
    riskScore: number;
    complianceRate: number;
    activeAlerts: number;
    userProfile: {
        name: string;
        role: string;
        region: string;
    };
    isAuthenticated: boolean;
    sidebarOpen: boolean;
}

interface AppContextType {
    state: AppState;
    updateRiskScore: (score: number) => void;
    addAlert: () => void;
    resolveAlert: () => void;
    updateProfile: (profile: Partial<AppState['userProfile']>) => void;
    login: () => void;
    logout: () => void;
    toggleSidebar: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AppState>({
        riskScore: 12,
        complianceRate: 94.2,
        activeAlerts: 2,
        userProfile: {
            name: 'Dr. Rajesh Kumar',
            role: 'Farm Administrator',
            region: 'South District'
        },
        isAuthenticated: false,
        sidebarOpen: true
    });

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('bioshield_state');
        if (saved) {
            setState(JSON.parse(saved));
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('bioshield_state', JSON.stringify(state));
    }, [state]);

    const updateRiskScore = (score: number) => {
        setState(prev => ({ ...prev, riskScore: score }));
    };

    const addAlert = () => {
        setState(prev => ({ ...prev, activeAlerts: prev.activeAlerts + 1 }));
    };

    const resolveAlert = () => {
        setState(prev => ({ ...prev, activeAlerts: Math.max(0, prev.activeAlerts - 1) }));
    };

    const updateProfile = (profile: Partial<AppState['userProfile']>) => {
        setState(prev => ({ ...prev, userProfile: { ...prev.userProfile, ...profile } }));
    };

    const login = () => {
        setState(prev => ({ ...prev, isAuthenticated: true }));
    };

    const logout = () => {
        setState(prev => ({ ...prev, isAuthenticated: false }));
        localStorage.removeItem('bioshield_state');
    };

    const toggleSidebar = () => {
        setState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
    };

    return (
        <AppContext.Provider value={{ state, updateRiskScore, addAlert, resolveAlert, updateProfile, login, logout, toggleSidebar }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
}
