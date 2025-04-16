import InPageSidebar from "@/components/in-page-sidebar";
import { updateClient } from "@/utils/update";
import useSWR from "swr";

async function getEntitlements() {
  const { data, error } = await updateClient.entitlements.check("premium");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export default function ProtectedSidebar() {
  const { data } = useSWR<{ hasAccess: boolean }>(
    "entitlements",
    getEntitlements
  );

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
          disabled: data != null && !data.hasAccess,
        },
      ]}
    />
  );
}
