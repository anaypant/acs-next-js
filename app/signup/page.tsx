'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase/supabase';
import { motion } from 'framer-motion';

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
  const [isLoading, setIsLoading] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const { error, data } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.firstName+" "+formData.lastName,
            company: formData.company,
            phone_number: formData.phoneNumber,
          },
          emailRedirectTo: `${window.location.origin}/domain-selection`, // Redirect after email verification
        },
      });

      if (error) {
        if (error.message.includes('Email already exists')) {
          setMessage('This email address is already registered. Please log in instead.');
        } else {
          setMessage(`Error: ${error.message}`);
        }
      } else if (data.user && !data.user.email_confirmed_at) {
        setMessage(
            `Signup successful! A verification email has been sent to ${formData.email}. Please verify your email to log in.`
        );
      } else {
        setMessage('Signup successful! Redirecting...');
        router.push('/domain-selection');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/loading?source=signup`, // Add source parameter
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
          Signup for ACS
        </motion.h1>

        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-6 bg-[#24253A] p-6 rounded-lg shadow-lg"
        >
          <p className="text-sm text-gray-400 mb-2">
            <span className="text-red-500">*</span> Indicates required field
          </p>

          {[
            { id: 'firstName', label: 'First Name', required: true },
            { id: 'lastName', label: 'Last Name', required: true },
            { id: 'email', label: 'Email', type: 'email', required: true },
            { id: 'password', label: 'Password', type: 'password', required: true },
          ].map((field) => (
              <div key={field.id}>
                <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-gray-300"
                >
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                    id={field.id}
                    name={field.id}
                    type={field.type || 'text'}
                    value={formData[field.id]}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full p-3 bg-[#33354A] text-gray-100 rounded-md focus:ring-2 focus:ring-[#8FA1D0]"
                />
              </div>
          ))}

          <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 ${
                  isLoading ? 'bg-[#8FA1D0]' : 'bg-[#4B5C99] hover:bg-[#5C6DAA]'
              } text-gray-100 font-bold rounded-md focus:outline-none`}
          >
            {isLoading ? 'Signing up...' : 'Signup'}
          </button>
        </form>

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
