import { isAdminOrEditor } from "@/accesses/is-admin-or-editor";
import { GlobalConfig } from "payload";

export const Profile: GlobalConfig = {
  slug: "profile",
  access: {
    update: isAdminOrEditor,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "detail",
          fields: [
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "name",
              type: "text",
              required: true,
            },
            {
              name: "whatsapp",
              type: "text",
              required: true,
            },
          ]
        },
        {
          name: "socialMedia",
          fields: [
            {
              name: "facebookLink",
              type: "text",
              defaultValue: "https://www.facebook.com/",
            },
            {
              name: "instagramLink",
              type: "text",
              defaultValue: "https://www.instagram.com/",
            },
            {
              name: "twitterLink",
              type: "text",
              defaultValue: "https://www.x.com/",
            },
          ]
        }
      ]
    }
  ],
}