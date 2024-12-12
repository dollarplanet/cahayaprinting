'use client'
import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation.js'
import React from 'react'

export const LivePreviewTrigger: React.FC = () => {
  const router = useRouter()

  return (
    <RefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={"http://localhost:3000"}
    />
  )
}