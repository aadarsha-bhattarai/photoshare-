"use client"

import React from 'react'
import Header from './header'
import Sidebar from './sidebar'
import MobileNav from './mobile-nav'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 md:pl-0 pt-4 px-4 md:pb-0 pb-16 md:px-6">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  )
}

export default AppLayout
