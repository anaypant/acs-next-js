import axios from 'axios';

interface Thread {
    conversationId: string;
    responseId: string;
    associatedAccount: string;
    body: string;
    isFirstEmail: boolean;
    receiver: string;
    s3Location: string;
    sender: string;
    source: string;
    subject: string;
    timestamp: string;
    type: string;
}

/**
 * Fetches and processes threads from DynamoDB, grouping them by conversationId.
 *
 * @returns {Promise<Record<string, Thread[]>>} - A promise resolving to grouped email threads.
 */
export const fetchThreadsFromDynamoDB = async (): Promise<Record<string, Thread[]>> => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/users/all-threads`;
        console.log("Fetching from:", url);

        const res = await fetch(url, { credentials: 'include' });
        const data = await res.json();

        if (!data.threads) {
            console.warn("No threads found in response.");
            return {};
        }
        console.log("Raw Data:", data);

        const items: Thread[] = data.threads.map((item) => ({
            conversationId: item.id || '', // Ensure we use 'id' as 'conversationId'
            responseId: item.response_id || '',
            associatedAccount: item.associated_account || '',
            body: item.body || '', // Defaults to empty string if missing
            isFirstEmail: decodeIsFirstEmail(item.is_first), // Decode base64 is_first_email
            receiver: item.receiver || '',
            s3Location: item.s3_location || '',
            sender: item.sender || 'Unknown Sender', // Defaults to 'Unknown Sender' if missing
            source: item.source || '',
            subject: item.subject || 'No Subject', // Defaults to 'No Subject' if missing
            timestamp: item.timestamp || '', // Ensuring timestamp presence
            type: item.type || '',
        }));

        // Group emails by conversationId (id)
        const groupedThreads: Record<string, Thread[]> = items.reduce((acc, thread) => {
            if (!acc[thread.conversationId]) {
                acc[thread.conversationId] = [];
            }
            acc[thread.conversationId].push(thread);
            return acc;
        }, {} as Record<string, Thread[]>);

        // Sort emails in each conversation by timestamp
        Object.keys(groupedThreads).forEach((conversationId) => {
            groupedThreads[conversationId].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        });

        console.log("Processed Data:", groupedThreads);
        return groupedThreads;

    } catch (err) {
        console.error('DynamoDB Fetch Error:', err);
        throw new Error('Failed to fetch and process data from DynamoDB.');
    }
};

/**
 * Decodes base64-encoded is_first_email field.
 * @param encodedValue Base64 encoded string.
 * @returns Boolean indicating if it is the first email.
 */
const decodeIsFirstEmail = (encodedValue: string): boolean => {
    try {
        if (!encodedValue) return false;
        const decoded = atob(encodedValue); // Decodes Base64
        return decoded === "1"; // Convert to boolean
    } catch (error) {
        console.warn("Error decoding is_first_email:", error);
        return false;
    }
};
