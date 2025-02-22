// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { supabase } from '../utils/supabase/supabase';
// import { FaUserCircle } from 'react-icons/fa';
// import { FiSearch } from 'react-icons/fi';


// type CustomUser = {
//     id: string;
//     email: string;
//     name?: string;
//   };
    

// export default function Navbar() {


//     const [user, setUser] = useState<CustomUser | null>(null);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const router = useRouter();

//     useEffect(() => {
//         const fetchUser = async () => {
//             const {
//                 data: { session },
//             } = await supabase.auth.getSession();
//             setUser(session?.user as CustomUser | null);
//         };

//         fetchUser();

//     }, []);

//     const handleSignOut = async () => {
//         await supabase.auth.signOut();
//         setUser(null);
//         router.push('/'); // Redirect to home after sign out
//     };

//     const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (searchQuery.trim()) {
//             router.push(`/search?query=${searchQuery.trim()}`);
//         }
//     };

//     const navigateTo = (path: string) => {
//         router.push(path);
//         setDropdownOpen(false); // Close dropdown menu
//     };

//     return (
//         <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#1B1C28] to-[#24253A] shadow-lg">
//             <nav className="container mx-auto flex items-center justify-between px-6 py-4">
//                 {/* Logo */}
//                 <div className="text-2xl font-bold text-gray-100 cursor-pointer" onClick={() => router.push('/')}>
//                     ACS
//                 </div>

//                 {/* Navigation Links */}
//                 <ul className="hidden md:flex space-x-6 text-sm">
//                     <li>
//                         <button onClick={() => router.push('/features')} className="hover:text-[#8FA1D0]">
//                             Features
//                         </button>
//                     </li>
//                     <li>
//                         <button onClick={() => router.push('/about')} className="hover:text-[#8FA1D0]">
//                             About
//                         </button>
//                     </li>
//                     <li>
//                         <button onClick={() => router.push('/contact')} className="hover:text-[#8FA1D0]">
//                             Contact
//                         </button>
//                     </li>
//                 </ul>

//                 {/* Search Bar */}
//                 <form onSubmit={handleSearch} className="hidden md:flex items-center bg-[#33354A] rounded-md overflow-hidden">
//                     <input
//                         type="text"
//                         placeholder="Search..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="px-4 py-2 bg-transparent text-gray-100 focus:outline-none"
//                     />
//                     <button
//                         type="submit"
//                         className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white"
//                     >
//                         <FiSearch />
//                     </button>
//                 </form>

//                 {/* User Dropdown */}
//                 <div className="hidden md:flex space-x-4">
//                     {!user ? (
//                         <>
//                             <button
//                                 onClick={() => router.push('/login')}
//                                 className="px-4 py-2 bg-[#33354A] text-gray-100 rounded-md shadow-md hover:bg-[#454766]"
//                             >
//                                 Login
//                             </button>
//                             <button
//                                 onClick={() => router.push('/signup')}
//                                 className="px-4 py-2 bg-[#4B5C99] text-gray-100 rounded-md shadow-md hover:bg-[#5C6DAA]"
//                             >
//                                 Sign Up
//                             </button>
//                         </>
//                     ) : (
//                         <div className="relative">
//                             <button
//                                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                                 className="flex items-center px-4 py-2 bg-[#33354A] text-gray-100 rounded-full shadow-md hover:bg-[#454766]"
//                             >
//                                 <FaUserCircle size={24} />
//                             </button>

//                             {/* Dropdown Menu */}
//                             {dropdownOpen && (
//                                 <div className="absolute right-0 mt-2 w-48 bg-[#24253A] border border-[#33354A] rounded-md shadow-lg">
//                                     <ul className="py-2 text-sm text-gray-300">
//                                         <li>
//                                             <button
//                                                 onClick={() => navigateTo('/profile')}
//                                                 className="block w-full text-left px-4 py-2 hover:bg-[#33354A] rounded-md"
//                                             >
//                                                 Profile
//                                             </button>
//                                         </li>
//                                         <li>
//                                             <button
//                                                 onClick={() => navigateTo('/settings')}
//                                                 className="block w-full text-left px-4 py-2 hover:bg-[#33354A] rounded-md"
//                                             >
//                                                 Settings
//                                             </button>
//                                         </li>
//                                         <li>
//                                             <button
//                                                 onClick={handleSignOut}
//                                                 className="block w-full text-left px-4 py-2 hover:bg-[#33354A] rounded-md"
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

