import { Calendar, Gift, Star } from 'lucide-react'

export default function BentoGrid() {
  return (
    <div className=" p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[200px]">
          {/* Price Reduction Card */}
          <div className="relative group rounded-3xl bg-bento bg-cover bg-center p-8 transition-all hover:scale-[1.02]">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl">
              <div className="absolute w-1 h-1 bg-white/20 rounded-full top-8 left-[20%] animate-twinkle" />
              <div className="absolute w-1 h-1 bg-white/20 rounded-full top-[60%] right-[10%] animate-twinkle delay-300" />
            </div>
            <div className="relative">
              <div className="mb-4 inline-block p-4 bg-gradient-to-br from-orange-400 to-pink-600 rounded-2xl">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Price reduction</h3>
              <p className="text-gray-400">
                If you buy films more than 3 there is a 1000MGA discount
              </p>
            </div>
          </div>

          {/* Various Choices Card */}
          <div className="relative group rounded-3xl bg-bento bg-cover bg-center p-8 transition-all hover:scale-[1.02]">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl">
              <div className="absolute w-1 h-1 bg-white/20 rounded-full top-[30%] left-[80%] animate-twinkle delay-150" />
              <div className="absolute w-1 h-1 bg-white/20 rounded-full bottom-[20%] left-[10%] animate-twinkle delay-500" />
            </div>
            <div className="relative">
              <div className="mb-4 inline-block p-4 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Various choices</h3>
              <p className="text-gray-400">
                Several categories to choose from and quality 1080p/720p
              </p>
            </div>
          </div>

          {/* Products Up To Date Card */}
          <div className="relative md:col-span-2 group rounded-3xl bg-bento bg-cover bg-center p-8 transition-all hover:scale-[1.02]">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl">
              <div className="absolute w-1 h-1 bg-white/20 rounded-full top-[20%] left-[40%] animate-twinkle delay-700" />
              <div className="absolute w-1 h-1 bg-white/20 rounded-full bottom-[30%] right-[25%] animate-twinkle delay-200" />
            </div>
            <div className="relative">
              <div className="mb-4 inline-block p-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Products up to date</h3>
              <p className="text-gray-400">New products are added every weeks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

