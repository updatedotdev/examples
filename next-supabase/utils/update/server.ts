import { createClient } from "@updatedev/js";
import { createSupabaseClient } from "../supabase/server";

export async function createUpdateClient() {
  return createClient(process.env.NEXT_PUBLIC_UPDATE_PUBLISHABLE_KEY!, {
    getSessionToken: async () => {
      const supabase = await createSupabaseClient();
      const { data } = await supabase.auth.getSession();
      if (data.session == null) return;
      return data.session.access_token;
    },
    environment: process.env.NODE_ENV === "production" ? "live" : "test",
  });
}
