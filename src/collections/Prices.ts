import { Variation } from "@/payload-types";
import { CollectionConfig } from "payload";

export const Prices: CollectionConfig = {
  slug: "prices",
  admin: {
    hidden: true,
    useAsTitle: "name",
  },
  access: {
    create: () => false,
  },
  hooks: {
    beforeValidate: [
      async ({ operation, data, req: {payload} }) => {
        if ((operation === "create") && (data !== undefined)) {
          const subvariations = await payload.find({
            collection: "subvariations",
            where: {
              id: {
                in: data.combinations.map((c: any) => c.subvariation)
              }
            }
          })
          
          // console.log(subvariations.docs)
          let combinatinName = "";

          for (let i = 0; i < subvariations.docs.length; i++) {
            combinatinName += `${(subvariations.docs[i].variation as Variation).name} (${subvariations.docs[i].name})`
            combinatinName += (i !== data.combinations.length - 1) ? " , " : "";
          }

          return {
            ...data,
            name: combinatinName
          }
        } 

        return data;
      }
    ]
  },
  fields: [
    {
      name: "name",
      type: "text",
      access: {
        create: () => false,
        update: () => false,
      },
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      type: "relationship",
      name: "product",
      relationTo: "products",
      required: true,
      access: {
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      }
    },
    {
      type: "array",
      name: "combinations",
      admin: {
        hidden: true,
      },
      access: {
        create: () => false,
        update: () => false,
      },
      fields: [
        {
          type: "relationship",
          name: "variation",
          relationTo: "variations",
          required: true,
        },
        {
          type: "relationship",
          name: "subvariation",
          relationTo: "subvariations",
          required: true,
        }
      ]      
    },
  ],
}