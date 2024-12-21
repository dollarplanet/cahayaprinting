import { Subvariation, Variation } from "@/payload-types";
import { combos } from "@/utilities/combos";
import { generateProductSlug } from "@/utilities/generate-product-slug";
import { versionConfig } from "@/utilities/version-config";
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
        return process.env.NEXT_PUBLIC_SERVER_URL + "/preview/product/" + data.slug
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
              required: true,
              hooks: {
                beforeChange: [
                  ({ data, value, siblingData }) => {
                    data!.slug = generateProductSlug({
                      name: value,
                      sku: siblingData?.sku,
                    });

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
              hooks: {
                beforeChange: [
                  ({ data, value, siblingData }) => {
                    data!.slug = generateProductSlug({
                      name: siblingData?.name,
                      sku: value,
                    });

                    return value;
                  }
                ]
              }
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