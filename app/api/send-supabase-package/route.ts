import { NextRequest, NextResponse } from 'next/server';
import { invokeLambda } from '../../utils/aws/lambda';

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

    // Define the payload for Lambda
    const payload = {
      jwt,
      email,
      uid,
    };

    // Invoke the Lambda function
    const lambdaResponse = await invokeLambda('ProcessNewUserSupabase', payload);

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
