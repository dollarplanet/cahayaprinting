import { ProductCard, ProductCardProps } from "@/components/product-card";
import { Price } from "@/payload-types";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import { getProductsActions } from "./get-products-actions";

type Props = {
  searchParams: ServerSearchParamsType
}

export const ProductSuspense = async (props: Props) => {
  const payload = await getPayload({ config: payloadConfig })

  const data = await getProductsActions(payload, props.searchParams);

  const productProps: ProductCardProps[] = data.docs.map((product) => {
    const sortedPrice = (product.price?.prices?.docs as Price[]).sort((a, b) => a.price - b.price)
    const minPrice = sortedPrice[0].price;
    const maxPrice = sortedPrice[sortedPrice.length - 1].price;

    return {
      product: product,
      minPrice: minPrice,
      maxPrice: maxPrice
    }
  })

  return (
    <div className="flex-1 h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-8 md:px-12">
      {productProps.map((props, index) => <ProductCard key={index} {...props} />)}
      {productProps.map((props, index) => <ProductCard key={index} {...props} />)}
      {productProps.map((props, index) => <ProductCard key={index} {...props} />)}
      {productProps.map((props, index) => <ProductCard key={index} {...props} />)}
      {productProps.map((props, index) => <ProductCard key={index} {...props} />)}
      {productProps.map((props, index) => <ProductCard key={index} {...props} />)}
    </div>
  );
}