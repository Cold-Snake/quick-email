"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// --- INBYGGDA SVGER (Ersätter Lucide) ---
const ZapIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SuccessIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99729 7.13631 4.39828 5.49706C5.79928 3.85781 7.69279 2.71537 9.79614 2.24013C11.8995 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 4L12 14.01L9 11.01" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/>
    <path d="M15 9L9 15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9L15 15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 4.93L16.24 7.76M7.76 16.24L4.93 19.07M19.07 19.07L16.24 16.24M7.76 7.76L4.93 4.93" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
                
                {/* Logo Section */}
                <div className="flex justify-center mb-8">
                    <div className="bg-[#111827] w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                        <ZapIcon />
                    </div>
                </div>

                {/* Content Logic */}
                {status === 'loading' && (
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <Spinner />
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
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <div className="bg-emerald-50 p-4 rounded-full">
                                <SuccessIcon />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-[#111827] tracking-tight mb-2">
                                E-post verifierad!
                            </h1>
                            <p className="text-gray-500 text-[15px] leading-relaxed px-4">
                                Ditt konto på <span className="font-bold text-[#111827]">Quick</span> är nu aktivt. Du kan nu stänga fönstret och logga in i appen.
                            </p>
                        </div>
                        
                        <button 
                            onClick={openApp}
                            className="w-full bg-[#111827] text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-md"
                        >
                            Tillbaka till Quick
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <div className="bg-red-50 p-4 rounded-full">
                                <ErrorIcon />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-[#111827] tracking-tight mb-2">
                                Länken är ogiltig
                            </h1>
                            <p className="text-gray-500 text-[15px] leading-relaxed">
                                Verifieringslänken har antingen löpt ut eller redan använts. Försök begära en ny länk från appen.
                            </p>
                        </div>
                        
                        <button 
                            onClick={() => window.location.reload()}
                            className="w-full border-2 border-[#E5E7EB] text-[#111827] h-14 rounded-2xl font-bold transition-all active:scale-[0.98]"
                        >
                            Försök igen
                        </button>
                    </div>
                )}

                {/* Footer Section */}
                <div className="mt-10 pt-8 border-t border-gray-50">
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.1em]">
                        Quick AB &bull; Säker Verifiering
                    </p>
                </div>
            </div>
        </div>
    );
}

// Wrapper med Suspense för att hantera searchParams på Vercel
export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center font-sans">
                <p className="text-gray-400 font-bold">Laddar...</p>
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    );
}
