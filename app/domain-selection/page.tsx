'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/supabase';
import { useRouter } from 'next/navigation';

export default function DomainSelectionPage() {
    const [defaultDomain, setDefaultDomain] = useState('');
    const [customDomain, setCustomDomain] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUserSession = async () => {
            setIsLoading(true);

            try {
                const { data, error } = await supabase.auth.getSession();

                if (error || !data.session) {
                    console.error('Error retrieving session:', error);
                    setMessage('Error: Unable to retrieve session.');
                    return;
                }

                const { user } = data.session;

                // Determine the full name based on the domain provider
                const fullName = user.user_metadata.full_name;

                // Generate the default domain name
                const domain = `${fullName.replace(' ', '_')}@homes.automatedconsultancy.com`;

                setDefaultDomain(domain);
                setCustomDomain(domain); // Set initial custom domain
            } catch (err) {
                console.error('Unexpected error:', err);
                setMessage('An unexpected error occurred.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserSession();
    }, []);

    const handleConfirmDomain = async () => {
        setIsLoading(true);
        setMessage('Processing your domain selection...');

        try {
            const { data, error } = await supabase.auth.getSession();

            if (error || !data.session) {
                console.error('Error retrieving session:', error);
                setMessage('Error: Unable to retrieve session.');
                return;
            }

            const { access_token: token, user } = data.session;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    jwt: token,
                    email: user.email,
                    uid: user.id,
                    responseEmail: customDomain, // Include the selected custom domain
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error calling middleman API:', errorText);
                setMessage('Error: Unable to process your domain selection.');
                return;
            }

            setMessage('Domain confirmed! Redirecting...');
            router.push('/dashboard'); // Redirect to the dashboard
        } catch (err) {
            console.error('Unexpected error:', err);
            setMessage('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1B1C28] text-gray-100 flex flex-col items-center justify-center px-6">
            {isLoading ? (
                <p className="text-lg font-semibold">Loading...</p>
            ) : (
                <div className="w-full max-w-md bg-[#24253A] p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-4 text-center">Select Your ACS Domain</h1>

                    <label htmlFor="customDomain" className="block text-sm font-medium text-gray-300 mb-2">
                        Custom Domain
                    </label>
                    <input
                        type="text"
                        id="customDomain"
                        value={customDomain}
                        onChange={(e) => setCustomDomain(e.target.value)}
                        placeholder="Enter your ACS domain"
                        className="w-full p-3 bg-[#33354A] text-gray-100 rounded-md focus:ring-2 focus:ring-[#8FA1D0]"
                    />
                    <p className="text-sm text-gray-400 mt-2">Default: {defaultDomain}</p>

                    <button
                        onClick={handleConfirmDomain}
                        className="mt-6 w-full py-3 bg-[#4B5C99] hover:bg-[#5C6DAA] text-gray-100 font-bold rounded-md focus:outline-none"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'OK'}
                    </button>
                </div>
            )}

            {message && (
                <p className="mt-4 text-center text-sm text-gray-400">
                    {message}
                </p>
            )}
        </div>
    );
}
