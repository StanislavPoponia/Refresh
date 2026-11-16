import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** null, якщо ключі Supabase не задані (див. .env.example). */
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export const IMAGES_BUCKET = 'product-images';
