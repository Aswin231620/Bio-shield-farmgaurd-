'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
    Users,
    MessageSquare,
    Send,
    User,
    Bot,
    Sparkles,
    Handshake,
    Globe,
    TrendingUp,
    Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const forumPosts = [
    {
        id: 1,
        author: 'Arun M.',
        role: 'Poultry Expert',
        content: 'Anyone else seeing reduced egg production in the South District? Might be related to the recent humidity spike.',
        replies: 12,
        likes: 24,
        time: '2h ago'
    },
    {
        id: 2,
        author: 'Senthil Kumar',
        role: 'Pig Farmer',
        content: 'Protocol update: The new disinfection guidelines for transport vehicles are now mandatory for all Grade A farms.',
        replies: 8,
        likes: 45,
        time: '5h ago'
    }
];

export default function Community() {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'வணக்கம்! (Greetings!) I am your AI Agricultural Advisor. How can I help you with your farm today?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        const newMsg = { role: 'user', text: input };
        setMessages([...messages, newMsg]);
        setInput('');

        // Mock assistant response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: 'Based on current regional data, I recommend checking your ventilation systems. Would you like the detailed protocol for this week?'
            }]);
        }, 1000);
    };

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Community & Advisor</h1>
                    <p style={{ color: 'var(--foreground-muted)' }}>Connect with experts and get AI-powered agricultural advice.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                {/* AI Advisor Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card" style={{ height: '600px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--primary-glow)' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary)' }}>
                                <Image src="/advisor.png" alt="AI Advisor" width={48} height={48} style={{ objectFit: 'cover' }} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem' }}>Your Farming Helper</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--primary)' }}>● Online | Happy to help!</p>
                            </div>
                        </div>

                        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '85%',
                                        padding: '1.25rem 1.75rem',
                                        borderRadius: '20px',
                                        background: m.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.08)',
                                        color: 'white',
                                        border: m.role === 'user' ? 'none' : '1px solid var(--border)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', fontWeight: m.role === 'assistant' ? '500' : '400' }}>{m.text}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)' }}>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your question in English or Tamil..."
                                    style={{
                                        flex: 1,
                                        padding: '0.875rem 1.25rem',
                                        background: 'var(--surface)',
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                                <button
                                    onClick={handleSend}
                                    style={{
                                        padding: '0 1.5rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Community Forum & Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card">
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Globe size={20} color="var(--secondary)" />
                            Regional Exchange
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {forumPosts.map(post => (
                                <div key={post.id} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--secondary-glow)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                                                {post.author[0]}
                                            </div>
                                            <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{post.author}</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>• {post.role}</span>
                                        </div>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>{post.time}</span>
                                    </div>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>{post.content}</p>
                                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--primary)' }}>
                                        <span style={{ cursor: 'pointer' }}>{post.replies} Replies</span>
                                        <span style={{ cursor: 'pointer' }}>{post.likes} Likes</span>
                                    </div>
                                </div>
                            ))}
                            <button style={{ width: '100%', padding: '0.875rem', background: 'transparent', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', color: 'var(--foreground-muted)', fontSize: '0.875rem' }}>
                                View All Discussions
                            </button>
                        </div>
                    </div>

                    <div className="glass-card" style={{ background: 'linear-gradient(135deg, var(--secondary-glow), transparent)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.2)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1rem' }}>Farm Trends</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>Poultry prices up 12% in your region.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
