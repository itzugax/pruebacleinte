import { createClient } from '@supabase/supabase-js';

// Usamos strings vacíos como fallback para que Next.js no falle durante el "build" en Vercel
// si olvidaste colocar las variables de entorno.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ejemplo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'ejemplo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
