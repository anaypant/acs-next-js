'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/supabase';
import { Link } from 'react-scroll';
import EmailWidget from './EmailWidget';


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
