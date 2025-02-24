'use client'

import Link from 'next/link'
import { Heart, Camera, Calendar } from 'lucide-react'
import { momentData } from '@/support/moment'
import { useState } from 'react' // Import useState for "Read More" functionality
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function MomentsPage() {
  
  const router = useRouter()

  const [showFullDescription, setShowFullDescription] = useState(false)

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Moments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {momentData.map((moment) => {

            
            const description = moment.description
            const isLongDescription = description.length > 100
            const trimmedDescription = isLongDescription ? description.slice(0, 60) + '...' : description

            return (

              <Link href={`/moments/${moment._id}`} key={moment._id} >

                <div
                  
                  className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  {/* Image Section - Full Card Cover */}
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={moment.images[0].url}
                      alt={moment.name}
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Content Section - Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end bg-black/30">
                    {/* Name and Heart Icon */}
                    <div className="flex items-center gap-3 mb-2">
                      {/* Heart Icon with Fixed Size */}
                      <div className="w-8 h-8 flex items-center justify-center">
                        <Heart className="text-rose-500" size={32} fill="currentColor" />
                      </div>
                      <h1 className="text-2xl md:text-3xl font-bold text-white">{moment.name}</h1>
                    </div>

                    {/* Description */}
                    <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-4">
                      {showFullDescription ? description : trimmedDescription}
                      {isLongDescription && (
                        <button
                          onClick={() => setShowFullDescription(!showFullDescription)}
                          className="text-rose-400 font-semibold ml-2"
                        >
                          {showFullDescription ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                    </p>

                    {/* Camera and Calendar Icons */}
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <Camera className="text-rose-400" />
                        <span className="text-gray-200 font-semibold">{moment.images.length} Moments</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="text-rose-400" />
                        <span className="text-gray-200 font-semibold">Since {new Date(moment.images[0].date).getFullYear()}</span>
                      </div>
                    </div>

                    {/* Explore Our Gallery Button */}
                    <button
                      onClick={() => router.push(`/moments/${moment._id}`)}
                      className="w-fit px-6 py-3 bg-rose-500 text-white font-semibold rounded-full 
                      transition transform hover:scale-105 hover:bg-rose-600 text-left mb-8"
                    >
                      Explore Our Gallery
                    </button>
                  </div>
                </div>
              </Link>

            )
          })}
        </div>
      </div>
    </div>
  )
}