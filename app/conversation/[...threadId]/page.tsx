'use client';
console.log("Lets go bitches")
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DynamoDBClient, QueryCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import dynamoDBClient from "@/app/utils/aws/dynamodb";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {UpdateItemCommand} from "@aws-sdk/client-dynamodb";

interface Message {
    emailId: string;
    timestamp: string;
    from: string;
    to: string;
    subject: string;
    body: string;
}

export default function ConversationPage() {
    const  threadId  = useParams().threadId[0];
    const [isMounted, setIsMounted] = useState(false); // Ensure hydration consistency
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState({
        to: '',
        subject: '',
        body: '',
    });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [randomScore, setRandomScore] = useState(0);

    // Ensure the component only renders on the client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setRandomScore(Math.floor(Math.random() * 100) + 1); // Generate random score on client
    }, []);

    const fetchConversation = async () => {
        try {
            const client = dynamoDBClient();
            const params = {
                TableName: "sampleEmailTable2",
                KeyConditionExpression: "ClientID = :clientId AND begins_with(#sortKey, :threadId)",
                ExpressionAttributeNames: {
                    "#sortKey": "ThreadID#MessageID",
                },
                ExpressionAttributeValues: {
                    ":clientId": { S: "anay" },
                    ":threadId": { S: threadId },
                },
            };

            const command = new QueryCommand(params);
            const response = await client.send(command);
            const items = response.Items || [];

            const formattedMessages: Message[] = items.map((item) => {
                const compositeKey = item["ThreadID#MessageID"]?.S || "";
                const [_, messageId] = compositeKey.split("#");

                return {
                    emailId: messageId || "",
                    timestamp: item.Timestamp?.S || "",
                    from: item.From?.S || "",
                    to: item.To?.S || "",
                    subject: item.Subject?.S || "",
                    body: item.Body?.S || "",
                    read: item.Read?.S || "",
                };
            });

            // set the "read" value of all messages with the same threadID and clientID to be true
            const fetchConversation = async () => {
                try {
                    const client = dynamoDBClient();
                    const params = {
                        TableName: "sampleEmailTable2",
                        KeyConditionExpression: "ClientID = :clientId AND begins_with(#sortKey, :threadId)",
                        ExpressionAttributeNames: {
                            "#sortKey": "ThreadID#MessageID",
                        },
                        ExpressionAttributeValues: {
                            ":clientId": { S: "anay" },
                            ":threadId": { S: threadId },
                        },
                    };

                    const command = new QueryCommand(params);
                    const response = await client.send(command);
                    const items = response.Items || [];

                    const formattedMessages: Message[] = items.map((item) => {
                        const compositeKey = item["ThreadID#MessageID"]?.S || "";
                        const [_, messageId] = compositeKey.split("#");

                        return {
                            emailId: messageId || "",
                            timestamp: item.Timestamp?.S || "",
                            from: item.From?.S || "",
                            to: item.To?.S || "",
                            subject: item.Subject?.S || "",
                            body: item.Body?.S || "",
                        };
                    });

                    // Sort messages by timestamp in descending order
                    formattedMessages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

                    // Update the most recent message to set its "read" attribute to true
                    if (formattedMessages.length > 0) {
                        const mostRecentMessage = formattedMessages[0];
                        const updateParams = {
                            TableName: "sampleEmailTable2",
                            Key: {
                                ClientID: { S: "anay" },
                                "ThreadID#MessageID": { S: `${threadId}#${mostRecentMessage.emailId}` },
                            },
                            UpdateExpression: "SET #read = :read",
                            ExpressionAttributeNames: {
                                "#read": "Read",
                            },
                            ExpressionAttributeValues: {
                                ":read": { S: "true" },
                            },
                        };

                        const updateCommand = new UpdateItemCommand(updateParams);
                        await client.send(updateCommand);
                        console.log(`Marked message ${mostRecentMessage.emailId} as read.`);
                    }

                    setMessages(formattedMessages);
                } catch (err) {
                    console.error("Error fetching conversation:", err);
                    setError("Failed to load conversation.");
                } finally {
                    setLoading(false);
                }
            };



            // Sort messages by timestamp in descending order
            formattedMessages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

            // Update the most recent message to set its "read" attribute to true
            if (formattedMessages.length > 0) {
                const mostRecentMessage = formattedMessages[0];
                const updateParams = {
                    TableName: "sampleEmailTable2",
                    Key: {
                        ClientID: { S: "anay" },
                        "ThreadID#MessageID": { S: `${threadId}#${mostRecentMessage.emailId}` },
                    },
                    UpdateExpression: "SET #read = :read",
                    ExpressionAttributeNames: {
                        "#read": "Read",
                    },
                    ExpressionAttributeValues: {
                        ":read": { S: "true" },
                    },
                };

                const updateCommand = new UpdateItemCommand(updateParams);
                await client.send(updateCommand);
                console.log(`Marked message ${mostRecentMessage.emailId} as read.`);
            }


            setMessages(formattedMessages);
        } catch (err) {
            console.error("Error fetching conversation:", err);
            setError("Failed to load conversation.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!threadId) return;
        fetchConversation();
    }, [threadId]);

    if (!isMounted) {
        return null; // Avoid mismatches by not rendering until mounted
    }

    const handleResponseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResponse((prev) => ({ ...prev, [name]: value }));
    };

    const handleSendResponse = async (e: React.FormEvent) => {
        e.preventDefault();

        const client = dynamoDBClient();
        let newMessageId = 1;
        const timestamp = new Date().toISOString();

        try {
            const queryParams = {
                TableName: "sampleEmailTable2",
                KeyConditionExpression: "ClientID = :clientId AND begins_with(#sortKey, :threadId)",
                ExpressionAttributeNames: {
                    "#sortKey": "ThreadID#MessageID",
                },
                ExpressionAttributeValues: {
                    ":clientId": { S: "anay" },
                    ":threadId": { S: threadId[0] },
                },
            };

            const queryCommand = new QueryCommand(queryParams);
            const queryResponse = await client.send(queryCommand);

            const items = queryResponse.Items || [];
            const messageIds = items.map((item) => {
                const compositeKey = item["ThreadID#MessageID"]?.S || "";
                const [_, messageId] = compositeKey.split("#");
                return parseInt(messageId, 10);
            });

            if (messageIds.length > 0) {
                newMessageId = Math.max(...messageIds) + 1;
            }

            const newCompositeKey = `${threadId[0]}#${String(newMessageId).padStart(3, "0")}`;

            const putParams = {
                TableName: "sampleEmailTable2",
                Item: {
                    ClientID: { S: "anay" },
                    "ThreadID#MessageID": { S: newCompositeKey },
                    Timestamp: { S: timestamp },
                    From: { S: "anaypant212@gmail.com" },
                    To: { S: response.to },
                    Subject: { S: response.subject },
                    Body: { S: response.body },
                },
            };

            const putCommand = new PutItemCommand(putParams);
            await client.send(putCommand);
            alert("Response sent successfully!");

            setResponse({
                to: "",
                subject: "",
                body: "",
            });

            fetchConversation();
            setIsFormVisible(false);
        } catch (err) {
            console.error("Error sending response:", err);
            alert("Failed to send response.");
        }
    };


    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-100 overflow-hidden">
            <header className="p-6 bg-gray-800 sticky top-0 z-10">
                <h1 className="text-2xl font-bold">Conversation</h1>
                {threadId && <p className="text-gray-400">Thread ID: {threadId}</p>}
            </header>

            <section className="p-6 bg-gray-700">
                <div className="flex justify-between items-center">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">Total Emails</h2>
                        <p className="text-lg">{messages.length}</p>
                    </div>
                    <div style={{ width: 120, height: 120 }}>
                        <CircularProgressbar
                            value={randomScore}
                            text={`${randomScore}%`}
                            styles={buildStyles({
                                textColor: "#ffffff",
                                pathColor: "#4CAF50",
                                trailColor: "#1e293b",
                            })}
                        />
                    </div>
                </div>
            </section>

            <main className="flex-1 p-6 overflow-y-auto">
                {loading ? (
                    <p>Loading conversation...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : messages.length === 0 ? (
                    <p>No messages found for this thread.</p>
                ) : (
                    <div className="space-y-2">
                        {messages.map((message, index) => (
                            <div key={index} className="p-4 bg-gray-800 rounded-md">
                                <p className="text-sm text-gray-400">{message.timestamp}</p>
                                <p><strong>From:</strong> {message.from}</p>
                                <p><strong>To:</strong> {message.to}</p>
                                <p><strong>Subject:</strong> {message.subject}</p>
                                <p className="mt-2">{message.body}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <div className="p-6 bg-gray-800 flex justify-center">
                <button
                    onClick={() => setIsFormVisible((prev) => !prev)}
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    {isFormVisible ? "Hide Response Form" : "Send a Response"}
                </button>
            </div>

            {isFormVisible && (
                <div className="fixed bottom-0 left-0 w-full p-6 bg-gray-900 border-t border-gray-700 z-20">
                    <h2 className="text-lg font-semibold mb-4">Send a Response</h2>
                    <form onSubmit={handleSendResponse} className="space-y-4">
                        <input
                            type="email"
                            name="to"
                            value={response.to}
                            onChange={handleResponseChange}
                            placeholder="Recipient Email"
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-md"
                        />
                        <input
                            type="text"
                            name="subject"
                            value={response.subject}
                            onChange={handleResponseChange}
                            placeholder="Subject"
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-md"
                        />
                        <textarea
                            name="body"
                            value={response.body}
                            onChange={handleResponseChange}
                            placeholder="Your message"
                            required
                            rows={4}
                            className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-md"
                        ></textarea>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                        >
                            Send Response
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
