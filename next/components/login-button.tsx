"use client";

import { createClient } from "@/utils/update/client";

export default function LoginButton() {
  async function handleLogin() {
    const client = createClient();
    const { data, error } = await client.auth.createAuthFlowLink();
    if (error != null) {
      console.error(error);
      return;
    }
    window.location.href = data.url;
  }

  return <button onClick={handleLogin}>Login</button>;
}
