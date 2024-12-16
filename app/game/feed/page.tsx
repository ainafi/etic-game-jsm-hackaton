"use client"
import CardGame from '@/components/shared/CardGame'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchDataGame } from '@/lib/fetchGame'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
interface GameCardProps{
    id:string,
    background_image: string;
    image:string,   
    platforms:string[],
    name:string
}
const GameFeed = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["games"],
    queryFn: () => fetchDataGame("games")
  })
  console.log(data)
  if (isLoading) {
    return (
      <div className='flex flex-wrap gap-4'>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="w-full max-w-md">
            <div className="relative overflow-hidden border rounded shadow-lg">
              {/* Skeleton for the main image */}
              <Skeleton className="aspect-video w-full" />
              
              {/* Content section */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
                {/* Skeleton for platform icons */}
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="w-4 h-4 rounded-full" />
                  <Skeleton className="w-[1px] h-4" />
                  <Skeleton className="w-4 h-4 rounded-full" />
                  <Skeleton className="w-[1px] h-4" />
                  <Skeleton className="w-4 h-4 rounded-full" />
                </div>
                
                {/* Skeleton for title */}
                <Skeleton className="h-7 w-3/4 mb-1" />
                
                {/* Skeleton for view count */}
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className='flex flex-wrap gap-4'>
      {data.results.map((game:GameCardProps) => (
        <div key={game.id}>
            <CardGame {...game}  />

        </div>
          
      ))}
    </div>
  )
}

export default GameFeed
