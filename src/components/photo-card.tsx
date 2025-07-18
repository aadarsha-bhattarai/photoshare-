"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import {
  Heart,
  MessageSquare,
  Share,
  MoreHorizontal,
  Download,
  Trash2,
  Play,
  AlertCircle
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter
} from './ui/card'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

interface PhotoCardProps {
  photo: {
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
  aspectRatio?: "portrait" | "square" | "video" | "auto"
  width?: number
  height?: number
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  aspectRatio = "square",
  width,
  height
}) => {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(photo.likes || 0)
  const [imageError, setImageError] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikesCount((prev) => prev - 1)
    } else {
      setLikesCount((prev) => prev + 1)
    }
    setLiked(!liked)

    // Show toast notification
    toast(
      liked ? "Removed from favorites" : "Added to favorites",
      {
        description: liked ? "Photo removed from your favorites" : "Photo added to your favorites",
        action: {
          label: "Undo",
          onClick: () => handleLike(),
        },
      }
    )
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog
    toast("Share link copied to clipboard", {
      description: "You can now paste the link to share this photo",
    })
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Card className="overflow-hidden border rounded-lg">
      <CardContent className="p-0">
        <div className={`relative ${getAspectRatioClass(aspectRatio)}`}>
          {!imageError ? (
            <>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-all hover:scale-105"
                onError={handleImageError}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {photo.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="bg-black/50 rounded-full p-3">
                    <Play className="h-8 w-8 text-white" fill="white" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="text-center">
                <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Image not available</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-2 flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleLike}
            aria-label={liked ? "Unlike" : "Like"}
            aria-pressed={liked}
          >
            <Heart
              className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
            />
            <span className="sr-only">{liked ? "Unlike" : "Like"}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Comment"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">Comment</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleShare}
            aria-label="Share"
          >
            <Share className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
        </div>

        <div className="flex items-center">
          <span className="text-xs text-muted-foreground mr-2">
            {formatDistanceToNow(photo.timestamp, { addSuffix: true })}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="More options"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  toast("Download started", {
                    description: "Your photo is being downloaded"
                  })
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  toast("Photo deleted", {
                    description: "The photo has been moved to trash",
                    action: {
                      label: "Undo",
                      onClick: () => {
                        toast("Photo restored", {
                          description: "Photo has been restored from trash"
                        })
                      }
                    }
                  })
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  )
}

function getAspectRatioClass(aspectRatio: string): string {
  switch (aspectRatio) {
    case "portrait":
      return "aspect-[3/4]"
    case "square":
      return "aspect-square"
    case "video":
      return "aspect-video"
    default:
      return "aspect-auto"
  }
}

export default PhotoCard
