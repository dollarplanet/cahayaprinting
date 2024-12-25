import { Skeleton } from "@/components/skeleton";

export const FilterSkeleton = () => {
  return (
    <div className="w-full space-y-6">
      {/* Filter Header */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-16" /> {/* "Filter" text */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* Search input */}
      </div>

      {/* Price Range Section */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-16" /> {/* "Harga" text */}
        <div className="flex flex-row md:flex-col gap-2">
          <Skeleton className="h-10 w-full rounded-md" /> {/* Min price input */}
          <Skeleton className="h-10 w-full rounded-md" /> {/* Max price input */}
        </div>
      </div>

      {/* Categories Section */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-24" /> {/* "Kategori" text */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-1 lg:grid-cols-2 gap-2 p-4">
          {/* Category items - rendering 6 skeleton items */}
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-24" />
          ))}
        </div>
      </div>
    </div>
  )
}

