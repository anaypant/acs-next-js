'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'normalize.css';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100 flex flex-col font-sans">
            <Navbar />

            {/* Hero Section */}
            <header className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center">
                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Revolutionize Real Estate with AI
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    Empowering realtors with cutting-edge AI tools to simplify and optimize their business processes.
                </motion.p>
                <motion.a
                    href="#features"
                    className="px-8 py-4 bg-blue-500 text-gray-100 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all transform hover:scale-105"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    Get Started
                </motion.a>
            </header>

            {/* Features Section */}
            <section id="features" className="py-16 bg-gray-800">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <motion.h2
                        className="text-4xl font-bold text-gray-100 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Features
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            title="AI-Powered Communication"
                            description="Automate and personalize your email services and lead communications."
                        />
                        <FeatureCard
                            title="Smart CRM Integration"
                            description="Seamlessly manage and track your leads with intelligent tools."
                        />
                        <FeatureCard
                            title="On-Demand Maintenance + Consultation"
                            description="Showcase properties with stunning AI-generated virtual staging."
                        />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 bg-gradient-to-t from-gray-800 to-black">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <motion.h2
                        className="text-4xl font-bold text-gray-100 mb-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        About Us
                    </motion.h2>
                    <motion.p
                        className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        At ACS, we are dedicated to transforming the real estate industry with innovative AI tools. Our mission is
                        to empower realtors by providing solutions that enhance efficiency, productivity, and success.
                    </motion.p>
                </div>
            </section>

            <Footer />
        </div>
    );
}

function FeatureCard({ title, description }) {
    return (
        <motion.div
            className="p-8 bg-gray-700 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                {title}
            </h3>
            <p className="text-gray-300">{description}</p>
        </motion.div>
    );
}
