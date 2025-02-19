import { createClient } from '@supabase/supabase-js';
import { supabase } from './supabase';

export const createServerClient = () => {
  // Identify prod or dev environment
  const isProd = process.env.NODE_ENV === 'production';
  let supabaseUrl = null;
  let supabaseServiceKey = null;
  if (isProd) {
    supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  }
  else {
    supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_DEV_URL;
    supabaseServiceKey = process.env.SUPABASE_DEV_SERVICE_ROLE_KEY;
    console.log("DEV ENVIRONMENT");
  }
  console.log('SUPABASE_URL:', supabaseUrl);

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseServiceKey);
};
