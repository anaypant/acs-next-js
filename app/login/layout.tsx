'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase/supabase';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('User signed in:', session);
        router.push('/loading'); // Redirect to loading page after login
      } else if (event === 'SIGNED_OUT') {
        router.push('/login'); // Redirect back to login on logout
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [router]);

  return <>{children}</>;
}
