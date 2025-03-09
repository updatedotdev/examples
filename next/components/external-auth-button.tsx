"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/update/client";

export default function ExternalAuthButton() {
  async function openExternalLogin() {
    const client = createClient();
    const { data, error } = await client.auth.createAuthFlowLink();
    if (error) {
      return;
    }

    window.location.href = data.url;
  }

  return <Button onClick={openExternalLogin}>Open Auth Flow</Button>;
}
