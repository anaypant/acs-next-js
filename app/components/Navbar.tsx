'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../utils/supabase/supabase';
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    return (
        <header className="w-full py-4 bg-[#1B1C28] shadow-md">
            <nav className="container mx-auto flex justify-between items-center px-6 md:px-12">
                {/* Logo */}
                <div className="text-2xl font-bold text-gray-100">
                    <Link href="/" className="hover:text-[#8FA1D0]">
                        ACS
                    </Link>
                </div>

                {/* Navigation Links */}
                <ul className="flex space-x-6 text-sm">
                    <li>
                        <Link href="/features" className="hover:text-[#8FA1D0]">
                            Features
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:text-[#8FA1D0]">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:text-[#8FA1D0]">
                            Contact
                        </Link>
                    </li>
                    {/* Show API Link only if user is signed in */}
                    {user && (
                        <li>
                            <Link href="/dashboard" className="hover:text-[#8FA1D0]">
                                API
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Authentication Buttons or User Dropdown */}
                <div className="flex space-x-4">
                    {!user ? (
                        // Show Login and Signup buttons if not signed in
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-2 bg-[#33354A] text-gray-100 rounded-md shadow-md hover:bg-[#454766]"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="px-4 py-2 bg-[#4B5C99] text-gray-100 rounded-md shadow-md hover:bg-[#5C6DAA]"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        // Show User Icon and Dropdown if signed in
                        <div ref={dropdownRef} className="relative">
                            <button
                                onClick={() => setDropdownOpen((prev) => !prev)}
                                className="flex items-center px-4 py-2 bg-[#33354A] text-gray-100 rounded-full shadow-md hover:bg-[#454766] focus:outline-none"
                            >
                                <FaUserCircle size={24} />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#24253A] border border-[#33354A] rounded-md shadow-lg z-50">
                                    <ul className="py-2 text-sm text-gray-300">
                                        <li>
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 hover:bg-[#33354A] transition"
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/settings"
                                                className="block px-4 py-2 hover:bg-[#33354A] transition"
                                            >
                                                Settings
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleSignOut}
                                                className="block w-full text-left px-4 py-2 hover:bg-[#33354A] transition"
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
