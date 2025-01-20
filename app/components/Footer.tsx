import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-800 border-t border-gray-700">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} ACS. All rights reserved.
        </p>
        <nav className="mt-4">
          <Link href="/about">
            <a className="text-gray-400 hover:text-gray-100 mx-4">About</a>
          </Link>
          <Link href="/contact">
            <a className="text-gray-400 hover:text-gray-100 mx-4">Contact</a>
          </Link>
          <Link href="/privacy-policy">
            <a className="text-gray-400 hover:text-gray-100 mx-4">Privacy Policy</a>
          </Link>
        </nav>
      </div>
    </footer>
  );
}
