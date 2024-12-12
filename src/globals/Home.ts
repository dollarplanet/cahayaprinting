import { isAdminOrEditor } from "@/accesses/is-admin-or-editor";
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
                  admin: {
                    width: 100
                  }
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