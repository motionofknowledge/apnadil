'use client'

import { MomentData } from '@/support/moment'
import "../app/globals.css";
import { Calendar } from 'lucide-react'
import Image from 'next/image';

interface Props {

  moments: MomentData;
  expandedDescriptions: Record<string, boolean>;
  toggleDescription: (imageId: string) => void;

}

export default function MobileViewMoment({ moments, expandedDescriptions, toggleDescription }: Props) {
  return (
    <div className="mobile-container">
      <main className="h-[92dvh] pt-16">
        <div className="mobile-slides-container">
          {moments.images.map((image) => (
            <div key={image._id} className="mobile-slide">
              <div className="relative h-full">
                <Image
                  src={image.url}
                  alt={image.description}
                  className="w-full h-full object-cover object-center"
                  width={100}
                  height={100}
                />

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">


                  <div className="flex items-center gap-2 py-4">
                    <Calendar className="text-rose-400 size={10}" />
                    <span className="text-rose-400 font-bold">
                    {new Date(image.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    </span>
                  </div>

                  <p className="text-white/90 text-sm">
                    {expandedDescriptions[image._id]
                      ? image.description
                      : image.description.slice(0, 100) + '...'}
                  </p>
                  {image.description.length > 100 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDescription(image._id);
                      }}
                      className="mt-2 text-rose-400 hover:text-rose-300 text-sm font-medium"
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
    </div>
  )
}