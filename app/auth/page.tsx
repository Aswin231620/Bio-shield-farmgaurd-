'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Mail, Lock, ChevronRight, Fingerprint, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function AuthPage() {
    const { login } = useApp();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate auth
        setTimeout(() => {
            login();
            router.push('/');
        }, 1500);
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
            background: 'var(--background)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            {/* Background Decoration */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '-5%',
                width: '40%',
                height: '40%',
                background: 'var(--primary-glow)',
                filter: 'blur(150px)',
                borderRadius: '50%',
                opacity: 0.5
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-5%',
                width: '40%',
                height: '40%',
                background: 'var(--secondary-glow)',
                filter: 'blur(150px)',
                borderRadius: '50%',
                opacity: 0.5
            }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    padding: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        position: 'relative',
                        margin: '0 auto 1.5rem',
                        filter: 'drop-shadow(0 0 10px var(--primary-glow))'
                    }}>
                        <Image src="/logo.png" alt="BioShield" fill style={{ objectFit: 'contain' }} />
                    </div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p style={{ color: 'var(--foreground-muted)', fontSize: '0.875rem' }}>
                        {isLogin ? 'Access your digital farm bio-barrier' : 'Join the BioShield biosecurity network'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {!isLogin && (
                        <AuthInput icon={Fingerprint} type="text" placeholder="Farm Name" required />
                    )}
                    <AuthInput icon={Mail} type="email" placeholder="Email Address" required />
                    <AuthInput icon={Lock} type="password" placeholder="Password" required />

                    {isLogin && (
                        <div style={{ textAlign: 'right' }}>
                            <button type="button" style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.8125rem', fontWeight: '500' }}>
                                Forgot Password?
                            </button>
                        </div>
                    )}

                    <button
                        disabled={loading}
                        className="flex-center"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: '700',
                            fontSize: '1rem',
                            gap: '0.5rem',
                            boxShadow: '0 4px 15px var(--primary-glow)',
                            marginTop: '0.5rem'
                        }}
                    >
                        {loading ? 'Authenticating...' : isLogin ? 'Sign In' : 'Get Started'}
                        {!loading && <ChevronRight size={18} />}
                    </button>
                </form>

                <div style={{ textAlign: 'center', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--foreground-muted)' }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </span>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '700', marginLeft: '0.25rem' }}
                    >
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </div>

                <div style={{
                    marginTop: '1rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid var(--border)',
                    textAlign: 'center'
                }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <ShieldCheck size={12} /> SECURED BY BIOSHIELD ENCRYPTION
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

function AuthInput({ icon: Icon, ...props }: { icon: LucideIcon } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div style={{ position: 'relative' }}>
            <Icon size={18} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--foreground-muted)'
            }} />
            <input
                {...props}
                style={{
                    width: '100%',
                    padding: '0.875rem 1rem 0.875rem 2.5rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'white',
                    outline: 'none',
                    fontSize: '0.875rem'
                }}
            />
        </div>
    );
}
