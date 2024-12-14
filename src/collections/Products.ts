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
                beforeChange: [
                  async ({ data, value, operation, req: { payload } }) => {
                    if (operation !== "read") {
                      if (data !== undefined) {
                        // clear old data
                        await payload.delete({
                          collection: "prices",
                          where: {
                            product: {
                              equals: data.id
                            },
                          }
                        });

                        const variations = await payload.find({ collection: "variations" });
                        const subvariations = await payload.find({ collection: "subvariations" });
                        const isSingleVariation = [...new Set(value.map((v: any) => v.variation))].length === 1;

                        let combinations = [];

                        // generate combinations
                        if (isSingleVariation) {
                          combinations = value.map((v: any) => {
                            if (!v.variation || !v.subvariation) {
                              return null;
                            }

                            return `${variations.docs.find((g: any) => g.id === v.variation)?.name} (${subvariations.docs.find((h: any) => h.id === v.subvariation)?.name})`
                          }).filter((v: any) => v !== null);
                        } else {
                          combinations = value.flatMap((temp: any, ind: any) => {
                            return value.slice(ind + 1).map((holder: any) => {
                              if (!temp.variation || !temp.subvariation || !holder.variation || !holder.subvariation) {
                                return null;
                              }

                              if (temp.variation === holder.variation) {
                                return null;
                              }
                              return `${variations.docs.find((v: any) => v.id === temp.variation)?.name} (${subvariations.docs.find((v: any) => v.id === temp.subvariation)?.name}) & ${variations.docs.find((v: any) => v.id === holder.variation)?.name} (${subvariations.docs.find((v: any) => v.id === holder.subvariation)?.name})`;
                            })
                          }).filter((v: any) => v !== null);
                        }

                        combinations = [...new Set(combinations)];

                        console.log(combinations)

                        for (const combination of combinations) {
                          await payload.create({
                            collection: "prices",
                            data: {
                              name: combination as string,
                              price: 99999999,
                              product: data.id,
                            }
                          })
                        }
                      }
                    };
                  }
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
          admin: {
            description: "Refresh page to see new data"
          },
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