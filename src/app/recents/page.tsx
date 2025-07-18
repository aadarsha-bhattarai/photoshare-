import React from 'react'
import AppLayout from '@/components/app-layout'
import PhotoGrid from '@/components/photo-grid'
import { getRecentPhotos } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'

export default function RecentsPage() {
  // Get the most recent 20 photos
  const recentPhotos = getRecentPhotos(20)

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Recent Photos</h1>
          <p className="text-muted-foreground">Your most recent uploads</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <PhotoGrid photos={recentPhotos} colCount={3} />
    </AppLayout>
  )
}
