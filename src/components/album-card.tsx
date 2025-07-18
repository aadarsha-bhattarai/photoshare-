"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Users, Lock, Globe } from 'lucide-react'
import { Card, CardContent, CardFooter } from './ui/card'

interface Album {
  id: string
  name: string
  coverImage: string
  photoCount: number
  timestamp: Date
  isShared: boolean
  isPrivate: boolean
}

interface AlbumCardProps {
  album: Album
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  return (
    <Link href={`/albums/${album.id}`}>
      <Card className="overflow-hidden border transition-all hover:shadow-md h-full">
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image
              src={album.coverImage}
              alt={album.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 p-3 w-full">
              <h3 className="font-medium text-white truncate">{album.name}</h3>
              <p className="text-xs text-white/80">{album.photoCount} items</p>
            </div>
            <div className="absolute top-2 right-2">
              {album.isPrivate ? (
                <div className="bg-black/50 p-1 rounded-full">
                  <Lock className="h-4 w-4 text-white" />
                </div>
              ) : album.isShared ? (
                <div className="bg-black/50 p-1 rounded-full">
                  <Users className="h-4 w-4 text-white" />
                </div>
              ) : (
                <div className="bg-black/50 p-1 rounded-full">
                  <Globe className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-2">
          <p className="text-xs text-muted-foreground">
            Updated {formatDistanceToNow(album.timestamp, { addSuffix: true })}
          </p>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default AlbumCard
