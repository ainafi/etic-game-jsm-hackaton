import { Bookmark, BookmarkCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link';

interface CardFeedProps {
    id: number;
  poster_path?: string;
  media_type:string
  isSkeleton?: boolean;
}

const CardFeed = React.forwardRef<HTMLDivElement, CardFeedProps>(({ id,poster_path,media_type ,isSkeleton = false }, ref) => {
  const [isHover, setIsHover] = React.useState(false)
  const [isFavorite, setIsFavorite] = React.useState(false)
  if (isSkeleton) {
    return (
      <div ref={ref} className="relative w-[250px] my-5 ease-in-out duration-300 animate-pulse">
        <div className="rounded-xl bg-gray-300 h-[375px] w-full" />
      </div>
    )
  }
  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative w-[250px] my-5 ease-in-out duration-300"
    >
      <div className='absolute px-2 rounded-xl m-1 bg-red'>{media_type}</div>
      {isHover && (
        <div className='absolute top-2 right-2'>
          {isFavorite ?
            <BookmarkCheck onClick={() => setIsFavorite(!isFavorite)} className='cursor-pointer' />
            :
            <Bookmark onClick={() => setIsFavorite(!isFavorite)} className='cursor-pointer' />
          }
        </div>
      )}
      <Image className='rounded-xl' src={`https://image.tmdb.org/t/p/w500/${poster_path}`} width={250} height={375} alt="movie poster" />

      {isHover && (
        <div className="absolute -bottom-11 rounded-xl left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 p-2 w-full">
          <Button  className='w-[220px] mb-1 bg-transparent border capitalize font-semibold text-white'>
            <Link href={`/feed/${id}`}>details</Link>
            details
          </Button>
          <Button className='w-[220px] mt-1 capitalize font-semibold text-white'>order</Button>
        </div>
      )}
    </div>
  )
})

CardFeed.displayName = 'CardFeed';

export default CardFeed
