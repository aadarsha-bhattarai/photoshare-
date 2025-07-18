import React from 'react'
import AppLayout from '@/components/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { mockFriends, mockPhotos } from '@/lib/mock-data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Check, ImagePlus, Save, X } from 'lucide-react'
import Image from 'next/image'

export default function CreateSharedAlbumPage() {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create Shared Album</h1>
          <p className="text-muted-foreground">
            Share photos and videos with friends and family
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Album Details</CardTitle>
                <CardDescription>
                  Give your album a name and description
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="album-name">Album Name</Label>
                  <Input id="album-name" placeholder="e.g., Summer Vacation 2024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="album-description">Description (optional)</Label>
                  <Input id="album-description" placeholder="Add a description..." />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add Photos</CardTitle>
                <CardDescription>
                  Select photos to add to your shared album
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 items-center mb-4">
                  {mockPhotos.slice(0, 4).map((photo) => (
                    <div key={photo.id} className="relative h-24 w-24 rounded-md overflow-hidden border border-primary">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                    </div>
                  ))}
                  <div className="h-24 w-24 border border-dashed rounded-md flex items-center justify-center">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <ImagePlus className="h-6 w-6 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  4 photos selected
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Share With</CardTitle>
                <CardDescription>
                  Select friends to share this album with
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {mockFriends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between space-x-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={friend.photoUrl} alt={friend.name} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{friend.name}</span>
                      </div>
                      <div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="ghost">Cancel</Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Create Album
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
