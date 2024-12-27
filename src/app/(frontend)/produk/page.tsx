import { FilterSuspense } from "./filter-suspense";
import { Suspense } from "react";
import { FilterSkeleton } from "./filter-skeleton";
import { ProductSuspense } from "./product-suspense";
import ProductSkeleton from "./product-skeleton";
import Image from "next/image";

const Page: NextServerPage = async ({ searchParams }) => {
  return (
    <div>
      <Image alt="image" width={0} height={0} src="https://cdn.pixabay.com/photo/2017/06/24/23/52/train-2439246_960_720.jpg" className="w-full h-96 object-cover md:mb-4" />
      <div className="flex flex-col md:flex-row w-full">

        <div className="w-full md:w-3/12 pb-4 md:p-4 md:pr-0 text-sm">
          <Suspense fallback={<FilterSkeleton />}>
            <FilterSuspense />
          </Suspense>
        </div>

        <Suspense fallback={(
          <div className="flex-1 h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-8 md:px-12">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductSkeleton key={index}/>
            ))}
          </div>
        )}>
          <ProductSuspense searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}

export default Page;