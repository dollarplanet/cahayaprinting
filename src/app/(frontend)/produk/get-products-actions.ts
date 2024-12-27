import { BasePayload, Where } from "payload"

export const getProductsActions = async (payload: BasePayload, searchParams: ServerSearchParamsType) => {
  const params = await searchParams;

  const where: Where = {}

  if (params.query) {
    where.title = {
      like: `%${params.query}%`
    }
  }

  if (params.category) {
    where.category = {
      in: params.category
    }
  }

  const data = await payload.find({
    collection: "products",
    depth: 2,
    where: where,
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