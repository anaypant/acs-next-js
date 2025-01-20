import { createServerClient } from '../../../utils/supabase/server';

export async function GET() {
  const supabase = createServerClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ session }), { status: 200 });
}
