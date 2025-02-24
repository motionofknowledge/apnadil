import { momentData } from '@/support/moment'
import MomentPageClient from '@/components/MomentPageClient'

export async function generateStaticParams() {

  return momentData.map((moment) => ({

    slug: moment._id,

  }))

}

export default async function MomentPage({params}: {params: Promise<{ slug: string }>}) {
  
  // Wait for params to be available
  const slug = (await params).slug
  const moment = momentData.find(moment => moment._id === slug)

  if (!moment) {

    return <div className="min-h-screen flex items-center justify-center">Moment not found</div>

  }

  return <MomentPageClient moment={moment} />
}



