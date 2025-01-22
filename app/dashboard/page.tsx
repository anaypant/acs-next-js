'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use this instead of next/router
import { fetchEmailsFromDynamoDB } from '../utils/aws/functions';

interface Email {
    clientId: string;
    threadId: string;
    emailId: string;
    timestamp: string;
    from: string;
    to: string;
    subject: string;
    body: string;
    read: string;
}

export default function DashboardPage() {
    const [threads, setThreads] = useState<Email[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter(); // Initialize useRouter here

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const tableName = "sampleEmailTable2";
                const keyConditionExpression = "ClientID = :clientId";
                const expressionAttributeValues = {
                    ":clientId": { S: "anay" }, // Replace "anay" with dynamic data if needed
                };

                const emails = await fetchEmailsFromDynamoDB(
                    tableName,
                    keyConditionExpression,
                    expressionAttributeValues
                );

                setThreads(emails);
            } catch (err) {
                console.error("Error fetching emails:", err);
                setError("Failed to load emails. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, []);

    const handleThreadClick = (threadId: string) => {
        console.log(`Navigating to /conversation/${threadId}`);
        router.push(`/conversation/${threadId}`); // Use router.push for navigation
    };

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            {/* Sidebar */}
            <aside className="w-1/4 bg-gray-800 flex flex-col p-6">
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <nav className="space-y-4">
                    <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-700">Overview</a>
                    <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-700">Drafts</a>
                    <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-700">Contacts</a>
                    <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-700">Conversations</a>
                    <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-700">Billing</a>
                    <a
                        href="./settings"
                        className="block py-2 px-4 rounded-md hover:bg-gray-700"
                    >
                        Settings
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="p-6 bg-gray-800 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Email Dashboard</h1>
                    <button
                        onClick={() => router.push("./")}
                        className="px-4 py-2 bg-blue-500 text-gray-100 rounded-md hover:bg-blue-600"
                    >
                        Home
                    </button>
                </header>

                <div className="p-6 bg-gray-700 flex justify-between items-center rounded-md">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">Total Threads</h2>
                        <p className="text-lg">{threads.length}</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">Total Senders</h2>
                        <p className="text-lg">{new Set(threads.map(email => email.from)).size}</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">Unread Threads</h2>
                        <p className="text-lg">{threads.filter(email => email.read === "").length}</p>
                    </div>
                </div>

                <main className="flex-1 p-6 overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-4">Email Threads</h2>
                    {loading ? (
                        <p>Loading threads...</p>
                    ) : error ? (
                        <p className="text-red-500">Error: {error}</p>
                    ) : threads.length === 0 ? (
                        <p>No threads found.</p>
                    ) : (
                        <div className="space-y-4">
                            {threads.map((thread, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-gray-800 rounded-md flex items-center justify-between cursor-pointer hover:bg-gray-700"
                                    onClick={() => handleThreadClick(thread.threadId)}
                                >
                                    <div>
                                        <div className="mb-2">
                                            <p><strong>Thread:</strong> {thread.from}</p>
                                        </div>
                                        <p className="text-gray-300 text-sm">
                                            Last updated: {new Date(thread.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                    {/* Notification Badge */}
                                    {thread.read === "" && (
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
