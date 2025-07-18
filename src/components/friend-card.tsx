"use client"

import React from 'react'
import Link from 'next/link'
import { Share2, MessageSquare, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter } from './ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils'

interface Friend {
  id: string
  name: string
  photoUrl?: string
  status?: 'online' | 'offline'
  lastSeen?: Date
  sharedAlbums: number
}

interface FriendCardProps {
  friend: Friend
  className?: string
}

const FriendCard: React.FC<FriendCardProps> = ({ friend, className }) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={friend.photoUrl} alt={friend.name} />
              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {friend.status && (
              <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium truncate">{friend.name}</h3>
            <p className="text-xs text-muted-foreground truncate">
              {friend.sharedAlbums > 0
                ? `${friend.sharedAlbums} shared ${friend.sharedAlbums === 1 ? 'album' : 'albums'}`
                : 'No shared albums'
              }
            </p>
          </div>

          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/friends/${friend.id}`}>
                    View profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Remove friend
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0 border-t">
        <div className="grid grid-cols-2 w-full">
          <Button
            variant="ghost"
            className="rounded-none py-2 h-auto"
            asChild
          >
            <Link href={`/friends/${friend.id}/message`}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="rounded-none py-2 h-auto border-l"
            asChild
          >
            <Link href={`/create/shared?friend=${friend.id}`}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Photos
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default FriendCard
