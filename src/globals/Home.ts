import { isAdminOrEditor } from "@/accesses/is-admin-or-editor";
import { ButtonTitleField } from "@/fields/button-title-field";
import { TitleField } from "@/fields/title-field";
import { versionConfig } from "@/utils/version-config";
import { CollectionConfig, GlobalConfig, } from "payload";

export const Home: GlobalConfig = {
  slug: "home",
  versions: versionConfig,
  access: {
    update: isAdminOrEditor,
  },
  admin: {
    livePreview: {
      url: process.env.NEXT_PUBLIC_SERVER_URL + "?preview=true",
    },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              type: "group",
              name: "company",
              fields: [
                {
                  name: "logo",
                  type: "upload",
                  relationTo: "media",
                },
                {
                  name: "name",
                  type: "text",
                },
              ]
            },
            {
              type: "group",
              name: "heroContent",
              fields: [
                {
                  name: "heroImage",
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
            }
          ]
        },
        {
          label: "Featured",
          fields: [
            {
              type: "richText",
              name: "featuredDescription",
            },
            {
              name: "featuredButtonTittle",
              type: "text",
            }
          ]
        },
        {
          label: "Testimonials",
          fields: [
            {
              type: "text",
              name: "testimonialsTitle",
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
          label: "Questions",
          fields: [
            {
              type: "richText",
              name: "questionsDescription",
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