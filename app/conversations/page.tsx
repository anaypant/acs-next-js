'use client';

import React, { useEffect, useState } from 'react';
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

export default function ConversationsPage() {
    const [clientId, setClientId] = useState<string | null>(null);
    const [conversations, setConversations] = useState<Email[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

        const fetchConversations = async () => {
            try {
                setLoading(true);
                const tableName = "Conversations";
                const keyConditionExpression = "associated_account = :clientId";
                const expressionAttributeValues = {
                    ":clientId": { S: clientId },
                };

                console.log("Fetching conversations for clientId:", clientId);
                const emails = await fetchEmailsFromDynamoDB(
                    tableName,
                    keyConditionExpression,
                    expressionAttributeValues,
                    "associated_account-timestamp-index"
                );

                console.log("Fetched conversations:", emails);
                setConversations(emails);
            } catch (err) {
                console.error("Error fetching conversations:", err);
                setError("Failed to load conversations. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, [clientId]);

    return (
        <div className="h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-gray-800 text-white">
            <header className="p-6 bg-gray-800 shadow-md">
                <h1 className="text-3xl font-bold">Conversations</h1>
            </header>

            <main className="p-6">
                {loading ? (
                    <p className="text-center text-lg font-semibold">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500 text-lg font-semibold">{error}</p>
                ) : (
                    <div className="space-y-6">
                        {conversations.map((conversation) => (
                            <div
                                key={conversation.conversationId}
                                className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition"
                            >
                                <h3 className="text-xl font-bold text-blue-300">{conversation.subject}</h3>
                                <p className="text-gray-400">Sender: {conversation.sender}</p>
                                <p className="text-gray-400">Receiver: {conversation.receiver}</p>
                                <p className="text-gray-500 text-sm">
                                    Timestamp: {new Date(conversation.timestamp).toLocaleString()}
                                </p>
                                <p className="text-gray-400 mt-2">{conversation.body}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
