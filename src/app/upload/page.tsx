import React from 'react'
import AppLayout from '@/components/app-layout'
import UploadForm from '@/components/upload-form'

export default function UploadPage() {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Upload Photos & Videos</h1>
          <p className="text-muted-foreground">
            Upload photos and videos to your library
          </p>
        </div>

        <UploadForm />
      </div>
    </AppLayout>
  )
}
