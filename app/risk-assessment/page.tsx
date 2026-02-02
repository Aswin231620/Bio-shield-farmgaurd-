'use client';
import React, { useState } from 'react';
import {
    ShieldCheck,
    ChevronRight,
    ChevronLeft,
    AlertCircle,
    CheckCircle2,
    Info,
    MapPin,
    Truck,
    Users,
    Stethoscope,
    Bird,
    Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const categories = [
    { id: 'general', label: 'My Farm', icon: MapPin },
    { id: 'biosecurity', label: 'Entry & Exit', icon: Users },
    { id: 'health', label: 'Animal Health', icon: Stethoscope },
    { id: 'logistics', label: 'Feed & Trucks', icon: Truck },
];

const questions = {
    general: [
        { id: 'farm_type', text: 'Which animals do you have?', type: 'select', options: ['Hens - Egg', 'Hens - Meat', 'Pigs - Breeding', 'Pigs - Meat'] },
        { id: 'location_risk', text: 'Are other farms very close to you?', type: 'boolean' },
    ],
    biosecurity: [
        { id: 'perimeter_fence', text: 'Is there a strong fence around the farm?', type: 'boolean' },
        { id: 'staff_shower', text: 'Do all workers clean up before entering?', type: 'boolean' },
        { id: 'visitor_log', text: 'Do you check everyone who visits?', type: 'boolean' },
    ],
    health: [
        { id: 'daily_check', text: 'Do you check animals every day?', type: 'boolean' },
        { id: 'vaccination', text: 'Are all animals vaccinated?', type: 'boolean' },
        { id: 'dead_animal', text: 'Do you put dead animals in a safe place?', type: 'boolean' },
    ],
    logistics: [
        { id: 'feed_storage', text: 'Is food kept safe from rats and pests?', type: 'boolean' },
        { id: 'v_wash', text: 'Are trucks washed at the gate?', type: 'boolean' },
    ]
};

export default function RiskAssessment() {
    const { updateRiskScore } = useApp();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isFinished, setIsFinished] = useState(false);

    const categoryKeys = Object.keys(questions);
    const currentCategory = categoryKeys[step];

    const handleAnswer = (id: string, val: any) => {
        setAnswers({ ...answers, [id]: val });
    };

    const nextStep = () => {
        if (step < categoryKeys.length - 1) {
            setStep(step + 1);
        } else {
            const score = calculateScore();
            updateRiskScore(score);
            setIsFinished(true);
        }
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const calculateScore = () => {
        const total = Object.values(answers).length;
        const correct = Object.values(answers).filter(v => v === true || v === 'Yes' || (typeof v === 'string' && v.length > 0)).length;
        return Math.round((correct / total) * 100);
    };

    if (isFinished) {
        const score = calculateScore();
        return (
            <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: score > 80 ? 'var(--primary-glow)' : 'rgba(245, 158, 11, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem'
                    }}>
                        {score > 80 ? <CheckCircle2 size={60} color="var(--primary)" /> : <AlertCircle size={60} color="var(--warning)" />}
                    </div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Assessment Complete</h1>
                    <p style={{ color: 'var(--foreground-muted)', fontSize: '1.25rem', marginBottom: '2rem' }}>
                        Your calculated Biosecurity Score is
                    </p>
                    <div style={{ fontSize: '5rem', fontWeight: '800', color: score > 80 ? 'var(--primary)' : 'var(--warning)', marginBottom: '2rem' }}>
                        {score}%
                    </div>
                    <p style={{ marginBottom: '3rem', color: 'var(--foreground-muted)' }}>
                        {score > 80
                            ? 'Excellent! Your biosecurity measures are robust. Maintain these protocols to stay protected.'
                            : 'Caution: Several vulnerabilities detected. Please review the highlighted areas in the report below.'}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button className="flex-center" style={{ background: 'var(--primary)', color: 'white', padding: '1rem 2.5rem', borderRadius: 'var(--radius-md)', border: 'none', fontWeight: '600' }}>
                            Download PDF Report
                        </button>
                        <button
                            onClick={() => { setIsFinished(false); setStep(0); setAnswers({}); }}
                            style={{ background: 'transparent', color: 'white', padding: '1rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontWeight: '600' }}
                        >
                            Restart Audit
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Biosecurity Audit</h1>
                <p style={{ color: 'var(--foreground-muted)' }}>Self-assessment tool for Pig and Poultry farm compliance.</p>
            </div>

            {/* Progress Bar */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem' }}>
                {categoryKeys.map((cat, idx) => (
                    <div key={cat} style={{
                        flex: 1,
                        height: '6px',
                        background: idx <= step ? 'var(--primary)' : 'var(--border)',
                        borderRadius: '10px',
                        transition: 'all 0.5s ease'
                    }} />
                ))}
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentCategory}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-glow)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {React.createElement(categories.find(c => c.id === currentCategory)?.icon || ShieldCheck, { size: 24 })}
                            </div>
                            <h2 style={{ fontSize: '1.75rem' }}>{categories.find(c => c.id === currentCategory)?.label}</h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {questions[currentCategory as keyof typeof questions].map((q) => (
                                <div key={q.id}>
                                    <p style={{ fontSize: '1.125rem', marginBottom: '1.25rem', fontWeight: '500' }}>{q.text}</p>

                                    {q.type === 'boolean' ? (
                                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                                            {[
                                                { label: 'Yes', val: true, color: 'var(--primary)', icon: '✅' },
                                                { label: 'No', val: false, color: 'var(--error)', icon: '❌' }
                                            ].map((opt) => (
                                                <button
                                                    key={opt.label}
                                                    onClick={() => handleAnswer(q.id, opt.val)}
                                                    style={{
                                                        flex: 1,
                                                        padding: '2rem',
                                                        borderRadius: 'var(--radius-lg)',
                                                        border: '2px solid',
                                                        borderColor: answers[q.id] === opt.val ? opt.color : 'var(--border)',
                                                        background: answers[q.id] === opt.val ? `${opt.color}15` : 'rgba(255,255,255,0.02)',
                                                        color: 'white',
                                                        fontWeight: '800',
                                                        fontSize: '1.25rem',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    <span style={{ fontSize: '2.5rem' }}>{opt.icon}</span>
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <select
                                            onChange={(e) => handleAnswer(q.id, e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                borderRadius: 'var(--radius-md)',
                                                border: '1px solid var(--border)',
                                                background: 'var(--background)',
                                                color: 'white',
                                                outline: 'none',
                                                appearance: 'none',
                                            }}
                                        >
                                            <option value="" style={{ background: '#0f172a', color: 'white' }}>Select an option</option>
                                            {(q as any).options?.map((opt: string) => (
                                                <option key={opt} value={opt} style={{ background: '#0f172a', color: 'white' }}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                    <button
                        onClick={prevStep}
                        disabled={step === 0}
                        className="flex-center"
                        style={{
                            background: 'transparent',
                            color: 'var(--foreground-muted)',
                            gap: '0.5rem',
                            border: 'none',
                            opacity: step === 0 ? 0 : 1
                        }}
                    >
                        <ChevronLeft size={20} />
                        Back
                    </button>

                    <button
                        onClick={nextStep}
                        className="flex-center"
                        style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '0.875rem 2rem',
                            borderRadius: 'var(--radius-md)',
                            border: 'none',
                            fontWeight: '600',
                            gap: '0.5rem'
                        }}
                    >
                        {step === categoryKeys.length - 1 ? 'Finish Assessment' : 'Continue'}
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', color: 'var(--foreground-muted)', fontSize: '0.875rem' }}>
                <Info size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                <p>This assessment is based on FAO and WOAH biosecurity guidelines for small and medium-sized livestock farms. Ensure your answers are accurate for a valid risk score.</p>
            </div>
        </div>
    );
}
