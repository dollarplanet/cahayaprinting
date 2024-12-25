"use client";

import { Category } from "@/payload-types"
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  categories: Category[]
}

export const FilterComponent = (props: Props) => {
  const searchParams = useSearchParams();

  return (
    <div className="w-full md:w-3/12 p-8 md:p-4 md:pr-0 text-sm">
      <h2 className="font-bold text-base mb-4">Filter</h2>

      <form className="mb-4 max-w-sm" action="/produk" method="get">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
              />
            </svg>

          </span>
          <input
            className="w-full pl-10 px-4 py-2 rounded-md bg-white border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="search"
            id="search"
            name="query"
            placeholder="Cari produk"
            defaultValue={searchParams.get("query") ?? undefined}
          />
        </div>
      </form>

      <h2 className="font-semibold mb-2 mt-8">Harga</h2>
      <div className="flex flex-row md:flex-col gap-2 items-stretch max-w-sm">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">Rp</span>
          </span>
          <input
            className="w-full pl-10 px-4 py-2 rounded-md bg-white border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="Minimal"
            defaultValue={searchParams.get("minPrice") ?? undefined}
          />
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">Rp</span>
          </span>
          <input
            className="w-full pl-10 px-4 py-2 rounded-md bg-white border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="Maksimal"
            defaultValue={searchParams.get("maxPrice") ?? undefined}
          />
        </div>
      </div>

      <h2 className="font-semibold mb-2 mt-8">Kategori</h2>
      <div className="grid text-xs grid-cols-3 sm:grid-cols-4 md:grid-cols-1 lg:grid-cols-2 gap-2 p-4 bg-gray-100 rounded">
        {props.categories.map((category) => (
          <div key={category.id} className={`text-gray-600 hover:scale-105 ${(searchParams.get("category") === category.id.toString()) ? "font-semibold text-orange-600" : ""}`}>
            <Link scroll={false} prefetch={false} href={`?category=${category.id}`}>
              <p>{category.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}