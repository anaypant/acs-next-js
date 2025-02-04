import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

// Initialize AWS Lambda client
const lambdaClient = new LambdaClient({
    region: process.env.AWS_REGION, // Replace with your region
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY || '',
        secretAccessKey: process.env.AWS_SECRET || '',
    },
});

// Helper function to invoke a Lambda function
export const invokeLambda = async (functionName: string, payload: any) => {
    try {
        const command = new InvokeCommand({
            FunctionName: functionName,
            Payload: Buffer.from(JSON.stringify(payload)),
        });

        const response = await lambdaClient.send(command);

        const lambdaResponse = response.Payload
            ? JSON.parse(Buffer.from(response.Payload).toString())
            : null;

        if (response.FunctionError) {
            console.error('Lambda Function Error:', response.FunctionError, lambdaResponse);
            throw new Error('Lambda function execution failed.');
        }

        return lambdaResponse;
    } catch (error) {
        console.error('Error invoking Lambda:', error);
        throw new Error('Failed to invoke Lambda function.');
    }
};
