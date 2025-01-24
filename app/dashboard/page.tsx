'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchEmailsFromDynamoDB } from '../utils/aws/functions';
import { supabase } from '../utils/supabase/supabase';

interface Email {
    conversationId: string;
    responseId: string;
    associatedAccount: string;
    body: string;
    receiver: string;
    s3Location: string;
    sender: string;
    subject: string;
    timestamp: string;
    type: string;
}

export default function DashboardPage() {
    const [clientId, setClientId] = useState<string | null>(null);
    const [threads, setThreads] = useState<Email[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchClientId = async () => {
            try {
                // Fetch clientId from Supabase session
                const { data, error } = await supabase.auth.getSession();
                if (error || !data.session) {
                    throw new Error("Failed to retrieve session.");
                }
                setClientId(data.session.user.id);
            } catch (err) {
                console.error("Error fetching client ID:", err);
                setError("Failed to retrieve client ID. Please log in again.");
            }
        };

        fetchClientId();
    }, []);

    useEffect(() => {
        if (!clientId) return;

        const fetchEmails = async () => {
            try {
                setLoading(true);

                const tableName = "Conversations";
                const keyConditionExpression = "associated_account = :clientId";
                const expressionAttributeValues = {
                    ":clientId": { S: clientId }, // Use dynamic client ID
                };

                const emails = await fetchEmailsFromDynamoDB(
                    tableName,
                    keyConditionExpression,
                    expressionAttributeValues,
                    "associated_account-timestamp-index"
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
    }, [clientId]);

    const handleThreadClick = (conversationId: string) => {
        router.push(`/conversation/${conversationId}`);
    };

    const totalConversations = threads.length;
    const unreadConversations = threads.filter((thread) => thread.type === "unread").length;

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
                    <a href="./settings" className="block py-2 px-4 rounded-md hover:bg-gray-700">Settings</a>
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

                {/* Dashboard Widgets */}
                <div className="p-6 bg-gray-700 flex justify-around items-center">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">Total Conversations</h2>
                        <p className="text-lg">{totalConversations}</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">Unread Conversations</h2>
                        <p className="text-lg">{unreadConversations}</p>
                    </div>
                </div>

                <main className="flex-1 p-6 overflow-y-auto">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        threads.map((thread) => (
                            <div
                                key={thread.conversationId}
                                className="p-4 bg-gray-800 rounded-md cursor-pointer hover:bg-gray-700"
                                onClick={() => handleThreadClick(thread.conversationId)}
                            >
                                <p className="font-bold">{thread.subject}</p>
                                <p className="text-gray-400">{thread.sender}</p>
                                <p className="text-gray-500 text-sm">{new Date(thread.timestamp).toLocaleString()}</p>
                            </div>
                        ))
                    )}
                </main>
            </div>
        </div>
    );
}
