import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      async ({operation, req: {payload, file}, data}) => {
        // Hanya boleh gambar
        if (!file?.mimetype.includes("image/")) {
          throw new Error("Unsupported media")
        }

        // Batasi jumlah gambar
        if (operation === "create") {
          const count = await payload.count({
            collection: "media"
          })

          if (count.totalDocs >= parseInt(process.env.MAX_MEDIA_COUNT!)) {
            throw new Error("Maximum number of images reached")
          }
        }

        return data;
      }
    ]
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    mimeTypes: ["image/*"],
    adminThumbnail: "thumbnail",
    formatOptions: {
      format: "webp",
      options: {
        quality: 60,
        compression: "webp"
      }
    },
    resizeOptions: {
      fit: "cover",
      position: "center",
    },
    imageSizes: [
      {
        name: "thumbnail",
        formatOptions: {
          format: "webp",
          options: {
            quality: 40,
            compression: "webp"
          }
        },
        width: 200,
        height: 200,
        fit: "cover",
        position: "center",
        withoutEnlargement: false,
      }
    ],
  },
}
