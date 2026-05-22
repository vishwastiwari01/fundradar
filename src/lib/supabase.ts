import { createClient } from '@supabase/supabase-js';

const getSupabaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || url === 'undefined' || url === 'null' || !url.startsWith('http')) {
    return 'https://placeholder.supabase.co';
  }
  return url;
};

const getSupabaseAnonKey = (): string => {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key || key === 'undefined' || key === 'null') {
    return 'placeholder';
  }
  return key;
};

const supabaseUrl = getSupabaseUrl();
const supabaseAnonKey = getSupabaseAnonKey();

if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder') {
  console.warn('Supabase URL or Anon Key is missing or invalid. Check your .env.local file or Vercel environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
