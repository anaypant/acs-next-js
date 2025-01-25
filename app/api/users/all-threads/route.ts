import { NextResponse } from 'next/server';
import { invokeLambda } from '@/app/utils/aws/lambda';
import { supabase } from '@/app/utils/supabase/supabase';



export async function GET() {

    try {
        // Invoke the Lambda function
        const jwt = (await supabase.auth.getSession()).data.session?.access_token;

        if (!jwt) {
            return NextResponse.json({ error: "Unauthorized jwt" }, { status: 401 });
        }
        const result = await invokeLambda("YourLambhdaFunctionName", {"jwt":jwt}); // Replace with your Lambda function name

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
