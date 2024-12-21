"use client";

import { Category, Media, Price, Product, Subvariation, Variation } from "@/payload-types";
import { isSameArray } from "@/utils/is-same-array";
import { money } from "@/utils/money";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  product: Product,
  prices: Price[],
}

export const ProductCard = (props: Props) => {
  const [variants, setVariants] = useState([] as Variation[]);
  const [selected, setSelected] = useState([] as number[]);
  const [price, setPrice] = useState(undefined as number | undefined);

  useEffect(() => {
    const temps = [...(new Set(props.product.variant.subvariation.map(option =>
      (option as Subvariation).variation as Variation
    )))];

    setVariants(temps);
    setSelected(temps.map(tmp => {
      return (props.product.variant.subvariation.find((option: any) => (option.variation as Variation).id === tmp.id) as Subvariation).id
    }));

  }, [props.product]);

  useEffect(() => {
    setPrice(props.prices.find(prc => isSameArray(prc.combinations, selected))?.price);
  }, [props.prices, selected]);

  useEffect(() => {
    console.log("SUBVARIATION", props.product.variant.subvariation);
    console.log("SELECTED", selected);
    console.log("PRICES", props.prices.map((prc) => prc.combinations));
    console.log("PRICE", price);
  }, [selected, price, props.prices, props.product]);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">

          {Boolean(props.product.thumbnail) && <div className="w-full md:w-1/2 px-4 relative min-h-96">
            <Image width={0} height={0} src={(props.product.thumbnail as Media).url!} alt="Product" fill className="object-cover" />
          </div>}


          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{props.product.name}</h2>

            <div className="flex w-full flex-wrap gap-2">
              {(props.product.category as Category[]).map((category, index) => (
                <div key={index} className="rounded-md bg-gray-300 flex items-center gap-1 py-1 px-2.5 border border-transparent text-sm text-gray-700 font-semibold transition-all shadow-sm mb-2">
                  {Boolean(category.thumbnail) && <Image alt={category.name} width={0} height={0} src={(category.thumbnail as Media).sizes?.thumbnail?.url!} className="rounded-full w-5 h-5 object-cover" />}
                  {category.name}
                </div>
              ))}
            </div>

            <p className="text-gray-600 mb-4">SKU: {props.product.sku}</p>
            {Boolean(price) && <div className="text-2xl font-bold mr-2">{money(price!)}</div>}
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                className="size-6 text-yellow-500">
                <path fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                className="size-6 text-yellow-500">
                <path fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                className="size-6 text-yellow-500">
                <path fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                className="size-6 text-yellow-500">
                <path fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                className="size-6 text-yellow-500">
                <path fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd" />
              </svg>
            </div>

            {Boolean(props.product.specification?.description) && <RichText className="prose prose-sm mb-4" data={props.product.specification?.description!} />}

            {variants.map((variant, index) => (
              <div key={index}>
                <p>{variant.name}</p>
                <select>
                  {(props.product.variant.subvariation as Subvariation[])
                    .filter(opt => (opt.variation as Variation).id === variant.id)
                    .map((opt, index) =>
                      <option key={index}>{opt.name}</option>
                    )}
                </select>
              </div>
            ))}

            <div className="flex space-x-4 mb-6">
              <button
                className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                Masukan Keranjang
              </button>
            </div>

            {Boolean(props.product.specification?.features) && <div>
              <h3 className="text-lg font-semibold mb-2">{props.product.specification?.featureTitle}</h3>
              <ul className="list-disc list-inside text-gray-700">
                {props.product.specification?.features?.map((data, index) => (
                  <li key={index}>{data.name}</li>
                ))}
              </ul>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}