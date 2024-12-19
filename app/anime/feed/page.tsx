"use client";

import { fetchDataAnime } from '@/lib/fetchAnime';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useRef, useCallback } from 'react';
import CardAnime from '@/components/shared/anime/CardAnime';
import { Skeleton } from '@/components/ui/skeleton';
interface IAnime{
    mal_id:number;
    title:string;
    images: {
      jpg: {
        image_url: string;
      };
    }
}
const AnimeFeed = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["anime"],
    queryFn: ({ pageParam = 1 }) => fetchDataAnime(`/anime?page=${pageParam}`),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.has_next_page) {
        return lastPage.pagination.current_page + 1;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastAnimeElementRef = useCallback(
    (node:HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (isLoading) {
    return (
      <div className='flex flex-wrap gap-4'>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="w-full max-w-md">
            <div className="relative overflow-hidden border rounded shadow-lg">
              <Skeleton className="aspect-video w-full" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
                <Skeleton className="h-7 w-3/4 mb-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='flex flex-wrap gap-4'>
      {data?.pages.map((page, pageIndex) =>
        page.data.map((anime:IAnime, animeIndex:number) => {
          const isLastAnime = pageIndex === data.pages.length - 1 && animeIndex === page.data.length - 1;
          return (
            <CardAnime
              key={anime.mal_id}
              {...anime}
              ref={isLastAnime ? lastAnimeElementRef : null}
            />
          );
        })
      )}
      {isFetchingNextPage && <div className='text-center'>Loading more...</div>}
    </div>
  );
};

export default AnimeFeed;
