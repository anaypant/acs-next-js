import { NextRequest, NextResponse } from "next/server";
import {supabase} from "@/app/utils/supabase/supabase";
import {invokeLambda} from "@/app/utils/aws/lambda";
import {createServerClient} from "@/app/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { jwt, email, uid } = await req.json();

    if (!jwt || !email || !uid) {
      return NextResponse.json(
          { error: "Missing required fields: jwt, email, uid" },
          { status: 400 }
      );
    }


    // Step 1: Verify JWT with Supabase
    const { data, error: verifyError } = await supabase.auth.getUser(jwt);

    console.log("Supabase response:", data); // Debugging: Log the entire response structure

    const user = data?.user; // Adjust path based on response structure


    if (verifyError || !user || user.id !== uid || user.email !== email) {
      return NextResponse.json(
          { error: "Unauthorized request or invalid JWT token." },
          { status: 401 }
      );
    }

    // Step 2: Invoke Lambda with clientId payload
    const lambdaPayload = { clientId: uid };
    const lambdaResponse = await invokeLambda("DeleteUserSupabase", lambdaPayload);
    console.log(lambdaResponse);

    if (!lambdaResponse || lambdaResponse.statusCode !== 200) {
      return NextResponse.json(
          { error: "Failed to delete user from DynamoDB." },
          { status: 500 }
      );
    }

    // Step 3: Delete user from Supabase
    const adminClient = createServerClient();
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(uid);

    if (deleteError) {
      return NextResponse.json(
          { error: "Failed to delete user from Supabase." },
          { status: 500 }
      );
    }

    return NextResponse.json({ message: "User deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
        { error: "An error occurred while processing the request." },
        { status: 500 }
    );
  }
}
