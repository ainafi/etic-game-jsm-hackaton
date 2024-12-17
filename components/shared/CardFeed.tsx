import { Bookmark, BookmarkCheck, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import useCartStore from '@/store/useStore'

interface CardFeedProps {
  id: number
  poster_path?: string | undefined
  media_type: string
  isSkeleton?: boolean
  backdrop_path?: string
  isLoading?: boolean
  title: string
  price: number
}

const CardFeed = React.forwardRef<HTMLDivElement, CardFeedProps>(
  ({ id, backdrop_path, poster_path, media_type, title, price, isSkeleton = false }, ref) => {
    const [isHover, setIsHover] = React.useState(false)
    const addToCart = useCartStore((state) => state.addToCart)
    const [isFavorite, setIsFavorite] = React.useState(false)

    if (isSkeleton) {
      return (
        <div ref={ref} className="relative w-[250px] my-5 ease-in-out duration-300 animate-pulse">
          <div className="rounded-xl bg-gray-300 h-[375px] w-full" />
        </div>
      )
    }

    const handleAddToCart = () => {
      addToCart({ id, name: title, price, poster_path: poster_path || backdrop_path })
    }

    return (
      <div
        ref={ref}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative w-[250px] my-5 ease-in-out duration-300"
      >
        <div className='absolute px-2 rounded-xl m-1 bg-red-500 text-white'>{media_type}</div>
        {isHover && (
          <div className='absolute top-2 right-2'>
            {isFavorite ?
              <BookmarkCheck onClick={() => setIsFavorite(!isFavorite)} className='cursor-pointer text-white' />
              :
              <Bookmark onClick={() => setIsFavorite(!isFavorite)} className='cursor-pointer text-white' />
            }
          </div>
        )}
        <Image className='rounded-xl' src={`https://image.tmdb.org/t/p/w500/${poster_path || backdrop_path}`} width={250} height={375} alt="movie poster" />

        {isHover && (
          <div className="absolute -bottom-11 rounded-xl left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 p-2 w-full">
            <Link href={`/feed/${id}`}>
              <Button className='w-[220px] hover:bg-transparent mb-1 bg-transparent border capitalize font-semibold text-white'>
                details
              </Button>
            </Link>
            <Button onClick={handleAddToCart} className='w-[220px] mt-1 capitalize font-semibold text-white'>
              <ShoppingCart className="w-4 h-4 mr-2" />
              <span>Add to cart</span>
            </Button>
          </div>
        )}
      </div>
    )
  }
)

CardFeed.displayName = 'CardFeed'

export default CardFeed

