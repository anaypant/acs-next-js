import { NextResponse } from 'next/server';
import { invokeLambda } from '@/app/utils/aws/lambda';
import { supabase } from '@/app/utils/supabase/supabase';



export async function GET(request: Request) {

    try {
        // Invoke the Lambda function
        const body = await request.json();
        const {conversationId} = body
        if (!conversationId) {
            return NextResponse.json(
                { message: 'All fields are required.' },
                { status: 400 }
            );
        }

        const jwt = (await supabase.auth.getSession()).data.session?.access_token;
        
        if (!jwt) {
            return NextResponse.json({ error: "Unauthorized jwt" }, { status: 401 });
        }
        const result = await invokeLambda("YourLambdaFunctionName", {"jwt":jwt, "conversationId":conversationId}); // Replace with your Lambda function name

        // Parse the response
        const responsePayload = JSON.parse(result.Payload);

        // Return the response from Lambda
        return NextResponse.json(responsePayload);
    } catch (error) {
        console.error("Error invoking Lambda function:", error);

        // Handle errors gracefully
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
