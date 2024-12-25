import { BasePayload } from "payload"

export const getProductsActions = async (payload: BasePayload, searchParams: ServerSearchParamsType) => {
  const data = await payload.find({
    collection: "products",
    depth: 2,
    where: {
      title: {
        like: `%${(await searchParams).query ?? ""}%`
      }
    },
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