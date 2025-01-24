import { QueryCommand } from '@aws-sdk/client-dynamodb';
import dynamoDBClient from "@/app/utils/aws/dynamodb";

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
    const client = dynamoDBClient();

    try {
        const params = {
            TableName: tableName,
            KeyConditionExpression: keyConditionExpression,
            ExpressionAttributeValues: expressionAttributeValues,
        };

        if (indexName) {
            params.IndexName = indexName;
        }

        const command = new QueryCommand(params);
        const response = await client.send(command);
        const items = response.Items || [];

        console.log("Fetched Items:", items);

        // Map and format the data
        const formattedData: Email[] = items.map((item) => ({
            conversationId: item.conversation_id?.S || "",
            responseId: item.response_id?.S || "",
            associatedAccount: item.associated_account?.S || "",
            body: item.body?.S || "",
            receiver: item.receiver?.S || "",
            s3Location: item.s3_location?.S || "",
            sender: item.sender?.S || "",
            subject: item.subject?.S || "",
            timestamp: item.timestamp?.S || "",
            type: item.type?.S || "",
        }));

        // Group and retain the most recent response per conversation
        const mostRecentResponses: { [key: string]: Email } = {};
        formattedData.forEach((email) => {
            if (
                !mostRecentResponses[email.conversationId] ||
                new Date(email.timestamp) > new Date(mostRecentResponses[email.conversationId].timestamp)
            ) {
                mostRecentResponses[email.conversationId] = email;
            }
        });

        // Convert the object back to an array
        return Object.values(mostRecentResponses);
    } catch (err) {
        console.error("DynamoDB Error:", err);
        throw new Error("Failed to fetch data from DynamoDB.");
    }
};
