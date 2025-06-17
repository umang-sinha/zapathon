import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

export function getSupabaseClient(): SupabaseClient<any, "public", any> {
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE } = process.env;

  let supabaseClient: any;

  if (!SUPABASE_SERVICE_ROLE || !SUPABASE_URL) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE in .env");
  }

  supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

  return supabaseClient;
}
