import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

/**
 * Returns the Supabase client, or null if the required environment variables
 * (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) are not set.
 * Always null-check the return value before use so missing credentials
 * cannot crash the existing TICA site.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseClient) return supabaseClient

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseClient
}

/** Returns true only when both Supabase env vars are present. */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
  )
}
