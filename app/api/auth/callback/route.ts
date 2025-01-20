import { NextResponse } from 'next/server';
import { createServerClient } from '@/app/utils/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/';
  const origin = url.origin;

  if (code) {
    // Initialize Supabase client
    const supabase = createServerClient();

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';

      if (isLocalEnv) {
        // No load balancer in local environment
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        // Use X-Forwarded-Host for production
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }

    console.error('Supabase Auth error:', error.message);
  }

  // Redirect to an error page if the code is invalid or missing
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
