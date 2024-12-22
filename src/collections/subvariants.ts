import { CollectionConfig } from "payload";

export const SubVariations: CollectionConfig = {
  slug: "subvariations",
  admin: {
    useAsTitle: "name",
    hidden: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      type: "relationship",
      name: "variation",
      relationTo: "variations",
      required: true,
    }
  ],
}