'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutUs() {
  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100 flex flex-col">
        <Navbar />

        <main className="flex-1 w-full flex flex-col items-center justify-center px-6 md:px-12">
          {/* About Section */}
          <motion.section
              id="about"
              className="py-16 w-full text-center"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              About ACS
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              At ACS, we believe in revolutionizing the real estate industry through the power of artificial intelligence.
              Our team is dedicated to creating innovative tools that empower realtors to thrive in an ever-evolving market.
            </p>
          </motion.section>

          {/* Vision Section */}
          <motion.section
              id="vision"
              className="py-16 bg-gray-800 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
          >
            <div className="container mx-auto px-6 md:px-12 text-center">
              <h2 className="text-4xl font-bold mb-8 text-gray-100">Our Vision</h2>
              <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg">
                Our vision is to bridge the gap between technology and real estate by providing intelligent solutions that
                make property management and sales seamless, efficient, and impactful. We aim to empower realtors with tools
                that save time, enhance productivity, and drive success.
              </p>
            </div>
          </motion.section>

          {/* Team Section */}
          <motion.section
              id="team"
              className="py-16 w-full text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold mb-8 text-gray-100">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: 'Anay Pant',
                  role: 'Co-founder',
                  description: 'Visionary leader and AI enthusiast revolutionizing real estate.',
                },
                {
                  name: 'Sid Nuthi',
                  role: 'Co-founder',
                  description: 'Driving innovation with AI-powered solutions for realtors.',
                },
                // Add more team members as needed
              ].map((member, index) => (
                  <motion.div
                      key={index}
                      className="p-8 bg-gray-700 rounded-lg shadow-lg transform hover:scale-105 transition-all"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <h3 className="text-2xl font-semibold text-blue-400 mb-2">{member.name}</h3>
                    <p className="text-gray-300">{member.role}</p>
                    <p className="text-sm mt-4 text-gray-400">{member.description}</p>
                  </motion.div>
              ))}
            </div>
          </motion.section>
        </main>

        <Footer />
      </div>
  );
}
