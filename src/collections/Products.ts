import { versionConfig } from "@/utils/version-config";
import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  versions: versionConfig,
  admin: {
    useAsTitle: "name",
    livePreview: {
      url: ({ data }) => {
        return process.env.NEXT_PUBLIC_SERVER_URL + "/preview/product/" + data.id
      }
    }
  },
  fields: [
    {
      type: "upload",
      relationTo: "media",
      name: "thumbnail",
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      admin: {
        disabled: true,
      }
    },
    {
      name: "name",
      type: "text",
      unique: true,
      required: true,
      hooks: {
        beforeChange: [
          ({ data, value }) => {
            data!.slug = (typeof value === "string")
              ? encodeURI(value.trim().toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, "-")).replace(/-+/g, "-")
              : value;

            return value;
          }
        ]
      }
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
              type: "richText",
              name: "description"
            },
            {
              type: "text",
              name: "featureTitle"
            },
            {
              type: "array",
              name: "features",
              fields: [
                {
                  name: "name",
                  type: "text",
                  required: true,
                },
              ]
            }
          ]
        }
      ]
    },
  ],
}