// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Home } from './globals/Home'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Variations } from './collections/Variations'
import { SubVariations } from './collections/SubVariations'
import { Prices } from './collections/Prices'
import { seoPlugin } from '@payloadcms/plugin-seo'

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
  globals: [Home],
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
    }),
  ],
})
