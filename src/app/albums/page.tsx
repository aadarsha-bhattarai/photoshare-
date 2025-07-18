import React from 'react'
import Link from 'next/link'
import AppLayout from '@/components/app-layout'
import AlbumCard from '@/components/album-card'
import { mockAlbums } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { PlusCircle, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function AlbumsPage() {
  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Albums</h1>
          <p className="text-muted-foreground">Organize your memories in albums</p>
        </div>
        <Button asChild>
          <Link href="/create/album">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Album
          </Link>
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search albums..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>

      {mockAlbums.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No albums yet</h3>
          <p className="text-muted-foreground mt-1">Create albums to organize your photos</p>
          <Button className="mt-4" asChild>
            <Link href="/create/album">
              Create an album
            </Link>
          </Button>
        </div>
      )}
    </AppLayout>
  )
}
