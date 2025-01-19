import Link from "next/link";

export default function Navbar() {
    return (
        <header className="w-full py-6 border-b border-gray-800">
            <nav className="container mx-auto flex justify-between items-center px-6 md:px-12">
                <div className="text-2xl font-bold text-gray-100">
                    <Link href="/" className="hover:text-blue-400">ACS</Link>
                </div>
                <ul className="flex space-x-6 text-sm">
                    <li><Link href="/features" className="hover:text-blue-400">Features</Link></li>
                    <li><Link href="/about" className="hover:text-blue-400">About</Link></li>
                    <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
                </ul>
                <div className="flex space-x-4">
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
                </div>
            </nav>
        </header>
    );
}
