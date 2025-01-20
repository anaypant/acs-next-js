'use client';

import React from 'react';
import Navbar from './components/Navbar';
import { SessionProvider } from "next-auth/react"



export default function LandingPage(session) {
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center">
        <Navbar/>

        {/* Main homepage */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6">
            Revolutionize Real Estate with AI
          </h1>
          <p className="text-lg md:text-xl text-center text-gray-300 mb-8">
            Empowering realtors with cutting-edge AI tools to simplify and optimize their business processes.
          </p>
          <a
            href="#contact"
            className="px-6 py-3 bg-blue-500 text-gray-100 rounded-md shadow-md hover:bg-blue-600"
          >
            Get Started
          </a>
        </main>
        {/* Features section */}
        <section id="features" className="py-12 bg-gray-800 w-full">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">AI-Powered Communication</h3>
                <p className="text-gray-300">Automate and personalize your email services and lead communications.</p>
              </div>
              <div className="p-6 bg-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Smart CRM Integration</h3>
                <p className="text-gray-300">Seamlessly manage and track your leads with intelligent tools.</p>
              </div>
              <div className="p-6 bg-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">On-Demand Maintentance + Consultation</h3>
                <p className="text-gray-300">Showcase properties with stunning AI-generated virtual staging.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-12 w-full">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              At ACS, we are dedicated to transforming the real estate industry with innovative AI tools.
              Our mission is to empower realtors by providing solutions that enhance efficiency, productivity, and success.
            </p>
          </div>
        </section>
      <footer className="w-full py-6 bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ACS. All rights reserved.
          </p>
        </div>
      </footer>
       
      </div>
    </SessionProvider>
  );
}
