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
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          console.error('Error fetching user details:', error.message);
          setError('Failed to load user details.');
          return;
        }

        if (data.user) {
          setEmail(data.user.email || '');
        }
      } catch (err) {
        console.error('Unexpected error:', err.message);
        setError('An unexpected error occurred while loading user details.');
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
      setError('Passwords do not match. Please try again.');
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

      setSuccess('Your settings have been updated successfully!');
    } catch (err: any) {
      console.error('Error updating settings:', err.message);
      setError('Failed to update settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session?.user) {
        throw new Error('Failed to fetch user session.');
      }

      const response = await fetch('/api/users/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jwt: data.session.access_token,
          email: data.session.user.email,
          uid: data.session.user.id,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to delete account.');
      }

      setSuccess('Your account has been deleted successfully.');
      await supabase.auth.signOut(); // Ensure session is cleared
      router.push('/'); // Redirect to the homepage
    } catch (err: any) {
      console.error('Error deleting account:', err.message);
      setError('Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-screen bg-[#1B1C28] text-gray-100">
      {/* Side Navigation */}
      <nav className="w-64 bg-gradient-to-b from-[#24253A] to-[#1E202D] fixed h-full shadow-lg flex flex-col items-center py-8 rounded-r-lg">
        <h2 className="text-2xl font-bold text-white mb-8">Settings</h2>
        <ul className="space-y-4 w-full px-4">
          <li>
            <button
              onClick={() => scrollToSection('account-settings')}
              className="w-full text-left text-gray-300 hover:text-white bg-[#2F3144] hover:bg-[#383A54] py-3 px-5 rounded-full shadow-md transition-all"
            >
              Account Settings
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('danger-zone')}
              className="w-full text-left text-gray-300 hover:text-white bg-[#2F3144] hover:bg-[#383A54] py-3 px-5 rounded-full shadow-md transition-all"
            >
              Danger Zone
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="ml-64 flex-grow">
        {/* Header */}
        <header className="bg-[#2D2F3E] p-8 shadow-lg rounded-b-xl">
          <h1 className="text-3xl font-extrabold text-center text-white">
            Manage Your Settings
          </h1>
        </header>

        <main className="container mx-auto px-6 py-8">
          {/* Account Settings Section */}
          <section id="account-settings" className="mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-[#8FA1D0]">Account Settings</h2>
            <div className="bg-[#24253A] p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <form onSubmit={handleSaveChanges} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#33354A] text-gray-100 rounded-lg focus:ring-2 focus:ring-[#8FA1D0]"
                    placeholder="youremail@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#33354A] text-gray-100 rounded-lg focus:ring-2 focus:ring-[#8FA1D0]"
                    placeholder="New Password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#33354A] text-gray-100 rounded-lg focus:ring-2 focus:ring-[#8FA1D0]"
                    placeholder="Confirm New Password"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-3 font-semibold rounded-lg ${
                    loading
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-[#4B5C99] text-white hover:bg-[#5C6DAA]'
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

          {/* Danger Zone Section */}
          <section id="danger-zone">
            <h2 className="text-3xl font-semibold mb-4 text-red-500">Danger Zone</h2>
            <div className="bg-[#24253A] p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <p className="text-red-400 mb-4">
                Deleting your account will remove all your data. This action cannot be undone.
              </p>
              <button
                onClick={handleDeleteAccount}
                className={`w-full py-3 font-semibold rounded-lg ${
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
      </div>
    </div>
  );
}
