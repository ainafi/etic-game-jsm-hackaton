import React from 'react'
import Image from 'next/image'
import { PlaySquare } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

// Defining the interfaces for props
interface GameCardProps {
  id: string;
  background_image: string;
  platforms: Platform[];
  name: string;
}

interface Platform {
  platform: PlatformDetails;
}

interface PlatformDetails {
  image_background: string | StaticImport;
  id: number;
  name: string;
}

const CardGame: React.FC<GameCardProps> = ({ background_image, name, platforms }) => {
  return (
    <div className="w-full max-w-md">
      <Card className="relative overflow-hidden group">
        {/* Neon bars */}
        <div className="absolute left-[15%] h-full w-[2px] bg-gradient-to-b from-orange-500/0 via-orange-500 to-orange-500/0 z-10" />
        <div className="absolute right-[15%] h-full w-[2px] bg-gradient-to-b from-orange-500/0 via-orange-500 to-orange-500/0 z-10" />
        
        {/* Main image container */}
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <Image
            width={600}
            height={400}
            src={background_image}
            alt={name}
            className="object-cover w-full h-full"
          />
          
          {/* Play button overlay */}
          <div className="absolute left-4 top-4 z-20">
            <PlaySquare className="w-8 h-8 text-white/80" />
          </div>
        </div>

        {/* Content section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <div className="flex items-center gap-2 mb-2">
            {platforms.map((platform: Platform) => (
              <div key={platform.platform.id} className="flex items-center gap-1 text-sm text-gray-400">
                {/* <Image width={16} height={16} src={platform.platform.image_background} alt={platform.platform.name} className="w-4 h-4" /> */}
                <span>{platform.platform.name}</span>
              </div>
            ))}
          </div>
          
          <h2 className="text-xl font-bold text-white mb-1">
            {name}
          </h2>
          
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <span>+</span>
              891
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CardGame
