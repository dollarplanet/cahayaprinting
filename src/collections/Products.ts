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
          label: "Content",
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
              hooks: {
                afterChange: [
                  async ({ value, originalDoc, req: { payload }, operation }) => {
                    if ((operation === 'read') || (operation === 'create') || (originalDoc === undefined) || (value === undefined)) return;

                    await payload.delete({
                      collection: "prices",
                      where: {
                        product: {
                          equals: originalDoc.id
                        }
                      }
                    })

                    if (value.length === 0) return;

                    const subs = await payload.find({
                      collection: "subvariations",
                      depth: 1,
                      where: {
                        id: {
                          in: value.map((v: any) => (typeof v === "number") ? v : v.id)
                        }
                      }
                    });

                    const tempHolder: Map<number, number[]> = new Map();

                    for (const sub of subs.docs) {
                      const key = (sub.variation as Variation).id;
                      tempHolder.set((sub.variation as Variation).id, [...(tempHolder.get(key) ?? []), sub.id]);
                    }

                    const holder = Array.from(tempHolder.values()).filter((v) => (v.length > 0));

                    const combo: number[][] = combos(holder);

                    const prices: { combinations: number[], price: number, name: string, product: number }[] = combo.map((c) => {
                      return {
                        combinations: c,
                        price: 99999999,
                        product: originalDoc.id,
                        name: c.map((c: any) => {
                          const sub = subs.docs.find((sub) => sub.id === c);
                          return `${(sub!.variation as Variation).name} ${sub!.name}`;
                        }).join(", ")
                      }
                    })

                    for (const price of prices) {
                      await payload.create({
                        collection: "prices",
                        data: price,
                      })
                    }
                  }
                ],
              }
            },
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