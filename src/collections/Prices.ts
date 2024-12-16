import { CollectionConfig } from "payload";

export const Prices: CollectionConfig = {
  slug: "prices",
  admin: {
    hidden: true,
    useAsTitle: "name",
  },
  access: {
    create: () => false,
  },  
  fields: [
    {
      name: "name",
      type: "text",
      access: {
        create: () => false,
        update: () => false,
      },
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
      access: {
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
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
      },
      access: {
        create: () => false,
        update: () => false,
      },
    },
  ],
}