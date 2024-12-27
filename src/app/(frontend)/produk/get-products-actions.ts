import { BasePayload, Where } from "payload"

export const getProductsActions = async (payload: BasePayload, searchParams: ServerSearchParamsType) => {
  const params = await searchParams;

  const where: Where[] = []

  if (params.query) {
    where.push({
      title: {
        like: `%${params.query}%`
      }
    })
  }

  if (params.category) {
    where.push({
      category: {
        in: params.category
      }
    })
  }

  if (params.min) {
    where.push({
      'price.minPrice': {
        greater_than_equal: Number(params.min)
      }
    })
  }

  if (params.max) {
    where.push({
      'price.maxPrice': {
        less_than_equal: Number(params.max)
      }
    })
  }

  // if (params.min && params.max) {
  //   where.push({
  //     'price.minPrice': {
  //       greater_than_equal: Number(params.min)
  //     },
  //   })

  //   where.push({
  //     'price.maxPrice': {
  //       less_than_equal: Number(params.max)
  //     }
  //   })
  // } else {
  //   if (params.min) {
  //     where.push({
  //       'price.minPrice': {
  //         greater_than_equal: Number(params.min)
  //       }
  //     })
  //   }

  //   if (params.max) {
  //     where.push({
  //       'price.maxPrice': {
  //         less_than_equal: Number(params.max)
  //       }
  //     })
  //   }
  // }

  const data = await payload.find({
    collection: "products",
    depth: 2,
    where: {
      and: where
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