import { CollectionConfig } from "payload";

export const Prices: CollectionConfig = {
  slug: "prices",
  admin: {
    hidden: true,
    useAsTitle: "name",
  },  
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, req: { payload } }) => {
        const productId = (typeof doc.product === "number") ? doc.product : doc.product.id;

        const prices = await payload.find({
          select: {
            price: true
          },
          collection: "prices",
          depth: 0,
          where: { product: { equals: productId } }
        });

        const pricesSorted = prices.docs.sort((a, b) => a.price - b.price);

        await payload.update({
          collection: "products",
          id: productId,
          data: {
            price: {
              minPrice: pricesSorted[0].price,
              maxPrice: pricesSorted[pricesSorted.length - 1].price,
            }
          }
        });
      }
    ]
  },
  fields: [
    {
      name: "name",
      type: "text",
      admin: {
        readOnly: true,
      }
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      type: "relationship",
      name: "product",
      relationTo: "products",
      required: true,
      admin: {
        hidden: true,
        readOnly: true,
      }
    },
    {
      type: "relationship",
      name: "combinations",
      relationTo: "subvariations",
      required: true,
      hasMany: true,
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
  ],
}