import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    livePreview: {      
      url: process.env.NEXT_PUBLIC_SERVER_URL + "/preview/product",
    }
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
      unique: true,
      required: true,
    },
    {
      type: "relationship",
      name: "category",
      relationTo: "categories",
      hasMany: true,
      minRows: 1,
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          name: "detail",
          fields: [
            {
              name: "price",
              type: "number",
              required: true,
            },
            {
              name: "sku",
              type: "text",
              unique: true,
            }
          ]
        },
        {
          name: "specification",
          fields: [
            {
              type: "array",
              name: "specifications",
              fields: [
                {
                  name: "name",
                  type: "text",
                  required: true,
                },
                {
                  name: "value",
                  type: "text",
                  required: true,
                }
              ]
            }
          ]
        }
      ]
    },
  ],
}