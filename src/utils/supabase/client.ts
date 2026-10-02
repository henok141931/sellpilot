import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = "https://upztjqxxqzfdrhiyqnso.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_z99lgOtYszVmZn5kvo0yXQ_kdXn30_5";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || SUPABASE_URL);
const supabaseKey = SUPABASE_ANON_KEY;

export const createClient = () =>
  createBrowserClient(
    supabaseUrl!,
    supabaseKey!,
  );
