"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Grid,
  Clock,
  Users,
  Video,
  Heart,
  Share2,
  MessageSquare,
  PlusCircle,
  FolderPlus,
  PersonStanding,
  Album
} from 'lucide-react'
import { Button } from './ui/button'

interface SidebarProps {
  className?: string
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname()

  const routes = [
    {
      label: 'All Photos',
      icon: Grid,
      href: '/',
      active: pathname === '/',
    },
    {
      label: 'Recents',
      icon: Clock,
      href: '/recents',
      active: pathname === '/recents',
    },
    {
      label: 'Shared',
      icon: Share2,
      href: '/shared',
      active: pathname === '/shared',
    },
    {
      label: 'Albums',
      icon: Album,
      href: '/albums',
      active: pathname === '/albums',
    },
    {
      label: 'People',
      icon: Users,
      href: '/people',
      active: pathname === '/people',
    },
    {
      label: 'Videos',
      icon: Video,
      href: '/videos',
      active: pathname === '/videos',
    },
    {
      label: 'Favorites',
      icon: Heart,
      href: '/favorites',
      active: pathname === '/favorites',
    },
  ]

  return (
    <aside className={cn("pb-12 w-64 hidden md:block", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
            Library
          </h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "w-full justify-start gap-2",
                  route.active ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
            Create
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground" asChild>
              <Link href="/create/album">
                <FolderPlus className="h-4 w-4" />
                New Album
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground" asChild>
              <Link href="/create/shared">
                <PlusCircle className="h-4 w-4" />
                New Shared Album
              </Link>
            </Button>
          </div>
        </div>

        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
            Friends
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground" asChild>
              <Link href="/friends">
                <PersonStanding className="h-4 w-4" />
                All Friends
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground" asChild>
              <Link href="/friends/messages">
                <MessageSquare className="h-4 w-4" />
                Messages
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
