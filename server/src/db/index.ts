import { createClient } from '@supabase/supabase-js';
import { config } from '../config';

if (!config.supabaseUrl || !config.supabaseServiceKey) {
  console.warn("Supabase credentials missing. Database operations will fail.");
}

// We use the service_role key to bypass RLS for administrative actions or custom backend checks
export const supabase = createClient(
  config.supabaseUrl || '',
  config.supabaseServiceKey || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
