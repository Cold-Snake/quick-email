"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2, Zap, ArrowRight } from 'lucide-react';

// --- UNDERKOMPONENT FÖR LOGIKEN ---
function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    // Tillstånd: 'loading', 'success', 'error'
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        // Kontrollera om det finns fel i URL:en från Supabase
        const error = searchParams.get('error');
        const errorCode = searchParams.get('error_code');

        const timer = setTimeout(() => {
            if (error || errorCode) {
                setStatus('error');
            } else {
                setStatus('success');
            }
        }, 2000); // 2 sekunders snygg laddning för "premium"-känsla

        return () => clearTimeout(timer);
    }, [searchParams]);

    const openApp = () => {
        window.location.href = 'quickapp://login';
    };

    return (
        <div className="max-w-md w-full bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 text-center">
            
            {/* Logo Section */}
            <div className="flex justify-center mb-8">
                <div className="bg-[#111827] w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                    <Zap size={40} color="white" fill="white" />
                </div>
            </div>

            {/* Content Logic */}
            {status === 'loading' && (
                <div className="space-y-4 animate-in fade-in duration-700">
                    <div className="flex justify-center">
                        <Loader2 className="animate-spin text-[#111827]" size={32} />
                    </div>
                    <h1 className="text-2xl font-black text-[#111827] tracking-tight">
                        Verifierar ditt konto
                    </h1>
                    <p className="text-gray-500 text-[15px] leading-relaxed">
                        Vi bekräftar din e-postadress mot våra servrar. <br/>Vänta ett ögonblick...
                    </p>
                </div>
            )}

            {status === 'success' && (
                <div className="space-y-6 animate-in zoom-in-95 duration-500">
                    <div className="flex justify-center">
                        <div className="bg-emerald-50 p-3 rounded-full">
                            <CheckCircle2 className="text-[#10B981]" size={48} />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-[#111827] tracking-tight mb-2">
                            E-post verifierad!
                        </h1>
                        <p className="text-gray-500 text-[15px] leading-relaxed">
                            Ditt konto på <span className="font-bold text-[#111827]">Quick</span> är nu aktivt. Du kan nu stänga webbläsaren och logga in i appen.
                        </p>
                    </div>
                    
                    <button 
                        onClick={openApp}
                        className="w-full bg-[#111827] text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-[0.98] shadow-md"
                    >
                        Tillbaka till Quick
                        <ArrowRight size={18} />
                    </button>
                </div>
            )}

            {status === 'error' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-center">
                        <div className="bg-red-50 p-3 rounded-full">
                            <XCircle className="text-[#EF4444]" size={48} />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-[#111827] tracking-tight mb-2">
                            Länken är ogiltig
                        </h1>
                        <p className="text-gray-500 text-[15px] leading-relaxed">
                            Verifieringslänken har antingen löpt ut eller redan använts. Försök att begära en ny länk från appen.
                        </p>
                    </div>
                    
                    <button 
                        onClick={() => router.push('https://quick-app.business')}
                        className="w-full border-2 border-[#E5E7EB] text-[#111827] h-14 rounded-2xl font-bold transition-all active:scale-[0.98]"
                    >
                        Behöver du hjälp?
                    </button>
                </div>
            )}

            {/* Footer Footer */}
            <div className="mt-10 pt-8 border-t border-gray-50">
                <p className="text-[12px] text-gray-400 font-medium uppercase tracking-widest">
                    Quick AB &bull; Säker Verifiering
                </p>
            </div>
        </div>
    );
}

// --- HUVUDKOMPONENT (EXPORT) ---
export default function VerifyEmailPage() {
    return (
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6 font-sans">
            {/* Suspense fixar build-felet på Vercel genom att tala om att denna del laddas vid runtime */}
            <Suspense fallback={
                <div className="flex flex-col items-center">
                    <Loader2 className="animate-spin text-[#111827]" size={32} />
                    <p className="mt-4 text-gray-500">Laddar...</p>
                </div>
            }>
                <VerifyEmailContent />
            </Suspense>
        </div>
    );
}
