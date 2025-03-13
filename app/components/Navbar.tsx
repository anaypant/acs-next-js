'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../utils/supabase/supabase';
import { FaUserCircle } from 'react-icons/fa';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  // State management
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch user session on mount and subscribe to auth state changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const { data: subscription } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sign out user
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Navigation links (old functionality with API link if user is logged in)
  const links = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="w-full py-4 bg-transparent relative z-10 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-700">
            ACS
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-green-600 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <Link href="/dashboard" className="hover:text-green-600 transition-colors">
                  API
                </Link>
              </li>
            )}
          </ul>

          {/* Authentication or User Dropdown - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm rounded-md font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm rounded-md font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                >
                  <FaUserCircle size={24} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/settings"
                          className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-green-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 bg-white rounded-lg shadow-lg mt-2">
            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50 rounded-md"
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50 rounded-md"
                >
                  API
                </Link>
              )}
            </div>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="mx-4 px-4 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 rounded transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/profile"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors text-left"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
