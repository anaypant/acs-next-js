'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createServerClient } from '../utils/supabase/server';

export default function SettingsPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const supabase = createServerClient();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();

            if (error) {
                console.error("Error fetching user details:", error.message);
                setError("Failed to load user details.");
            }

            if (session?.user) {
                setEmail(session.user.email || '');
            }
        };

        fetchUserDetails();
    }, [supabase]);

    const handleSaveChanges = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            setLoading(false);
            return;
        }

        try {
            if (email) {
                const { error: emailError } = await supabase.auth.updateUser({ email });
                if (emailError) throw emailError;
            }

            if (password) {
                const { error: passwordError } = await supabase.auth.updateUser({ password });
                if (passwordError) throw passwordError;
            }

            setSuccess("Your settings have been updated successfully!");
        } catch (err) {
            console.error("Error updating settings:", err.message);
            setError("Failed to update settings. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            return;
        }

        setIsDeleting(true);
        setError(null);

        try {
            const {
                data: { session },
                error: sessionError,
            } = await supabase.auth.getSession();

            if (sessionError || !session?.user) {
                throw new Error("Failed to fetch user session.");
            }

            const { id: userId, email } = session.user;

            // Create a Supabase Admin Client
            const adminSupabase = createServerClient();

            // Delete user from Supabase (admin API)
            const { error: adminDeleteError } = await adminSupabase.auth.admin.deleteUser(userId);

            if (adminDeleteError) {
                throw new Error(`Failed to delete user from Supabase: ${adminDeleteError.message}`);
            }

            // Call API to delete user from DynamoDB
            const response = await fetch('/api/users/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jwt: session.access_token,
                    email,
                    uid: userId,
                }),
            });

            if (!response.ok) {
                // throw new Error("Failed to delete account from DynamoDB.");
                console.error("Failed to delete account from DynamoDB.");
            }

            setSuccess("Your account has been deleted successfully.");
            supabase.auth.signOut(); // Ensure session is cleared
            router.push('/'); // Redirect to the homepage
        } catch (err) {
            console.error("Error deleting account:", err.message);
            setError("Failed to delete account. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
            {/* Header */}
            <header className="bg-gray-800 p-6">
                <h1 className="text-3xl font-bold text-center">Settings</h1>
            </header>

            {/* Main Content */}
            <main className="container mx-auto flex-grow p-6">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
                    <div className="bg-gray-800 p-6 rounded-md shadow-md">
                        <form onSubmit={handleSaveChanges} className="space-y-4">
                            <label className="block">
                                <span className="block text-sm font-medium mb-2">Email</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-md"
                                    placeholder="youremail@example.com"
                                    required
                                />
                            </label>
                            <label className="block">
                                <span className="block text-sm font-medium mb-2">New Password</span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-md"
                                    placeholder="New Password"
                                />
                            </label>
                            <label className="block">
                                <span className="block text-sm font-medium mb-2">Confirm New Password</span>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-md"
                                    placeholder="Confirm New Password"
                                />
                            </label>
                            <button
                                type="submit"
                                className={`px-6 py-3 font-semibold rounded-md shadow-md ${
                                    loading
                                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                        {success && <p className="text-green-500 mt-4">{success}</p>}
                    </div>
                </section>

                {/* Delete Account Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Danger Zone</h2>
                    <div className="bg-gray-800 p-6 rounded-md shadow-md">
                        <p className="text-red-400 mb-4">
                            Deleting your account will remove all your data. This action cannot be undone.
                        </p>
                        <button
                            onClick={handleDeleteAccount}
                            className={`px-6 py-3 font-semibold rounded-md shadow-md ${
                                isDeleting
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-red-500 text-white hover:bg-red-600'
                            }`}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Account'}
                        </button>
                    </div>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    {success && <p className="text-green-500 mt-4">{success}</p>}
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 p-6 mt-6">
                <p className="text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} ACS. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
