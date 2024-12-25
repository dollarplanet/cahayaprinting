import { Skeleton } from "@/components/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="w-full max-w-[240px] rounded-lg border bg-card p-3 shadow-sm">
      {/* Image skeleton */}
      <Skeleton className="aspect-square w-full rounded-md" />

      <div className="p-3">
        {/* Brand skeleton */}
        <div className="mt-2 flex items-center gap-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        {/* Title skeleton */}
        <Skeleton className="mt-2 h-5 w-3/4" />
        {/* Product code skeleton */}
        <Skeleton className="mt-1 h-4 w-1/2" />
        {/* Price skeleton */}
        <Skeleton className="mt-2 h-5 w-2/3" />
      </div>
    </div>
  )
}

