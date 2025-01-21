'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase/supabase';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isResettingPassword, setIsResettingPassword] = useState(false); // Reset password state
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    setIsLoading(false);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else if (data.user && !data.user.email_confirmed_at) {
      setMessage('Error: Please verify your email before logging in.');
      await supabase.auth.signOut(); // Ensure the session is cleared
    } else {
      setMessage('Login successful!');
      router.push('/dashboard'); // Redirect to dashboard
    }
  };

  const handleForgotPassword = async () => {
    setIsResettingPassword(true);
    setMessage('');

    if (!formData.email) {
      setMessage('Please enter your email address to reset your password.');
      setIsResettingPassword(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
      redirectTo: `${window.location.origin}/reset-password`, // Change this to your reset password page route
    });

    setIsResettingPassword(false);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Password reset email sent! Check your inbox.');
    }
  };

  return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-extrabold mb-6">Login to ACS</h1>
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
                  isLoading ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-400'
              } text-gray-100 font-bold rounded-md focus:outline-none`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p
            onClick={handleForgotPassword}
            className="mt-4 text-sm text-blue-400 hover:underline cursor-pointer"
        >
          {isResettingPassword ? 'Sending reset email...' : 'Forgot Password?'}
        </p>
        {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}
      </div>
  );
}
