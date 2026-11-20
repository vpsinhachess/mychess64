/* Supabase connection settings.
 * Copy these two values from Supabase: Project Settings -> API.
 * The anon (public) key is safe to ship in the browser: every table is protected by
 * the Row Level Security rules in supabase/schema.sql. NEVER put the service_role key here. */
window.MC64_CONFIG = {
  SUPABASE_URL: 'https://YOUR-PROJECT-REF.supabase.co',
  SUPABASE_ANON_KEY: 'YOUR-ANON-PUBLIC-KEY'
};
