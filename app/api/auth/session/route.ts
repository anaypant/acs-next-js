import { NextResponse } from 'next/server';
import { createServerClient } from '@/app/utils/supabase/server';


export async function GET(request: Request) {
  // Initialize the Supabase client
  const supabase = createServerClient();

  // Retrieve the session from the request
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Error fetching session:', error.message);
    return NextResponse.json({ error: 'Failed to fetch session' }, { status: 500 });
  }

    setSession(session);
    setUser(session?.user ?? null);
    setLoading(false);

  // Return the session data as JSON
  return NextResponse.json({ session }, { status: 200 });
}
