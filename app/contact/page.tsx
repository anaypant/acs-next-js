'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [status, setStatus] = useState('');

  // Form submission handler
  const onSubmit = async (formData) => {
    setStatus('');
    try {
      const response = await fetch('/api/contact-send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Your message has been sent successfully.');
      } else {
        setStatus('Failed to send the message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main Content: Two Columns on large screens */}
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* LEFT COLUMN: Form + Info */}
        <div className="w-full lg:w-1/2 bg-[#F5F9F7] p-8 lg:p-12 flex flex-col justify-between">
          {/* Animated Container */}
          <motion.div
            className="max-w-lg mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Heading + Subtext */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Get in <span className="text-green-700">Touch</span>
            </h1>
            <p className="text-gray-600 mb-8">
              Eim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel,
              ornare non i blandit metus.
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block mb-1 text-gray-700 font-medium">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Name is required.' })}
                  placeholder="Name"
                  className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-600 ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block mb-1 text-gray-700 font-medium">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address.',
                    },
                  })}
                  placeholder="you@example.com"
                  className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-600 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block mb-1 text-gray-700 font-medium">
                  Phone number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone', { required: 'Phone number is required.' })}
                  placeholder="(XXX) XXX-XXXX"
                  className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-600 ${
                    errors.phone ? 'border-red-500' : ''
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* How did you find us? Field */}
              <div>
                <label htmlFor="foundUs" className="block mb-1 text-gray-700 font-medium">
                  How did you find us?
                </label>
                <input
                  id="foundUs"
                  type="text"
                  {...register('foundUs')}
                  placeholder="Google, Friend, etc."
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-600"
                />
              </div>

              {/* Submit Button & Status */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  className="w-full py-3 bg-green-700 text-white font-bold rounded-full shadow hover:bg-green-800 transition"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  SEND
                </motion.button>
              </div>

              {/* Success / Error Status Message */}
              {status && (
                <motion.p
                  className={`mt-4 text-sm text-center ${
                    status.includes('success') ? 'text-green-600' : 'text-red-500'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {status}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Bottom Info: Phone, Fax, Email (centered + horizontal) */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-12">
              {/* PHONE */}
              <div className="flex items-center space-x-2">
                {/* Replace with your phone icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5h2m4 0h2m4 0h2m4 0h2M4 8h16M3 21h18"
                  />
                </svg>
                <div className="text-sm">
                  <p className="font-bold text-green-700 tracking-wide">PHONE</p>
                  <p className="text-gray-700">03 5432 1234</p>
                </div>
              </div>

              {/* FAX */}
              <div className="flex items-center space-x-2">
                {/* Replace with your fax icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v6H4z M9 10v10h6V10H9z" />
                </svg>
                <div className="text-sm">
                  <p className="font-bold text-green-700 tracking-wide">FAX</p>
                  <p className="text-gray-700">03 5432 1234</p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-center space-x-2">
                {/* Replace with your email icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a3 3 0 003.22 0L21 8m-2 8V8a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2z"
                  />
                </svg>
                <div className="text-sm">
                  <p className="font-bold text-green-700 tracking-wide">EMAIL</p>
                  <p className="text-gray-700">info@marcc.com.au</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Map */}
        <div className="w-full lg:w-1/2 relative bg-green-900">
          <iframe
            title="Map"
            className="absolute inset-0 w-full h-full border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.379495780008!2d112.72914641441031!3d-7.207156973109338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb4a260fffdd%3A0x9cbf8a768f983774!2sKebon%20Kacang!5e0!3m2!1sen!2sid!4v1676218851051!5m2!1sen!2sid"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}
