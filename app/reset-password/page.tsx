'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase/supabase';

export default function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');

        if (accessToken) {
            // Set the session using the access token
            supabase.auth.setSession({ access_token: accessToken, refresh_token: '' });
        } else {
            setMessage('Invalid or missing access token.');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setIsLoading(true);

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) {
                setMessage(`Error: ${error.message}`);
            } else {
                setMessage('Password updated successfully!');
                router.push('/login'); // Redirect to login page
            }
        } catch (error) {
            console.error('Password reset error:', error);
            setMessage('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center px-6">
            <h1 className="text-4xl font-extrabold mb-6">Reset Your Password</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-gray-800 p-6 rounded-md shadow-md">
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full p-3 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full p-3 bg-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 ${
                        isLoading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-400'
                    } text-gray-100 font-bold rounded-md focus:outline-none`}
                >
                    {isLoading ? 'Updating Password...' : 'Reset Password'}
                </button>
            </form>
            {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}
        </div>
    );
}
