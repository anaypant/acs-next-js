'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase/supabase';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else if (data.user && !data.user.email_confirmed_at) {
        setMessage('Error: Please verify your email before logging in.');
        await supabase.auth.signOut();
      } else {
        setMessage('Login successful!');

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Ensures cookies are saved
          body: JSON.stringify({
            jwt: data.session.access_token, // Supabase JWT token
            email: formData.email,
            uid: data.user.id, // Supabase user ID
          }),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          setMessage('Session created successfully.');
          router.push('/dashboard');
        } else {
          const errorData = await response.json();
          setMessage(`Login failed: ${errorData.message}`);
        }

      }
    } catch (err) {
      console.error(err);
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
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

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Password reset email sent! Check your inbox.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      console.log("Back here")

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Redirecting to Google...');
      }
    } catch (err) {
      console.error('Error during Google sign-in:', err);
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#1B1C28] text-gray-100 flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#8FA1D0] to-[#E94560]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Login to ACS
      </motion.h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-[#24253A] p-6 rounded-lg shadow-lg"
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-label="Email Address"
            className="w-full p-3 bg-[#33354A] text-gray-100 rounded-md focus:ring-2 focus:ring-[#8FA1D0]"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            aria-label="Password"
            className="w-full p-3 bg-[#33354A] text-gray-100 rounded-md focus:ring-2 focus:ring-[#8FA1D0]"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 ${
            isLoading ? 'bg-[#8FA1D0]' : 'bg-[#4B5C99] hover:bg-[#5C6DAA]'
          } text-gray-100 font-bold rounded-md focus:outline-none`}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p
        onClick={handleForgotPassword}
        className="mt-4 text-sm text-[#8FA1D0] hover:underline cursor-pointer"
      >
        {isResettingPassword ? 'Sending reset email...' : 'Forgot Password?'}
      </p>

      <div className="mt-6 w-full max-w-md">
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className={`w-full flex items-center justify-center py-3 px-4 ${
            isLoading ? 'bg-[#33354A]' : 'bg-black hover:bg-[#454766]'
          } text-white font-medium rounded-md shadow-md focus:outline-none`}
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-3" />
          {isLoading ? 'Redirecting...' : 'Sign in with Google'}
        </button>
      </div>

      {message && (
        <motion.p
          className="mt-4 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
}
