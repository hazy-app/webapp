import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { Database } from '../../shared/types';

let client: SupabaseClient<Database> | undefined;
export function getDatabase() {
  client = client || createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_ANON_KEY as string);
  return client;
}

