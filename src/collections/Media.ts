import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    adminThumbnail: "thumbnail",
    formatOptions: {
      format: "jpeg",
      options: {
        compression: "jpeg",
        quality: 60,
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
          format: "jpeg",
          options: {
            quality: 40,
            compression: "jpeg",
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
