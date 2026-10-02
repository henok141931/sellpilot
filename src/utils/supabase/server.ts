import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const SUPABASE_URL = "https://upztjqxxqzfdrhiyqnso.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_z99lgOtYszVmZn5kvo0yXQ_kdXn30_5";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || SUPABASE_URL);
const supabaseKey = SUPABASE_ANON_KEY;

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};
