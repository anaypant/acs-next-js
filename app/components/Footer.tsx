import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full py-6 bg-gray-800 border-t border-gray-700">
            <div className="container mx-auto px-6 md:px-12 text-center">
                <p className="text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} ACS. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
