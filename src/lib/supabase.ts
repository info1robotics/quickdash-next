import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { writable } from 'svelte/store';

const supabaseUrl = import.meta.env.VITE_SVELTE_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SVELTE_APP_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const user = writable(supabase.auth.user());

supabase.auth.onAuthStateChange((_, session) => {
    user.set(session?.user?? null);
});
