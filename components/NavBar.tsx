'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Heart, User } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigation = (path: string) => {
    setIsOpen(false)
    router.push(path)
  }

  // Helper function to check if path is active
  const isActivePath = (path: string) => {

    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
    
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)} 
            className="flex items-center cursor-pointer group"
          >
            <Heart 
              className="text-rose-500 transform group-hover:scale-110 transition-transform duration-300" 
              size={32} 
              fill="currentColor" 
            />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-rose-500 to-red-600 bg-clip-text text-transparent">
              Apnadil
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`transition-colors duration-300 relative group ${
                isActivePath('/') 
                  ? 'text-rose-500' 
                  : 'text-gray-600 hover:text-rose-500'
              }`}
            >
              <span>Home</span>
              <span className={`absolute transform transition-transform duration-300 ${
                isActivePath('/') 
                  ? 'scale-x-100' 
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
            
            <Link 
              href="/moments" 
              className={`transition-colors duration-300 relative group ${
                isActivePath('/moments') 
                  ? 'text-rose-500' 
                  : 'text-gray-600 hover:text-rose-500'
              }`}
            >
              <span>Moments</span>
              <span className={`absolute transform transition-transform duration-300 ${
                isActivePath('/moments') 
                  ? 'scale-x-100' 
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>

            <div className="relative">
              <button className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-rose-200 hover:border-rose-500 hover:bg-rose-50 transition-all duration-300">
                <User className="h-5 w-5 text-gray-600 hover:text-rose-500 transition-colors duration-300" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-600 hover:text-rose-500 transition-colors duration-300"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md">
          <div className="px-4 pt-2 pb-3 space-y-2">
            <button 
              onClick={() => handleNavigation('/')} 
              className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                isActivePath('/') 
                  ? 'text-rose-500 bg-rose-50' 
                  : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('/moments')} 
              className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                isActivePath('/moments') 
                  ? 'text-rose-500 bg-rose-50' 
                  : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              Moments
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}