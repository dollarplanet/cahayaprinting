import { Skeleton } from "@/components/skeleton"

export const ProductSkeleton = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Product Image Skeleton */}
      <div className="relative aspect-square">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>

      {/* Product Details Skeleton */}
      <div className="space-y-6 px-4 md:pt-8">
        {/* Title and SKU */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>

        {/* Price and Rating */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4" />
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Paper Type Dropdown */}
        <Skeleton className="h-10 w-48" />

        {/* Add to Cart Button */}
        <Skeleton className="h-10 w-full max-w-[200px]" />

        {/* Features List */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  )
}

