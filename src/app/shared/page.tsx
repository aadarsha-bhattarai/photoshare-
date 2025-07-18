import React from 'react'
import Link from 'next/link'
import AppLayout from '@/components/app-layout'
import AlbumCard from '@/components/album-card'
import { mockSharedAlbums } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

export default function SharedPage() {
  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Shared Albums</h1>
          <p className="text-muted-foreground">Albums shared with friends and family</p>
        </div>
        <Button asChild>
          <Link href="/create/shared">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Shared Album
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockSharedAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>

      {mockSharedAlbums.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No shared albums yet</h3>
          <p className="text-muted-foreground mt-1">Share your photos with friends and family</p>
          <Button className="mt-4" asChild>
            <Link href="/create/shared">
              Create a shared album
            </Link>
          </Button>
        </div>
      )}
    </AppLayout>
  )
}
