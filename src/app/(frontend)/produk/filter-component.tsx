"use client";

import { Category } from "@/payload-types"
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";

type Props = {
  categories: Category[]
}

export const FilterComponent = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      query: searchParams.get("query") ?? undefined,
      min: searchParams.get("min") ?? undefined,
      max: searchParams.get("max") ?? undefined,
    }
  })
  const filterValue = useWatch({ control: control });

  const onSubmit = (data: any) => {
    console.log([...searchParams.entries()]);

    const query = data.query;
    const min = data.min;
    const max = data.max;

    if (searchParams.get("category")) {
      router.push(`?query=${query}&min=${min}&max=${max}&category=${searchParams.get("category")}`);
    } else {
      router.push(`?query=${query}&min=${min}&max=${max}`);
    }
  }

  const onCategoryClick = (id: number | undefined) => {
    if (id) {
      router.push(`?query=${filterValue.query}&min=${filterValue.min}&max=${filterValue.max}&category=${id}`);
    } else {
      router.push(`?query=${filterValue.query}&min=${filterValue.min}&max=${filterValue.max}`);
    }
  }

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2 className="font-bold text-base ">Filter</h2>
        <button type="submit" form="filter-form" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md">Terapkan</button>
      </div>

      <form id="filter-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 max-w-sm">
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
              {...register("query")}
              className="w-full pl-10 px-4 py-2 rounded-md bg-white border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="search"
              id="search"
              placeholder="Cari produk"
            />
          </div>
        </div>
        <h2 className="font-semibold mb-2 mt-8">Harga</h2>
        <div className="flex flex-row md:flex-col gap-2 items-stretch max-w-sm">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">Rp</span>
            </span>
            <input
              {...register("min")}
              className="w-full pl-10 px-4 py-2 rounded-md bg-white border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="number"
              id="min"
              placeholder="Minimal"
            />
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">Rp</span>
            </span>
            <input
              {...register("max")}
              className="w-full pl-10 px-4 py-2 rounded-md bg-white border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="number"
              id="max"
              placeholder="Maksimal"
            />
          </div>
        </div>
      </form>

      <h2 className="font-semibold mb-2 mt-8">Kategori</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-1 lg:grid-cols-2 gap-2 p-4 text-xs bg-gray-100 rounded text-left">

        <button onClick={() => onCategoryClick(undefined)} className={`text-gray-600 text-left hover:scale-105 ${([null, undefined, ""].includes(searchParams.get("category"))) ? "font-semibold text-orange-600" : ""}`}>
          <p>Semua</p>
        </button>

        {props.categories.map((category) => (
          <button onClick={() => onCategoryClick(category.id)} key={category.id} className={`text-gray-600 text-left hover:scale-105 ${(searchParams.get("category") === category.id.toString()) ? "font-semibold text-orange-600" : ""}`}>
            <p>{category.name}</p>
          </button>
        ))}
      </div>
    </>
  );
}