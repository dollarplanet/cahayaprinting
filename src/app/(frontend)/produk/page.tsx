import { ProductCard, ProductCardProps } from "@/components/product-card"
import { Price } from "@/payload-types";
import { getProductsActions } from "./get-products-actions";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { FilterComponent } from "./filter-component";

const Page: NextServerPage = async ({ searchParams }) => {
  const payload = await getPayload({ config: payloadConfig })

  const data = await getProductsActions(payload, searchParams);

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

  const categories = await payload.find({
    collection: "categories",
    select: {
      name: true,
      thumbnail: true,
      depth: 2,
    }
  })

  return (
    <div>
      <img src="https://cdn.pixabay.com/photo/2017/06/24/23/52/train-2439246_960_720.jpg" className="w-full h-96 object-cover mb-4"/>
      <div className="flex flex-col md:flex-row w-full">
        <FilterComponent categories={categories.docs} />
        <div className="flex-1 h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-8 md:px-12">
          {productProps.map((props, index) => <ProductCard key={index} {...props} />)}
          {productProps.map((props, index) => <ProductCard key={index} {...props} />)}
          {productProps.map((props, index) => <ProductCard key={index} {...props} />)}
          {productProps.map((props, index) => <ProductCard key={index} {...props} />)}
          {productProps.map((props, index) => <ProductCard key={index} {...props} />)}
          {productProps.map((props, index) => <ProductCard key={index} {...props} />)}
        </div>
      </div>
    </div>
  )
}

export default Page;