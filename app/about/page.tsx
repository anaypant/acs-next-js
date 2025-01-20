'use client';

import React from 'react';
import Navbar from '../components/Navbar';


export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center">
      <Navbar/>

      <main className="flex-1 w-full flex flex-col items-center justify-center px-6 md:px-12">
        <section id="about" className="py-12 w-full text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">About ACS</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
            At ACS, we believe in revolutionizing the real estate industry through the power of artificial intelligence.
            Our team is dedicated to creating innovative tools that empower realtors to thrive in an ever-evolving market.
          </p>
        </section>

        <section id="vision" className="py-12 bg-gray-800 w-full">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Vision</h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-center">
              Our vision is to bridge the gap between technology and real estate by providing intelligent solutions that
              make property management and sales seamless, efficient, and impactful.
              We aim to empower realtors with tools that save time, enhance productivity, and drive success.
            </p>
          </div>
        </section>

        <section id="team" className="py-12 w-full text-center">
          <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="p-6 bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Anay Pant</h3>
              <p className="text-gray-300">Co-founder</p>
              <p className="text-sm mt-2">Anay Pant</p>
            </div>
            <div className="p-6 bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Sid Nuthi</h3>
              <p className="text-gray-300">Co-founder</p>
              <p className="text-sm mt-2">Sid Nuthi</p>
            </div>
            
          </div>
        </section>
      </main>
    <footer className="w-full py-6 bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ACS. All rights reserved.
          </p>
        </div>
      </footer>
      
    </div>
  );
}
