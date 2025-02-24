'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Home, Heart, Plus, User, Info } from 'lucide-react'

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  const isActivePath = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-rose-100 z-50">
      <div className="max-w-lg mx-auto relative">
        
        {/* Create Button - Centered and Elevated */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-6">
          <button
            onClick={() => router.push('/create')}
            className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg transform transition-transform duration-300 hover:scale-110 active:scale-95"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex justify-between items-center h-16 px-6">
          {/* Home Button */}
          <button
            onClick={() => router.push('/')}
            className={`flex flex-col items-center space-y-1 transition-colors duration-300 ${
              isActivePath('/') ? 'text-rose-500' : 'text-gray-600'
            }`}
          >
            <Home className={`h-5 w-5 ${isActivePath('/') ? 'fill-rose-500' : ''}`} />
            <span className="text-xs font-medium">Home</span>
          </button>

          {/* Moments Button */}
          <button
            onClick={() => router.push('/moments')}
            className={`flex flex-col items-center space-y-1 transition-colors duration-300 ${
              isActivePath('/moments') ? 'text-rose-500' : 'text-gray-600'
            }`}
          >
            <Heart 
              className={`h-5 w-5 ${isActivePath('/moments') ? 'fill-rose-500' : ''}`} 
            />
            <span className="text-xs font-medium">Moments</span>
          </button>

          {/* Empty space for center button */}
          <div className="w-12"></div>

          {/* About Button */}
          <button
            onClick={() => router.push('/about')}
            className={`flex flex-col items-center space-y-1 transition-colors duration-300 ${
              isActivePath('/about') ? 'text-rose-500' : 'text-gray-600'
            }`}
          >
            <Info className="h-5 w-5" />
            <span className="text-xs font-medium">About</span>
          </button>

          {/* Profile Button */}
          <button
            onClick={() => router.push('/profile')}
            className={`flex flex-col items-center space-y-1 transition-colors duration-300 ${
              isActivePath('/profile') ? 'text-rose-500' : 'text-gray-600'
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>

      {/* Optional: Add a subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>
    </div>
  )
} 