import { Subvariation, Variation } from "@/payload-types";
import { notFound } from "next/navigation";
import { BasePayload } from "payload";

type Props = {
  payload: BasePayload;
  slug: string;
  draft: boolean;
}

export const getProductData = async (props: Props) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const products = await props.payload.find({
    collection: "products",
    depth: 2,
    draft: props.draft,
    where: {
      slug: {
        equals: props.slug
      }
    }
  })

  if (products.docs.length === 0) {
    notFound()
  }

  const product = products.docs[0]

  const prices = await props.payload.find({
    collection: "prices",
    draft: props.draft,
    depth: 0,
    where: {
      product: {
        equals: product.id
      }
    }
  })


  const variants = [...(new Set(product.variant.priceVariation.map(option =>
    (option as Subvariation).variation as Variation
  )))];

  const options = variants.map(variant => ({
    variant: variant.id,
    options: (product.variant.priceVariation as Subvariation[])
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


  const freeVariants = [...(new Set(product.variant.freeVariation?.map(option =>
    (option as Subvariation).variation as Variation
  )))];

  const freeOptions = freeVariants.map(variant => ({
    variant: variant.id,
    options: (product.variant.freeVariation as Subvariation[])
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