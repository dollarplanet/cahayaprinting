import { isAdminOrEditor } from "@/accesses/is-admin-or-editor";
import { versionConfig } from "@/utilities/version-config";
import { GlobalConfig, } from "payload";

export const Home: GlobalConfig = {
  slug: "home",
  versions: versionConfig,
  access: {
    update: isAdminOrEditor,
  },
  admin: {
    livePreview: {
      url: process.env.NEXT_PUBLIC_SERVER_URL + "/preview",
    },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "hero",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "description",
              type: "richText",
              required: true,
            },
            {
              name: "buttonTitle",
              type: "text",
            },
          ]
        },
        {
          name: "featured",
          fields: [
            {
              type: "richText",
              name: "description",
            },
            {
              type: "relationship",
              name: "featuredProduct",
              relationTo: "products",
              required: true,
              hasMany: true,
            },
            {
              name: "buttonTitle",
              type: "text",
            }
          ]
        },
        {
          name: "testimonials",
          fields: [
            {
              type: "text",
              name: "title",
            },
            {
              type: "array",
              name: "testimonials",
              fields: [
                {
                  type: "textarea",
                  name: "description",
                  required: true,
                },
                {
                  type: "text",
                  name: "name",
                  required: true,
                },
                {
                  type: "text",
                  name: "company",
                }
              ]
            }
          ]
        },
        {
          name: "questions",
          fields: [
            {
              type: "richText",
              name: "description",
            },
            {
              type: "text",
              name: "altText",
            },
            {
              type: "array",
              name: "questions",
              fields: [
                {
                  type: "text",
                  name: "question",
                  required: true,
                },
                {
                  type: "textarea",
                  name: "answer",
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