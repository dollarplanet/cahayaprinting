import { ProductCard } from "@/components/product-card";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import { getProductsActions } from "./get-products-actions";

type Props = {
  searchParams: ServerSearchParamsType
}

export const ProductSuspense = async (props: Props) => {
  const payload = await getPayload({ config: payloadConfig })

  const products = await getProductsActions(payload, props.searchParams);

  return (
    <div className="flex-1 h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-8 md:px-12">
      {products.docs.map((product, index) => <ProductCard key={index} product={product}/>)}
      {products.docs.map((product, index) => <ProductCard key={index} product={product}/>)}
      {products.docs.map((product, index) => <ProductCard key={index} product={product}/>)}
      {products.docs.map((product, index) => <ProductCard key={index} product={product}/>)}
      {products.docs.map((product, index) => <ProductCard key={index} product={product}/>)}
      {products.docs.map((product, index) => <ProductCard key={index} product={product}/>)}
    </div>
  );
}