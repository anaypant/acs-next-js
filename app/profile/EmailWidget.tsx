'use client';

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { supabase } from '../utils/supabase/supabase';

const publicEmailProviders = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];

const EmailWidget = ({ defaultDomain, customDomain, setCustomDomain }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [emailType, setEmailType] = useState(''); // 'custom' or 'public'
    const [error, setError] = useState('');
    const [verificationStatus, setVerificationStatus] = useState<'verified' | 'unverified' | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    // Function to determine email type
    const detectEmailType = (email) => {
        if (!email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }

        const domain = email.split('@')[1];
        if (publicEmailProviders.includes(domain)) {
            setEmailType('public');
        } else {
            setEmailType('custom');
        }

        setIsOpen(true);
        setError('');
    };

    const checkVerification = async () => {
        // get supabase user auth
        const user = (await supabase.auth.getUser()).data.user;
        // if no user return
        if (!user) return;
        // get user id
        const userId = user.id;
        setIsChecking(true);
        const url = `${process.env.NEXT_PUBLIC_API_URL}/users/domain/verify-email-valid`;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid: userId, newEmail: customDomain }),
        });
        // log the response body
        console.log(await response.json());

        // if response status is 200 set verification status to verified
        if (response.status === 200) {
            setVerificationStatus('verified');
        } 
        // if response status is 400 set verification status to unverified
        else {
            setVerificationStatus('unverified');
        }
        setIsChecking(false);
    };

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

            {error && <p className="text-sm text-red-400 mt-2">{error}</p>}

            {/* Align both buttons and center verification text underneath */}
            <div className="flex flex-col items-center mt-4">
                <div className="flex space-x-4">
                    <button
                        type="button"
                        onClick={() => detectEmailType(customDomain)}
                        className="py-2 px-4 bg-blue-500 hover:bg-blue-400 text-gray-100 font-bold rounded-md focus:outline-none"
                    >
                        Configure Email
                    </button>

                    <button
                        onClick={checkVerification}
                        className="py-2 px-4 bg-blue-500 hover:bg-blue-400 text-gray-100 font-bold rounded-md focus:outline-none"
                        disabled={isChecking}
                    >
                        {isChecking ? 'Checking...' : 'Check Verification'}
                    </button>
                </div>

                {/* Centered verification message */}
                {verificationStatus !== null && (
                    <p className={`mt-2 text-sm text-center ${verificationStatus === 'verified' ? 'text-green-400' : 'text-red-400'}`}>
                        {verificationStatus === 'verified' ? `✅ Email ${customDomain} is verified!` : `❌ Email ${customDomain} is not verified yet.`}
                    </p>
                )}
            </div>

            {/* Dialog for Email Configuration */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
                <div className="fixed inset-0 flex items-center justify-center">
                    <Dialog.Panel className="w-full max-w-lg bg-gray-900 p-6 rounded-md">
                        <Dialog.Title className="text-xl font-bold text-gray-100">
                            {emailType === 'public' ? 'Connect Your Email Account' : 'Configure Your ACS Email'}
                        </Dialog.Title>

                        {emailType === 'public' ? (
                            <Dialog.Description className="mt-2 text-gray-300">
                                You entered a **public email provider** (e.g., Gmail, Outlook). To send emails using this
                                address, you will need to connect your email account via OAuth.
                            </Dialog.Description>
                        ) : (
                            <Dialog.Description className="mt-2 text-gray-300">
                                To configure your ACS email, add the following **TXT record** to your domain's DNS settings:
                            </Dialog.Description>
                        )}

                        {emailType === 'custom' && (
                            <pre className="bg-gray-800 p-4 rounded-md text-sm text-gray-300 mt-4">
                                Host: {customDomain}
                                {'\n'}Type: TXT
                                {'\n'}Value: ExampleValue1234
                            </pre>
                        )}

                        {emailType === 'custom' && (
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold text-gray-100">How to Configure DNS</h4>
                                <ul className="list-disc pl-5 text-gray-300">
                                    <li>Log in to your domain registrar (e.g., GoDaddy, Namecheap).</li>
                                    <li>Navigate to the DNS settings for your domain.</li>
                                    <li>Add a new TXT record with the values provided above.</li>
                                    <li>Save your changes and wait for the DNS to propagate (may take up to 24 hours).</li>
                                </ul>
                            </div>
                        )}

                        {emailType === 'public' && (
                            <button
                                onClick={() => alert('OAuth Login Coming Soon!')}
                                className="mt-4 py-2 px-4 bg-green-500 hover:bg-green-400 text-gray-100 font-bold rounded-md"
                            >
                                Connect with OAuth
                            </button>
                        )}

                        {emailType === 'custom' && (
                            <button
                                onClick={downloadTxtFile}
                                className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-400 text-gray-100 font-bold rounded-md"
                            >
                                Download TXT File
                            </button>
                        )}

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

export default EmailWidget;
