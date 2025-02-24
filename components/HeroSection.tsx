"use client"


import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter()

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-white px-4 overflow-hidden">
      {/* Decorative elements moved outside the content div */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-[10%] right-[20%] w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[20%] left-[30%] w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-3xl text-center space-y-8 z-10">

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          <span className="text-rose-500">Apnadil:</span> Share moments with your loved ones
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mt-4">
          Apnadil is a platform to surprise your loved ones with moments
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button className="px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-medium transition-colors duration-200 shadow-lg hover:shadow-xl">
            Create Moments
          </button>
          
          <button 
            onClick={() => router.push('/moments')} 
            className="px-8 py-3 border-2 border-rose-400 text-rose-500 hover:bg-rose-50 rounded-full font-medium transition-colors duration-200"
          >
            Explore Our Gallery
          </button>
        </div>

      </div>
    </div>
  );
}