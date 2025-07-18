"use client"

import React from 'react'
import PhotoCard from './photo-card'

interface Photo {
  id: string
  src: string
  alt: string
  width: number
  height: number
  timestamp: Date
  likes?: number
  comments?: number
  owner?: string
}

interface PhotoGridProps {
  photos: Photo[]
  colCount?: number
}

const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  colCount = 3
}) => {
  const getGridClass = (): string => {
    switch(colCount) {
      case 1:
        return "grid-cols-1"
      case 2:
        return "grid-cols-1 sm:grid-cols-2"
      case 3:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      case 4:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      default:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
    }
  }

  return (
    <div className={`grid ${getGridClass()} gap-4`}>
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          aspectRatio={photo.height > photo.width ? "portrait" : "square"}
        />
      ))}
    </div>
  )
}

export default PhotoGrid
