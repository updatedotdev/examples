import { supabaseClient } from "@/utils/supabase";
import { createClient } from "@updatedev/js";

export const updateClient = createClient(
  import.meta.env.VITE_UPDATE_PUBLISHABLE_KEY!,
  {
    getSessionToken: async () => {
      const { data } = await supabaseClient.auth.getSession();
      if (data.session == null) return;
      return data.session.access_token;
    },
  }
);
