import SubscriptionActions from "@/components/subcription-actions";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/utils/styles";
import { updateClient } from "@/utils/update";
import { Subscription } from "@updatedev/js";
import useSWR from "swr";

async function getSubscriptions(): Promise<Subscription[]> {
  const { data, error } = await updateClient.billing.getSubscriptions();
  if (error) {
    throw new Error(error.message);
  }
  return data.subscriptions;
}

export default function SubscriptionPage() {
  const { data, error } = useSWR<Subscription[]>(
    "subscriptions",
    getSubscriptions
  );

  if (error) {
    return <div>Error fetching subscriptions: {error.message}</div>;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">Subscriptions</h1>
          <p className="text-muted-foreground mt-2">
            Manage your subscription plans
          </p>
        </div>
      </div>
      <div className="space-y-6">
        {data.map((subscription, index) => (
          <Card key={index}>
            <h2 className="font-medium">{subscription.product.name}</h2>
            <div className="grid gap-2 mt-2 text-sm">
              <div className="grid grid-cols-[150px_1fr]">
                <div className="text-muted-foreground">Plan description</div>
                <div>{subscription.product.description}</div>
              </div>
              <div className="grid grid-cols-[150px_1fr]">
                <div className="text-muted-foreground">Price</div>
                <div>
                  ${(subscription.price.unit_amount / 100).toFixed(2)} per{" "}
                  {subscription.price.interval}
                </div>
              </div>
              <div className="grid grid-cols-[150px_1fr]">
                <div className="text-muted-foreground">Status</div>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full bg-green-500",
                      (subscription.status === "past_due" ||
                        subscription.cancel_at_period_end) &&
                        "bg-yellow-500",
                      subscription.status === "inactive" && "bg-red-500"
                    )}
                  ></div>
                  {subscription.status === "active" &&
                    !subscription.cancel_at_period_end &&
                    "Active"}
                  {subscription.status === "active" &&
                    subscription.cancel_at_period_end &&
                    "Cancelling at period end"}
                  {subscription.status === "past_due" && "Past due"}
                  {subscription.status === "inactive" && "Inactive"}
                </div>
              </div>
              <SubscriptionActions subscription={subscription} />
            </div>
          </Card>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-medium">Raw Data</h3>
        <div className="mt-2 border p-4 rounded-lg">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
