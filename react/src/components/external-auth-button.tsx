import { Button } from "@/components/ui/button";
import { updateClient } from "@/utils/update";
export default function ExternalAuthButton() {
  async function openExternalLogin() {
    const { data, error } = await updateClient.auth.createAuthFlowLink();
    if (error) {
      return;
    }

    window.location.href = data.url;
  }

  return <Button onClick={openExternalLogin}>Open Auth Flow</Button>;
}
