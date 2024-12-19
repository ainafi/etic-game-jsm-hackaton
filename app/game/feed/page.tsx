/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchDataGame } from '@/lib/fetchGame';
import CardGame from '@/components/shared/CardGame';

interface Igame {
  id: string;
  background_image: string;
  name: string;
  page: number;
}

const GameFeed = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["games"],
    queryFn: ({ pageParam = 1 }) => fetchDataGame("games", pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return parseInt(url.searchParams.get('page') || '1', lastPage);
      } else {
        return undefined;
      }
    },
    initialPageParam: 1, // Added missing initialPageParam
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastGameElementRef = useCallback(
    (node: HTMLDivElement) => {
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
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='flex flex-wrap gap-4'>
      {data?.pages.map((page: any, pageIndex) =>
        page.results.map((game: Igame, gameIndex: number) => {
          const isLastGame = pageIndex === data.pages.length - 1 && gameIndex === page.results.length - 1;
          return (
            <CardGame
              key={game.id}
              {...game}
              ref={isLastGame ? lastGameElementRef : null}
            />
          );
        })
      )}
      {isFetchingNextPage && <div className='text-center'>Loading more...</div>}
    </div>
  );
};

export default GameFeed;
