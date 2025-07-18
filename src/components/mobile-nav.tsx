"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Grid,
  Clock,
  Users,
  Heart,
  Share2,
  Settings,
  Menu
} from 'lucide-react'
import { Button } from './ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const MobileNav = () => {
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
      label: 'People',
      icon: Users,
      href: '/people',
      active: pathname === '/people',
    },
    {
      label: 'Favorites',
      icon: Heart,
      href: '/favorites',
      active: pathname === '/favorites',
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
      active: pathname === '/settings',
    },
  ]

  return (
    <div className="md:hidden fixed bottom-0 w-full border-t bg-background z-50">
      <div className="flex items-center justify-around p-2">
        {routes.slice(0, 4).map((route) => (
          <Button
            key={route.href}
            variant="ghost"
            size="icon"
            asChild
            className={cn(
              "flex flex-col items-center justify-center rounded-lg",
              route.active && "bg-secondary text-secondary-foreground"
            )}
          >
            <Link href={route.href}>
              <route.icon className="h-5 w-5" />
              <span className="sr-only">{route.label}</span>
            </Link>
          </Button>
        ))}

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="flex flex-col items-center justify-center rounded-lg">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-80">
            <SheetHeader className="text-left">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Access all features of PhotoShare
              </SheetDescription>
            </SheetHeader>
            <div className="grid grid-cols-3 gap-4 py-4">
              {routes.map((route) => (
                <SheetClose key={route.href} asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "flex flex-col items-center justify-center h-20 gap-2",
                      route.active && "bg-secondary text-secondary-foreground"
                    )}
                    asChild
                  >
                    <Link href={route.href}>
                      <route.icon className="h-6 w-6" />
                      <span>{route.label}</span>
                    </Link>
                  </Button>
                </SheetClose>
              ))}

              <SheetClose asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center justify-center h-20 gap-2"
                  asChild
                >
                  <Link href="/create/album">
                    <Users className="h-6 w-6" />
                    <span>Friends</span>
                  </Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center justify-center h-20 gap-2"
                  asChild
                >
                  <Link href="/create/album">
                    <Grid className="h-6 w-6" />
                    <span>Albums</span>
                  </Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default MobileNav
