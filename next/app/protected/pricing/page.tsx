import { createClient } from "@/utils/update/server";
import PricingContent from "@/components/pricing-content";

export default async function PricingPage() {
  const client = await createClient();
  const { data, error } = await client.billing.getProducts();

  if (error) {
    return <div>There was an error loading products. Please try again.</div>;
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-medium">Pricing Plans</h1>
        <p className="text-muted-foreground mt-2">
          Choose the perfect plan for your needs
        </p>
      </div>

      <PricingContent products={data.products} />
    </>
  );
}
