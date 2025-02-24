'use client'

import { useState } from 'react';
import { Heart, Camera, Calendar } from 'lucide-react'
import { MomentData } from '@/support/moment'
import Image from 'next/image';


interface Props {
  moments: MomentData;
  onExplore: () => void;
}

export default function MomentHeader({ moments, onExplore }: Props) {


  const [showFullDescription, setShowFullDescription] = useState(false)
  const description = moments.description
  const isLongDescription = description.length > 100
  const trimmedDescription = isLongDescription ? description.slice(0, 150) + '...' : description

  return (

    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white text-white py-4">
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col md:flex-row items-center 
        justify-center gap-8 md:gap-16 p-6 pb-20 md:pb-32">

          {/* Left Side - Image */}
          <div className="w-full md:w-1/2 max-w-lg mt-10 sm:mt-16">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={moments.images[0].url}
                alt={moments.name}
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full md:w-1/2 max-w-lg md:text-left space-y-6 mb-10">

            <div className="flex items-center justify-start gap-3 mb-4">
              <Heart className="text-rose-500" size={40} fill="currentColor" />
              <h1 className="text-4xl md:text-5xl font-bold text-rose-500">{moments.name}</h1>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-4">
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

            {/* Stats Section */}
            <div className="flex justify-start gap-8 py-4">
              <div className="flex items-center gap-2">
                <Camera className="text-rose-500" />
                <span className="text-lg text-rose-500 font-bold">{moments.images.length} Moments</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="text-rose-500" />
                <span className="text-lg text-rose-500 font-bold">Since 2020</span>
              </div>
            </div>

            <div className="flex justify-start">
              <button
                onClick={onExplore}
                className="px-8 py-4 bg-rose-500 hover:bg-rose-600 rounded-full 
                text-white font-medium transition-all duration-300 
                transform hover:scale-105"
              >
                Explore Our Gallery
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
} 