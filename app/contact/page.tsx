'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { chownSync } from 'fs';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      const response = await fetch('/api/contact-send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Your message has been sent successfully.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send the message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center">
      <Navbar></Navbar>

      <main className="flex-1 w-full flex flex-col items-center justify-center px-6 md:px-12">
        <section className="py-12 w-full max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-center">Contact Us</h1>
          <p className="text-lg text-gray-300 text-center mb-8">
            Have questions or need assistance? Fill out the form below, and we’ll get back to you soon.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-gray-100 font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
          {status && <p className="mt-4 text-center text-sm text-gray-400">{status}</p>}
        </section>
      </main>

      <Footer></Footer>
    </div>
  );
}
