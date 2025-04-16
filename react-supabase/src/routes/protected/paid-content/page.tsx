import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PaidContentCard from "@/components/paid-content-card";
import { updateClient } from "@/utils/update";
import useSWR from "swr";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "react-router";

async function getEntitlements() {
  const { data, error } = await updateClient.entitlements.check("premium");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export default function PaidContentPage() {
  const { data, error } = useSWR<{ hasAccess: boolean }>(
    "entitlements",
    getEntitlements
  );

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="mt-2 text-muted-foreground">
            There was an error fetching your subscriptions.
          </p>
        </Card>
      </div>
    );
  }

  if (data == null) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!data.hasAccess) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">No Access</h2>
          <p className="mt-2 text-muted-foreground">
            You don&apos;t have access to any paid content.
          </p>
          <Button className="mt-4" variant="outline" asChild>
            <Link to="/protected/pricing">Upgrade Now</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium">Cat Photo Generator</h1>
        <p className="text-muted-foreground mt-2">Generate cat photos</p>
      </div>
      <PaidContentCard className="mt-4" />
    </div>
  );
}
