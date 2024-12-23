import payloadConfig from "@/payload.config"
import { getPayload } from "payload"

export const getProductsActions = async () => {
  const payload = await getPayload({ config: payloadConfig })

  const data = await payload.find({
    collection: "products",
    depth: 2,
    select: {
      name: true,
      slug: true,
      price: true,
      category: true,
      images: true,
      sku: true,
    }
  })

  return data;
}

export type GetProductsActionsItem = Awaited<ReturnType<typeof getProductsActions>>['docs'][0]