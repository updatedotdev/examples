"use client";

import { useState } from "react";
import { ProductWithPrices } from "@updatedev/js";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/pricing-card";
import { cn } from "@/lib/utils";

export default function PricingContent({
  products,
}: {
  products: ProductWithPrices[];
}) {
  const [interval, setInterval] = useState<"month" | "year">("month");

  return (
    <>
      <div className="flex gap-2 mt-4">
        <Button
          className={cn(
            "bg-primary/10 text-primary hover:bg-primary/20",
            interval === "month" &&
              "bg-primary text-primary-foreground hover:bg-primary/50",
          )}
          onClick={() => setInterval("month")}
        >
          Monthly
        </Button>
        <Button
          className={cn(
            "bg-primary/10 text-primary hover:bg-primary/20",
            interval === "year" &&
              "bg-primary text-primary-foreground hover:bg-primary/50",
          )}
          onClick={() => setInterval("year")}
        >
          Yearly
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {products.map((product) => (
          <PricingCard key={product.id} product={product} interval={interval} />
        ))}
      </div>
    </>
  );
}
