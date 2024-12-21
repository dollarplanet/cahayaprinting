import { IncomingCollectionVersions } from "node_modules/payload/dist/versions/types";

export const versionConfig: IncomingCollectionVersions = {
  drafts: {
    autosave: {
      interval: 100,
    },
  },
  maxPerDoc: 50,
} 