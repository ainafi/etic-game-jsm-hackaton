"use client"
import React, { useRef, useCallback } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchData } from '@/lib/fetchdata'
import CardFeed from '@/components/shared/CardFeed'

interface Imovie {
  id: number,
  poster_path: string
}

const Feed = () => {
  const {
    data, 
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["movie"],
    queryFn: ({ pageParam = 1 }:{pageParam?:number}) => fetchData("discover/movie", {
      include_adult: 'false',
      sort_by: 'popularity.desc',
      page: pageParam,
    }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1
      } else {
        return undefined
      }
    },
    initialPageParam: 1
  })

  const observer = useRef<IntersectionObserver | null>(null)
  const lastMovieElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })
      if (node) observer.current.observe(node)
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  )

  if (isLoading) {
    return (
      <div className='flex flex-wrap gap-4'>
        {Array.from({ length: 10 }).map((_, index) => (
          <CardFeed key={index} isSkeleton id={0} />
        ))}
      </div>
    )
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className='flex flex-wrap gap-4 justify-center md:justify-normal'>
      {data?.pages.map((page, pageIndex) =>
        page.results.map((movie: Imovie, movieIndex: number) => {
          if (pageIndex === data.pages.length - 1 && movieIndex === page.results.length - 1) {
            return (
              <CardFeed ref={lastMovieElementRef} key={movie.id} {...movie} />
            )
          } else {
            return <CardFeed key={movie.id} {...movie} />
          }
        })
      )}
      {isFetchingNextPage && <div className='text-center'>Loading more...</div>}
    </div>
  )
}

export default Feed