//                 {/* Mobile Menu Button */}
//                 <button
//                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                     className="md:hidden text-gray-100 hover:text-[#8FA1D0]"
//                 >
//                     ☰
//                 </button>
//             </nav>

//             {/* Mobile Menu */}
//             {isMobileMenuOpen && (
//                 <div className="md:hidden bg-[#1B1C28] text-gray-100 px-6 py-4 space-y-4">
//                     <button onClick={() => router.push('/features')} className="block hover:text-[#8FA1D0]">
//                         Features
//                     </button>
//                     <button onClick={() => router.push('/about')} className="block hover:text-[#8FA1D0]">
//                         About
//                     </button>
//                     <button onClick={() => router.push('/contact')} className="block hover:text-[#8FA1D0]">
//                         Contact
//                     </button>
//                     {user && (
//                         <>
//                             <button
//                                 onClick={() => navigateTo('/profile')}
//                                 className="block w-full text-left px-4 py-2 bg-[#33354A] text-gray-100 rounded-md hover:bg-[#454766]"
//                             >
//                                 Profile
//                             </button>
//                             <button
//                                 onClick={() => navigateTo('/settings')}
//                                 className="block w-full text-left px-4 py-2 bg-[#33354A] text-gray-100 rounded-md hover:bg-[#454766]"
//                             >
//                                 Settings
//                             </button>
//                         </>
//                     )}
//                     {!user ? (
//                         <>
//                             <button onClick={() => router.push('/login')} className="block hover:text-[#8FA1D0]">
//                                 Login
//                             </button>
//                             <button onClick={() => router.push('/signup')} className="block hover:text-[#8FA1D0]">
//                                 Sign Up
//                             </button>
//                         </>
//                     ) : (
//                         <button
//                             onClick={handleSignOut}
//                             className="block text-left hover:text-[#8FA1D0]"
//                         >
//                             Sign Out
//                         </button>
//                     )}
//                 </div>
//             )}
//         </header>
//     );
// }

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/supabase';
import { FaUserCircle } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

type CustomUser = {
    id: string;
    email: string;
    name?: string;
};

/**
 * Redesigned Footer
 * - Still named "Navbar" in code, but we’ll treat this as the 'footer' file as requested.
 * - The functionality (supabase checks, sign out) is unchanged; layout is adapted to be a simple footer bar.
 * - The search functionality is preserved but visually minimized (optional usage).
 */
export default function Navbar() {
    const [user, setUser] = useState<CustomUser | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push('/');
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?query=${searchQuery.trim()}`);
        }
    };

    const navigateTo = (path: string) => {
        router.push(path);
        setDropdownOpen(false);
    };

    return (
        <footer className="bg-gray-900 text-gray-300 py-6 mt-16">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                {/* Footer Left Content */}
                <div className="mb-4 md:mb-0">
                    <p className="text-sm md:text-base">
                        © {new Date().getFullYear()} ACS. All rights reserved.
                    </p>
                </div>

                {/* Optional search or links can be placed here */}
                <div className="flex items-center space-x-4">
                    <form onSubmit={handleSearch} className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-3 py-1 rounded bg-gray-800 text-sm focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
                        >
                            <FiSearch />
                        </button>
                    </form>

                    {!user ? (
                        <>
                            <button
                                onClick={() => router.push('/login')}
                                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 text-sm rounded"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => router.push('/signup')}
                                className="bg-green-600 hover:bg-green-700 px-3 py-1 text-sm rounded text-white"
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded"
                            >
                                <FaUserCircle size={18} className="mr-1" />
                                <span>Account</span>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
                                    <ul className="py-2 text-sm text-gray-300">
                                        <li>
                                            <button
                                                onClick={() => navigateTo('/profile')}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
                                            >
                                                Profile
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => navigateTo('/settings')}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
                                            >
                                                Settings
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleSignOut}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
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
            </div>
        </footer>
    );
}
