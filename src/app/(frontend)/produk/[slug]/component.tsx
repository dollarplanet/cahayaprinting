"use client";

import { Category, Media, Price, Product, Variation } from "@/payload-types";
import { isSameArray } from "@/utilities/is-same-array";
import { money } from "@/utilities/money";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { EmblaOptionsType } from "embla-carousel";
import { useCallback, useContext } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Carousel } from "../../../../components/embla-carousel/carousel";
import { FiveStars } from "../../../../components/five-stars";
import { CategoryChip } from "@/components/category-chip";
import { CartContext } from "../../cart-context";

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

const OPTIONS: EmblaOptionsType = {}

export const ProductComponent = (props: Props) => {
  const {reloadCart} = useContext(CartContext)!;

  const priceVariantForm = useForm({
    defaultValues: props.optionsDefault
  });
  const priceVariantValue = useWatch({ control: priceVariantForm.control });

  const freeVariantForm = useForm({
    defaultValues: props.freeOptionsDefault
  });
  const freeVariantValue = useWatch({ control: freeVariantForm.control });

  const price = useCallback(() => {
    return props.prices.find(prc => isSameArray(prc.combinations, Object.values(priceVariantValue).map(value => Number(value))))?.price ?? 0
  }, [priceVariantValue, props.prices]);

  const addToCart = () => {
    const currentCart: LocalCart[] = JSON.parse(localStorage.getItem("cart") ?? "[]");

    const currentProductOnCart = currentCart.find((value) => {
      return (value.id === props.product.id)
        && isSameArray(value.priceVariants, Object.values(priceVariantValue).map(value => Number(value)))
        && isSameArray(value.freeVariants, Object.values(freeVariantValue).map(value => Number(value)))
    })

    if (currentProductOnCart) {
      const index = currentCart.indexOf(currentProductOnCart);
      currentCart[index].quantity += 1;
    } else {
      const freeVar = Object.values(freeVariantValue).map(value => Number(value))
      const priceVar = Object.values(priceVariantValue).map(value => Number(value))

      currentCart.push({
        id: props.product.id,
        priceVariants: priceVar,
        freeVariants: freeVar,
        quantity: 1,
        productName: props.product.name,
        price: price(),
        image: ((props.product.images ?? [])[0] as Media).thumbnailURL,
        freeVariationsName: props.freeOptions.flatMap(val => val.options).filter((val) => freeVar.includes(val.value)).map((val) => val.label).join(", "),
        priceVariationsName: props.options.flatMap(val => val.options).filter((val) => priceVar.includes(val.value)).map((val) => val.label).join(", "),
      });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    reloadCart();
  }

  return (
    <div className="bg-white">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Carousel slides={props.product.images!.map(image => (image as Media).url!)} options={OPTIONS} />

          <div className="w-full px-4 md:pt-8">
            <h2 className="text-3xl font-bold mb-2">{props.product.name}</h2>

            <div className="flex w-full flex-wrap gap-2">
              {(props.product.category as Category[]).map((category, index) => (
                <CategoryChip key={index} category={category} />
              ))}
            </div>

            <p className="text-gray-600 mb-4">SKU: {props.product.sku}</p>
            {Boolean(price) && <div className="text-2xl font-bold mr-2 text-orange-700">{money(price())}</div>}

            <FiveStars />

            {Boolean(props.product.specification?.description) && <RichText className="prose prose-sm mb-4" data={props.product.specification?.description!} />}

            <div className="flex flex-col items-start gap-2 mb-2">
              {props.variants.map((variant, index) => {
                const option = props.options.find(opt => opt.variant === variant?.id);

                if (!option) {
                  return null;
                }

                return (<div key={index}>
                  <label htmlFor={variant.id.toString()} className="block text-sm font-medium text-gray-900">{variant.name}</label>
                  <select {...priceVariantForm.register(option.variant.toString())} defaultValue={option.options[0].value} id={variant.id.toString()} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
                  <label htmlFor={variant.id.toString()} className="block text-sm font-medium text-gray-900">{variant.name}</label>
                  <select {...freeVariantForm.register(option.variant.toString())} defaultValue={option.options[0].value} id={variant.id.toString()} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    {option.options.map((opt, index) =>
                      <option value={opt.value} key={index}>{opt.label}</option>
                    )}
                  </select>
                </div>)
              })}
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={addToCart}
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
