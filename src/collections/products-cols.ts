import { generateProductSlug } from "@/utilities/generate-product-slug";
import { versionConfig } from "@/utilities/version-config";
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
        return process.env.NEXT_PUBLIC_SERVER_URL + "/preview/produk/" + data.slug
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
              name: "slug",
              type: "text",
              unique: true,
              admin: {
                disabled: true,
              }
            },
            {
              name: "title",
              type: "text",
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

                    const category = siblingData?.title?.split("==>")?.[1];

                    data!.title = value + " " + siblingData?.sku + " " + category;

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
              hooks: {
                beforeChange: [
                  async ({ data, value, siblingData, req: { payload } }) => {
                    const categories = await payload.find({
                      collection: "categories",
                      depth: 0,
                      where: {
                        id: {
                          in: value
                        }
                      }
                    });

                    data!.title = siblingData?.name + " " + siblingData?.sku + " ==> " + categories.docs.map((category) => category.name).join(" ");

                    return value;
                  }
                ]
              },
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

                    const category = siblingData?.title?.split("==>")?.[1];

                    data!.title = siblingData?.name + " " + value + " " + category;

                    return value;
                  }
                ]
              }
            },
            {
              type: "upload",
              relationTo: "media",
              hasMany: true,
              name: "images",
            },
          ]
        },
        {
          name: "variant",
          fields: [
            {
              type: "relationship",
              name: "priceVariation",
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
            },            
            {
              type: "relationship",
              name: "freeVariation",
              relationTo: "subvariations",
              hasMany: true,
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
              },
            },
            {
              type: "number",
              name: "minPrice",
              admin: {
                hidden: true
              }
            },
            {
              type: "number",
              name: "maxPrice",
              admin: {
                hidden: true
              }
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