'use client';

import React, { useEffect, useState } from 'react';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import dynamoDBClient from "@/app/utils/aws/dynamodb";
import { useRouter } from 'next/navigation';

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

const client = dynamoDBClient();

export default function DashboardPage() {
    const [threads, setThreads] = useState<Email[]>([]); // Store the most recent email for each thread
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const params = {
                    TableName: "sampleEmailTable2",
                    KeyConditionExpression: "ClientID = :clientId",
                    ExpressionAttributeValues: {
                        ":clientId": { S: "anay" },
                    },
                };

                const command = new QueryCommand(params);
                const response = await client.send(command);
                const items = response.Items || [];

                // Map and format the data
                const formattedData: Email[] = items.map((item) => {
                    const compositeKey = item["ThreadID#MessageID"]?.S || ""; // Composite key
                    const [threadId] = compositeKey.split("#"); // Extract ThreadID

                    return {
                        clientId: item.ClientID?.S || "",
                        threadId: threadId || "",
                        emailId: compositeKey.split("#")[1] || "",
                        timestamp: item.Timestamp?.S || "",
                        from: item.From?.S || "",
                        to: item.To?.S || "",
                        subject: item.Subject?.S || "",
                        body: item.Body?.S || "",
                        read: item.Read?.S || "",
                    };
                });

                // Group and retain the most recent email per thread
                const mostRecentEmails: { [key: string]: Email } = {};
                formattedData.forEach((email) => {
                    if (
                        !mostRecentEmails[email.threadId] ||
                        new Date(email.timestamp) > new Date(mostRecentEmails[email.threadId].timestamp)
                    ) {
                        mostRecentEmails[email.threadId] = email;
                    }
                });

                // Convert the object back to an array
                const uniqueThreads = Object.values(mostRecentEmails);

                setThreads(uniqueThreads);
            } catch (err) {
                console.error("DynamoDB Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, []);

    const handleThreadClick = (threadId: string) => {
        console.log(`Navigating to /conversation/${threadId}`);
        router.push(`/conversation/${threadId}`);
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
                    <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-700">Settings</a>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="p-6 bg-gray-800">
                    <h1 className="text-2xl font-bold mb-4">Email Dashboard</h1>
                    <div className="flex justify-between items-center bg-gray-700 p-4 rounded-md">
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
                </header>

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
