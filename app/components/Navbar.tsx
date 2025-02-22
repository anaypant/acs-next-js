// 'use client';

// import Link from 'next/link';
// import { useEffect, useRef, useState } from 'react';
// import { supabase } from '../utils/supabase/supabase';
// import { FaUserCircle } from 'react-icons/fa';

// export default function Navbar() {
//     // State management
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const dropdownRef = useRef<HTMLDivElement>(null);

//     // Fetch user session on mount
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 setLoading(true);
//                 const { data: { session } } = await supabase.auth.getSession();
//                 setUser(session?.user ?? null);
//             } catch (error) {
//                 console.error("Error fetching user:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUser();

//         // Subscribe to auth state changes
//         const { data: subscription } = supabase.auth.onAuthStateChange((_, session) => {
//             setUser(session?.user ?? null);
//         });

//         return () => {
//             subscription?.subscription?.unsubscribe();
//         };
//     }, []);

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//                 setDropdownOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     // Sign out user
//     const handleSignOut = async () => {
//         await supabase.auth.signOut();
//         setUser(null);
//     };

//     return (
//         <header className="w-full py-4 bg-[#1B1C28] shadow-md">
//             <nav className="container mx-auto flex justify-between items-center px-6 md:px-12">
//                 {/* Logo */}
//                 <div className="text-2xl font-bold text-gray-100">
//                     <Link href="/" className="hover:text-[#8FA1D0]">
//                         ACS
//                     </Link>
//                 </div>

//                 {/* Navigation Links */}
//                 <ul className="flex space-x-6 text-sm">
//                     <li>
//                         <Link href="/features" className="hover:text-[#8FA1D0]">
//                             Features
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/about" className="hover:text-[#8FA1D0]">
//                             About
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/contact" className="hover:text-[#8FA1D0]">
//                             Contact
//                         </Link>
//                     </li>
//                     {user && (
//                         <li>
//                             <Link href="/dashboard" className="hover:text-[#8FA1D0]">
//                                 API
//                             </Link>
//                         </li>
//                     )}
//                 </ul>

//                 {/* Authentication or User Dropdown */}
//                 <div className="flex space-x-4">
//                     {!user ? (
//                         <>
//                             <Link
//                                 href="/login"
//                                 className="px-4 py-2 bg-[#33354A] text-gray-100 rounded-md shadow-md hover:bg-[#454766]"
//                             >
//                                 Login
//                             </Link>
//                             <Link
//                                 href="/signup"
//                                 className="px-4 py-2 bg-[#4B5C99] text-gray-100 rounded-md shadow-md hover:bg-[#5C6DAA]"
//                             >
//                                 Sign Up
//                             </Link>
//                         </>
//                     ) : (
//                         <div ref={dropdownRef} className="relative">
//                             <button
//                                 onClick={() => setDropdownOpen((prev) => !prev)}
//                                 className="flex items-center px-4 py-2 bg-[#33354A] text-gray-100 rounded-full shadow-md hover:bg-[#454766] focus:outline-none"
//                             >
//                                 <FaUserCircle size={24} />
//                             </button>

//                             {dropdownOpen && (
//                                 <div className="absolute right-0 mt-2 w-48 bg-[#24253A] border border-[#33354A] rounded-md shadow-lg z-50">
//                                     <ul className="py-2 text-sm text-gray-300">
//                                         <li>
//                                             <Link
//                                                 href="/profile"
//                                                 className="block px-4 py-2 hover:bg-[#33354A] transition"
//                                             >
//                                                 Profile
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link
//                                                 href="/settings"
//                                                 className="block px-4 py-2 hover:bg-[#33354A] transition"
//                                             >
//                                                 Settings
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <button
//                                                 onClick={handleSignOut}
//                                                 className="block w-full text-left px-4 py-2 hover:bg-[#33354A] transition"
//                                             >
//                                                 Sign Out
//                                             </button>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </nav>
//         </header>
//     );
// }

'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../utils/supabase/supabase';
import { FaUserCircle } from 'react-icons/fa';

/**
 * Redesigned Navbar
 * - Retains original functionality (login, sign-up, sign-out, user checks).
 * - New styling to match the screenshot's clean, modern layout.
 * - Added "Home" link and rearranged items for a simpler top navigation.
 */
export default function Navbar() {
    // State management
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fetch user session on mount
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

        // Subscribe to auth state changes
        const { data: subscription } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            subscription?.subscription?.unsubscribe();
        };
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

    return (
        <header className="w-full py-4 bg-white shadow-sm">
            <nav className="container mx-auto flex justify-between items-center px-6 md:px-12">
                {/* Logo */}
                <div className="text-xl md:text-2xl font-bold text-gray-800">
                    <Link href="/" className="hover:text-green-600 transition-colors">
                        ACS
                    </Link>
                </div>

                {/* Navigation Links */}
                <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
                    <li>
                        <Link href="/" className="hover:text-green-600 transition-colors">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/features" className="hover:text-green-600 transition-colors">
                            Features
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:text-green-600 transition-colors">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:text-green-600 transition-colors">
                            Contact
                        </Link>
                    </li>
                    {user && (
                        <li>
                            <Link href="/dashboard" className="hover:text-green-600 transition-colors">
                                API
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Authentication or User Dropdown */}
                <div className="flex space-x-4">
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
            </nav>
        </header>
    );
}

