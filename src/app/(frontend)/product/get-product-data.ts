import { Subvariation, Variation } from "@/payload-types";
import { notFound } from "next/navigation";
import { BasePayload } from "payload";

type Props = {
  payload: BasePayload;
  id: string | number;
  draft: boolean;
}

export const getProductData = async (props: Props) => {
  const product = await props.payload.findByID({
    collection: "products",
    depth: 2,
    draft: props.draft,
    id: props.id,
    disableErrors: true,
  })

  if (!product) {
    notFound()
  }

  const prices = await props.payload.find({
    collection: "prices",
    draft: props.draft,
    depth: 0,
    where: {
      product: {
        equals: props.id
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


  const freeVariants = [...(new Set(product.freeOption.subvariation.map(option =>
    (option as Subvariation).variation as Variation
  )))];

  const freeOptions = freeVariants.map(variant => ({
    variant: variant.id,
    options: (product.freeOption.subvariation as Subvariation[])
      .filter(opt => (opt.variation as Variation).id === variant.id)
      .map((opt) => ({
        variant: variant.id,
        value: opt.id,
        label: opt.name
      }))
  }))

  const freeOptionsDefault: { [key: string]: number } = {}

  for (const option of freeOptions) {
    freeOptionsDefault[option.variant.toString()] = option.options[0].value
  }

  return {
    product,
    prices: prices.docs,
    variants,
    options,
    optionsDefault,
    freeVariants,
    freeOptions,
    freeOptionsDefault
  }
}