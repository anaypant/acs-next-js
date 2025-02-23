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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login form submission
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

        // Create session on your server
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

  // Handle "Forgot Password"
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

  // Handle sign in with Google
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/loading?source=login`,
        },
      });

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
    <div
      // Solid dark green background by default
      className="min-h-screen w-full flex items-center justify-center p-4 relative bg-[#0D331A]"
    >
      {/* Optional overlay (if you want a slight darkening effect, you can comment out if not needed) */}
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* Main container (above overlay) */}
      <motion.div
        className="relative z-10 w-full max-w-md flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Heading */}
        <motion.h1
          className="text-4xl font-extrabold text-white mb-2"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome Back!
        </motion.h1>
        <p className="text-white text-sm mb-6">
          Enter your Credentials to access your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-label="Email Address"
              className="w-full p-3 rounded-md border border-[#2B7A3F] bg-transparent text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2B7A3F]"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-white text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              required
              aria-label="Password"
              className="w-full p-3 rounded-md border border-[#2B7A3F] bg-transparent text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2B7A3F]"
            />
          </div>

          {/* Submit Button (labeled SIGN UP to match screenshot) */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 mt-2 font-bold rounded-md 
              ${
                isLoading
                  ? 'bg-[#8FA1D0] text-white cursor-not-allowed'
                  : 'bg-white text-[#2B7A3F] hover:bg-[#f0f0f0]'
              }
            `}
          >
            {isLoading ? 'Logging in...' : 'SIGN UP'}
          </button>
        </form>

        {/* Forgot Password (functionality preserved) */}
        <p
          onClick={handleForgotPassword}
          className="mt-4 text-sm text-white hover:underline cursor-pointer"
        >
          {isResettingPassword ? 'Sending reset email...' : 'Forgot Password?'}
        </p>

        {/* Divider OR */}
        <div className="my-6 flex items-center w-full">
          <hr className="flex-grow border-t border-gray-400" />
          <span className="mx-2 text-white text-sm">OR</span>
          <hr className="flex-grow border-t border-gray-400" />
        </div>

        {/* Sign in with Google */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className={`w-full flex items-center justify-center py-3 px-4 mb-2 rounded-md text-sm font-medium border border-[#2B7A3F] 
            ${isLoading ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-[#f0f0f0]'}
          `}
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
          {isLoading ? 'Redirecting...' : 'Sign in with Google'}
        </button>

        {/* Sign in with Apple */}
        <button
          disabled={isLoading}
          className={`w-full flex items-center justify-center py-3 px-4 rounded-md text-sm font-medium border border-[#2B7A3F] bg-white
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#f0f0f0]'}
          `}
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 384 512"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M318.7 268.7c-.3-37 16.2-64.7 50.6-85.4-19.1-27.9-48.9-44.2-87.4-49.5-36.7-5.1-78.7 22-94.5 22-15.7 0-51.3-21.3-79.7-21.3-59.1.9-122.4 36.3-122.4 109.4 0 34.8 13.1 71.6 29.3 99.6 25.8 44.9 52.5 84.8 90.5 83.4 21.9-.9 31.1-14.2 58.2-14.2 26.8 0 35.2 14.2 58.1 13.8 38.1-.6 62.3-42.8 85-87.2 5.3-10.1 9.6-20.7 13-31.5-34.2-13-49.6-39.4-49.9-74.1zm-48.9-133.7c26.6-31.9 22.4-61.5 21.7-71.5-21 1.2-45.2 14.2-59.8 31.6-15.8 18.5-25.2 41.7-23.1 66.2 22.2 1.7 43.7-9.4 61.2-26.3z" />
          </svg>
          Sign in with Apple
        </button>

        {/* Have an account? Sign In */}
        <p className="mt-6 text-sm text-white">
          Have an account?{' '}
          <a href="#" className="text-[#8FA1D0] hover:underline">
            Sign In
          </a>
        </p>

        {/* Display any success/error messages */}
        {message && (
          <motion.p
            className="mt-4 text-center text-sm text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
