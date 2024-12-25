// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/users-cols'
import { Media } from './collections/media-cols'
import { Categories } from './collections/categories-cols'
import { Products } from './collections/products-cols'
import { Variations } from './collections/variations-cols'
import { SubVariations } from './collections/subvariants-cols'
import { Prices } from './collections/prices-cols'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Profile } from './globals/profile-glob'
import { Home } from './globals/home-glob'
import { PrivacyPolicy } from './globals/privacy-policy-glob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Products, Variations, SubVariations, Prices],
  globals: [Home, Profile, PrivacyPolicy],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp: sharp,
  upload: {
    safeFileNames: true,
    limits: {
      fileSize: 7 * 1024 * 1024,
    },
    abortOnLimit: true,
    responseOnLimit: 'File is too large',
  },
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    seoPlugin({
      collections: ["products"],
      globals: ["home"],
      tabbedUI: true,
      uploadsCollection: "media",
      generateImage: ({ doc, globalSlug, collectionSlug }) => {
        const allowed = [
          globalSlug === "home",
          collectionSlug === "products",
        ]

        if (allowed.includes(true)) {
          return doc?.images[0];
        }

      },
      generateTitle: async ({ doc, req: { payload }, collectionSlug }) => {
        if (collectionSlug === "products") {
          const categories = await payload.find({
            collection: "categories",
            where: {
              id: {
                in: doc?.category
              }
            }
          });

          const categoriesNames = categories?.docs?.map((category) => category.name).join(", ");

          return `${doc?.name} - SKU: ${doc?.sku} - Kategori: ${categoriesNames}`;
        } 

        return "";
      },

      fields: ({defaultFields}) => {
        return [
          ...defaultFields,
          {
            name: "keywords",
            type: "text",
            admin: {
              description: "Keywords for SEO, separated by commas",
            }
          }
        ]
      }
    }),
    searchPlugin({
      collections: ["products"],
    }),
  ],
})
