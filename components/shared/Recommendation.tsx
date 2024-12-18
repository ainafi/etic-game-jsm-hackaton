import { fetchData } from '@/lib/fetchdata'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import CardFeed from './CardFeed'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"
interface CardFeedProps {
    id: number;
  poster_path?: string;
  media_type:string
  isSkeleton?: boolean;
  backdrop_path?:string
}
const Recommendation = ({id}:{id:string}) => {
    const {data,isLoading,error}=useQuery({
        queryKey:["recommendation",id],
        queryFn:()=>fetchData(`movie/${id}/recommendations`)
    })
    if (isLoading) {
        return (
          <div className='flex flex-wrap gap-4'>
            {Array.from({ length: 10 }).map((_, index) => (
              <CardFeed isLoading key={index} isSkeleton id={0} media_type={''} title={''} price={0} />
            ))}
          </div>
        )
      }
    
      if(error){
        return <div>Error loading data</div>
      }
      console.log(data)
    

  return (
    <div className='py-5 '>
        <h2 className='font-bold text-xl'>Recommentation</h2>
        <Carousel>
            <CarouselContent>
                {data?.results.map((movie:CardFeedProps)=>(
                    <CarouselItem  key={movie.id} className="basis-1/2 md:basis-1/3 lg:basis-1/6 mr-5">
                        <CardFeed isLoading key={movie.id} id={movie.id} media_type={movie.media_type} backdrop_path={movie.backdrop_path} title={''} price={0} />
                    </CarouselItem>
                
                ))}
            </CarouselContent>
            
        </Carousel>
    </div>
  )
}

export default Recommendation