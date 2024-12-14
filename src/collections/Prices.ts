import { CollectionConfig } from "payload";

export const Prices: CollectionConfig = {
  slug: "prices",
  admin: {
    hidden: true,
    useAsTitle: "name",
  },
  access: {
    create: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
      access: {
        create: () => false,
        update: () => false,
      }, 
      admin: {
        readOnly: true,
      }
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
  ],
}