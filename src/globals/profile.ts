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
              defaultValue: "6281234567890",
              required: true,
              admin: {
                description: "Tulis dengan format: 6281234567890 (awalan 62 tanpa tanda +)",
              }
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