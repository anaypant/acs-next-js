'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase/supabase';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    phoneNumber: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push('/dashboard'); // Redirect if already logged in
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
    setMessage('');
    setIsLoading(true);

    // Supabase sign-up
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          company: formData.company,
          phone_number: formData.phoneNumber,
        },
      },
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
      setIsLoading(false);
    } else {
      setMessage('Signup successful! Redirecting...');
      setIsLoading(false);
      router.push('/dashboard');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // Start Google OAuth flow
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/loading`, // Redirect to the loading page after OAuth
        },
      });

      if (error) {
        setMessage(`Error: ${error.message}`);
        setIsLoading(false);
        return;
      }

      setMessage('Redirecting to Google...');
    } catch (err) {
      console.error('Error during Google sign-in:', err);
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-extrabold mb-6">Signup for ACS</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-gray-800 p-6 rounded-md shadow-md">
        <p className="text-sm text-gray-400 mb-2">
          <span className="text-red-500">*</span> Indicates required field
        </p>
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email <span className="text-red-500">*</span>
          </label>
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password <span className="text-red-500">*</span>
          </label>
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
          className={`w-full py-3 ${isLoading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'} text-gray-100 font-bold rounded-md focus:outline-none`}
        >
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      <div className="mt-6 px-4">
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className={`w-full flex items-center justify-center py-2 px-4 ${isLoading ? 'bg-gray-600' : 'bg-black hover:bg-gray-800'} text-white font-medium rounded-md shadow-md focus:outline-none`}
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-3" />
          {isLoading ? 'Redirecting...' : 'Sign in with Google'}
        </button>
      </div>
      {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}
    </div>
  );
}
