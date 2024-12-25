import { isAdminOrEditor } from "@/accesses/is-admin-or-editor";
import { versionConfig } from "@/utilities/version-config";
import { GlobalConfig } from "payload";

export const PrivacyPolicy: GlobalConfig = {
  slug: "privacy-policy",
  versions: versionConfig,
  access: {
    update: isAdminOrEditor,
  },
  admin: {
    livePreview: {
      url: process.env.NEXT_PUBLIC_SERVER_URL + "/preview/kebijakan-privasi",
    },
  },
  fields: [
    {
      type: "richText",
      name: "content",
      required: true,
    }
  ],
}