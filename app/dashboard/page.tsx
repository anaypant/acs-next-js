'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchEmailsFromDynamoDB } from '../utils/aws/functions';
import { supabase } from '../utils/supabase/supabase';
import { FaHome, FaDraftingCompass, FaUserFriends, FaEnvelope, FaCreditCard, FaCog } from 'react-icons/fa';

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
                    ":clientId": { S: clientId },
                };

                const emails = await fetchEmailsFromDynamoDB(
                    tableName,
                    keyConditionExpression,
                    expressionAttributeValues,
                    "associated_account-is_first_email-index"
                );
                console.log("Fetched emails:", emails);
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
        <div className="flex h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-gray-800 text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 p-6 flex flex-col shadow-lg">
                <h2 className="text-3xl font-bold mb-8 tracking-wide text-center">Dashboard</h2>
                <nav className="flex flex-col space-y-4">
                    <SidebarLink
                        icon={<FaHome />}
                        label="Overview"
                        onClick={() => router.push('/dashboard')}
                    />
                    <SidebarLink
                        icon={<FaDraftingCompass />}
                        label="Drafts"
                        onClick={() => router.push('/drafts')}
                    />
                    <SidebarLink
                        icon={<FaUserFriends />}
                        label="Contacts"
                        onClick={() => router.push('/contacts')}
                    />
                    <SidebarLink
                        icon={<FaEnvelope />}
                        label="Conversations"
                        onClick={() => router.push('/conversations')}
                    />
                    <SidebarLink
                        icon={<FaCreditCard />}
                        label="Billing"
                        onClick={() => router.push('/billing')}
                    />
                    <SidebarLink
                        icon={<FaCog />}
                        label="Settings"
                        onClick={() => router.push('/settings')}
                    />
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="p-6 bg-gray-800 flex justify-between items-center shadow-md">
                    <h1 className="text-3xl font-extrabold tracking-wider">Email Dashboard</h1>
                    <button
                        onClick={() => router.push("./")}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        Home
                    </button>
                </header>

                {/* Dashboard Widgets */}
                <div className="p-6 grid grid-cols-2 gap-6">
                    <DashboardWidget title="Total Conversations" value={totalConversations} />
                    <DashboardWidget title="Unread Conversations" value={unreadConversations} />
                </div>

                {/* Email Threads */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {loading ? (
                        <p className="text-center text-lg font-semibold">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-500 text-lg font-semibold">{error}</p>
                    ) : (
                        <div className="space-y-6">
                            {threads.map((thread) => (
                                <div
                                    key={thread.conversationId}
                                    className="p-6 bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-all"
                                    onClick={() => handleThreadClick(thread.conversationId)}
                                >
                                    <h3 className="text-lg font-bold text-blue-300">{thread.subject}</h3>
                                    <p className="text-gray-400 mt-1">{thread.sender}</p>
                                    <p className="text-gray-500 text-sm mt-2">{new Date(thread.timestamp).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

function SidebarLink({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center space-x-3 text-left px-4 py-3 rounded-lg hover:bg-blue-700 transition-all"
        >
            <span className="text-lg">{icon}</span>
            <span className="font-medium">{label}</span>
        </button>
    );
}

function DashboardWidget({ title, value }: { title: string; value: number }) {
    return (
        <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
    );
}
