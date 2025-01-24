'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-[#1B1C28] text-gray-100 flex flex-col">
            <Navbar />

            <main className="flex-1 py-12 px-6 md:px-12">
                {/* Page Header */}
                <header className="text-center mb-12">
                    <motion.h1
                        className="text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#8FA1D0] to-[#E94560]"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Explore Our Cutting-Edge Features
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl text-gray-300"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        Empower your real estate business with tools designed for success.
                    </motion.p>
                </header>

                {/* Features Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <FeatureCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        </motion.div>
                    ))}
                </section>
            </main>

            <Footer />
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="p-6 bg-[#24253A] rounded-lg shadow-md text-center hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="text-5xl mb-4 text-[#8FA1D0]">{icon}</div>
            <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
            <p className="text-gray-300">{description}</p>
        </div>
    );
}

const features = [
    {
        icon: '📧',
        title: 'AI-Powered Communication',
        description: 'Personalize and automate your client communications with advanced AI.',
    },
    {
        icon: '📊',
        title: 'Intelligent Insights',
        description: 'Gain actionable insights with AI-powered analytics and reporting.',
    },
    {
        icon: '🤝',
        title: 'Local Agent Collaboration',
        description: 'Work closely with local agents to tailor solutions that meet their unique needs.',
    },
    {
        icon: '🛠️',
        title: 'Seamless Integrations',
        description: 'Integrate effortlessly with popular CRMs and real estate platforms.',
    },
    {
        icon: '🌟',
        title: 'Dedicated Support',
        description: 'Receive hands-on support and guidance to make the most of our tools.',
    },
    {
        icon: '🛡️',
        title: 'Data Security',
        description: 'Keep your data secure with robust encryption and privacy standards.',
    },
];
