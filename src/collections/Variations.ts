import { CollectionConfig } from "payload";

export const Variations: CollectionConfig = {
  slug: "variations",
  admin: {
    useAsTitle: "name",
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
      type: "join",
      name: "subvariations",
      collection: "subvariations",
      on: "variation",
    }
  ],
}