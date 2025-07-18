// Mock data for demo purposes

import { v4 as uuidv4 } from 'uuid'

// Mock Photos
export const mockPhotos = [
  {
    id: uuidv4(),
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    alt: 'Mountain landscape with lake',
    width: 1200,
    height: 800,
    timestamp: new Date(2023, 6, 15),
    likes: 24,
    comments: 5,
    owner: 'You',
    isVideo: false
  },
  {
    id: uuidv4(),
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    alt: 'Ocean sunset',
    width: 1200,
    height: 900,
    timestamp: new Date(2023, 7, 2),
    likes: 18,
    comments: 3,
    owner: 'You',
    isVideo: false
  },
  {
    id: uuidv4(),
    src: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5',
    alt: 'Forest path',
    width: 900,
    height: 1200,
    timestamp: new Date(2023, 8, 10),
    likes: 42,
    comments: 7,
    owner: 'You',
    isVideo: false
  },
  {
    id: uuidv4(),
    src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    alt: 'Mountain cabin by lake',
    width: 1200,
    height: 800,
    timestamp: new Date(2023, 9, 5),
    likes: 31,
    comments: 2,
    owner: 'You',
    isVideo: false
  },
  {
    id: uuidv4(),
    src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e',
    alt: 'Countryside meadow',
    width: 1200,
    height: 800,
    timestamp: new Date(2023, 10, 20),
    likes: 15,
    comments: 1,
    owner: 'You',
    isVideo: false
  },
  {
    id: uuidv4(),
    src: 'https://images.unsplash.com/photo-1682685797507-d44d838b0570',
    alt: 'City skyline at night',
    width: 800,
    height: 1200,
    timestamp: new Date(2023, 11, 8),
    likes: 27,
    comments: 4,
    owner: 'You',
    isVideo: false
  },
  {
    id: uuidv4(),
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    alt: 'Starry night over mountains',
    width: 1200,
    height: 800,
    timestamp: new Date(2024, 0, 14),
    likes: 53,
    comments: 9,
    owner: 'You',
    isVideo: false
  },
  {
    id: uuidv4(),
    src: 'https://images.unsplash.com/photo-1682687982093-4c595e290a6a',
    alt: 'Autumn forest',
    width: 1000,
    height: 1200,
    timestamp: new Date(2024, 1, 22),
    likes: 19,
    comments: 3,
    owner: 'You',
    isVideo: false
  },
  {
    id: uuidv4(),
    src: 'https://images.unsplash.com/photo-1682687982093-4c595e290a6a',
    alt: 'Desert landscape',
    width: 1200,
    height: 800,
    timestamp: new Date(2024, 2, 7),
    likes: 34,
    comments: 6,
    owner: 'You',
    isVideo: false
  },
  {
    id: uuidv4(),
    src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    alt: 'Beach at sunset',
    width: 1200,
    height: 800,
    timestamp: new Date(2024, 2, 18),
    likes: 45,
    comments: 8,
    owner: 'You',
    isVideo: false
  }
]

// Mock Albums
export const mockAlbums = [
  {
    id: uuidv4(),
    name: 'Summer Vacation 2023',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    photoCount: 48,
    timestamp: new Date(2023, 7, 15),
    isShared: true,
    isPrivate: false
  },
  {
    id: uuidv4(),
    name: 'Family Reunion',
    coverImage: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    photoCount: 24,
    timestamp: new Date(2023, 11, 25),
    isShared: true,
    isPrivate: false
  },
  {
    id: uuidv4(),
    name: 'Wildlife Photography',
    coverImage: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5',
    photoCount: 36,
    timestamp: new Date(2024, 1, 10),
    isShared: false,
    isPrivate: false
  },
  {
    id: uuidv4(),
    name: 'Personal Projects',
    coverImage: 'https://images.unsplash.com/photo-1682685797507-d44d838b0570',
    photoCount: 15,
    timestamp: new Date(2024, 2, 5),
    isShared: false,
    isPrivate: true
  },
  {
    id: uuidv4(),
    name: 'Architecture',
    coverImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e',
    photoCount: 27,
    timestamp: new Date(2024, 3, 12),
    isShared: true,
    isPrivate: false
  }
]

// Mock Friends
export const mockFriends = [
  {
    id: uuidv4(),
    name: 'Alex Johnson',
    photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'online' as const,
    lastSeen: new Date(),
    sharedAlbums: 3
  },
  {
    id: uuidv4(),
    name: 'Emma Thompson',
    photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    status: 'online' as const,
    lastSeen: new Date(),
    sharedAlbums: 2
  },
  {
    id: uuidv4(),
    name: 'Michael Brown',
    photoUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    status: 'offline' as const,
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
    sharedAlbums: 1
  },
  {
    id: uuidv4(),
    name: 'Sophia Davis',
    photoUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
    status: 'offline' as const,
    lastSeen: new Date(Date.now() - 7200000), // 2 hours ago
    sharedAlbums: 4
  },
  {
    id: uuidv4(),
    name: 'James Wilson',
    photoUrl: 'https://randomuser.me/api/portraits/men/46.jpg',
    status: 'online' as const,
    lastSeen: new Date(),
    sharedAlbums: 0
  },
  {
    id: uuidv4(),
    name: 'Olivia Martinez',
    photoUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
    status: 'offline' as const,
    lastSeen: new Date(Date.now() - 86400000), // 1 day ago
    sharedAlbums: 2
  }
]

// Mock Shared Albums
export const mockSharedAlbums = [
  {
    id: uuidv4(),
    name: 'Trip to Europe',
    coverImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e',
    photoCount: 75,
    timestamp: new Date(2023, 8, 5),
    sharedWith: [mockFriends[0], mockFriends[1]],
    isPrivate: false,
    isShared: true
  },
  {
    id: uuidv4(),
    name: 'Hiking Adventures',
    coverImage: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    photoCount: 32,
    timestamp: new Date(2023, 10, 12),
    sharedWith: [mockFriends[2], mockFriends[3], mockFriends[4]],
    isPrivate: false,
    isShared: true
  },
  {
    id: uuidv4(),
    name: 'Birthday Party',
    coverImage: 'https://images.unsplash.com/photo-1682685797507-d44d838b0570',
    photoCount: 18,
    timestamp: new Date(2024, 1, 28),
    sharedWith: [mockFriends[0], mockFriends[1], mockFriends[5]],
    isPrivate: false,
    isShared: true
  }
]

// Get recent photos
export const getRecentPhotos = (count = 5) => {
  const sorted = [...mockPhotos].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  return sorted.slice(0, count)
}

// Get shared photos
export const getSharedPhotos = (count = 10) => {
  return mockPhotos.slice(0, count)
}

// Get photos by album
export const getPhotosByAlbum = (albumId: string) => {
  // In a real app, this would filter photos by album ID
  return mockPhotos.slice(0, 10)
}

// Get favorite photos
export const getFavoritePhotos = (count = 5) => {
  const sorted = [...mockPhotos].sort((a, b) => b.likes! - a.likes!)
  return sorted.slice(0, count)
}
