import { ProductCard } from "@/components/product-card"
import { Price } from "@/payload-types";
import { getProductsActions } from "./get-products-actions";

const Page: NextServerPage = async () => {
  const data = await getProductsActions();

  const product = data.docs[0]

  const sortedPrice = (product.price?.prices?.docs as Price[]).sort((a, b) => a.price - b.price)

  const minPrice = sortedPrice[0].price;
  const maxPrice = sortedPrice[sortedPrice.length - 1].price;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-8 px-12">
      <ProductCard product={product} minPrice={minPrice} maxPrice={maxPrice} />
      <ProductCard product={product} minPrice={minPrice} maxPrice={maxPrice} />
      <ProductCard product={product} minPrice={minPrice} maxPrice={maxPrice} />
      <ProductCard product={product} minPrice={minPrice} maxPrice={maxPrice} />
      <ProductCard product={product} minPrice={minPrice} maxPrice={maxPrice} />
      <ProductCard product={product} minPrice={minPrice} maxPrice={maxPrice} />
      <ProductCard product={product} minPrice={minPrice} maxPrice={maxPrice} />
      <ProductCard product={product} minPrice={minPrice} maxPrice={maxPrice} />
      <ProductCard product={product} minPrice={minPrice} maxPrice={maxPrice} />
      <ProductCard product={product} minPrice={minPrice} maxPrice={maxPrice} />
    </div>
  )
}

export default Page;