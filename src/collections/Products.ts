import { combos } from "@/utils/combos";
import { versionConfig } from "@/utils/version-config";
import { equal, notEqual } from "assert";
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
      name: "sku",
      type: "text",
      unique: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          name: "option",
          fields: [
            {
              type: "array",
              name: "options",
              hooks: {
                afterChange: [
                  async ({ value, operation, req: { payload }, originalDoc }) => {
                    if ((operation !== "read") && (originalDoc !== undefined)) {
                      // process raw data
                      const rawArray = []; // array of array unprocessed
                      let variationKeys: any[] = [];

                      for (const item of value) {
                        if (!item.variation || !item.subvariation) return;

                        variationKeys.push(item.variation.id);
                        variationKeys = [...new Set(variationKeys)];
                      }

                      for (const variationKey of variationKeys) {
                        rawArray.push(value.filter((v: any) => v.variation.id === variationKey));
                      }

                      const combo = combos(rawArray);

                      // delete old prices
                      await payload.delete({
                        collection: "prices",
                        where: {
                          product: {
                            equals: originalDoc.id
                          }
                        }
                      })

                      // insert new prices
                      for (const comb of combo) {
                        if (comb.length === 0) continue;
                        // delete possible duplicate
                        await payload.create({
                          collection: "prices",
                          data: {
                            name: comb,
                            price: 99999999,
                            product: originalDoc.id,
                            combinations: comb.map((c: any) => ({
                              variation: c.variation,
                              subvariation: c.subvariation
                            }))
                          }
                        })
                      }
                    }
                  },
                ],
              },
              fields: [
                {
                  type: "relationship",
                  name: "variation",
                  required: true,
                  relationTo: "variations",
                },
                {
                  type: "relationship",
                  name: "subvariation",
                  required: true,
                  relationTo: "subvariations",
                  filterOptions: ({ siblingData }) => {
                    return {
                      variation: {
                        equals: (siblingData as any).variation
                      }
                    }
                  },
                },
              ]
            }
          ]
        },
        {
          name: "price",
          fields: [
            {
              type: "join",
              name: "price",
              collection: "prices",
              on: "product",
            },
          ]
        },
        {
          name: "freeOption",
          fields: [
            {
              type: "array",
              name: "freeOptions",
              fields: [
                {
                  type: "relationship",
                  name: "variation",
                  required: true,
                  relationTo: "variations",
                },
                {
                  type: "relationship",
                  name: "subvariation",
                  required: true,
                  relationTo: "subvariations",
                  filterOptions: ({ siblingData }) => {
                    return {
                      variation: {
                        equals: (siblingData as any).variation
                      }
                    }
                  },
                },
              ]
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