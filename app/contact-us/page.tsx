'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [status, setStatus] = useState('');

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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100 flex flex-col">
        <Navbar />

        <main className="flex-1 w-full flex flex-col items-center justify-center px-6 md:px-12">
          <motion.section
              className="py-12 w-full max-w-3xl text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Contact Us
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Have questions or need assistance? Fill out the form below, and we’ll get back to you soon.
            </p>
            <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required.' })}
                    className={`w-full p-4 bg-gray-900 text-gray-100 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required.',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address.',
                      },
                    })}
                    className={`w-full p-4 bg-gray-900 text-gray-100 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                    id="message"
                    {...register('message', { required: 'Message is required.' })}
                    rows={5}
                    className={`w-full p-4 bg-gray-900 text-gray-100 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.message ? 'border-red-500' : ''}`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message.message}</p>}
              </div>
              <motion.button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-gray-100 font-bold rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </motion.form>
            {status && (
                <motion.p
                    className={`mt-4 text-center text-sm ${status.includes('success') ? 'text-green-500' : 'text-red-500'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                  {status}
                </motion.p>
            )}
          </motion.section>
        </main>

        <Footer />
      </div>
  );
}
