'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
            <Navbar />

            <main className="flex-1 py-12 px-6 md:px-12">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                        Explore Our Cutting-Edge Features
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300">
                        Empower your real estate business with tools designed for success.
                    </p>
                </header>

                {/* Features Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon="📧"
                        title="AI-Powered Communication"
                        description="Personalize and automate your client communications with advanced AI."
                    />
                    <FeatureCard
                        icon="📊"
                        title="Intelligent Insights"
                        description="Gain actionable insights with AI-powered analytics and reporting."
                    />
                    <FeatureCard
                        icon="🤝"
                        title="Local Agent Collaboration"
                        description="Work closely with local agents to tailor solutions that meet their unique needs."
                    />
                    <FeatureCard
                        icon="🛠️"
                        title="Seamless Integrations"
                        description="Integrate effortlessly with popular CRMs and real estate platforms."
                    />
                    <FeatureCard
                        icon="🌟"
                        title="Dedicated Support"
                        description="Receive hands-on support and guidance to make the most of our tools."
                    />
                    <FeatureCard
                        icon="🛡️"
                        title="Data Security"
                        description="Keep your data secure with robust encryption and privacy standards."
                    />
                </section>
            </main>

            <Footer />
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center">
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-300">{description}</p>
        </div>
    );
}
