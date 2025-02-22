'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/supabase';

type CustomUser = {
  id: string;
  email: string;
  name?: string;
};

export default function Footer() {
  const [user, setUser] = useState<CustomUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user as CustomUser | null);
    };

    fetchUser();
  }, []);

  // Optional sign-out logic if you want to allow sign-out from the footer
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  return (
    <footer className="bg-green-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Top Section: 3 Columns */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Left Column: Logo & Description */}
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold mb-2">ACS</h2>
            <p className="text-sm mb-4">
              Seamlessly transform your concepts into a fully operational,
              mobile-friendly, code-free SaaS web platform.
            </p>

            {/* Social Icons (optional) */}
            <div className="flex space-x-3">
              {/* Make sure you have Font Awesome or a similar icon library */}
              <a
                href="#"
                className="hover:text-white"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="#"
                className="hover:text-white"
                aria-label="X (Twitter)"
              >
                <i className="fab fa-x-twitter"></i>
              </a>
              <a
                href="#"
                className="hover:text-white"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="hover:text-white"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>

          {/* Middle Column: Company Links */}
          <div className="md:w-1/3">
            <h3 className="font-semibold text-lg mb-2">COMPANY</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column: Info Links */}
          <div className="md:w-1/3">
            <h3 className="font-semibold text-lg mb-2">INFO</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms &amp; Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  404
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-8 border-t border-green-700 pt-4 text-center text-xs">
          ACS all right reserved. © 2025
        </div>
      </div>
    </footer>
  );
}
