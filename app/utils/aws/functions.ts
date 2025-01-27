import axios from 'axios';

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

/**
 * Fetches items from a DynamoDB table and formats the response into a list of emails.
 *
 * @param {string} tableName - The DynamoDB table name.
 * @param {string} keyConditionExpression - The key condition expression for the query.
 * @param {Record<string, any>} expressionAttributeValues - The attribute values for the query.
 * @param {string} [indexName] - The optional index name to query.
 * @returns {Promise<Email[]>} - A promise that resolves to a list of emails.
 */
export const fetchEmailsFromDynamoDB = async (
    tableName: string,
    keyConditionExpression: string,
    expressionAttributeValues: Record<string, any>,
    indexName?: string
): Promise<Email[]> => {

    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/users/all-threads`;
        console.log(url)
        const res = await fetch(url,{credentials: "include"});
        const data = await res.json();
        
        const items = data.threads || [];

        console.log("Fetched Items:", items);

        // Map and format the data
        const formattedData: Email[] = items.map((item) => ({
            conversationId: item.id || "",
            responseId: item.response_id || "",
            associatedAccount: item.associated_account || "",
            body: item.body || "",
            receiver: item.receiver || "",
            s3Location: item.s3_location || "",
            sender: item.sender || "",
            subject: item.subject || "",
            timestamp: item.timestamp || "",
            type: item.type || "",
        }));

        // Convert the object back to an array
        return formattedData;
    } catch (err) {
        console.error("DynamoDB Error:", err);
        throw new Error("Failed to fetch data from DynamoDB.");
    }
};
