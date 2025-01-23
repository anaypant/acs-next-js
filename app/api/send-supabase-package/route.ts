import { NextRequest, NextResponse } from 'next/server';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

// Helper function to validate request body
const validateRequestBody = (body: any) => {
  const { jwt, email, uid } = body;
  if (!jwt || !email || !uid) {
    return { valid: false, message: 'Missing required fields: jwt, email, or uid.' };
  }
  return { valid: true };
};

// POST handler
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate request body
    const { valid, message } = validateRequestBody(body);
    if (!valid) {
      return NextResponse.json({ status: 'error', message }, { status: 400 });
    }

    const { jwt, email, uid } = body;

    console.log("jwt", jwt);
    console.log("email", email);
    console.log("uid", uid);

    // Initialize AWS Lambda client
    const lambdaClient = new LambdaClient({
      region: process.env.NEXT_PUBLIC_AWS_REGION, // Replace with your region
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY || '',
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET || '',
      },
    });

    // Define the payload for Lambda
    const payload = {
      jwt,
      email,
      uid,
    };

    // Create and send the Lambda invoke command
    const command = new InvokeCommand({
      FunctionName: 'ProcessNewUserSupabase', // Replace with your Lambda function name or ARN
      Payload: Buffer.from(JSON.stringify(payload)),
    });

    // Invoke the Lambda function
    const response = await lambdaClient.send(command);

    // Decode the Lambda response
    const lambdaResponse = JSON.parse(Buffer.from(response.Payload || '').toString());

    // Handle the Lambda response
    if (response.FunctionError) {
      console.error('Lambda Error:', response.FunctionError, lambdaResponse);
      return NextResponse.json(
        { status: 'error', message: 'Lambda function execution failed.' },
        { status: 500 }
      );
    }

    console.log('Lambda Response:', lambdaResponse);
    return NextResponse.json({ status: 'success', data: lambdaResponse }, { status: 200 });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
