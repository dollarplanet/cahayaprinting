import { isAdminOrEditor } from "@/accesses/is-admin-or-editor";
import { TitleField } from "@/fields/title-field";
import { versionConfig } from "@/utils/version-config";
import { CollectionConfig, GlobalConfig } from "payload";

export const Home: GlobalConfig = {
  slug: "home",
  versions: versionConfig,
  access: {
    update: isAdminOrEditor,
  },
  admin: {
    livePreview: {
      url: "http://localhost:3000?preview=true",
    },
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          admin: {
            width: 100
          }
        },
        TitleField,
      ]
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    }
  ],
}