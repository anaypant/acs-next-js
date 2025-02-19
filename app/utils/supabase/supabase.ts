import { createClient } from '@supabase/supabase-js';

const isProd = process.env.NODE_ENV === 'production';
const SUPABASE_URL = isProd ? process.env.NEXT_PUBLIC_SUPABASE_URL : process.env.NEXT_PUBLIC_SUPABASE_DEV_URL;
const SUPABASE_ANON_KEY = isProd ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : process.env.NEXT_PUBLIC_SUPABASE_DEV_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase URL or ANON KEY');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
