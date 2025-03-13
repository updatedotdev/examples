"use client";

import { Button } from "@/components/ui/button";
import { ProductWithPrices } from "@updatedev/js";
import { createClient } from "@/utils/update/client";
import { useState } from "react";

interface PricingCardProps {
  product: ProductWithPrices;
  isCurrentPlan: boolean;
  interval: "month" | "year";
}

export default function PricingCard({
  product,
  isCurrentPlan,
  interval,
}: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSelectPlan(priceId: string) {
    setIsLoading(true);
    const client = createClient();
    const redirectUrl = `http://localhost:4000/protected/subscription`;
    const { data, error } = await client.billing.createCheckoutSession(
      priceId,
      {
        redirect_url: redirectUrl,
      },
    );
    if (error) {
      setIsLoading(false);
      return;
    }

    window.location.href = data.url;
  }

  const productPrice = product.prices?.find(
    (price) => price.interval === interval,
  );

  if (!productPrice) {
    return null;
  }

  const { name, description } = product;

  const priceString = productPrice.unit_amount
    ? `$${(productPrice.unit_amount / 100).toFixed(2)}`
    : "Custom";

  return (
    <div
      className={`border rounded-lg p-6 space-y-4`}
    >
      <div className="space-y-2">
        <h3 className="text-xl font-medium">{name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{priceString}</span>
          {productPrice?.unit_amount && (
            <span className="text-muted-foreground">/month</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-4">
        <Button
          className="w-full"
          onClick={() => handleSelectPlan(productPrice.id)}
          disabled={isLoading || isCurrentPlan}
          variant={isCurrentPlan ? "secondary" : "default"}
        >
          {isCurrentPlan ? "Current Plan" : "Select Plan"}
        </Button>
      </div>
    </div>
  );
}
