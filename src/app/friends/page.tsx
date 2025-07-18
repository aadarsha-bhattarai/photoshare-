import React from 'react'
import Link from 'next/link'
import AppLayout from '@/components/app-layout'
import FriendCard from '@/components/friend-card'
import { mockFriends } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Search, UserPlus } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function FriendsPage() {
  // Separate online and offline friends
  const onlineFriends = mockFriends.filter(friend => friend.status === 'online')
  const offlineFriends = mockFriends.filter(friend => friend.status === 'offline')

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Friends</h1>
          <p className="text-muted-foreground">Share photos with your friends</p>
        </div>
        <Button asChild>
          <Link href="/friends/add">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Friend
          </Link>
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search friends..."
            className="pl-9"
          />
        </div>
      </div>

      {mockFriends.length > 0 ? (
        <div className="space-y-6">
          {onlineFriends.length > 0 && (
            <div>
              <h2 className="text-lg font-medium mb-3">Online ({onlineFriends.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {onlineFriends.map((friend) => (
                  <FriendCard key={friend.id} friend={friend} />
                ))}
              </div>
            </div>
          )}

          {offlineFriends.length > 0 && (
            <div>
              <h2 className="text-lg font-medium mb-3">Offline ({offlineFriends.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {offlineFriends.map((friend) => (
                  <FriendCard key={friend.id} friend={friend} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No friends yet</h3>
          <p className="text-muted-foreground mt-1">Add friends to share your photos</p>
          <Button className="mt-4" asChild>
            <Link href="/friends/add">
              Add your first friend
            </Link>
          </Button>
        </div>
      )}
    </AppLayout>
  )
}
