import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.rareblocks.xyz',
        port: '80',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '80',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.rareblocks.xyz',
        port: '80',
        pathname: '/**'
      }
    ]
  }
}

export default withPayload(nextConfig)
