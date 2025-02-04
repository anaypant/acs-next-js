'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function WelcomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const domain = searchParams.get('domain'); // Get the domain name from query params

    return (
        <div className="min-h-screen bg-[#1B1C28] text-gray-100 flex flex-col items-center justify-center px-6">
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#8FA1D0] to-[#E94560]">
                Welcome to ACS!
            </h1>
            <p className="text-lg text-gray-300 mb-6">
                Your domain name is: <span className="font-bold text-white">{domain || 'N/A'}</span>
            </p>
            <button
                onClick={() => router.push('/dashboard')}
                className="px-6 py-3 bg-[#4B5C99] hover:bg-[#5C6DAA] text-gray-100 font-bold rounded-md focus:outline-none"
            >
                Go to Dashboard
            </button>
        </div>
    );
}

export default function WelcomePage() {
    return (
        <Suspense fallback={<p className="text-white text-center">Loading...</p>}>
            <WelcomeContent />
        </Suspense>
    );
}
