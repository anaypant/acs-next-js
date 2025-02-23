'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0D331A] text-white">
      {/* Top Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* SECTION 1: ACS Features (Top) */}
        <section className="w-full py-12 px-6 md:px-12 flex flex-col md:flex-row items-center">
          {/* Left Column: Text */}
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0 md:pr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              ACS Features
            </h1>
            <p className="text-gray-200 leading-relaxed">
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.
            </p>
          </motion.div>

          {/* Right Column: Example Image/Placeholder */}
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Replace this with your actual image of "Save Segment" if desired */}
            <div className="w-full max-w-sm h-64 bg-[#1A4E2E] rounded-lg flex items-center justify-center">
              <span className="text-center text-gray-200">
                [ Save Segment Screenshot ]
              </span>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: Virtual Staging (Middle) */}
        <section className="w-full py-12 px-6 md:px-12 flex flex-col md:flex-row">
          {/* Left Column: Text */}
          <motion.div
            className="md:w-1/2 flex flex-col justify-center mb-8 md:mb-0"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Virtual Staging
            </h2>
            <p className="text-gray-200 leading-relaxed mb-4">
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              lorem ipsum lorem ipsum lorem ipsum.
            </p>
            <a
              href="#"
              className="inline-block text-sm font-semibold text-[#8FA1D0] hover:underline"
            >
              LEARN MORE
            </a>
          </motion.div>

          {/* Right Column: Solid Dark Green Block (placeholder for future image) */}
          <motion.div
            className="md:w-1/2 h-64 bg-[#1A4E2E] rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* You could later add an image background here */}
          </motion.div>
        </section>

        {/* SECTION 3: Pricing Prediction (Bottom) */}
        <section className="w-full py-12 px-6 md:px-12 flex flex-col md:flex-row">
          {/* Left Column: Solid Dark Green Block */}
          <motion.div
            className="md:w-1/2 h-64 bg-[#1A4E2E] rounded-lg mb-8 md:mb-0 md:mr-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Another placeholder block for future background image */}
          </motion.div>

          {/* Right Column: Text */}
          <motion.div
            className="md:w-1/2 flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Pricing Prediction
            </h2>
            <p className="text-gray-200 leading-relaxed mb-4">
              Create stunning, professional-looking social content with the
              Untold app. Choose from hundreds of templates and unique filters,
              fonts, and stickers.
            </p>
            <a
              href="#"
              className="inline-block text-sm font-semibold text-[#8FA1D0] hover:underline"
            >
              LEARN MORE
            </a>
          </motion.div>
        </section>
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
}
