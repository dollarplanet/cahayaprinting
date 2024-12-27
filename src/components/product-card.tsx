import { money } from "@/utilities/money";
import { Category, Media } from "@/payload-types";
import Image from "next/image";
import { CategoryChip } from "./category-chip";
import Link from "next/link";
import { GetProductsActionsItem } from "@/app/(frontend)/produk/get-products-actions";

export type ProductCardProps = {
  product: GetProductsActionsItem;
}

export const ProductCard = (props: ProductCardProps) => {
  return (
    <Link prefetch={false} href={`/produk/${props.product.slug}`} className="bg-white rounded-lg overflow-hidden shadow-lg w-full">
      <Image width={0} height={0} className="h-48 w-full object-cover object-end" src={(props.product.images![0] as Media).url!} alt="image" />
      <div className="p-6">
        <div className="flex w-full flex-wrap gap-1">
        <CategoryChip category={props.product.category[0] as Category} />
        {(props.product.category.length > 1) && <span className="text-gray-600 font-bold text-[0.5rem] bg-gray-300 rounded-full py-[2px] px-1">+{(props.product.category.length - 1)}</span>}
        </div>
        <h4 className="mt-2 text-sm text-wrap font-semibold line-clamp-2">{props.product.name}</h4>
        <p className="text-gray-600 font-medium text-xs">{props.product.sku}</p>

        <div className="mt-1 text-orange-700 text-xs font-semibold text-wrap line-clamp-1">
          <span>{money(props.product.price?.minPrice ?? 0)} - {money(props.product.price?.maxPrice ?? 0)}</span>
        </div>
      </div>
    </Link>
  );
}