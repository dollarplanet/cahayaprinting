import { ProductCard, ProductCardProps } from "@/components/product-card"
import { Price } from "@/payload-types";
import { getProductsActions } from "./get-products-actions";

const Page: NextServerPage = async ({ searchParams }) => {
  const data = await getProductsActions(searchParams);

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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4 md:p-8 md:px-12">
      {productProps.map((props, index) => <ProductCard key={index} {...props} />)}
    </div>
  )
}

export default Page;