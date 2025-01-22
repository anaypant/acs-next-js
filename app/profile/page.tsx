'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/supabase';

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session?.user) {
                const { user } = session;
                setFormData({
                    name: user.user_metadata?.name || '',
                    email: user.email || '',
                    phone: user.user_metadata?.phone || '',
                    company: user.user_metadata?.company || '',
                });
            }

            setIsLoading(false);
        };

        fetchUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setMessage('');
        setIsLoading(true);

        // Update the user in Supabase
        const { data, error } = await supabase.auth.updateUser({
            email: formData.email,
            data: {
                name: formData.name,
                phone: formData.phone,
                company: formData.company,
            },
        });

        if (error) {
            setMessage(`Error updating profile: ${error.message}`);
            setIsLoading(false);
            return;
        }

        // Update custom metadata (optional, if you have additional database logic)
        const { error: metadataError } = await supabase
            .from('users') // Replace 'users' with your custom table name, if any
            .update({
                name: formData.name,
                phone: formData.phone,
                company: formData.company,
            })
            .eq('id', data.user?.id);

        setIsLoading(false);

        if (metadataError) {
            setMessage(`Error updating metadata: ${metadataError.message}`);
        } else {
            setMessage('Profile updated successfully!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-12">
            <h1 className="text-4xl font-extrabold mb-6">Your Profile</h1>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="w-full max-w-xl bg-gray-800 p-6 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                    <div className="space-y-6">
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
                                className="w-full p-3 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
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
                                className="w-full p-3 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
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
                                className="w-full p-3 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
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
                                className="w-full p-3 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className={`mt-6 w-full py-3 ${
                            isLoading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-400'
                        } text-gray-100 font-bold rounded-md focus:outline-none`}
                    >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>

                    {message && <p className="mt-4 text-sm text-gray-400 text-center">{message}</p>}
                </div>
            )}
        </div>
    );
}
