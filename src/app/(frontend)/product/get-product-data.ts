import { Subvariation, Variation } from "@/payload-types";
import { notFound } from "next/navigation";
import { BasePayload } from "payload";

export const getProductData = async (payload: BasePayload, id: string | number, draft: boolean) => {
  const product = await payload.findByID({
      collection: "products",
      depth: 2,
      draft: draft,
      id: id,
      disableErrors: true,
    })
  
    if (!product) {
      notFound()
    }
  
    const prices = await payload.find({
      collection: "prices",
      draft: draft,
      depth: 0,
      where: {
        product: {
          equals: id
        }
      }
    })
  
  
    const variants = [...(new Set(product.variant.subvariation.map(option =>
      (option as Subvariation).variation as Variation
    )))];
  
    const options = variants.map(variant => ({
      variant: variant.id,
      options: (product.variant.subvariation as Subvariation[])
        .filter(opt => (opt.variation as Variation).id === variant.id)
        .map((opt) => ({
          variant: variant.id,
          value: opt.id,
          label: opt.name
        }))
    }))
  
    const optionsDefault: { [key: string]: number } = {}
  
    for (const option of options) {
      optionsDefault[option.variant.toString()] = option.options[0].value
    }

    return {
      product,
      prices: prices.docs,
      variants,
      options,
      optionsDefault
    }
}