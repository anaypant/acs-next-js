import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import dynamoDBClient from "@/app/utils/aws/dynamodb";

// Initialize Supabase Admin client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Initialize AWS DynamoDB client
const client = dynamoDBClient();

export async function POST(req: NextRequest) {
  try {
    const { jwt, email, uid } = await req.json();

    if (!jwt || !email || !uid) {
      return NextResponse.json(
        { error: "Missing required fields: jwt, email, uid" },
        { status: 400 }
      );
    }

    // Step 1: Verify the JWT token using Supabase Admin API
    const { data: user, error: verifyError } = await supabaseAdmin.auth.getUser(jwt);

    if (verifyError || !user || user.id !== uid || user.email !== email) {
      return NextResponse.json(
        { error: "Unauthorized request or invalid JWT token." },
        { status: 401 }
      );
    }

    // Step 2: Delete user entry from DynamoDB
    const deleteParams = {
      TableName: "Users", // DynamoDB table name from env
      Key: {
        email: { S: email }, // Assuming the primary key in your DynamoDB table is "email"
      },
    };

    const deleteCommand = new DeleteItemCommand(deleteParams);
    await client.send(deleteCommand);

    // Step 3: Respond with success
    return NextResponse.json({ status: "User deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user. Please try again later." },
      { status: 500 }
    );
  }
}
