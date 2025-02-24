'use client'

import {Calendar, ChevronUp, ChevronDown } from 'lucide-react'
import { MomentData } from '@/support/moment'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

interface Props {
  moments: MomentData;
  expandedDescriptions: Record<string, boolean>;
  toggleDescription: (imageId: string) => void;
}

export default function DesktopViewMoment({ moments, expandedDescriptions, toggleDescription }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Function to determine which slide is most visible
  const getCurrentSlideIndex = () => {
    if (!containerRef.current) return 0
    
    const slides = Array.from(containerRef.current.getElementsByClassName('desktop-slide'))
    // const containerTop = containerRef.current.scrollTop
    const containerHeight = containerRef.current.clientHeight
    
    let bestVisibleArea = 0
    let bestIndex = 0
    
    slides.forEach((slide, index) => {
      const rect = slide.getBoundingClientRect()
      const slideTop = rect.top - containerRef.current!.getBoundingClientRect().top
      const visibleHeight = Math.min(
        Math.max(0, containerHeight - Math.max(0, slideTop)),
        Math.max(0, rect.bottom - Math.max(0, containerRef.current!.getBoundingClientRect().top))
      )
      
      if (visibleHeight > bestVisibleArea) {
        bestVisibleArea = visibleHeight
        bestIndex = index
      }
    })
    
    return bestIndex
  }

  // Add scroll event listener
  useEffect(() => {
    const container = containerRef.current
    
    const handleScroll = () => {
      const newIndex = getCurrentSlideIndex()
      setCurrentIndex(newIndex)
    }
    
    container?.addEventListener('scroll', handleScroll)
    return () => container?.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToNext = () => {
    if (containerRef.current && currentIndex < moments.images.length - 1) {
      const slides = containerRef.current.getElementsByClassName('desktop-slide')
      slides[currentIndex + 1]?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToPrevious = () => {
    if (containerRef.current && currentIndex > 0) {
      const slides = containerRef.current.getElementsByClassName('desktop-slide')
      slides[currentIndex - 1]?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className='pt-16'></div>

      <div className="relative flex h-[calc(100vh-150px)]">
        <main className="flex-1 overflow-hidden pt-16">
          <div className="desktop-container" ref={containerRef}>
            {moments.images.map((image) => (
              <div key={image._id} className="desktop-slide">
                <div className="flex h-full gap-6 lg:gap-10 px-4">
                  {/* Image Section */}
                  <div className="w-[45%] lg:w-[50%] h-full rounded-2xl overflow-hidden">
                    <Image
                      src={image.url}
                      alt={image.description}
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                    />
                  </div>

                  {/* Description Section */}
                  <div className="w-[55%] lg:w-[50%] bg-black/80 p-6 lg:p-10 rounded-2xl">
                    <div className="flex items-center gap-2 py-4">
                      <Calendar className="text-rose-400" size={20} />
                      <span className="text-rose-400 font-bold text-sm lg:text-base">
                        {new Date(image.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-white/90 text-xs lg:text-sm">
                      {expandedDescriptions[image._id]
                        ? image.description
                        : image.description.slice(0, 500) + '...'}
                    </p>

                    {image.description.length > 500 && (
                      <button
                        onClick={() => toggleDescription(image._id)}
                        className="mt-4 text-rose-400 hover:text-rose-300 text-xs lg:text-sm font-medium text-left"
                      >
                        {expandedDescriptions[image._id] ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Navigation Arrows */}
        <div className="absolute right-[12%] lg:right-[15%] top-1/2 -translate-y-1/2 flex flex-col gap-4">
          <button 
            onClick={scrollToPrevious}
            disabled={currentIndex === 0}
            className="p-2 lg:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg 
            hover:bg-white transition-all 
            duration-300 text-rose-500 hover:scale-110 
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronUp size={20} />
          </button>
          <button 
            onClick={scrollToNext}
            disabled={currentIndex === moments.images.length - 1}
            className="p-2 lg:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg 
            hover:bg-white transition-all 
            duration-300 text-rose-500 hover:scale-110 
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronDown size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}