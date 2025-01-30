'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/supabase';
import { Dialog } from '@headlessui/react';
import { Link } from 'react-scroll';

const EmailWidget = ({ defaultDomain, customDomain, setCustomDomain }) => {
    const [isOpen, setIsOpen] = useState(false);

    const downloadTxtFile = () => {
        const txtContent = `TXT Record Sample\n\nHost: ${customDomain}\nType: TXT\nValue: ExampleValue1234`;
        const blob = new Blob([txtContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'email_configuration.txt';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div id="acs-email" className="w-full max-w-xl bg-gray-800 p-6 rounded-lg shadow-md mt-12">
            <h3 className="text-lg font-bold text-gray-100 mb-4">ACS Email</h3>
            <label htmlFor="customDomain" className="block text-sm font-medium text-gray-300">
                Enter Your Custom ACS Email
            </label>
            <input
                type="text"
                id="customDomain"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="ACS Email"
                className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-400 mt-2">Default: {defaultDomain}</p>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-400 text-gray-100 font-bold rounded-md focus:outline-none"
            >
                Configure Email
            </button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
                <div className="fixed inset-0 flex items-center justify-center">
                    <Dialog.Panel className="w-full max-w-lg bg-gray-900 p-6 rounded-md">
                        <Dialog.Title className="text-xl font-bold text-gray-100">Configure Your ACS Email</Dialog.Title>
                        <Dialog.Description className="mt-2 text-gray-300">
                            To configure your ACS email, add the following TXT record to your domain's DNS settings:
                        </Dialog.Description>
                        <pre className="bg-gray-800 p-4 rounded-md text-sm text-gray-300 mt-4">
                            Host: {customDomain}
                            {'\n'}Type: TXT
                            {'\n'}Value: ExampleValue1234
                        </pre>
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold text-gray-100">How to Configure DNS</h4>
                            <ul className="list-disc pl-5 text-gray-300">
                                <li>Log in to your domain registrar (e.g., GoDaddy, Namecheap).</li>
                                <li>Navigate to the DNS settings for your domain.</li>
                                <li>Add a new TXT record with the values provided above.</li>
                                <li>Save your changes and wait for the DNS to propagate (may take up to 24 hours).</li>
                            </ul>
                        </div>
                        <button
                            onClick={downloadTxtFile}
                            className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-400 text-gray-100 font-bold rounded-md"
                        >
                            Download TXT File
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-4 ml-4 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-100 font-bold rounded-md"
                        >
                            Close
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
    });
    const [defaultDomain, setDefaultDomain] = useState('');
    const [customDomain, setCustomDomain] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session?.user) {
                const { user } = session;
                const domain = `${user.user_metadata?.name?.replace(' ', '_')}@homes.automatedconsultancy.com`;
                setFormData({
                    name: user.user_metadata?.name || '',
                    email: user.email || '',
                    phone: user.user_metadata?.phone || '',
                    company: user.user_metadata?.company || '',
                });
                setDefaultDomain(domain);
                setCustomDomain(domain);
            }

            setIsLoading(false);
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setMessage('');
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                email: formData.email,
                data: {
                    name: formData.name,
                    phone: formData.phone,
                    company: formData.company,
                    customDomain: customDomain,
                },
            });

            if (error) {
                throw error;
            }

            setMessage('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error.message);
            setMessage(`Error updating profile: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 flex">
            <nav className="fixed left-0 top-0 h-full bg-gray-800 text-gray-100 w-48 flex flex-col py-6 space-y-4">
                <Link to="profile-info" smooth={true} duration={500} className="cursor-pointer px-4 py-2 hover:bg-gray-700 rounded">
                    Profile Information
                </Link>
                <Link to="acs-email" smooth={true} duration={500} className="cursor-pointer px-4 py-2 hover:bg-gray-700 rounded">
                    ACS Email
                </Link>
            </nav>

            <div className="flex-1 flex flex-col items-center py-12">
                <h1 className="text-4xl font-extrabold mb-6">Your Profile</h1>

                {isLoading ? (
                    <p className="text-lg font-semibold">Loading...</p>
                ) : (
                    <div className="w-full max-w-xl bg-gray-800 p-6 rounded-lg shadow-md">
                        <div id="profile-info">
                            <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Your Email"
                                        className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Your Phone Number"
                                        className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-300">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Your Company"
                                        className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className={`mt-6 w-full py-3 ${
                                        isLoading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-400'
                                    } text-gray-100 font-bold rounded-md focus:outline-none`}
                                >
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </form>

                            {message && (
                                <p
                                    className={`mt-4 text-center text-sm ${
                                        message.includes('Error') ? 'text-red-400' : 'text-green-400'
                                    }`}
                                >
                                    {message}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <EmailWidget
                    defaultDomain={defaultDomain}
                    customDomain={customDomain}
                    setCustomDomain={setCustomDomain}
                />
            </div>
        </div>
    );
}
