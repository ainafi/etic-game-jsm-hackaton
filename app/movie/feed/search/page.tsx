"use client"

import CardFeed from '@/components/shared/CardFeed'
import useSearchStore from '@/store/useSearch'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchData } from '@/lib/fetchdata'

interface Imovie {
  id: number,
  poster_path: string
}

const SearchPage = () => {
  const { search } = useSearchStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['searchResults', search],
    queryFn: async () => {
      return await fetchData(`/search/multi?query=${search}&`, {
        include_adult: 'false',
        sort_by: 'popularity.desc',
        page: 1,
        language: 'en-US'
      });
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
        {data.results.map((movie: Imovie) => (
          <CardFeed title={''} price={0} media_type={''} key={movie.id} {...movie} id={movie.id} />
        ))}
      </div>
    </div>
  )
}

export default SearchPage
