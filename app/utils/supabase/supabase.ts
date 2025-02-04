import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY supabase util file');
}

// pass in url and key from .env file
export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
