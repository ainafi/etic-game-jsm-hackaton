"use client"

import CardFeed from '@/components/shared/CardFeed'
import useSearchStore from '@/store/useSearch'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchDataAnime } from '@/lib/fetchAnime'
import CardAnime from '@/components/shared/anime/CardAnime'

interface IAnime{
    mal_id:number;
    title:string;
    images: {
      jpg: {
        image_url: string;
      };
    }
}

const SearchPage = () => {
  const { search } = useSearchStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['searchResults', search],
    queryFn: async () => {
      return await fetchDataAnime(`/anime?q=${search}`);
    },
    enabled: !!search
  });

  if (isLoading) return 
  <div className='flex flex-wrap gap-4'>
  {Array.from({ length: 10 }).map((_, index) => (
    <CardFeed key={index} isSkeleton id={0} media_type={''} title={''} price={0} />
  ))}
</div>
  if (error) return <div>Error loading data</div>
  if (!data) return <div>No data found</div>
  console.log(data.results)

  return (
    <div>
      <h1 className='text-2xl font-semibold'>Results for &quot;{search}&quot;</h1>
      <div className='flex flex-wrap gap-4'>
        {data.data.map((anime: IAnime) => (
           <CardAnime
           key={anime.mal_id}
           {...anime}
           
         />
        ))}
      </div>
    </div>
  )
}

export default SearchPage
