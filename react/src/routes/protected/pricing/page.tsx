import PricingContent from "@/components/pricing-content";
import { Spinner } from "@/components/ui/spinner";
import { updateClient } from "@/utils/update";
import { ProductWithPrices, Subscription } from "@updatedev/js";
import useSWR from "swr";

async function getProducts(): Promise<ProductWithPrices[]> {
  const { data, error } = await updateClient.billing.getProducts();
  if (error) {
    throw new Error(error.message);
  }
  return data.products;
}

async function getSubscriptions(): Promise<Subscription[]> {
  const { data, error } = await updateClient.billing.getSubscriptions();
  if (error) {
    throw new Error(error.message);
  }
  return data.subscriptions;
}

export default function PricingPage() {
  const { data: productData, error: productError } = useSWR<
    ProductWithPrices[]
  >("products", getProducts);
  const { data: subscriptionData, error: subscriptionError } = useSWR<
    Subscription[]
  >("subscriptions", getSubscriptions);

  if (productData == null || subscriptionData == null) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (productError || subscriptionError) {
    return <div>There was an error loading products. Please try again.</div>;
  }

  const currentProductId =
    subscriptionData == null || subscriptionData.length === 0
      ? null
      : subscriptionData[0].product.id;

  return (
    <>
      <div>
        <h1 className="text-2xl font-medium">Pricing Plans</h1>
        <p className="text-muted-foreground mt-2">
          Choose the perfect plan for your needs
        </p>
      </div>

      <PricingContent
        products={productData}
        currentProductId={currentProductId}
      />
    </>
  );
}
