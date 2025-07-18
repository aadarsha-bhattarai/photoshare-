"use client"

import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import {
  Upload,
  X,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { toast } from 'sonner'
import { formatFileSize } from '@/lib/utils'
import { Progress } from './ui/progress'

interface UploadFormProps {
  onUploadComplete?: (files: File[]) => void
  maxFiles?: number
  maxFileSize?: number
  allowedFileTypes?: string[]
}

// Define a type for rejected files
interface RejectedFile {
  file: File;
  errors: Array<{
    code: string;
    message: string;
  }>;
}

const UploadForm: React.FC<UploadFormProps> = ({
  onUploadComplete,
  maxFiles = 10,
  maxFileSize = 10485760, // 10MB
  allowedFileTypes = ['image/*', 'video/*']
}) => {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [errors, setErrors] = useState<string[]>([])

  // Cleanup previews when component unmounts
  useEffect(() => {
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview))
    }
  }, [previews])

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: RejectedFile[]) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const errorMessages = rejectedFiles.map(file => {
        const errors = file.errors.map(e => e.message).join(', ')
        return `${file.file.name}: ${errors}`
      })
      setErrors(errorMessages)

      // Show toast for rejected files
      toast.error(`${rejectedFiles.length} files could not be added`, {
        description: "Some files were rejected due to file type or size restrictions",
      })
    }

    // Check if adding accepted files would exceed the maxFiles limit
    if (files.length + acceptedFiles.length > maxFiles) {
      toast.error(`You can only upload a maximum of ${maxFiles} files`, {
        description: `Please remove some files or select fewer files`
      })

      // If we already have the maximum number of files, don't add more
      if (files.length >= maxFiles) return

      // Otherwise, only add files up to the limit
      acceptedFiles = acceptedFiles.slice(0, maxFiles - files.length)
    }

    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file))
    setFiles(prev => [...prev, ...acceptedFiles])
    setPreviews(prev => [...prev, ...newPreviews])

    if (acceptedFiles.length > 0) {
      toast.success(`${acceptedFiles.length} files added`, {
        description: `Ready to upload ${acceptedFiles.length} file${acceptedFiles.length === 1 ? '' : 's'}`
      })
    }
  }, [files.length, maxFiles])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: allowedFileTypes.reduce((acc, type) => ({...acc, [type]: []}), {}),
    maxSize: maxFileSize,
    maxFiles,
  })

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previews[index])
    setPreviews(prev => prev.filter((_, i) => i !== index))

    // Clear any errors when a file is removed
    setErrors([])
  }

  const removeAllFiles = () => {
    // Revoke all object URLs
    previews.forEach(preview => URL.revokeObjectURL(preview))
    setFiles([])
    setPreviews([])
    setErrors([])
  }

  const simulateUploadProgress = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress > 100) {
        progress = 100
        clearInterval(interval)
      }
      setUploadProgress(progress)
    }, 200)

    return interval
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one file to upload')
      return
    }

    setUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = simulateUploadProgress()

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    clearInterval(progressInterval)
    setUploadProgress(100)

    toast.success(`${files.length} ${files.length === 1 ? 'file' : 'files'} uploaded successfully!`, {
      description: "All files have been uploaded to your library"
    })

    if (onUploadComplete) {
      onUploadComplete(files)
    }

    // Clear files after upload (after a short delay)
    setTimeout(() => {
      // Clear files after upload
      previews.forEach(preview => URL.revokeObjectURL(preview))
      setFiles([])
      setPreviews([])
      setUploading(false)
      setUploadProgress(0)
      setErrors([])
    }, 1000)
  }

  const getDropzoneClassName = () => {
    let className = `
      border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
      hover:border-primary hover:bg-primary/5
    `

    if (isDragActive && !isDragReject) {
      className += ' border-primary bg-primary/5'
    } else if (isDragReject) {
      className += ' border-destructive bg-destructive/5'
    } else {
      className += ' border-border'
    }

    return className
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border-dashed">
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={getDropzoneClassName()}
            aria-label="Drop zone for file upload"
            role="button"
            tabIndex={0}
          >
            <input {...getInputProps()} aria-label="File upload input" />
            <Upload className="h-10 w-10 mb-2 mx-auto text-muted-foreground" aria-hidden="true" />
            <p className="text-sm mb-1">
              {isDragActive
                ? (isDragReject
                    ? 'Some files are not allowed'
                    : 'Drop the files here')
                : 'Drag & drop photos or videos here'}
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              Or click to browse files
            </p>
            <p className="text-xs text-muted-foreground">
              Max file size: {formatFileSize(maxFileSize)}
            </p>
          </div>

          {errors.length > 0 && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <div className="flex items-center mb-2">
                <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                <p className="text-sm font-medium text-destructive">There were problems with your upload</p>
              </div>
              <ul className="pl-5 text-xs text-destructive space-y-1 list-disc">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {previews.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Selected Files ({files.length}/{maxFiles})</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeAllFiles}
                  aria-label="Remove all files"
                  disabled={uploading}
                >
                  Clear all
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    {files[index].type.startsWith('image/') ? (
                      <div className="relative h-24 w-full">
                        <Image
                          src={preview}
                          alt={`Preview of ${files[index].name}`}
                          fill
                          className="object-cover rounded-md"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="h-24 w-full flex items-center justify-center bg-secondary rounded-md">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                      </div>
                    )}
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      disabled={uploading}
                      aria-label={`Remove ${files[index].name}`}
                    >
                      <X className="h-3 w-3" aria-hidden="true" />
                    </Button>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs truncate" title={files[index].name}>
                        {files[index].name.length > 15
                          ? `${files[index].name.substring(0, 12)}...`
                          : files[index].name}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(files[index].size)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {uploading && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Info className="h-4 w-4 mr-2 text-muted-foreground" aria-hidden="true" />
                      <p className="text-sm text-muted-foreground">Uploading {files.length} files...</p>
                    </div>
                    <span className="text-sm font-medium">{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" aria-label="Upload progress" />
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleUpload}
                  disabled={uploading || files.length === 0}
                  aria-label={`Upload ${files.length} files`}
                >
                  {uploading ? (
                    <>
                      <span className="mr-2">Uploading...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                      Upload
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default UploadForm
