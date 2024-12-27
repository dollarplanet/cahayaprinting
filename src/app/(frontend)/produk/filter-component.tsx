"use client";

import { Category } from "@/payload-types"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

type Props = {
  categories: Category[]
}

export const FilterComponent = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      query: searchParams.get("query") ?? undefined,
      min: searchParams.get("min") ?? undefined,
      max: searchParams.get("max") ?? undefined,
    }
  })
  const filterValue = useWatch({ control: control });

  const onSubmit = (data: any) => {
    const query = data.query;
    const min = data.min;
    const max = data.max;

    let queryString = "?";

    if (query) {
      queryString += `&query=${query}`;
    }

    if (min) {
      queryString += `&min=${min}`;
    }

    if (max) {
      queryString += `&max=${max}`;
    }

    if(searchParams.get("category")) {
      queryString += `&category=${searchParams.get("category")}`;
    }

    router.push(queryString);
  }

  const onCategoryClick = (id: number | undefined) => {
    let queryString = "?";

    if (filterValue.query) {
      queryString += `&query=${filterValue.query}`;
    }

    if (filterValue.min) {
      queryString += `&min=${filterValue.min}`;
    }

    if (filterValue.max) {
      queryString += `&max=${filterValue.max}`;
    }

    if(id) {
      queryString += `&category=${id}`;
    }

    router.push(queryString);
  }

  return (
    <>
      <div onClick={() => setOpened(!opened)} className="cursor-pointer flex justify-between border-b border-b-gray-400 pb-2 bg-gray-200 p-2">
        <div className="flex items-center justify-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 md:hidden text-gray-600 w-6 ${opened ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          
          <h2 className="font-bold text-base text-gray-600">Filter</h2>
        </div>
        <button type="submit" form="filter-form" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md">Terapkan</button>
      </div>

      {<div className={`w-full bg-gray-100 transition-all md:max-h-none overflow-hidden px-2 md:py-4 ${opened ? "py-4" : "max-h-0"}`}>
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
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-1 lg:grid-cols-2 gap-2 p-4 text-xs bg-gray-200 rounded text-left">
          <button onClick={() => onCategoryClick(undefined)} className={`text-gray-600 text-left hover:scale-105 ${([null, undefined, ""].includes(searchParams.get("category"))) ? "font-semibold text-orange-600" : ""}`}>
            <p>Semua</p>
          </button>
          {props.categories.map((category) => (
            <button onClick={() => onCategoryClick(category.id)} key={category.id} className={`text-gray-600 text-left hover:scale-105 ${(searchParams.get("category") === category.id.toString()) ? "font-semibold text-orange-600" : ""}`}>
              <p>{category.name}</p>
            </button>
          ))}
        </div>
      </div>}
    </>
  );
}