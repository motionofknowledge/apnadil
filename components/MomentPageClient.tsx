'use client'

import { useState } from 'react'
import { MomentData } from '@/support/moment'
import DesktopViewMoment from '@/components/DesktopViewMoment'
import MobileViewMoment from '@/components/MobileViewMoment'
import MomentHeader from '@/components/MomentHeader'

interface MomentPageClientProps {
  moment: MomentData
}

export default function MomentPageClient({ moment }: MomentPageClientProps) {
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({})
  const [showGallery, setShowGallery] = useState(false)

  const toggleDescription = (imageId: string) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [imageId]: !prev[imageId]
    }))
  }

  if (!showGallery) {
    return <MomentHeader moments={moment} onExplore={() => setShowGallery(true)} />
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block">
        <DesktopViewMoment 
          moments={moment} 
          expandedDescriptions={expandedDescriptions}
          toggleDescription={toggleDescription}
        />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <MobileViewMoment 
          moments={moment} 
          expandedDescriptions={expandedDescriptions}
          toggleDescription={toggleDescription}
        />
      </div>
    </>
  )
} 