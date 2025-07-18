import React from 'react'
import AppLayout from '@/components/app-layout'
import PhotoGrid from '@/components/photo-grid'
import { mockPhotos } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Clock, Calendar, Filter } from 'lucide-react'

export default function HomePage() {
  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">All Photos</h1>
          <p className="text-muted-foreground">Showing {mockPhotos.length} photos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Sort by Date
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <PhotoGrid photos={mockPhotos} colCount={4} />
    </AppLayout>
  )
}
