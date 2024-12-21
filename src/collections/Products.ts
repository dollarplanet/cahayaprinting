import { Subvariation, Variation } from "@/payload-types";
import { combos } from "@/utils/combos";
import { versionConfig } from "@/utils/version-config";
import { equal, notEqual } from "assert";
import { PgTable } from "drizzle-orm/pg-core";
import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  versions: versionConfig,
  access: {
    read: () => true,
  },
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
      type: "tabs",
      tabs: [
        {
          label: "Detail",
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
              name: "sku",
              type: "text",
              unique: true,
            },
          ]
        },
        {
          name: "variant",
          fields: [
            {
              type: "relationship",
              name: "subvariation",
              relationTo: "subvariations",
              required: true,
              hasMany: true,
            },
            {
              type: "ui",
              name: "generatePrice",
              admin: {
                components: {
                  Field: "/components/price-generator-button.tsx" 
                }
              }
            }
          ]
        },
        {
          name: "price",
          fields: [
            {
              type: "join",
              name: "prices",
              collection: "prices",
              on: "product",
              admin: {
                disableListColumn: true,
                allowCreate: false
              }
            },
          ]
        },
        {
          name: "freeOption",
          fields: [
            {
              type: "relationship",
              name: "subvariation",
              relationTo: "subvariations",
              required: true,
              hasMany: true,
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