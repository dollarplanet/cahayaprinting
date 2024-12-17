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