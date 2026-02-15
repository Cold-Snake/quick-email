"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2, Zap, ArrowRight } from 'lucide-react';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        const error = searchParams.get('error');
        const errorCode = searchParams.get('error_code');

        const timer = setTimeout(() => {
            if (error || errorCode) {
                setStatus('error');
            } else {
                setStatus('success');
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [searchParams]);

    const openApp = () => {
        window.location.href = 'quickapp://login';
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 text-center">
                
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="bg-[#111827] w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                        <Zap size={40} color="white" fill="white" />
                    </div>
                </div>

                {status === 'loading' && (
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <Loader2 className="animate-spin text-[#111827]" size={32} />
                        </div>
                        <h1 className="text-2xl font-black text-[#111827]">Verifierar ditt konto</h1>
                        <p className="text-gray-500">Vänta ett ögonblick medan vi bekräftar din adress...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <div className="bg-emerald-50 p-3 rounded-full">
                                <CheckCircle2 className="text-[#10B981]" size={48} />
                            </div>
                        </div>
                        <h1 className="text-2xl font-black text-[#111827]">E-post verifierad!</h1>
                        <p className="text-gray-500">Ditt konto på Quick är nu aktivt. Du kan nu återgå till appen.</p>
                        <button onClick={openApp} className="w-full bg-[#111827] text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md">
                            Tillbaka till Quick <ArrowRight size={18} />
                        </button>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <div className="bg-red-50 p-3 rounded-full">
                                <XCircle className="text-[#EF4444]" size={48} />
                            </div>
                        </div>
                        <h1 className="text-2xl font-black text-[#111827]">Länken är ogiltig</h1>
                        <p className="text-gray-500">Länken har löpt ut eller redan använts.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Huvudkomponenten som wrappar allt i Suspense
export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Laddar...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}
