"use client";

import { Category, Media, Price, Product, Subvariation, Variation } from "@/payload-types";
import { isSameArray } from "@/utils/is-same-array";
import { money } from "@/utils/money";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

type OptionsType = {
  variant: number;
  options: {
    label: string;
    value: number;
  }[];
}

type Props = {
  product: Product;
  prices: Price[];
  variants: Variation[];
  options: OptionsType[];
  optionsDefault: { [key: string]: number };
  freeVariants: Variation[];
  freeOptions: OptionsType[];
  freeOptionsDefault: { [key: string]: number };
}

export const ProductCard = (props: Props) => {
  const priceVariantForm = useForm({
    defaultValues: props.optionsDefault
  });
  const priceVariantValue = useWatch({ control: priceVariantForm.control });

  const freeVariantForm = useForm({
    defaultValues: props.optionsDefault
  });
  const freeVariantValue = useWatch({ control: freeVariantForm.control });

  const price = useCallback(() => {
    return props.prices.find(prc => isSameArray(prc.combinations, Object.values(priceVariantValue).map(value => Number(value))))?.price ?? 0
  }, [priceVariantValue, props.prices]);

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
            {Boolean(price) && <div className="text-2xl font-bold mr-2">{money(price())}</div>}
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

            <form className="flex flex-col items-start gap-2 mb-2">
              {props.variants.map((variant, index) => {
                const option = props.options.find(opt => opt.variant === variant?.id);

                if (!option) {
                  return null;
                }

                return (<div key={index}>
                  <label htmlFor={variant.id.toString()} className="block text-sm font-medium text-gray-900 dark:text-white">{variant.name}</label>
                  <select {...priceVariantForm.register(option.variant.toString())} defaultValue={option.options[0].value} id={variant.id.toString()} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {option.options.map((opt, index) =>
                      <option value={opt.value} key={index}>{opt.label}</option>
                    )}
                  </select>
                </div>)
              })}

              {props.freeVariants.map((variant, index) => {
                const option = props.freeOptions.find(opt => opt.variant === variant?.id);

                if (!option) {
                  return null;
                }

                return (<div key={index}>
                  <label htmlFor={variant.id.toString()} className="block text-sm font-medium text-gray-900 dark:text-white">{variant.name}</label>
                  <select {...freeVariantForm.register(option.variant.toString())} defaultValue={option.options[0].value} id={variant.id.toString()} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {option.options.map((opt, index) =>
                      <option value={opt.value} key={index}>{opt.label}</option>
                    )}
                  </select>
                </div>)
              })}
            </form>

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