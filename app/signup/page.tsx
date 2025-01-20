'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase/supabase';

export default function SignupPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push('/'); // Redirect if already logged in
      }
    };

    checkUser();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    setIsLoading(false);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Signup successful! Please check your email to confirm.');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    setIsLoading(false);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Redirecting to Google...');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-extrabold mb-6">Signup for ACS</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-gray-800 p-6 rounded-md shadow-md">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 ${
            isLoading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-gray-100 font-bold rounded-md focus:outline-none`}
        >
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
      </form>

      <div className="mt-6">
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className={`w-full py-3 ${
            isLoading ? 'bg-gray-600' : 'bg-red-500 hover:bg-red-600'
          } text-gray-100 font-bold rounded-md focus:outline-none`}
        >
          {isLoading ? 'Redirecting...' : 'Sign Up with Google'}
        </button>
      </div>

      {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}
    </div>
  );
}
