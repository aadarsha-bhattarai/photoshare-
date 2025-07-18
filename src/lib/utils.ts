import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileSize(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Truncate a string to a specified length and add an ellipsis if needed
export function truncateString(str: string, num: number): string {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

// Define a Photo type
export interface Photo {
  id: string
  src: string
  alt: string
  width: number
  height: number
  timestamp: Date
  likes?: number
  comments?: number
  owner?: string
  isVideo?: boolean
}

// Filter a list of photos by type
export function filterPhotosByType(photos: Photo[], type: 'images' | 'videos' | 'all') {
  if (type === 'all') return photos

  return photos.filter(photo => {
    if (type === 'images') {
      return !photo.isVideo
    } else {
      return photo.isVideo
    }
  })
}

// Generate placeholder image URL
export function getPlaceholderImage(width: number, height: number, text?: string): string {
  const textParam = text ? `&text=${encodeURIComponent(text)}` : ''
  return `https://via.placeholder.com/${width}x${height}${textParam}`
}

// Format a date to a nice string
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
