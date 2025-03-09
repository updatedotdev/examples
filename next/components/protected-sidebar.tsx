import InPageSidebar from "@/components/in-page-sidebar";
import { createClient } from "@/utils/update/server";

export default async function ProtectedSidebar() {
  const client = await createClient();
  const { data } = await client.billing.getSubscriptions();
  const hasAccessToPaidContent =
    data.subscriptions != null && data.subscriptions.length > 0;

  return (
    <InPageSidebar
      basePath="/protected"
      items={[
        {
          label: "Account",
          href: "/",
        },
        {
          label: "Pricing",
          href: "/pricing",
        },
        {
          label: "Subscription",
          href: "/subscription",
        },
        {
          label: "Paid Content",
          href: "/paid-content",
          disabled: !hasAccessToPaidContent,
        },
      ]}
    />
  );
}
