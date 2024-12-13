import { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      type: "upload",
      relationTo: "media",
      name: "thumbnail",
    },
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      type: "join",
      name: "products",
      collection: "products",
      on: "category",
    }
  ],
}