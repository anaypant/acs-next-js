import { QueryCommand } from '@aws-sdk/client-dynamodb';
import dynamoDBClient from "@/app/utils/aws/dynamodb";

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

/**
 * Fetches items from a DynamoDB table and formats the response into a list of emails.
 *
 * @param {string} tableName - The DynamoDB table name.
 * @param {string} keyConditionExpression - The key condition expression for the query.
 * @param {Record<string, any>} expressionAttributeValues - The attribute values for the query.
 * @returns {Promise<Email[]>} - A promise that resolves to a list of emails.
 */
export const fetchEmailsFromDynamoDB = async (
    tableName: string,
    keyConditionExpression: string,
    expressionAttributeValues: Record<string, any>
): Promise<Email[]> => {
    const client = dynamoDBClient(); // Replace 'your-region' with your AWS region

    try {
        const params = {
            TableName: tableName,
            KeyConditionExpression: keyConditionExpression,
            ExpressionAttributeValues: expressionAttributeValues,
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
        return Object.values(mostRecentEmails);
    } catch (err) {
        console.error("DynamoDB Error:", err);
        throw new Error("Failed to fetch data from DynamoDB.");
    }
};
