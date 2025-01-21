'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/supabase';
import { FaUserCircle } from 'react-icons/fa'; // Importing the user icon

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    fetchUser();

    // Listen for auth state changes
    const { subscription } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
      <header className="w-full py-6 border-b border-gray-800">
        <nav className="container mx-auto flex justify-between items-center px-6 md:px-12">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-100">
            <Link href="/" className="hover:text-blue-400">ACS</Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-6 text-sm">
            <li><Link href="/features" className="hover:text-blue-400">Features</Link></li>
            <li><Link href="/about" className="hover:text-blue-400">About</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
            {user && (
                <li><Link href="/dashboard" className="hover:text-blue-400">API</Link></li>
            )}
          </ul>

          {/* Authentication Buttons or User Dropdown */}
          <div className="flex space-x-4">
            {!user ? (
                <>
                  <Link
                      href="/login"
                      className="px-4 py-2 bg-gray-700 text-gray-100 rounded-md shadow-md hover:bg-gray-600"
                  >
                    Login
                  </Link>
                  <Link
                      href="/signup"
                      className="px-4 py-2 bg-blue-500 text-gray-100 rounded-md shadow-md hover:bg-blue-600"
                  >
                    Sign Up
                  </Link>
                </>
            ) : (
                <div className="relative">
                  {/* User Icon */}
                  <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center px-4 py-2 bg-gray-700 text-gray-100 rounded-full shadow-md hover:bg-gray-600 focus:outline-none"
                  >
                    <FaUserCircle size={24} /> {/* Icon from React Icons */}
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                        <ul className="py-2 text-sm text-gray-300">
                          <li>
                            <Link href="/profile" className="block px-4 py-2 hover:bg-gray-700">
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link href="/settings" className="block px-4 py-2 hover:bg-gray-700">
                              Settings
                            </Link>
                          </li>
                          <li>
                            <button
                                onClick={handleSignOut}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                            >
                              Sign Out
                            </button>
                          </li>
                        </ul>
                      </div>
                  )}
                </div>
            )}
          </div>
        </nav>
      </header>
  );
}
