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
        const response = await fetch('/api/send-supabase-package', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
      <p>{message}</p>
    </div>
  );
}
