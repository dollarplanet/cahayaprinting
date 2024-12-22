import { isAdminOrEditor } from "@/accesses/is-admin-or-editor";
import { versionConfig } from "@/utilities/version-config";
import { GlobalConfig } from "payload";

export const PrivacyPolicy: GlobalConfig = {
  slug: "privacy-policy",
  versions: versionConfig,
  access: {
    update: isAdminOrEditor,
  },
  fields: [
    {
      type: "richText",
      name: "content",
      required: true,
    }
  ],
}