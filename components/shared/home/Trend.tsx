"use client"
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Trends } from '@/constant'
import { ChevronDown } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { fetchData } from '@/lib/fetchdata'
import { useQuery } from '@tanstack/react-query'
import Image, { StaticImageData } from 'next/image'
import SkeletonCard from '@/components/shared/home/SkeletonCard'  // Import the SkeletonCard component
import { fetchDataAnime } from '@/lib/fetchAnime'
import { fetchDataGame } from '@/lib/fetchGame'

interface ITrendMovie {
  id: number,
  title: string,
  poster_path?: string,
}

interface ITrendAnime {
  mal_id: string,
  title: string,
  images: {
    jpg: {
      image_url: string
    }
  }
}
interface ITrendGame {
  id: number,
  name: string,
  background_image?: string |StaticImageData,
}

const Trend = () => {
  const [isSelected, setIsSelected] = useState("movie")

  const fetch = async () => {
    if (isSelected === "movie" || isSelected === "tv") {
      return await fetchData(`trending/${isSelected}/week`)
    } else if (isSelected === "anime") {
      return await fetchDataAnime("/top/anime?filter=airing")
    }else{
      return await fetchDataGame("games")
    }
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['trend', isSelected],
    queryFn: fetch,
    refetchInterval: 100
  })

  if (isLoading) {
    return (
      <div className='w-full'>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4 basis-1/2">
                <SkeletonCard />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    )
  }

  if (error) return <div>Error: {error.message}</div>
  return (
    <div className='py-5 px-3 pt-16'>
      <h2 className='font-bold text-xl md:text-3xl text-white'>Trend <span className='text-secondary'>Movie</span></h2>
      <div className='my-3'>
        <button className='border border-white text-white py-3 px-5 rounded-md'>
          <DropdownMenu>
            <DropdownMenuTrigger className='w-full border-none'>
              <div className='flex items-center justify-between capitalize'>
                {isSelected} <ChevronDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Trends.map((item) => (
                <DropdownMenuItem key={item.id} onClick={() => setIsSelected(item.name)}>
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </button>
      </div>
      <div className='w-full'>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {isSelected === "movie" || isSelected === "tv" ? (
              data?.results?.map((trend: ITrendMovie) => (
                <CarouselItem key={trend.id} className="md:basis-1/3 lg:basis-1/4 basis-1/2">
                  <div className="p-1">
                    <Card className='bg-transparent border-none'>
                      <CardContent className="flex items-center justify-center p-6 aspect-square">
                        <div>
                          <Image className='w-[500px] rounded-md'
                            src={`https://image.tmdb.org/t/p/w500${trend.poster_path}`}
                            width={200}
                            height={200}
                            alt={trend.title} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            ) : isSelected === "anime" ? (
              data?.data.map((item: ITrendAnime) => (
                <CarouselItem key={item.mal_id} className="md:basis-1/3 lg:basis-1/4 basis-1/2">
                  <div className="p-1">
                    <Card className='bg-transparent border-none'>
                      <CardContent className="flex items-center justify-center p-6 aspect-square">
                        <div>
                          <Image className='w-[500px] rounded-md'
                            src={item.images.jpg.image_url}
                            width={200}
                            height={200}
                            alt={item.title} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            ) : (
              data?.results.map((item: ITrendGame) => (
                <CarouselItem key={item.id} className="md:basis-1/3 lg:basis-1/4 basis-1/2">
                  <div className="p-1">
                    <Card className='bg-transparent border-none'>
                      <CardContent className="flex items-center justify-center p-6 aspect-square">
                        <div>
                          <Image className='w-[500px] rounded-md'
                            src={item.background_image || '/default-image.jpg'}
                            width={200}
                            height={200}
                            alt={item.name} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <CarouselPrevious  />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default Trend
