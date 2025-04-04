import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { updateClient } from "@/utils/update";
import { Subscription } from "@updatedev/js";
import { useState } from "react";

export default function SubscriptionActions({
  subscription,
  mutate,
}: {
  subscription: Subscription;
  mutate: () => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleCancelSubscription(id: string) {
    setIsLoading(true);
    await updateClient.billing.updateSubscription(id, {
      cancel_at_period_end: true,
    });
    await mutate();
    setIsLoading(false);
  }

  async function handleReactivateSubscription(id: string) {
    setIsLoading(true);
    await updateClient.billing.updateSubscription(id, {
      cancel_at_period_end: false,
    });
    await mutate();
    setIsLoading(false);
  }

  return (
    <>
      {!subscription.cancel_at_period_end && (
        <Button
          onClick={() => handleCancelSubscription(subscription.id)}
          disabled={isLoading}
          variant="destructive"
          className="w-full"
        >
          <Spinner variant="primary" isLoading={isLoading} />
          {isLoading ? "Cancelling..." : "Cancel Subscription"}
        </Button>
      )}
      {subscription.cancel_at_period_end && (
        <Button
          onClick={() => handleReactivateSubscription(subscription.id)}
          disabled={isLoading}
          className="w-full"
        >
          <Spinner variant="primary" isLoading={isLoading} />
          {isLoading ? "Reactivating..." : "Reactivate Subscription"}
        </Button>
      )}
    </>
  );
}
