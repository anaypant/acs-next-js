import { NextRequest, NextResponse } from 'next/server';

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

    // Perform any additional business logic, e.g., verifying the JWT, saving to database, etc.
    // Placeholder for database logic
    console.log('Received Data:', { jwt, email, uid });

    // Set a cookie in the response
    const response = NextResponse.json({ status: 'User created successfully!' }, { status: 201 });
    response.cookies.set('session_token', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
