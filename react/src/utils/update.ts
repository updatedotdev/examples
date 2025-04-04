import { createClient } from "@updatedev/js/supabase";

export const updateClient = createClient(
  import.meta.env.VITE_UPDATE_PUBLIC_KEY!,
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);
