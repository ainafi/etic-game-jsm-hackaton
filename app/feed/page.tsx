"use client"
import React, { useRef, useCallback } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchData } from '@/lib/fetchdata'
import CardFeed from '@/components/shared/CardFeed'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Discover } from '@/constant'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import useGenre from '@/store/useGenre'

interface Imovie {
  id: number,
  poster_path: string,
  media_type: string
}

const Feed = () => {
  const {genre,setgenre}=useGenre()
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["discover", genre],
    queryFn: ({ pageParam = 1 }) => fetchData(`discover/${genre}`, {
      include_adult: 'false',
      sort_by: 'popularity.desc',
      page: pageParam,
      language: 'en-US'
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
          <CardFeed isLoading key={index} isSkeleton id={0} media_type={''} />
        ))}
      </div>
    )
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <div>
        <Button  className='md:w-[100px] mt-5 w-full bg-transparent border-white border capitalize'>

          <DropdownMenu >
            <DropdownMenuTrigger className='w-full border-none'>
              <div className='flex items-center  justify-between capitalize'>
                {genre} <ChevronDown /> 
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Discover.map((item) => (
                <DropdownMenuItem key={item.id} onClick={() => setgenre(item.name)}>
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </Button>
      </div>
      <div className='flex flex-wrap gap-4 justify-center md:justify-normal'>
        {data?.pages.map((page, pageIndex) =>
          page.results.map((movie: Imovie, movieIndex: number) => {
            const isLastMovie = pageIndex === data.pages.length - 1 && movieIndex === page.results.length - 1
            
            return (
              <>
                <CardFeed
                  media_type={movie.media_type}
                  ref={isLastMovie ? lastMovieElementRef : null}
                  key={movie.id}
                  isLoading={isLoading}
                  poster_path={movie.poster_path} id={movie.id}/>
              </>
            )
          })
        )}
        {isFetchingNextPage && <div className='text-center'>Loading more...</div>}
      </div>
    </div>
  )
}

export default Feed
