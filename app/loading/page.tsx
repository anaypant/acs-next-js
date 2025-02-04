'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../utils/supabase/supabase';

function LoadingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const source = searchParams.get('source'); // Extract source parameter

    useEffect(() => {
        const validateAndProcessDomain = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();

                if (error || !data.session) {
                    console.error('Error validating session:', error);
                    router.push('/signup'); // Redirect back to signup if session validation fails
                    return;
                }

                const { access_token: token, user } = data.session;

                // Generate default domain
                const defaultDomain = `${user.user_metadata.full_name.replace(' ', '_')}@homes.automatedconsultancy.com`;

                // Send default domain to backend
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        jwt: token,
                        email: user.email,
                        uid: user.id,
                        responseEmail: defaultDomain,
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error processing domain:', errorText);
                    router.push('/signup'); // Redirect to signup if domain processing fails
                    return;
                }

                // Redirect to the appropriate page
                if (source === 'signup') {
                    router.push(`/welcome?domain=${defaultDomain}`); // Pass domain to welcome page
                } else {
                    router.push('/dashboard'); // Skip welcome page for login
                }
            } catch (err) {
                console.error('Unexpected error:', err);
                router.push('/signup'); // Redirect back to signup in case of errors
            }
        };

        validateAndProcessDomain();
    }, [router, source]);

    return (
        <div className="min-h-screen bg-[#1B1C28] text-gray-100 flex items-center justify-center">
            <h1 className="text-lg font-bold">Processing your account...</h1>
        </div>
    );
}

export default function LoadingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-100">Loading...</div>}>
            <LoadingContent />
        </Suspense>
    );
}
