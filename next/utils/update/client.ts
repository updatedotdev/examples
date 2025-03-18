import { createBrowserClient } from "@updatedev/ssr/supabase";

export function createClient() {
  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_UPDATE_PUBLIC_KEY!,
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      billing: {
        environment: process.env.NODE_ENV === "production" ? "live" : "test",
      },
    }
  );
  return client;
}
