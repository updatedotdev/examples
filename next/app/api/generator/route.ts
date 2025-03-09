import { createClient } from "@/utils/update/server";

export async function POST() {
  const client = await createClient();
  const { data, error } = await client.billing.getSubscriptions();

  if (error || data.subscriptions.length === 0) {
    return new Response("Error fetching subscriptions", { status: 500 });
  }

  const subscription = data.subscriptions[0];

  if (subscription.status !== "active") {
    return new Response("Subscription not active", { status: 403 });
  }

  const response = await fetch("https://api.thecatapi.com/v1/images/search");
  const json = await response.json();
  return new Response(JSON.stringify(json));
}
