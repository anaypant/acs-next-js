'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase/supabase';

export default function LoadingPage() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const processSession = async () => {
      setMessage('Processing your login...');
      try {
        // Retrieve Supabase session
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
          console.error('Error retrieving session:', error);
          setMessage('Error: Unable to retrieve session.');
          return;
        }

        const { access_token: token, user } = data.session;

        // Send session data to the middleman API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: "include",
          body: JSON.stringify({
            jwt: token,
            email: user.email,
            uid: user.id,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error calling middleman API:', errorText);
          setMessage('Error: Unable to process your login.');
          return;
        }

        setMessage('Login successful! Redirecting...');
        router.push('/dashboard'); // Redirect to the dashboard
      } catch (err) {
        console.error('Unexpected error:', err);
        setMessage('An unexpected error occurred. Please try again.');
      }
    };

    processSession();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#1B1C28] text-gray-100 flex flex-col items-center justify-center">
      {/* Loading Animation */}
      <div className="flex items-center justify-center mb-6">
        <div className="loader"></div>
      </div>

      {/* Message */}
      <p className="text-lg">{message}</p>

      <style jsx>{`
        .loader {
          border: 6px solid rgba(255, 255, 255, 0.2);
          border-top: 6px solid #8FA1D0;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
